drop policy "Allow insert for everyone" on "public"."blog_comments";

create policy "Allow insert for everyone"
    on "public"."blog_comments"
    for insert
    with check (
        ((select auth.role()) = 'anon' and user_id is null) or
        ((select auth.role()) = 'authenticated' and user_id = (select auth.uid()))
    );
