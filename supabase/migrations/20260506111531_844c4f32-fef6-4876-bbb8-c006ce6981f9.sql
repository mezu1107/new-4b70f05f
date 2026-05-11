
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS logo_url text;

INSERT INTO storage.buckets (id, name, public)
VALUES ('public-images', 'public-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read public-images"
ON storage.objects FOR SELECT
USING (bucket_id = 'public-images');

CREATE POLICY "Admin upload public-images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'public-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admin update public-images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'public-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admin delete public-images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'public-images' AND has_role(auth.uid(), 'admin'::app_role));
