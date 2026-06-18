-- Enable Row Level Security
alter table products enable row level security;
alter table users enable row level security;
alter table wishlist enable row level security;
alter table cart_items enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table reviews enable row level security;

-- Products: Everyone can read
create policy "Products are viewable by everyone" on products
  for select using (true);

-- Products: Admin can insert/update/delete (Placeholder for future auth)
create policy "Products are insertable by admin" on products
  for insert with check (auth.role() = 'service_role');
create policy "Products are updatable by admin" on products
  for update using (auth.role() = 'service_role');
create policy "Products are deletable by admin" on products
  for delete using (auth.role() = 'service_role');


-- Temporary Permissive Policies for Phase 4 (No Auth)
-- We will replace these with auth.uid() based policies in Phase 5

-- Users: Anyone can read, insert, update their own (for now, anyone)
create policy "Public users read access" on users for select using (true);
create policy "Public users insert access" on users for insert with check (true);
create policy "Public users update access" on users for update using (true);

-- Wishlist: Permissive for now
create policy "Public wishlist select" on wishlist for select using (true);
create policy "Public wishlist insert" on wishlist for insert with check (true);
create policy "Public wishlist delete" on wishlist for delete using (true);

-- Cart Items: Permissive for now
create policy "Public cart select" on cart_items for select using (true);
create policy "Public cart insert" on cart_items for insert with check (true);
create policy "Public cart update" on cart_items for update using (true);
create policy "Public cart delete" on cart_items for delete using (true);

-- Orders: Permissive for now
create policy "Public orders select" on orders for select using (true);
create policy "Public orders insert" on orders for insert with check (true);

-- Order Items: Permissive for now
create policy "Public order items select" on order_items for select using (true);
create policy "Public order items insert" on order_items for insert with check (true);

-- Reviews: Permissive for now
create policy "Public reviews select" on reviews for select using (true);
create policy "Public reviews insert" on reviews for insert with check (true);
