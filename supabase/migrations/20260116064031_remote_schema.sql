alter table "public"."jewelry" add column "category" text default 'ring'::text;

alter table "public"."jewelry" add column "class_id" integer;

alter table "public"."jewelry" add column "price" numeric default 0;

alter table "public"."jewelry" add column "showcase" text default 'default'::text;

CREATE INDEX idx_jewelry_category_ai ON public.jewelry USING btree (category);

CREATE INDEX idx_jewelry_class_id ON public.jewelry USING btree (class_id);

CREATE INDEX idx_jewelry_showcase ON public.jewelry USING btree (showcase);

CREATE UNIQUE INDEX jewelry_class_id_key ON public.jewelry USING btree (class_id);

alter table "public"."jewelry" add constraint "check_jewelry_category_enum" CHECK ((category = ANY (ARRAY['ring'::text, 'bracelet'::text, 'pendant'::text, 'brooch'::text, 'collectible'::text, 'earring'::text]))) not valid;

alter table "public"."jewelry" validate constraint "check_jewelry_category_enum";

alter table "public"."jewelry" add constraint "jewelry_class_id_key" UNIQUE using index "jewelry_class_id_key";

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


  create policy "Admin Delete"
  on "storage"."objects"
  as permissive
  for delete
  to public
using (((bucket_id = 'blog'::text) AND (( SELECT auth.role() AS role) = 'authenticated'::text)));



  create policy "Admin Update Delete"
  on "storage"."objects"
  as permissive
  for update
  to public
using (((bucket_id = 'blog'::text) AND (( SELECT auth.role() AS role) = 'authenticated'::text)));



  create policy "Admin Upload"
  on "storage"."objects"
  as permissive
  for insert
  to public
with check (((bucket_id = 'blog'::text) AND (( SELECT auth.role() AS role) = 'authenticated'::text)));



  create policy "Allow authenticated deletes to catalog"
  on "storage"."objects"
  as permissive
  for delete
  to authenticated
using ((bucket_id = 'catalog'::text));



  create policy "Allow authenticated updates to catalog"
  on "storage"."objects"
  as permissive
  for update
  to authenticated
using ((bucket_id = 'catalog'::text));



  create policy "Allow authenticated uploads to catalog"
  on "storage"."objects"
  as permissive
  for insert
  to authenticated
with check ((bucket_id = 'catalog'::text));



  create policy "Give public access to catalog files"
  on "storage"."objects"
  as permissive
  for select
  to public
using ((bucket_id = 'catalog'::text));



  create policy "Public Access"
  on "storage"."objects"
  as permissive
  for select
  to public
using ((bucket_id = 'blog'::text));



