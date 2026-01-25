drop policy "Allow insert for everyone" on "public"."blog_comments";

create policy "Allow insert for everyone"
    on "public"."blog_comments"
    for insert
    with check (
        (auth.role() = 'anon' and user_id is null) or
        (auth.role() = 'authenticated' and user_id = auth.uid())
    );
