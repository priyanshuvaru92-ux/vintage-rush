insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "Public Access to Product Images"
on storage.objects for select
using ( bucket_id = 'product-images' );

-- For admin uploads later
create policy "Admin Insert Product Images"
on storage.objects for insert
with check ( bucket_id = 'product-images' and auth.role() = 'service_role' );
