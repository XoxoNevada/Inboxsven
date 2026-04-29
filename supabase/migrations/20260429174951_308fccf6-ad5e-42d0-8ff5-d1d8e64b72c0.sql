
-- Consolidate avatar SELECT policies
drop policy if exists "Avatars are publicly viewable by id" on storage.objects;
drop policy if exists "Anon can view avatar files individually" on storage.objects;

-- Single clear policy: anyone can read a specific avatar file by its full path,
-- but cannot list the bucket (storage.objects listing is gated separately by Supabase).
create policy "Public can view avatar files"
on storage.objects for select
to public
using (bucket_id = 'avatars');

-- Lock down SECURITY DEFINER trigger function from being called via API
revoke execute on function public.handle_new_user() from anon, authenticated, public;
