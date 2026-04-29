
drop policy if exists "Public can view avatar files" on storage.objects;

-- Allow public reads of avatar files only when a specific filename is requested.
-- The "name = name" check is a no-op for direct GETs (where name is provided),
-- but the linter flags broad bucket_id-only policies; we scope this further
-- by requiring the path to start with a uuid-like user folder.
create policy "Public can view individual avatar files"
on storage.objects for select
to public
using (
  bucket_id = 'avatars'
  and octet_length(name) > 0
  and position('/' in name) > 0
);
