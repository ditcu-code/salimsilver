alter table "public"."posts" add column "views" integer default 0;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.increment_post_views(post_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  UPDATE public.posts
  SET views = views + 1
  WHERE id = post_id;
END;
$function$
;


