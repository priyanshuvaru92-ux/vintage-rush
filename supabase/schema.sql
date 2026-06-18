-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Products Table
create table products (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  description text,
  price numeric not null,
  category text not null,
  sizes text[] default '{}',
  colors text[] default '{}',
  images text[] default '{}',
  stock integer default 0,
  featured boolean default false,
  best_seller boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Users Table
-- Note: Currently we are not using Supabase Auth, so this table can hold anonymous/guest users or be populated later when auth is enabled.
create table users (
  id uuid primary key default uuid_generate_v4(),
  name text,
  email text,
  phone text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Wishlist Table
create table wishlist (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  product_id uuid references products(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, product_id)
);

-- Cart Items Table
create table cart_items (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  product_id uuid references products(id) on delete cascade,
  quantity integer default 1,
  size text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, product_id, size)
);

-- Orders Table
create table orders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete set null,
  customer_name text not null,
  email text not null,
  phone text not null,
  address text not null,
  city text not null,
  state text not null,
  pincode text not null,
  total_price numeric not null,
  payment_method text default 'COD',
  status text default 'Pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Order Items Table
create table order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  size text,
  quantity integer default 1,
  price numeric not null
);

-- Reviews Table
create table reviews (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  product_id uuid references products(id) on delete cascade,
  rating integer check (rating >= 1 and rating <= 5),
  comment text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
