drop extension if exists "pg_net";

create type "public"."jewelry_status" as enum ('available', 'sold', 'reserved', 'hidden');

create type "public"."material_type" as enum ('gold', 'silver', 'copper', 'brass');


  create table "public"."collections" (
    "id" uuid not null default extensions.uuid_generate_v4(),
    "slug" text not null,
    "title" text not null,
    "description" text,
    "cover_image_id" uuid,
    "featured" boolean default false,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."collections" enable row level security;


  create table "public"."jewelry" (
    "id" uuid not null default extensions.uuid_generate_v4(),
    "collection_id" uuid,
    "slug" text not null,
    "title" text not null,
    "description" text,
    "material" public.material_type,
    "material_purity" text,
    "weight_grams" numeric,
    "crafting_time_hours" integer,
    "production_year" integer,
    "status" public.jewelry_status default 'available'::public.jewelry_status,
    "variants" jsonb,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."jewelry" enable row level security;


  create table "public"."jewelry_images" (
    "id" uuid not null default extensions.uuid_generate_v4(),
    "jewelry_id" uuid,
    "src" text not null,
    "display_order" integer default 0,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."jewelry_images" enable row level security;

CREATE UNIQUE INDEX collections_pkey ON public.collections USING btree (id);

CREATE UNIQUE INDEX collections_slug_key ON public.collections USING btree (slug);

CREATE UNIQUE INDEX jewelry_images_pkey ON public.jewelry_images USING btree (id);

CREATE UNIQUE INDEX jewelry_pkey ON public.jewelry USING btree (id);

CREATE UNIQUE INDEX jewelry_slug_key ON public.jewelry USING btree (slug);

alter table "public"."collections" add constraint "collections_pkey" PRIMARY KEY using index "collections_pkey";

alter table "public"."jewelry" add constraint "jewelry_pkey" PRIMARY KEY using index "jewelry_pkey";

alter table "public"."jewelry_images" add constraint "jewelry_images_pkey" PRIMARY KEY using index "jewelry_images_pkey";

alter table "public"."collections" add constraint "collections_slug_key" UNIQUE using index "collections_slug_key";

alter table "public"."collections" add constraint "fk_collection_cover_image" FOREIGN KEY (cover_image_id) REFERENCES public.jewelry_images(id) ON DELETE SET NULL not valid;

alter table "public"."collections" validate constraint "fk_collection_cover_image";

alter table "public"."jewelry" add constraint "jewelry_collection_id_fkey" FOREIGN KEY (collection_id) REFERENCES public.collections(id) ON DELETE CASCADE not valid;

alter table "public"."jewelry" validate constraint "jewelry_collection_id_fkey";

alter table "public"."jewelry" add constraint "jewelry_slug_key" UNIQUE using index "jewelry_slug_key";

alter table "public"."jewelry_images" add constraint "jewelry_images_jewelry_id_fkey" FOREIGN KEY (jewelry_id) REFERENCES public.jewelry(id) ON DELETE CASCADE not valid;

alter table "public"."jewelry_images" validate constraint "jewelry_images_jewelry_id_fkey";

grant delete on table "public"."collections" to "anon";

grant insert on table "public"."collections" to "anon";

grant references on table "public"."collections" to "anon";

grant select on table "public"."collections" to "anon";

grant trigger on table "public"."collections" to "anon";

grant truncate on table "public"."collections" to "anon";

grant update on table "public"."collections" to "anon";

grant delete on table "public"."collections" to "authenticated";

grant insert on table "public"."collections" to "authenticated";

grant references on table "public"."collections" to "authenticated";

grant select on table "public"."collections" to "authenticated";

grant trigger on table "public"."collections" to "authenticated";

grant truncate on table "public"."collections" to "authenticated";

grant update on table "public"."collections" to "authenticated";

grant delete on table "public"."collections" to "service_role";

grant insert on table "public"."collections" to "service_role";

grant references on table "public"."collections" to "service_role";

grant select on table "public"."collections" to "service_role";

grant trigger on table "public"."collections" to "service_role";

grant truncate on table "public"."collections" to "service_role";

grant update on table "public"."collections" to "service_role";

grant delete on table "public"."jewelry" to "anon";

grant insert on table "public"."jewelry" to "anon";

grant references on table "public"."jewelry" to "anon";

grant select on table "public"."jewelry" to "anon";

grant trigger on table "public"."jewelry" to "anon";

grant truncate on table "public"."jewelry" to "anon";

grant update on table "public"."jewelry" to "anon";

grant delete on table "public"."jewelry" to "authenticated";

grant insert on table "public"."jewelry" to "authenticated";

grant references on table "public"."jewelry" to "authenticated";

grant select on table "public"."jewelry" to "authenticated";

grant trigger on table "public"."jewelry" to "authenticated";

grant truncate on table "public"."jewelry" to "authenticated";

grant update on table "public"."jewelry" to "authenticated";

grant delete on table "public"."jewelry" to "service_role";

grant insert on table "public"."jewelry" to "service_role";

grant references on table "public"."jewelry" to "service_role";

grant select on table "public"."jewelry" to "service_role";

grant trigger on table "public"."jewelry" to "service_role";

grant truncate on table "public"."jewelry" to "service_role";

grant update on table "public"."jewelry" to "service_role";

grant delete on table "public"."jewelry_images" to "anon";

grant insert on table "public"."jewelry_images" to "anon";

grant references on table "public"."jewelry_images" to "anon";

grant select on table "public"."jewelry_images" to "anon";

grant trigger on table "public"."jewelry_images" to "anon";

grant truncate on table "public"."jewelry_images" to "anon";

grant update on table "public"."jewelry_images" to "anon";

grant delete on table "public"."jewelry_images" to "authenticated";

grant insert on table "public"."jewelry_images" to "authenticated";

grant references on table "public"."jewelry_images" to "authenticated";

grant select on table "public"."jewelry_images" to "authenticated";

grant trigger on table "public"."jewelry_images" to "authenticated";

grant truncate on table "public"."jewelry_images" to "authenticated";

grant update on table "public"."jewelry_images" to "authenticated";

grant delete on table "public"."jewelry_images" to "service_role";

grant insert on table "public"."jewelry_images" to "service_role";

grant references on table "public"."jewelry_images" to "service_role";

grant select on table "public"."jewelry_images" to "service_role";

grant trigger on table "public"."jewelry_images" to "service_role";

grant truncate on table "public"."jewelry_images" to "service_role";

grant update on table "public"."jewelry_images" to "service_role";


  create policy "Allow public read access on collections"
  on "public"."collections"
  as permissive
  for select
  to public
using (true);



  create policy "Allow public read access on jewelry"
  on "public"."jewelry"
  as permissive
  for select
  to public
using (true);



  create policy "Allow public read access on jewelry_images"
  on "public"."jewelry_images"
  as permissive
  for select
  to public
using (true);



