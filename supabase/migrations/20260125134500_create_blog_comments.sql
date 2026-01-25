create table if not exists "public"."blog_comments" (
    "id" "uuid" default "gen_random_uuid"() not null,
    "post_id" "uuid" not null,
    "user_id" "uuid",
    "guest_name" "text",
    "guest_email" "text",
    "content" "text" not null,
    "is_approved" boolean default true,
    "created_at" timestamp with time zone default "now"(),
    "updated_at" timestamp with time zone default "now"()
);

alter table "public"."blog_comments" owner to "postgres";

alter table "public"."blog_comments"
    add constraint "blog_comments_pkey" primary key ("id");

alter table "public"."blog_comments"
    add constraint "blog_comments_post_id_fkey" foreign key ("post_id") references "public"."posts"("id") on delete cascade;

alter table "public"."blog_comments"
    add constraint "blog_comments_user_id_fkey" foreign key ("user_id") references "public"."users"("id") on delete set null;

create index "idx_blog_comments_post_id" on "public"."blog_comments" using "btree" ("post_id");
create index "idx_blog_comments_created_at" on "public"."blog_comments" using "btree" ("created_at" desc);

alter table "public"."blog_comments" enable row level security;

create policy "Allow public read access on approved comments"
    on "public"."blog_comments"
    for select
    using (("is_approved" = true));

create policy "Allow insert for everyone"
    on "public"."blog_comments"
    for insert
    with check (true);

create policy "Allow update for admins only"
    on "public"."blog_comments"
    for update
    using ((( select "auth"."uid"() as "uid") in ( select "admins"."id"
   from "public"."admins")));

create policy "Allow delete for admins only"
    on "public"."blog_comments"
    for delete
    using ((( select "auth"."uid"() as "uid") in ( select "admins"."id"
   from "public"."admins")));
