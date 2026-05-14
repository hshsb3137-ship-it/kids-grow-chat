-- Tighten orders INSERT policy: validate PII fields to reduce abuse on public insert.
DROP POLICY IF EXISTS "Anyone create orders" ON public.orders;

CREATE POLICY "Anyone create orders"
ON public.orders
FOR INSERT
TO public
WITH CHECK (
  items IS NOT NULL
  AND jsonb_typeof(items) = 'array'
  AND jsonb_array_length(items) > 0
  AND jsonb_array_length(items) <= 100
  AND total >= 0
  AND total <= 1000000
  AND status = 'pending'
  AND customer_name IS NOT NULL
  AND char_length(customer_name) BETWEEN 1 AND 120
  AND customer_phone IS NOT NULL
  AND char_length(customer_phone) BETWEEN 5 AND 30
  AND customer_address IS NOT NULL
  AND char_length(customer_address) BETWEEN 3 AND 500
);