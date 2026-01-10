SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict DMUB1qFAEmQoCE8VObxKjDkFmEBfWIztlLLpohaboM0KFQ86mOd7mga6ySgQShx

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', 'da94210b-5152-497a-8634-3fc5b3b0178c', 'authenticated', 'authenticated', 'bat.bane@gmail.com', '$2a$10$QEGKY8shAX.Y9ia.fpx2Vuic.CyDciIKhKwj5oesQpfZ0..CW8CTy', '2026-01-09 04:18:38.838852+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-01-09 07:17:46.77872+00', '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2026-01-09 04:18:38.798772+00', '2026-01-09 11:43:26.475616+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'c815afc1-3f72-4a58-a4d6-0b475433c58e', 'authenticated', 'authenticated', 'salimsilver925@gmail.com', '$2a$10$NA39TmvYTIjn72j540jwF.7dbVgrvZsgZRNhEqE2MeB.iR.yC/pEu', '2025-12-16 04:10:40.058343+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-01-07 14:03:56.767975+00', '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-12-16 04:10:40.042332+00', '2026-01-08 06:05:00.786338+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '975d5e46-7a11-46a8-833a-da92ba8162c0', 'authenticated', 'authenticated', 'wangiglue@gmail.com', '$2a$10$D8OJJUyb7lKeuofmkPXg0uB.i7b.5hYjFUmnY/H.0k/cVxu9ZBIwa', '2025-12-16 07:33:45.620808+00', NULL, '', NULL, '', NULL, '', '', NULL, '2025-12-16 07:34:07.817754+00', '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-12-16 07:33:45.524209+00', '2025-12-16 07:34:07.83466+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('c815afc1-3f72-4a58-a4d6-0b475433c58e', 'c815afc1-3f72-4a58-a4d6-0b475433c58e', '{"sub": "c815afc1-3f72-4a58-a4d6-0b475433c58e", "email": "salimsilver925@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2025-12-16 04:10:40.05285+00', '2025-12-16 04:10:40.052913+00', '2025-12-16 04:10:40.052913+00', '6776873f-5d45-4e33-a5e1-af656171d489'),
	('975d5e46-7a11-46a8-833a-da92ba8162c0', '975d5e46-7a11-46a8-833a-da92ba8162c0', '{"sub": "975d5e46-7a11-46a8-833a-da92ba8162c0", "email": "wangiglue@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2025-12-16 07:33:45.59212+00', '2025-12-16 07:33:45.592789+00', '2025-12-16 07:33:45.592789+00', '8b029863-ed47-42ce-98b8-7883cc9ffa38'),
	('da94210b-5152-497a-8634-3fc5b3b0178c', 'da94210b-5152-497a-8634-3fc5b3b0178c', '{"sub": "da94210b-5152-497a-8634-3fc5b3b0178c", "email": "bat.bane@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-01-09 04:18:38.827407+00', '2026-01-09 04:18:38.827465+00', '2026-01-09 04:18:38.827465+00', '00426b33-7081-411a-ba42-d1b4c8eeeafb');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag", "oauth_client_id", "refresh_token_hmac_key", "refresh_token_counter", "scopes") VALUES
	('bc423e3f-7e65-4a58-8aa1-c5452403cf96', 'c815afc1-3f72-4a58-a4d6-0b475433c58e', '2026-01-07 14:03:56.768083+00', '2026-01-08 06:05:00.80242+00', NULL, 'aal1', NULL, '2026-01-08 06:05:00.802304', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '182.8.225.205', NULL, NULL, NULL, NULL, NULL),
	('c799dc89-4f9a-4c47-8240-b551bb3f46fd', 'da94210b-5152-497a-8634-3fc5b3b0178c', '2026-01-09 07:17:46.778825+00', '2026-01-09 11:43:26.489909+00', NULL, 'aal1', NULL, '2026-01-09 11:43:26.489142', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', '182.8.249.21', NULL, NULL, NULL, NULL, NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('bc423e3f-7e65-4a58-8aa1-c5452403cf96', '2026-01-07 14:03:56.859504+00', '2026-01-07 14:03:56.859504+00', 'password', '8606ae47-7749-455d-8dc7-bd531eee4a45'),
	('c799dc89-4f9a-4c47-8240-b551bb3f46fd', '2026-01-09 07:17:46.781109+00', '2026-01-09 07:17:46.781109+00', 'password', 'ce5bf71e-c342-4886-9721-074615f9c993');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_client_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 81, '5ep5745sgzyg', 'c815afc1-3f72-4a58-a4d6-0b475433c58e', true, '2026-01-07 14:03:56.813203+00', '2026-01-07 15:12:07.042156+00', NULL, 'bc423e3f-7e65-4a58-8aa1-c5452403cf96'),
	('00000000-0000-0000-0000-000000000000', 82, 'pjnxz573ecbu', 'c815afc1-3f72-4a58-a4d6-0b475433c58e', true, '2026-01-07 15:12:07.069226+00', '2026-01-08 06:05:00.738118+00', '5ep5745sgzyg', 'bc423e3f-7e65-4a58-8aa1-c5452403cf96'),
	('00000000-0000-0000-0000-000000000000', 83, 'zwpb4tjc3lkx', 'c815afc1-3f72-4a58-a4d6-0b475433c58e', false, '2026-01-08 06:05:00.768407+00', '2026-01-08 06:05:00.768407+00', 'pjnxz573ecbu', 'bc423e3f-7e65-4a58-8aa1-c5452403cf96'),
	('00000000-0000-0000-0000-000000000000', 89, 'whm3sfm6tfjq', 'da94210b-5152-497a-8634-3fc5b3b0178c', true, '2026-01-09 07:17:46.779866+00', '2026-01-09 08:20:09.150542+00', NULL, 'c799dc89-4f9a-4c47-8240-b551bb3f46fd'),
	('00000000-0000-0000-0000-000000000000', 90, 'isqd2kkggzss', 'da94210b-5152-497a-8634-3fc5b3b0178c', true, '2026-01-09 08:20:09.185061+00', '2026-01-09 09:19:31.762457+00', 'whm3sfm6tfjq', 'c799dc89-4f9a-4c47-8240-b551bb3f46fd'),
	('00000000-0000-0000-0000-000000000000', 91, '63maq35hwup6', 'da94210b-5152-497a-8634-3fc5b3b0178c', true, '2026-01-09 09:19:31.793263+00', '2026-01-09 10:24:43.308847+00', 'isqd2kkggzss', 'c799dc89-4f9a-4c47-8240-b551bb3f46fd'),
	('00000000-0000-0000-0000-000000000000', 92, 'j3eyxpprvghr', 'da94210b-5152-497a-8634-3fc5b3b0178c', true, '2026-01-09 10:24:43.335915+00', '2026-01-09 11:43:26.437804+00', '63maq35hwup6', 'c799dc89-4f9a-4c47-8240-b551bb3f46fd'),
	('00000000-0000-0000-0000-000000000000', 93, 'hwzf2d5f6lrw', 'da94210b-5152-497a-8634-3fc5b3b0178c', false, '2026-01-09 11:43:26.461939+00', '2026-01-09 11:43:26.461939+00', 'j3eyxpprvghr', 'c799dc89-4f9a-4c47-8240-b551bb3f46fd');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: admins; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."admins" ("id", "created_at") VALUES
	('da94210b-5152-497a-8634-3fc5b3b0178c', '2026-01-09 07:14:16+00'),
	('c815afc1-3f72-4a58-a4d6-0b475433c58e', '2026-01-09 11:27:21+00'),
	('975d5e46-7a11-46a8-833a-da92ba8162c0', '2026-01-09 11:27:41+00');


--
-- Data for Name: collections; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."collections" ("id", "slug", "title", "description", "cover_image_id", "featured", "created_at", "updated_at", "created_by") VALUES
	('0c3a39ae-9f0c-423d-8baf-5a0166c105c0', 'rings', 'Rings', 'Handcrafted silver rings', '7bd1d0a8-93d0-4577-9835-e0814a18e6ec', true, '2025-12-08 07:56:58.61044+00', '2025-12-08 07:56:58.61044+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e'),
	('372c6c63-1d81-46e7-8c57-3a2dd5918add', 'bracelets', 'Bracelets', 'Artisan silver bracelets', '9c2603b5-1ea0-4224-82d7-75f511f494f6', true, '2025-12-08 07:57:03.008148+00', '2025-12-08 07:57:03.008148+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e'),
	('26982604-8d84-4a7e-80ce-b80b2ac58544', 'brooches', 'Brooches', 'Elegant silver brooches', '2f07f901-9e8b-44de-a3f7-a55451114741', false, '2025-12-08 07:57:05.135324+00', '2025-12-08 07:57:05.135324+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e'),
	('3e75b39a-f602-4e34-ac9d-f0dbb35c5264', 'earrings', 'Earrings', 'Handcrafted silver earrings', '55306487-73ca-46d2-b36c-9df0097ee8bf', false, '2025-12-08 07:57:07.115256+00', '2025-12-08 07:57:07.115256+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e'),
	('3fc15fb3-bffb-46c1-82c2-ebb3176902d8', 'collectibles', 'Collectibles', 'Handcrafted silver collectibles and home decor', 'a08aa306-0341-4fc9-ad97-e5c73249044b', true, '2025-12-10 04:22:28.685179+00', '2025-12-10 04:22:28.685179+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e'),
	('2cc56012-a490-4c33-9f31-9139eb984fe6', 'pendants', 'Pendants', 'Artisan silver pendants', '7bbf1ba8-476e-41ea-aa41-5b0b09319115', false, '2025-12-08 07:57:00.982488+00', '2025-12-08 07:57:00.982488+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e');


--
-- Data for Name: jewelry; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."jewelry" ("id", "collection_id", "slug", "title", "description", "material", "material_purity", "weight_grams", "crafting_time_hours", "production_year", "status", "variants", "created_at", "updated_at", "created_by") VALUES
	('1cdd00b6-c259-4a48-9391-18dd59c14813', '0c3a39ae-9f0c-423d-8baf-5a0166c105c0', 'hand-carved-silver-rings-couple-salimsilver', 'The Carved Couple: Artisan Carved Silver & White Gemstone Rings', 'Hand-carved sterling silver rings featuring deep, oxidized organic vine engravings and bezel-set clear gemstones.', 'silver', '925', NULL, NULL, NULL, 'available', '[{"type": "Size", "options": ["6", "7", "8", "9"]}]', '2025-12-08 07:56:58.889657+00', '2025-12-08 07:56:58.889657+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e'),
	('58836789-b114-41b3-816e-2b1c7c91697b', '0c3a39ae-9f0c-423d-8baf-5a0166c105c0', 'silver-pagoda-ring-pearl-salimsilver', 'The Sanctuary: Sterling Silver Pagoda Ring with Pearl Finial', 'Sculptural silver ring crafted in the shape of a miniature tiered pagoda with intricate metalwork, tiled roofing, and window cutouts, crowned with a lustrous peach pearl.', 'silver', '925', NULL, NULL, NULL, 'available', NULL, '2025-12-08 07:56:59.273154+00', '2025-12-08 07:56:59.273154+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e'),
	('25262d5a-f84a-439e-8e61-000a2b3853a3', '0c3a39ae-9f0c-423d-8baf-5a0166c105c0', 'hand-carved-silver-turquoise-ring-salimsilver', 'The Verde Filigree: An Artisanal Silver and Turquoise Statement Ring', 'Substantial silver ring set with three round turquoise cabochons, featuring intricate floral filigree and an aged patina.', 'silver', '925', NULL, NULL, NULL, 'available', NULL, '2025-12-08 07:56:59.619476+00', '2025-12-08 07:56:59.619476+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e'),
	('07bd01d7-a538-4439-8005-76bea8282c03', '2cc56012-a490-4c33-9f31-9139eb984fe6', 'silver-hibiscus-locket-purple-stone-pendant-necklace-salimsilver', 'The Hibiscus Locket: A Hand Carved Silver Statement Piece', 'Open silver locket featuring intricate hibiscus floral engravings and a deep purple stone.', 'silver', '925', NULL, NULL, NULL, 'available', NULL, '2025-12-08 07:57:01.227791+00', '2025-12-08 07:57:01.227791+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e'),
	('b7ff9279-ce35-49cb-ba55-9bb00969e2ef', '2cc56012-a490-4c33-9f31-9139eb984fe6', 'silver-pendant-labradorite-eye-dot-jewelry-salimsilver', 'The Celestial Shield: Granulated Silver Pendant with Labradorite Eye', 'Handcrafted sterling silver pendant featuring a circular ''shield'' design with intricate granulation beads radiating from a central, bezel-set labradorite stone. The silver boasts a rich antique finish.', 'silver', '925', NULL, NULL, NULL, 'available', NULL, '2025-12-08 07:57:01.622288+00', '2025-12-08 07:57:01.622288+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e'),
	('c67c03ca-5dbe-4279-9043-b2c381c2122d', '2cc56012-a490-4c33-9f31-9139eb984fe6', 'silver-seahorse-pendant-amber-salimsilver', 'The Maritime Dual: Artisan Silver Seahorse Pendant', 'Intricate silver double-seahorse pendant featuring amber and green gemstone accents with detailed metal texture.', 'silver', '925', NULL, NULL, NULL, 'available', NULL, '2025-12-08 07:57:01.985765+00', '2025-12-08 07:57:01.985765+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e'),
	('44a9a772-bb4f-4e64-aa94-c6d3d1fd71f5', '372c6c63-1d81-46e7-8c57-3a2dd5918add', 'silver-filigree-ruby-cuff-bracelet-salimsilver', 'The Filigree Sunburst Cuff: An Artisan Statement Piece with Ruby', 'Handcrafted silver filigree cuff bracelet featuring a large, hammered silver disc with an intricate central filigree pattern and a deep red ruby gemstone. The openwork band is adorned with delicate silver scrollwork.', 'silver', '925', NULL, NULL, NULL, 'available', NULL, '2025-12-08 07:57:03.274324+00', '2025-12-08 07:57:03.274324+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e'),
	('4872ba9e-01ca-434e-af60-726baa474cd5', '372c6c63-1d81-46e7-8c57-3a2dd5918add', 'silver-seahorse-charm-bracelet-salimsilver', 'The Coastal Artisan: A Silver Seahorse Charm Bracelet', 'Silver seahorse charm bracelet with metallic texture and intricate detailing on the charms and chain. A piece that evokes an artisanal and luxurious feel.', 'silver', '925', NULL, NULL, NULL, 'available', NULL, '2025-12-08 07:57:03.935109+00', '2025-12-08 07:57:03.935109+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e'),
	('51265bbe-67cd-4a5a-9fe6-3cd9ace223db', '26982604-8d84-4a7e-80ce-b80b2ac58544', 'silver-gold-floral-lotus-brooch-salimsilver', 'The Gilded Bloom: Silver and Gold Lotus Flower Brooch', 'Two-tone floral brooch with a textured gold top layer of petals over a silver base, featuring a detailed beaded center.', 'silver', '925', NULL, NULL, NULL, 'available', NULL, '2025-12-08 07:57:05.477707+00', '2025-12-08 07:57:05.477707+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e'),
	('e2651c43-0e53-4190-8c69-51a9ae90a857', '26982604-8d84-4a7e-80ce-b80b2ac58544', 'hand-carved-silver-moonstone-brooch-salimsilver', 'The Moonlit Hand Carved: An Artisan Silver Moonstone Brooch', 'Ornate silver brooch with a central moonstone cabochon and intricate metalwork.', 'silver', '925', NULL, NULL, NULL, 'available', NULL, '2025-12-08 07:57:05.773946+00', '2025-12-08 07:57:05.773946+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e'),
	('44722374-e1ef-49f2-ba3c-412f00aba906', '26982604-8d84-4a7e-80ce-b80b2ac58544', 'baroque-pearl-citrine-silver-brooch', 'The Luminous Baroque: Artisan Pearl and Citrine Brooch', 'Handcrafted silver brooch featuring lustrous baroque pearls and faceted yellow citrine gemstones arranged in an intricate, swirling floral motif.', 'silver', '925', NULL, NULL, NULL, 'available', NULL, '2025-12-08 07:57:06.08118+00', '2025-12-08 07:57:06.08118+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e'),
	('53c0aaaa-968d-4498-8979-4a3b850b087c', '3e75b39a-f602-4e34-ac9d-f0dbb35c5264', 'silver-ruby-filigree-earrings-salimsilver', 'Golden Hour Embrace: Organic Amber Filigree Earrings', 'Gold organic-shaped earrings with amber gemstones. The design highlights the metallic sheen and organic forms.', 'silver', '925', NULL, NULL, NULL, 'available', '[{"type": "Size", "options": ["6", "7", "8", "9"]}]', '2025-12-08 07:57:07.424579+00', '2025-12-08 07:57:07.424579+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e'),
	('9ec23dfc-920c-4a6c-a55f-7da702d25c8e', '3e75b39a-f602-4e34-ac9d-f0dbb35c5264', 'silver-mamuli-earrings-salimsilver', 'The Hand Carved Mamuli: Handcrafted Silver Spiral Earrings', 'Handcrafted silver Mamuli earrings featuring hammered textures and spiral motifs.', 'silver', '925', NULL, NULL, NULL, 'available', '[{"type": "Size", "options": ["6", "7", "8", "9"]}]', '2025-12-08 07:57:07.71584+00', '2025-12-08 07:57:07.71584+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e'),
	('464e0478-9919-4ad5-aa06-e90476c583c6', '3e75b39a-f602-4e34-ac9d-f0dbb35c5264', 'silver-dragonfly-amethyst-drop-earrings-salimsilver', 'The Twilight Garden: Silver Dragonfly & Amethyst Earrings', 'Intricate sterling silver drop earrings with a floral stud and dragonfly motif, anchored by a deep purple amethyst.', 'silver', '925', NULL, NULL, NULL, 'available', '[{"type": "Size", "options": ["6", "7", "8", "9"]}]', '2025-12-08 07:57:07.969418+00', '2025-12-08 07:57:07.969418+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e'),
	('accc8ec5-36a7-4604-bff9-8b492bf49675', '372c6c63-1d81-46e7-8c57-3a2dd5918add', 'hand-carved-silver-floral-relief-cuff-bracelet-salimsilver', 'The Quinity Floral Cuff: An Artisan Silver Statement', 'Artisan sterling silver cuff bracelet defined by five interlocking circles with intricate floral repoussé relief work. The design emphasizes the depth of the metal and fine craftsmanship.', 'silver', '925', NULL, NULL, NULL, 'available', NULL, '2025-12-08 07:57:03.52711+00', '2025-12-08 07:57:03.52711+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e'),
	('0eb1b852-2762-4363-baf3-56e270456aa5', '3fc15fb3-bffb-46c1-82c2-ebb3176902d8', 'antique-silver-kinangan-palembang-betel-set-salimsilver', 'Palembang Kinangan Ceremonial Silverware Set', 'A masterful example of traditional Palembang metalwork, this Kinangan betel nut set features an intricately crafted tiered design. The piece showcases exceptional repoussé and chasing techniques, with elaborate floral and geometric motifs covering the central basin and accompanying containers. The finials are delicate and tapered, adding vertical elegance to the silhouette. Crafted from high-polish silver with natural oxidation in the recesses, the set exudes a timeless, ceremonial grandeur indicative of its cultural heritage.', 'silver', '', NULL, NULL, NULL, 'available', NULL, '2025-12-10 05:14:22.800874+00', '2025-12-10 05:14:22.800874+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e'),
	('864ff9ad-4bfd-4d93-afcd-997f3f3ae370', '3fc15fb3-bffb-46c1-82c2-ebb3176902d8', 'silver-paksi-naga-liman-chariot-home-decor-salimsilver', 'Handcrafted Silver Paksi Naga Liman Chariot Decor"', 'An exquisite artisanal home decor piece representing the mythical Paksi Naga Liman chariot, sculpted from premium silver. The intricate design showcases a fusion of three legendary creatures: the elephant (Liman) trunk, the dragon (Naga) body, and the bird (Paksi) wings, all rendered in detailed relief. The chariot features ornate filigree patterns throughout the carriage and detailed spoked wheels, finished with a lustrous metallic sheen that accentuates the depth of the traditional craftsmanship.', 'silver', '', NULL, NULL, NULL, 'available', NULL, '2025-12-10 05:18:19.90913+00', '2025-12-10 05:18:19.90913+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e'),
	('90af6c73-7e1b-4a49-acdf-f239144b8ec4', '3fc15fb3-bffb-46c1-82c2-ebb3176902d8', 'antique-style-silver-garuda-pancasila-plate-salimsilver', 'Silver Plate with Intricate Garuda Pancasila Relief', 'A finely crafted silver decorative plate featuring a central medallion of the Indonesian Garuda Pancasila. The rim is heavily embellished with deep, repoussé-style floral motifs and scalloped edges, offering a rich texture and a brilliant, polished metallic finish that highlights the detailed craftsmanship.', 'silver', '', NULL, NULL, NULL, 'available', NULL, '2025-12-10 05:21:03.731032+00', '2025-12-10 05:21:03.731032+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e');


--
-- Data for Name: jewelry_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."jewelry_images" ("id", "jewelry_id", "src", "display_order", "created_at", "created_by") VALUES
	('37ac401b-4d4d-4e4d-9bbf-00b9b8900360', '44722374-e1ef-49f2-ba3c-412f00aba906', 'https://ckrypbqakgmeujbdmeks.supabase.co/storage/v1/object/public/catalog/baroque-pearl-citrine-silver-brooch.webp', 0, '2025-12-08 08:17:52.57366+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e'),
	('bb701707-cd4b-43b5-b55e-913f90b2de2e', 'e2651c43-0e53-4190-8c69-51a9ae90a857', 'https://ckrypbqakgmeujbdmeks.supabase.co/storage/v1/object/public/catalog/hand-carved-silver-moonstone-brooch-salimsilver.webp', 0, '2025-12-08 08:17:51.028981+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e'),
	('7bd1d0a8-93d0-4577-9835-e0814a18e6ec', '1cdd00b6-c259-4a48-9391-18dd59c14813', 'https://ckrypbqakgmeujbdmeks.supabase.co/storage/v1/object/public/catalog/hand-carved-silver-rings-couple-salimsilver.webp', 0, '2025-12-08 08:18:00.934976+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e'),
	('5468d733-b36e-4364-86ea-675075c8577f', '25262d5a-f84a-439e-8e61-000a2b3853a3', 'https://ckrypbqakgmeujbdmeks.supabase.co/storage/v1/object/public/catalog/hand-carved-silver-turquoise-ring-salimsilver.webp', 0, '2025-12-08 08:18:03.302005+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e'),
	('55306487-73ca-46d2-b36c-9df0097ee8bf', '464e0478-9919-4ad5-aa06-e90476c583c6', 'https://ckrypbqakgmeujbdmeks.supabase.co/storage/v1/object/public/catalog/silver-dragonfly-amethyst-drop-earrings-salimsilver.webp', 0, '2025-12-08 08:17:56.249017+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e'),
	('9c2603b5-1ea0-4224-82d7-75f511f494f6', '44a9a772-bb4f-4e64-aa94-c6d3d1fd71f5', 'https://ckrypbqakgmeujbdmeks.supabase.co/storage/v1/object/public/catalog/silver-filigree-ruby-cuff-bracelet-salimsilver.webp', 0, '2025-12-08 08:17:45.731499+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e'),
	('2f07f901-9e8b-44de-a3f7-a55451114741', '51265bbe-67cd-4a5a-9fe6-3cd9ace223db', 'https://ckrypbqakgmeujbdmeks.supabase.co/storage/v1/object/public/catalog/silver-gold-floral-lotus-brooch-salimsilver.webp', 0, '2025-12-08 08:17:48.943165+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e'),
	('7bbf1ba8-476e-41ea-aa41-5b0b09319115', '07bd01d7-a538-4439-8005-76bea8282c03', 'https://ckrypbqakgmeujbdmeks.supabase.co/storage/v1/object/public/catalog/silver-hibiscus-locket-purple-stone-pendant-necklace-salimsilver.webp', 0, '2025-12-08 08:17:57.445174+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e'),
	('4862a110-b11d-419e-81b0-937e8e17e78e', '9ec23dfc-920c-4a6c-a55f-7da702d25c8e', 'https://ckrypbqakgmeujbdmeks.supabase.co/storage/v1/object/public/catalog/silver-mamuli-earrings-salimsilver.webp', 0, '2025-12-08 08:17:55.051971+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e'),
	('281f2b00-57e9-441f-a30a-5ccbb6c8091a', '58836789-b114-41b3-816e-2b1c7c91697b', 'https://ckrypbqakgmeujbdmeks.supabase.co/storage/v1/object/public/catalog/silver-pagoda-ring-pearl-salimsilver.webp', 0, '2025-12-08 08:18:02.091748+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e'),
	('fb26441d-a0b3-4ee3-89d2-1839aa22c534', 'b7ff9279-ce35-49cb-ba55-9bb00969e2ef', 'https://ckrypbqakgmeujbdmeks.supabase.co/storage/v1/object/public/catalog/silver-pendant-labradorite-eye-dot-jewelry-salimsilver.webp', 0, '2025-12-08 08:17:58.545046+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e'),
	('0755f8fa-82e4-4713-b5e8-d83b93971321', '53c0aaaa-968d-4498-8979-4a3b850b087c', 'https://ckrypbqakgmeujbdmeks.supabase.co/storage/v1/object/public/catalog/silver-ruby-filigree-earrings-salimsilver.webp', 0, '2025-12-08 08:17:53.81142+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e'),
	('adf2a297-95f1-400c-90c9-37234323cd4d', '4872ba9e-01ca-434e-af60-726baa474cd5', 'https://ckrypbqakgmeujbdmeks.supabase.co/storage/v1/object/public/catalog/silver-seahorse-charm-bracelet-salimsilver.webp', 0, '2025-12-08 08:17:47.325928+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e'),
	('61b30065-4117-4664-90c1-942b48c86d33', 'c67c03ca-5dbe-4279-9043-b2c381c2122d', 'https://ckrypbqakgmeujbdmeks.supabase.co/storage/v1/object/public/catalog/silver-seahorse-pendant-amber-salimsilver.webp', 0, '2025-12-08 08:17:59.793412+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e'),
	('e9b19fed-ed63-474c-aa54-670b58a7378d', 'accc8ec5-36a7-4604-bff9-8b492bf49675', 'https://ckrypbqakgmeujbdmeks.supabase.co/storage/v1/object/public/catalog/hand-carved-silver-floral-relief-cuff-bracelet-salimsilver.webp', 0, '2025-12-08 08:57:45.615337+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e'),
	('6a6a1f5a-5e11-4124-b0dd-0e7aa278e37d', '0eb1b852-2762-4363-baf3-56e270456aa5', 'https://ckrypbqakgmeujbdmeks.supabase.co/storage/v1/object/public/catalog/0eb1b852-2762-4363-baf3-56e270456aa5/1765343720627.webp', 1, '2025-12-10 05:15:23.759331+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e'),
	('a08aa306-0341-4fc9-ad97-e5c73249044b', '864ff9ad-4bfd-4d93-afcd-997f3f3ae370', 'https://ckrypbqakgmeujbdmeks.supabase.co/storage/v1/object/public/catalog/864ff9ad-4bfd-4d93-afcd-997f3f3ae370/1765343924999.webp', 0, '2025-12-10 05:18:48.35032+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e'),
	('93b7762f-6a2c-433f-b69f-c17acce349c0', '90af6c73-7e1b-4a49-acdf-f239144b8ec4', 'https://ckrypbqakgmeujbdmeks.supabase.co/storage/v1/object/public/catalog/90af6c73-7e1b-4a49-acdf-f239144b8ec4/1765344093685.webp', 0, '2025-12-10 05:21:36.791091+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."users" ("id", "full_name", "avatar_url", "email", "role", "created_at", "updated_at") VALUES
	('c815afc1-3f72-4a58-a4d6-0b475433c58e', 'Priyo Salim', 'https://ckrypbqakgmeujbdmeks.supabase.co/storage/v1/object/public/blog/priyo-s.webp', 'salimsilver925@gmail.com', 'admin', '2025-12-16 04:10:40.040199+00', '2025-12-16 04:10:40.040199+00'),
	('da94210b-5152-497a-8634-3fc5b3b0178c', 'Aditya Cahyo', 'https://ckrypbqakgmeujbdmeks.supabase.co/storage/v1/object/public/blog/aditya-c.webp', 'bat.bane@gmail.com', 'admin', '2026-01-09 04:18:38.793784+00', '2026-01-09 04:18:38.793784+00'),
	('975d5e46-7a11-46a8-833a-da92ba8162c0', 'Wangi Galuh', 'https://ckrypbqakgmeujbdmeks.supabase.co/storage/v1/object/public/blog/wangi-g.webp', 'wangiglue@gmail.com', 'admin', '2025-12-16 07:33:45.514183+00', '2025-12-16 07:33:45.514183+00');


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."posts" ("id", "slug", "title", "excerpt", "content", "cover_image_url", "meta_title", "meta_description", "published", "published_at", "tags", "featured", "author_id", "created_at", "updated_at") VALUES
	('50dd831f-157b-4f97-87c7-1774e4b206ba', 'art-of-javanese-silver', 'The Art of Javanese Silver Crafting', 'Discover the intricate process behind our handmade silver jewelry, passed down through generations in Kotagede.', '<h2>A Legacy of Craftsmanship</h2><p>In the heart of Kotagede, the ancient capital of the Mataram Kingdom, the rhythmic tapping of small hammers against silver has echoed for centuries. This is where <strong>Salim Silver</strong> finds its roots.</p><p>Javanese silver crafting is distinct for its focus on <em>filigree</em> (intricate metalwork) and deep relief carving. Unlike mass-produced jewelry, each piece tells a story of patience and precision.</p><h3>The Process</h3><ul><li><p><strong>Purification:</strong> We start with high-purity silver granules.</p></li><li><p><strong>Alloying:</strong> Mixing with copper to create durable Sterling Silver (925).</p></li><li><p><strong>Formation:</strong> Drawing silver into fine wires for filigree or sheets for carving.</p></li><li><p><strong>Assembly:</strong> Each element is soldered by hand using traditional techniques.</p></li></ul><p>When you wear a piece of Javanese silver, you are wearing a piece of history, preserved by the hands of our master artisans.</p>', 'https://twipnraxqejrjpfjoeyx.supabase.co/storage/v1/object/public/catalog/hand-carved-silver-rings-couple-salimsilver.webp', 'The Art of Javanese Silver Crafting | Salim Silver', 'Discover the intricate process behind our handmade silver jewelry, passed down through generations in Kotagede.', false, '2025-12-16 08:42:11.915+00', '{Culture,Craftsmanship}', true, 'c815afc1-3f72-4a58-a4d6-0b475433c58e', '2025-12-16 01:44:02.33202+00', '2026-01-09 07:39:04.357+00'),
	('3bdc42ab-d244-4528-9410-2026a4255768', 'rekor-perak-pecah-rekor-panduan-pantau-harga-real-time-dalam-rupiah', 'Harga Perak Pecah Rekor: Panduan Pantau Harga Real-Time dalam Rupiah', 'Di tengah lonjakan harga perak dunia yang mencatatkan rekor tertinggi sepanjang masa (ATH) dengan kenaikan 160% sejak awal 2025, Salim Silver menghadirkan solusi berupa fitur Halaman Live Harga Perak dalam Rupiah (IDR) per gram untuk memudahkan investor Indonesia. Ketegangan geopolitik global telah mendorong harga perak menembus level signifikan, namun volatilitas yang tinggi menuntut akses data yang cepat dan akurat. Fitur terbaru dari Salim Silver ini menjawab kebutuhan pasar akan informasi harga perak real-time yang relevan dengan transaksi lokal, sehingga para kolektor dan investor dapat mengambil keputusan strategis secara instan tanpa perlu repot melakukan konversi kurs manual atau tertinggal momentum pasar.', '<p>Belakangan ini, pasar logam mulia dunia sedang memanas dengan harga perak yang mencatatkan rekor tertinggi sepanjang masa (All-Time High). Data terbaru menunjukkan lonjakan nilai yang luar biasa, mencapai kenaikan hampir 160% sejak awal tahun 2025. Bahkan dalam satu bulan terakhir saja, tercatat pertumbuhan lebih dari 30%. Sentimen ini sebagian besar didorong oleh meningkatnya ketegangan geopolitik global, seperti friksi antara Amerika Serikat dan Venezuela, yang memicu gelombang permintaan investor terhadap aset "safe-haven" atau pelindung nilai.<br><br>Volatilitas pasar pun sangat terasa. Sempat menyentuh level tertinggi, harga perak sempat mengalami koreksi sedikit di bawah level $80 per troy ounce pada awal Januari, sebuah pergerakan yang memutus tren kenaikan beruntun selama beberapa hari. Rick Kanda, Managing Director dari The Gold Bullion Company, menyoroti bahwa meskipun perak memiliki volatilitas yang lebih tinggi dibandingkan emas karena besarnya permintaan industri dan ukuran pasar yang lebih kecil, perak tetap menjadi titik masuk investasi yang sangat menarik. Harganya yang lebih terjangkau dibandingkan emas menjadikannya pilihan strategis bagi investor pemula maupun kolektor yang ingin melakukan diversifikasi portofolio sekaligus lindung nilai terhadap inflasi.<br><br>Namun, di tengah antusiasme dan pergerakan harga yang cepat ini, ada satu kendala yang sering dialami oleh masyarakat Indonesia: sulitnya mencari sumber informasi harga perak yang akurat, relevan, dan <em>real-time</em>.<br><br>Mayoritas referensi harga perak dunia disajikan dalam mata uang Dolar AS (USD) per troy ounce. Bagi kita yang bertransaksi di pasar lokal, konversi manual ke Rupiah (IDR) per gram seringkali membingungkan karena fluktuasi kurs mata uang yang juga bergerak setiap detik. Selain itu, banyak situs lokal yang menyajikan harga perak namun dengan pembaruan data yang lambat—terkadang hanya diperbarui sekali sehari. Padahal, di saat volatilitas tinggi seperti sekarang dimana harga bisa berubah drastis dalam hitungan jam, keterlambatan informasi bisa berarti hilangnya peluang.<br><br>Menjawab kebutuhan tersebut, Salim Silver kini menghadirkan fitur baru di situs web kami: Halaman Live Harga Perak.<br><br>Kami memahami bahwa transparansi dan kecepatan data adalah kunci. Oleh karena itu, halaman ini dirancang khusus untuk menyajikan:</p><ol><li><p>1. <strong>Harga Perak dalam Rupiah (IDR)</strong>: Tidak perlu lagi repot menghitung kurs sendiri.</p></li><li><p>2. <strong>Satuan Gram</strong>: Satuan yang paling umum digunakan dalam transaksi perhiasan dan batangan di Indonesia.</p></li><li><p>3. <strong>Update Berkala</strong>: Data harga yang diperbarui secara otomatis dan sering (real-time/near real-time), sehingga Anda tidak akan tertinggal momentum pasar.</p></li><li><p><br></p></li><li><p>Entah Anda sedang merencanakan untuk menambah koleksi perhiasan perak Salim Silver, atau sekadar memantau nilai aset Anda di tengah tren kenaikan harga saat ini, halaman ini akan menjadi referensi andalan Anda.<br><br>Jangan sampai terlewat momen penting di pasar perak. Cek harga perak terkini, akurat, dan terpercaya langsung di website Salim Silver.<br><br><a target="_blank" rel="noopener noreferrer nofollow" class="text-primary underline hover:text-primary/80" href="https://salimsilver.com/silver-price">Kunjungi Halaman Harga Perak</a></p></li></ol><p></p>', 'https://ckrypbqakgmeujbdmeks.supabase.co/storage/v1/object/public/blog/blog/1767944220100-GeminiGeneratedImagehrtabbhrtabbhrta.webp', 'Harga Perak Pecah Rekor: Panduan Pantau Harga Real-Time dalam Rupiah | Salim Silver', 'Di tengah lonjakan harga perak dunia yang mencatatkan rekor tertinggi sepanjang masa (ATH) dengan kenaikan 160% sejak awal 2025, Salim Silver menghadirkan solusi berupa fitur Halaman Live Harga Perak dalam Rupiah (IDR) per gram untuk memudahkan investor Indonesia. Ketegangan geopolitik global telah mendorong harga perak menembus level signifikan, namun volatilitas yang tinggi menuntut akses data yang cepat dan akurat. Fitur terbaru dari Salim Silver ini menjawab kebutuhan pasar akan informasi harga perak real-time yang relevan dengan transaksi lokal, sehingga para kolektor dan investor dapat mengambil keputusan strategis secara instan tanpa perlu repot melakukan konversi kurs manual atau tertinggal momentum pasar.', true, '2026-01-09 07:37:13.942+00', '{"silver price","harga perak rupiah","rekor harga perak"}', false, 'da94210b-5152-497a-8634-3fc5b3b0178c', '2026-01-09 07:37:03.767585+00', NULL);


--
-- Data for Name: silver_price_summary; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."silver_price_summary" ("id", "price_idr", "price_24h_ago", "price_7d_ago", "price_30d_ago", "price_1y_ago", "updated_at") VALUES
	(1, 42251829, 40740869, 39899354, NULL, NULL, '2026-01-09 12:00:03.772+00');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id", "type") VALUES
	('blog', 'blog', NULL, '2025-12-16 01:44:02.33202+00', '2025-12-16 01:44:02.33202+00', true, false, NULL, NULL, NULL, 'STANDARD'),
	('catalog', 'catalog', NULL, '2025-12-16 01:57:48.396204+00', '2025-12-16 01:57:48.396204+00', true, false, NULL, NULL, NULL, 'STANDARD');


--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_vectors; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."objects" ("id", "bucket_id", "name", "owner", "created_at", "updated_at", "last_accessed_at", "metadata", "version", "owner_id", "user_metadata", "level") VALUES
	('dc657431-9972-4a36-9713-73e20ab0162e', 'catalog', '0eb1b852-2762-4363-baf3-56e270456aa5/1765343720627.webp', NULL, '2025-12-16 01:57:51.157327+00', '2025-12-16 01:57:51.157327+00', '2025-12-16 01:57:51.157327+00', '{"eTag": "\"208a6faeddd6e651a50e4bbcac169f99\"", "size": 664888, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-16T01:57:52.000Z", "contentLength": 664888, "httpStatusCode": 200}', 'fcb2e95c-dfc5-4d87-858e-4e7ec4e5e7ef', NULL, '{}', 2),
	('892ffdd3-9e22-4240-ac5e-491c970b0553', 'catalog', '864ff9ad-4bfd-4d93-afcd-997f3f3ae370/1765343924999.webp', NULL, '2025-12-16 01:57:52.76352+00', '2025-12-16 01:57:52.76352+00', '2025-12-16 01:57:52.76352+00', '{"eTag": "\"c445917bf3403768cf19211195a4c8d3\"", "size": 600206, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-16T01:57:53.000Z", "contentLength": 600206, "httpStatusCode": 200}', 'd6cd2760-54dd-4ada-9163-d37a6ffce335', NULL, '{}', 2),
	('3dea13b7-4639-44b9-a09f-6b1fedc77d01', 'catalog', '90af6c73-7e1b-4a49-acdf-f239144b8ec4/1765344093685.webp', NULL, '2025-12-16 01:57:54.914983+00', '2025-12-16 01:57:54.914983+00', '2025-12-16 01:57:54.914983+00', '{"eTag": "\"94a9cf774755c6e2528beadeabd2271d\"", "size": 629414, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-16T01:57:55.000Z", "contentLength": 629414, "httpStatusCode": 200}', 'ab2b6518-219c-4fa2-b8dd-750bb04efc2a', NULL, '{}', 2),
	('7fe627a1-aa7f-4d9e-830d-9a788c761a79', 'catalog', 'baroque-pearl-citrine-silver-brooch.webp', NULL, '2025-12-16 01:57:56.280978+00', '2025-12-16 01:57:56.280978+00', '2025-12-16 01:57:56.280978+00', '{"eTag": "\"37eba633f445989e45c33429b40bb587\"", "size": 288812, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-16T01:57:57.000Z", "contentLength": 288812, "httpStatusCode": 200}', '2209082f-ed1d-4775-a4e2-f683807d5714', NULL, '{}', 1),
	('a73ac259-77aa-4e5d-8e05-5e5fe57d250b', 'catalog', 'hand-carved-silver-floral-relief-cuff-bracelet-salimsilver.webp', NULL, '2025-12-16 01:57:57.586001+00', '2025-12-16 01:57:57.586001+00', '2025-12-16 01:57:57.586001+00', '{"eTag": "\"9207173cade628952ec4be945eb69d01\"", "size": 297872, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-16T01:57:58.000Z", "contentLength": 297872, "httpStatusCode": 200}', 'b70a07dc-6a1c-4ec5-9094-1a89b1f16a82', NULL, '{}', 1),
	('4aaa587b-8160-4e5a-9ffb-9eff7e428c8f', 'catalog', 'hand-carved-silver-moonstone-brooch-salimsilver.webp', NULL, '2025-12-16 01:57:58.689649+00', '2025-12-16 01:57:58.689649+00', '2025-12-16 01:57:58.689649+00', '{"eTag": "\"e193d2391d78f1a69bc7c71e2378e266\"", "size": 272214, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-16T01:57:59.000Z", "contentLength": 272214, "httpStatusCode": 200}', 'dd4b6e27-5062-4abd-ab7b-cb2081bce219', NULL, '{}', 1),
	('9a6ecf85-7cd9-4b47-a7d9-e23c8c464d5d', 'catalog', 'hand-carved-silver-pearl-brooch-salimsilver.webp', NULL, '2025-12-16 01:58:01.179539+00', '2025-12-16 01:58:01.179539+00', '2025-12-16 01:58:01.179539+00', '{"eTag": "\"83232371b5614edfb2a2c894cd870de1\"", "size": 233966, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-16T01:58:02.000Z", "contentLength": 233966, "httpStatusCode": 200}', '404489e3-a8a7-435c-a544-e29de02a4280', NULL, '{}', 1),
	('8a77a470-1931-440e-a034-16c292581662', 'catalog', 'hand-carved-silver-rings-couple-salimsilver.webp', NULL, '2025-12-16 01:58:02.341297+00', '2025-12-16 01:58:02.341297+00', '2025-12-16 01:58:02.341297+00', '{"eTag": "\"dccf1f21179d94478f5d0e68c88bba2f\"", "size": 306422, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-16T01:58:03.000Z", "contentLength": 306422, "httpStatusCode": 200}', '7f74f625-e1d7-4539-b5de-77b667de25f5', NULL, '{}', 1),
	('d6a2bc5e-15bf-4042-bb09-cae41da13666', 'catalog', 'hand-carved-silver-turquoise-ring-salimsilver.webp', NULL, '2025-12-16 01:58:03.506292+00', '2025-12-16 01:58:03.506292+00', '2025-12-16 01:58:03.506292+00', '{"eTag": "\"ad9153aa8cad7644d9811ee6365c8a66\"", "size": 284190, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-16T01:58:04.000Z", "contentLength": 284190, "httpStatusCode": 200}', 'fb6f0190-35f0-4335-9a6e-63b6d647972a', NULL, '{}', 1),
	('1dc1d5dd-6592-47f7-a9da-6dbe2ba3595c', 'catalog', 'silver-dragonfly-amethyst-drop-earrings-salimsilver.webp', NULL, '2025-12-16 01:58:04.842885+00', '2025-12-16 01:58:04.842885+00', '2025-12-16 01:58:04.842885+00', '{"eTag": "\"bebd06251455c7336e45e629c239818c\"", "size": 478846, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-16T01:58:05.000Z", "contentLength": 478846, "httpStatusCode": 200}', '13eae940-5abb-4631-b0c6-2a41b164e7e1', NULL, '{}', 1),
	('e444c2b1-49c7-4fa7-b6fe-00ae6fbbe7cf', 'catalog', 'silver-filigree-ruby-cuff-bracelet-salimsilver.webp', NULL, '2025-12-16 01:58:06.080248+00', '2025-12-16 01:58:06.080248+00', '2025-12-16 01:58:06.080248+00', '{"eTag": "\"53d70a18af9196d2cd57c37ce4868da0\"", "size": 345638, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-16T01:58:07.000Z", "contentLength": 345638, "httpStatusCode": 200}', 'ee53c698-3b98-4487-a7a9-b1574148074f', NULL, '{}', 1),
	('da444bcf-0f83-4c7e-a52f-ce4797296be3', 'catalog', 'silver-gold-floral-lotus-brooch-salimsilver.webp', NULL, '2025-12-16 01:58:07.397482+00', '2025-12-16 01:58:07.397482+00', '2025-12-16 01:58:07.397482+00', '{"eTag": "\"d24b01df760e4357bdc9643d537d8829\"", "size": 409160, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-16T01:58:08.000Z", "contentLength": 409160, "httpStatusCode": 200}', '477638a9-7277-4540-b302-658f4df22d35', NULL, '{}', 1),
	('cdfa2a60-34e3-4cf2-9f9b-cce0db602441', 'catalog', 'silver-hibiscus-locket-purple-stone-pendant-necklace-salimsilver.webp', NULL, '2025-12-16 01:58:08.651315+00', '2025-12-16 01:58:08.651315+00', '2025-12-16 01:58:08.651315+00', '{"eTag": "\"c022b88f5fefade49cfffe683f343fc9\"", "size": 287996, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-16T01:58:09.000Z", "contentLength": 287996, "httpStatusCode": 200}', '7677e493-9578-45ba-a68a-f0aada2eedfa', NULL, '{}', 1),
	('068de96d-0b5f-4a4f-95e0-89adc7b4d000', 'catalog', 'silver-mamuli-earrings-salimsilver.webp', NULL, '2025-12-16 01:58:09.841503+00', '2025-12-16 01:58:09.841503+00', '2025-12-16 01:58:09.841503+00', '{"eTag": "\"dd275be4d9947914bfede62e8d253604\"", "size": 253346, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-16T01:58:10.000Z", "contentLength": 253346, "httpStatusCode": 200}', '15cbd700-c9d4-4c42-88b3-5198b43c3ee3', NULL, '{}', 1),
	('1c1ca3cf-f25b-4f1f-90c6-4f54e20b7a1d', 'catalog', 'silver-pagoda-ring-pearl-salimsilver.webp', NULL, '2025-12-16 01:58:11.000313+00', '2025-12-16 01:58:11.000313+00', '2025-12-16 01:58:11.000313+00', '{"eTag": "\"3c591401fb71a52f3655ec1a327c569f\"", "size": 240960, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-16T01:58:11.000Z", "contentLength": 240960, "httpStatusCode": 200}', 'd2441917-bc7b-401e-a39d-79e9905e916c', NULL, '{}', 1),
	('e37b8873-913e-4cc5-b67c-2ab83c91206c', 'catalog', 'silver-pendant-labradorite-eye-dot-jewelry-salimsilver.webp', NULL, '2025-12-16 01:58:12.214695+00', '2025-12-16 01:58:12.214695+00', '2025-12-16 01:58:12.214695+00', '{"eTag": "\"aecac1db6ca0360233ae03e4a26604cf\"", "size": 372170, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-16T01:58:13.000Z", "contentLength": 372170, "httpStatusCode": 200}', '86b5ec8b-f7eb-4517-90e6-dba369eedbc7', NULL, '{}', 1),
	('97b5ac7a-84e6-4166-b91f-af6a76087ab2', 'catalog', 'silver-ruby-filigree-earrings-salimsilver.webp', NULL, '2025-12-16 01:58:13.332983+00', '2025-12-16 01:58:13.332983+00', '2025-12-16 01:58:13.332983+00', '{"eTag": "\"42aab3549d8bfb2aa554bec8e9141a17\"", "size": 230228, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-16T01:58:14.000Z", "contentLength": 230228, "httpStatusCode": 200}', '463ca99c-b572-419a-b28e-021628d2f7a4', NULL, '{}', 1),
	('cf4364ba-0b5f-4cd8-beb1-cf5490363fdd', 'catalog', 'silver-seahorse-charm-bracelet-salimsilver.webp', NULL, '2025-12-16 01:58:14.599087+00', '2025-12-16 01:58:14.599087+00', '2025-12-16 01:58:14.599087+00', '{"eTag": "\"8dd0eb3f7455c94398acb5a1f9a00339\"", "size": 331542, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-16T01:58:15.000Z", "contentLength": 331542, "httpStatusCode": 200}', '9988eb0a-b641-42ed-9abd-2169a415c674', NULL, '{}', 1),
	('2c1e8667-7a98-40c4-9b10-4a8f203f041a', 'catalog', 'silver-seahorse-pendant-amber-salimsilver.webp', NULL, '2025-12-16 01:58:15.817054+00', '2025-12-16 01:58:15.817054+00', '2025-12-16 01:58:15.817054+00', '{"eTag": "\"c0687527dcf8cc975bd58963c5a31ac0\"", "size": 260904, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-16T01:58:16.000Z", "contentLength": 260904, "httpStatusCode": 200}', 'f2623246-4760-4d35-b541-04f0c2d57901', NULL, '{}', 1),
	('832ad305-3c4d-4925-b961-8d31e6b2312d', 'blog', 'blog/1767944220100-GeminiGeneratedImagehrtabbhrtabbhrta.webp', 'da94210b-5152-497a-8634-3fc5b3b0178c', '2026-01-09 07:37:00.633296+00', '2026-01-09 07:37:00.633296+00', '2026-01-09 07:37:00.633296+00', '{"eTag": "\"02460893a7bf01db199e7f08493eeee6\"", "size": 163420, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-01-09T07:37:01.000Z", "contentLength": 163420, "httpStatusCode": 200}', '64ec493e-d444-4845-836b-32618c3a6f22', 'da94210b-5152-497a-8634-3fc5b3b0178c', '{}', 2),
	('e0779db7-b97c-4583-93b8-46bb0fcd026c', 'blog', 'priyo-s.webp', NULL, '2026-01-09 11:14:48.451059+00', '2026-01-09 11:14:48.451059+00', '2026-01-09 11:14:48.451059+00', '{"eTag": "\"0387a33d9d089d82a2955a54299c8aac-1\"", "size": 5944, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-01-09T11:14:49.000Z", "contentLength": 5944, "httpStatusCode": 200}', '652e783a-400f-47fa-8bfa-1875d906267f', NULL, NULL, 1),
	('5743c436-fccb-4eaa-9352-60257f01a601', 'blog', 'aditya-c.webp', NULL, '2026-01-09 11:14:48.480172+00', '2026-01-09 11:14:48.480172+00', '2026-01-09 11:14:48.480172+00', '{"eTag": "\"3d37d210adea9bd6bcfb4198e2ed6fdb-1\"", "size": 9284, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-01-09T11:14:49.000Z", "contentLength": 9284, "httpStatusCode": 200}', '11c0ae50-029e-483d-a943-40cc399af1da', NULL, NULL, 1),
	('b9402c98-283e-4f87-9f2d-36a52a8b9942', 'blog', 'wangi-g.webp', NULL, '2026-01-09 11:26:49.453344+00', '2026-01-09 11:26:49.453344+00', '2026-01-09 11:26:49.453344+00', '{"eTag": "\"45e62633bf215cc85606a7a67b2f8f72-1\"", "size": 7920, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-01-09T11:26:50.000Z", "contentLength": 7920, "httpStatusCode": 200}', 'd211b995-0f13-4008-ae92-15e94fe14fc0', NULL, NULL, 1);


--
-- Data for Name: prefixes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."prefixes" ("bucket_id", "name", "created_at", "updated_at") VALUES
	('catalog', '0eb1b852-2762-4363-baf3-56e270456aa5', '2025-12-16 01:57:51.157327+00', '2025-12-16 01:57:51.157327+00'),
	('catalog', '864ff9ad-4bfd-4d93-afcd-997f3f3ae370', '2025-12-16 01:57:52.76352+00', '2025-12-16 01:57:52.76352+00'),
	('catalog', '90af6c73-7e1b-4a49-acdf-f239144b8ec4', '2025-12-16 01:57:54.914983+00', '2025-12-16 01:57:54.914983+00'),
	('blog', 'blog', '2026-01-09 07:12:07.591224+00', '2026-01-09 07:12:07.591224+00');


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: vector_indexes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 93, true);


--
-- PostgreSQL database dump complete
--

-- \unrestrict DMUB1qFAEmQoCE8VObxKjDkFmEBfWIztlLLpohaboM0KFQ86mOd7mga6ySgQShx

RESET ALL;
