-- 1. Create Profiles Table referencing auth.users
CREATE TABLE IF NOT EXISTS profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  email text,
  phone text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Alter existing tables to reference profiles instead of users
-- Drop foreign keys linking to users
ALTER TABLE wishlist DROP CONSTRAINT IF EXISTS wishlist_user_id_fkey;
ALTER TABLE cart_items DROP CONSTRAINT IF EXISTS cart_items_user_id_fkey;
ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_user_id_fkey;
ALTER TABLE reviews DROP CONSTRAINT IF EXISTS reviews_user_id_fkey;

-- Add new foreign keys referencing profiles ONLY for orders and reviews.
-- We intentionally DO NOT add strict foreign keys for wishlist and cart_items
-- because they need to store guest session UUIDs that won't exist in profiles.
ALTER TABLE orders ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE SET NULL;
ALTER TABLE reviews ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE;

-- 3. Drop the temporary users table
-- NOTE: We are assuming guest data in wishlist/cart_items will be handled by the frontend merging logic.
-- If any orphan records exist (where user_id is a guest UUID not in profiles), the foreign key constraints 
-- above might fail if data already exists. To prevent this, we could insert those guest UUIDs into profiles 
-- temporarily, or just clear guest data. For this migration, we'll assume the db is mostly fresh.
-- If this fails, clear cart_items and wishlist first: DELETE FROM cart_items; DELETE FROM wishlist;
DROP TABLE IF EXISTS users;

-- 4. Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 5. Trigger to automatically create a profile when a new auth user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, avatar_url)
  VALUES (
    new.id, 
    new.raw_user_meta_data->>'full_name', 
    new.email, 
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 6. RLS Policies (Secured)

-- Profiles
DROP POLICY IF EXISTS "Public users read access" ON profiles;
DROP POLICY IF EXISTS "Public users insert access" ON profiles;
DROP POLICY IF EXISTS "Public users update access" ON profiles;

CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Wishlist
DROP POLICY IF EXISTS "Public wishlist select" ON wishlist;
DROP POLICY IF EXISTS "Public wishlist insert" ON wishlist;
DROP POLICY IF EXISTS "Public wishlist delete" ON wishlist;

CREATE POLICY "Users can view own wishlist" ON wishlist FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own wishlist" ON wishlist FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own wishlist" ON wishlist FOR DELETE USING (auth.uid() = user_id);

-- Cart
DROP POLICY IF EXISTS "Public cart select" ON cart_items;
DROP POLICY IF EXISTS "Public cart insert" ON cart_items;
DROP POLICY IF EXISTS "Public cart update" ON cart_items;
DROP POLICY IF EXISTS "Public cart delete" ON cart_items;

CREATE POLICY "Users can view own cart" ON cart_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own cart" ON cart_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own cart" ON cart_items FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own cart" ON cart_items FOR DELETE USING (auth.uid() = user_id);

-- Orders
DROP POLICY IF EXISTS "Public orders select" ON orders;
DROP POLICY IF EXISTS "Public orders insert" ON orders;

CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);
