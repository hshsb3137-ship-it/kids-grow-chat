import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";

export const Route = createFileRoute("/secure-admin-panel-9271")({
  head: () => ({ meta: [{ title: "Admin — Infinity Learning Center" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: () => <AdminLayout><Outlet /></AdminLayout>,
});
