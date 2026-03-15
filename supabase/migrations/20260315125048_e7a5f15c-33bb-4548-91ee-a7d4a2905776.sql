
-- Fix permissive INSERT policies for orders - allow both authenticated and guest
DROP POLICY "Users can create orders" ON public.orders;
CREATE POLICY "Authenticated users can create orders" ON public.orders
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Guest users can create orders" ON public.orders
  FOR INSERT TO anon WITH CHECK (user_id IS NULL AND guest_name IS NOT NULL AND guest_phone IS NOT NULL);

-- Fix permissive INSERT policies for order_items
DROP POLICY "Users can insert order items" ON public.order_items;
CREATE POLICY "Authenticated users can insert order items" ON public.order_items
  FOR INSERT TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
  );
CREATE POLICY "Guest users can insert order items" ON public.order_items
  FOR INSERT TO anon WITH CHECK (
    EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id IS NULL)
  );

-- Fix permissive INSERT on page_visits
DROP POLICY "Anyone can insert page visits" ON public.page_visits;
CREATE POLICY "Authenticated users can log visits" ON public.page_visits
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid() OR user_id IS NULL);
CREATE POLICY "Anonymous users can log visits" ON public.page_visits
  FOR INSERT TO anon WITH CHECK (user_id IS NULL);
