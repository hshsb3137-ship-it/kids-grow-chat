
-- Pin search_path on set_updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

-- Revoke direct execute on security-definer functions
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

-- Tighten orders insert: require items and non-negative total
DROP POLICY "Anyone create orders" ON public.orders;
CREATE POLICY "Anyone create orders" ON public.orders FOR INSERT
  WITH CHECK (
    items IS NOT NULL
    AND jsonb_typeof(items) = 'array'
    AND jsonb_array_length(items) > 0
    AND total >= 0
  );

-- Drop public listing policy on product-images; CDN still serves public files
DROP POLICY "Public read product images" ON storage.objects;
