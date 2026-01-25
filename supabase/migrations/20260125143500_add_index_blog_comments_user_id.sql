create index if not exists "idx_blog_comments_user_id" on "public"."blog_comments" using "btree" ("user_id");
