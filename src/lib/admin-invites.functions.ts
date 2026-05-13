import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const InviteSchema = z.object({
  email: z.string().email().max(255),
});

export const inviteAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => InviteSchema.parse(input))
  .handler(async ({ data, context }) => {
    // Caller must be an admin.
    const { data: roleRow, error: roleErr } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    if (roleErr) throw new Error(roleErr.message);
    if (!roleRow) throw new Response("Forbidden: admin only", { status: 403 });

    const email = data.email.toLowerCase().trim();

    // Find existing user by email; if none, send an invite email.
    let userId: string | null = null;
    const { data: list, error: listErr } = await supabaseAdmin.auth.admin.listUsers({
      page: 1,
      perPage: 200,
    });
    if (listErr) throw new Error(listErr.message);
    const existing = list.users.find((u) => u.email?.toLowerCase() === email);

    if (existing) {
      userId = existing.id;
    } else {
      const redirectTo = `${process.env.SUPABASE_URL?.replace(
        ".supabase.co",
        ""
      )}` // not used; we use site URL below
      // Use site URL from request origin if present; otherwise fall back to Supabase project URL.
      const { data: invited, error: inviteErr } =
        await supabaseAdmin.auth.admin.inviteUserByEmail(email);
      if (inviteErr) throw new Error(inviteErr.message);
      userId = invited.user?.id ?? null;
      if (!userId) throw new Error("Invite failed: no user id returned");
    }

    // Grant admin role (idempotent thanks to unique(user_id, role)).
    const { error: insErr } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: userId, role: "admin" });
    if (insErr && !/duplicate key/i.test(insErr.message)) {
      throw new Error(insErr.message);
    }

    return {
      ok: true as const,
      message: existing
        ? `${email} is already a user — granted admin access.`
        : `Invite email sent to ${email}. They'll set their password from the link.`,
    };
  });

export const listAdmins = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: roleRow } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    if (!roleRow) throw new Response("Forbidden: admin only", { status: 403 });

    const { data: roles, error } = await supabaseAdmin
      .from("user_roles")
      .select("user_id, created_at")
      .eq("role", "admin");
    if (error) throw new Error(error.message);

    const { data: list } = await supabaseAdmin.auth.admin.listUsers({
      page: 1,
      perPage: 200,
    });
    const byId = new Map(list?.users.map((u) => [u.id, u]) ?? []);
    return (roles ?? []).map((r) => {
      const u = byId.get(r.user_id);
      return {
        user_id: r.user_id,
        email: u?.email ?? "(unknown)",
        confirmed: !!u?.email_confirmed_at,
        granted_at: r.created_at,
      };
    });
  });

export const revokeAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ user_id: z.string().uuid() }).parse(input)
  )
  .handler(async ({ data, context }) => {
    const { data: roleRow } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    if (!roleRow) throw new Response("Forbidden: admin only", { status: 403 });
    if (data.user_id === context.userId) {
      throw new Error("You cannot revoke your own admin access.");
    }

    const { error } = await supabaseAdmin
      .from("user_roles")
      .delete()
      .eq("user_id", data.user_id)
      .eq("role", "admin");
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
