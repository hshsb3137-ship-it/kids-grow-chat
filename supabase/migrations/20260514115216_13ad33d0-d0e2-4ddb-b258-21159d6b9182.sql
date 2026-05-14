CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Auto-admin-on-first-signup removed to prevent race-to-admin takeover.
  -- Admin roles are granted only via the admin-gated inviteAdmin server function.
  RETURN NEW;
END;
$function$;