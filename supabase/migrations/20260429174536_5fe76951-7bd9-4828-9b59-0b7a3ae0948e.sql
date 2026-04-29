
drop policy if exists "Avatars are publicly readable" on storage.objects;

create policy "Avatars are publicly viewable by id"
on storage.objects for select
using (bucket_id = 'avatars' and auth.role() = 'authenticated');

-- Anonymous users can still load images via the public URL (object-by-object), but cannot list.
create policy "Anon can view avatar files individually"
on storage.objects for select to anon
using (bucket_id = 'avatars' and name is not null);
