SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict A3UGYsQkhlp3HhplaBc5NWD2l10EZmaPMVWFcx9fVmk6JUxLMkv7N1JeAXZjgA0

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



--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



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
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



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
-- Data for Name: collections; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."collections" ("id", "slug", "title", "description", "cover_image_id", "featured", "created_at", "updated_at") VALUES
	('0c3a39ae-9f0c-423d-8baf-5a0166c105c0', 'rings', 'Rings', 'Handcrafted silver rings', '7bd1d0a8-93d0-4577-9835-e0814a18e6ec', true, '2025-12-08 07:56:58.61044+00', '2025-12-08 07:56:58.61044+00'),
	('2cc56012-a490-4c33-9f31-9139eb984fe6', 'pendants', 'Pendants', 'Artisan silver pendants', '7bbf1ba8-476e-41ea-aa41-5b0b09319115', true, '2025-12-08 07:57:00.982488+00', '2025-12-08 07:57:00.982488+00'),
	('372c6c63-1d81-46e7-8c57-3a2dd5918add', 'bracelets', 'Bracelets', 'Artisan silver bracelets', '9c2603b5-1ea0-4224-82d7-75f511f494f6', true, '2025-12-08 07:57:03.008148+00', '2025-12-08 07:57:03.008148+00'),
	('26982604-8d84-4a7e-80ce-b80b2ac58544', 'brooches', 'Brooches', 'Elegant silver brooches', '2f07f901-9e8b-44de-a3f7-a55451114741', false, '2025-12-08 07:57:05.135324+00', '2025-12-08 07:57:05.135324+00'),
	('3e75b39a-f602-4e34-ac9d-f0dbb35c5264', 'earrings', 'Earrings', 'Handcrafted silver earrings', '55306487-73ca-46d2-b36c-9df0097ee8bf', false, '2025-12-08 07:57:07.115256+00', '2025-12-08 07:57:07.115256+00');


--
-- Data for Name: jewelry; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."jewelry" ("id", "collection_id", "slug", "title", "description", "material", "material_purity", "weight_grams", "crafting_time_hours", "production_year", "status", "variants", "created_at", "updated_at") VALUES
	('1cdd00b6-c259-4a48-9391-18dd59c14813', '0c3a39ae-9f0c-423d-8baf-5a0166c105c0', 'hand-carved-silver-rings-couple-salimsilver', 'The Carved Couple: Artisan Carved Silver & White Gemstone Rings', 'Hand-carved sterling silver rings featuring deep, oxidized organic vine engravings and bezel-set clear gemstones.', 'silver', '925', NULL, NULL, NULL, 'available', '[{"type": "Size", "options": ["6", "7", "8", "9"]}]', '2025-12-08 07:56:58.889657+00', '2025-12-08 07:56:58.889657+00'),
	('58836789-b114-41b3-816e-2b1c7c91697b', '0c3a39ae-9f0c-423d-8baf-5a0166c105c0', 'silver-pagoda-ring-pearl-salimsilver', 'The Sanctuary: Sterling Silver Pagoda Ring with Pearl Finial', 'Sculptural silver ring crafted in the shape of a miniature tiered pagoda with intricate metalwork, tiled roofing, and window cutouts, crowned with a lustrous peach pearl.', 'silver', '925', NULL, NULL, NULL, 'available', NULL, '2025-12-08 07:56:59.273154+00', '2025-12-08 07:56:59.273154+00'),
	('25262d5a-f84a-439e-8e61-000a2b3853a3', '0c3a39ae-9f0c-423d-8baf-5a0166c105c0', 'hand-carved-silver-turquoise-ring-salimsilver', 'The Verde Filigree: An Artisanal Silver and Turquoise Statement Ring', 'Substantial silver ring set with three round turquoise cabochons, featuring intricate floral filigree and an aged patina.', 'silver', '925', NULL, NULL, NULL, 'available', NULL, '2025-12-08 07:56:59.619476+00', '2025-12-08 07:56:59.619476+00'),
	('07bd01d7-a538-4439-8005-76bea8282c03', '2cc56012-a490-4c33-9f31-9139eb984fe6', 'silver-hibiscus-locket-purple-stone-pendant-necklace-salimsilver', 'The Hibiscus Locket: A Hand Carved Silver Statement Piece', 'Open silver locket featuring intricate hibiscus floral engravings and a deep purple stone.', 'silver', '925', NULL, NULL, NULL, 'available', NULL, '2025-12-08 07:57:01.227791+00', '2025-12-08 07:57:01.227791+00'),
	('b7ff9279-ce35-49cb-ba55-9bb00969e2ef', '2cc56012-a490-4c33-9f31-9139eb984fe6', 'silver-pendant-labradorite-eye-dot-jewelry-salimsilver', 'The Celestial Shield: Granulated Silver Pendant with Labradorite Eye', 'Handcrafted sterling silver pendant featuring a circular ''shield'' design with intricate granulation beads radiating from a central, bezel-set labradorite stone. The silver boasts a rich antique finish.', 'silver', '925', NULL, NULL, NULL, 'available', NULL, '2025-12-08 07:57:01.622288+00', '2025-12-08 07:57:01.622288+00'),
	('c67c03ca-5dbe-4279-9043-b2c381c2122d', '2cc56012-a490-4c33-9f31-9139eb984fe6', 'silver-seahorse-pendant-amber-salimsilver', 'The Maritime Dual: Artisan Silver Seahorse Pendant', 'Intricate silver double-seahorse pendant featuring amber and green gemstone accents with detailed metal texture.', 'silver', '925', NULL, NULL, NULL, 'available', NULL, '2025-12-08 07:57:01.985765+00', '2025-12-08 07:57:01.985765+00'),
	('44a9a772-bb4f-4e64-aa94-c6d3d1fd71f5', '372c6c63-1d81-46e7-8c57-3a2dd5918add', 'silver-filigree-ruby-cuff-bracelet-salimsilver', 'The Filigree Sunburst Cuff: An Artisan Statement Piece with Ruby', 'Handcrafted silver filigree cuff bracelet featuring a large, hammered silver disc with an intricate central filigree pattern and a deep red ruby gemstone. The openwork band is adorned with delicate silver scrollwork.', 'silver', '925', NULL, NULL, NULL, 'available', NULL, '2025-12-08 07:57:03.274324+00', '2025-12-08 07:57:03.274324+00'),
	('accc8ec5-36a7-4604-bff9-8b492bf49675', '372c6c63-1d81-46e7-8c57-3a2dd5918add', 'hand-carved-silver-floral-relief-cuff-bracelet-salimsilver', 'The Trinity Floral Cuff: An Artisan Silver Statement', 'Artisan sterling silver cuff bracelet defined by three interlocking circles with intricate floral repoussé relief work. The design emphasizes the depth of the metal and fine craftsmanship.', 'silver', '925', NULL, NULL, NULL, 'available', NULL, '2025-12-08 07:57:03.52711+00', '2025-12-08 07:57:03.52711+00'),
	('4872ba9e-01ca-434e-af60-726baa474cd5', '372c6c63-1d81-46e7-8c57-3a2dd5918add', 'silver-seahorse-charm-bracelet-salimsilver', 'The Coastal Artisan: A Silver Seahorse Charm Bracelet', 'Silver seahorse charm bracelet with metallic texture and intricate detailing on the charms and chain. A piece that evokes an artisanal and luxurious feel.', 'silver', '925', NULL, NULL, NULL, 'available', NULL, '2025-12-08 07:57:03.935109+00', '2025-12-08 07:57:03.935109+00'),
	('51265bbe-67cd-4a5a-9fe6-3cd9ace223db', '26982604-8d84-4a7e-80ce-b80b2ac58544', 'silver-gold-floral-lotus-brooch-salimsilver', 'The Gilded Bloom: Silver and Gold Lotus Flower Brooch', 'Two-tone floral brooch with a textured gold top layer of petals over a silver base, featuring a detailed beaded center.', 'silver', '925', NULL, NULL, NULL, 'available', NULL, '2025-12-08 07:57:05.477707+00', '2025-12-08 07:57:05.477707+00'),
	('e2651c43-0e53-4190-8c69-51a9ae90a857', '26982604-8d84-4a7e-80ce-b80b2ac58544', 'hand-carved-silver-moonstone-brooch-salimsilver', 'The Moonlit Hand Carved: An Artisan Silver Moonstone Brooch', 'Ornate silver brooch with a central moonstone cabochon and intricate metalwork.', 'silver', '925', NULL, NULL, NULL, 'available', NULL, '2025-12-08 07:57:05.773946+00', '2025-12-08 07:57:05.773946+00'),
	('44722374-e1ef-49f2-ba3c-412f00aba906', '26982604-8d84-4a7e-80ce-b80b2ac58544', 'baroque-pearl-citrine-silver-brooch', 'The Luminous Baroque: Artisan Pearl and Citrine Brooch', 'Handcrafted silver brooch featuring lustrous baroque pearls and faceted yellow citrine gemstones arranged in an intricate, swirling floral motif.', 'silver', '925', NULL, NULL, NULL, 'available', NULL, '2025-12-08 07:57:06.08118+00', '2025-12-08 07:57:06.08118+00'),
	('53c0aaaa-968d-4498-8979-4a3b850b087c', '3e75b39a-f602-4e34-ac9d-f0dbb35c5264', 'silver-ruby-filigree-earrings-salimsilver', 'Golden Hour Embrace: Organic Amber Filigree Earrings', 'Gold organic-shaped earrings with amber gemstones. The design highlights the metallic sheen and organic forms.', 'silver', '925', NULL, NULL, NULL, 'available', '[{"type": "Size", "options": ["6", "7", "8", "9"]}]', '2025-12-08 07:57:07.424579+00', '2025-12-08 07:57:07.424579+00'),
	('9ec23dfc-920c-4a6c-a55f-7da702d25c8e', '3e75b39a-f602-4e34-ac9d-f0dbb35c5264', 'silver-mamuli-earrings-salimsilver', 'The Hand Carved Mamuli: Handcrafted Silver Spiral Earrings', 'Handcrafted silver Mamuli earrings featuring hammered textures and spiral motifs.', 'silver', '925', NULL, NULL, NULL, 'available', '[{"type": "Size", "options": ["6", "7", "8", "9"]}]', '2025-12-08 07:57:07.71584+00', '2025-12-08 07:57:07.71584+00'),
	('464e0478-9919-4ad5-aa06-e90476c583c6', '3e75b39a-f602-4e34-ac9d-f0dbb35c5264', 'silver-dragonfly-amethyst-drop-earrings-salimsilver', 'The Twilight Garden: Silver Dragonfly & Amethyst Earrings', 'Intricate sterling silver drop earrings with a floral stud and dragonfly motif, anchored by a deep purple amethyst.', 'silver', '925', NULL, NULL, NULL, 'available', '[{"type": "Size", "options": ["6", "7", "8", "9"]}]', '2025-12-08 07:57:07.969418+00', '2025-12-08 07:57:07.969418+00');


--
-- Data for Name: jewelry_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."jewelry_images" ("id", "jewelry_id", "src", "display_order", "created_at") VALUES
	('37ac401b-4d4d-4e4d-9bbf-00b9b8900360', '44722374-e1ef-49f2-ba3c-412f00aba906', 'https://twipnraxqejrjpfjoeyx.supabase.co/storage/v1/object/public/catalog/baroque-pearl-citrine-silver-brooch.webp', 0, '2025-12-08 08:17:52.57366+00'),
	('bb701707-cd4b-43b5-b55e-913f90b2de2e', 'e2651c43-0e53-4190-8c69-51a9ae90a857', 'https://twipnraxqejrjpfjoeyx.supabase.co/storage/v1/object/public/catalog/hand-carved-silver-moonstone-brooch-salimsilver.webp', 0, '2025-12-08 08:17:51.028981+00'),
	('7bd1d0a8-93d0-4577-9835-e0814a18e6ec', '1cdd00b6-c259-4a48-9391-18dd59c14813', 'https://twipnraxqejrjpfjoeyx.supabase.co/storage/v1/object/public/catalog/hand-carved-silver-rings-couple-salimsilver.webp', 0, '2025-12-08 08:18:00.934976+00'),
	('5468d733-b36e-4364-86ea-675075c8577f', '25262d5a-f84a-439e-8e61-000a2b3853a3', 'https://twipnraxqejrjpfjoeyx.supabase.co/storage/v1/object/public/catalog/hand-carved-silver-turquoise-ring-salimsilver.webp', 0, '2025-12-08 08:18:03.302005+00'),
	('55306487-73ca-46d2-b36c-9df0097ee8bf', '464e0478-9919-4ad5-aa06-e90476c583c6', 'https://twipnraxqejrjpfjoeyx.supabase.co/storage/v1/object/public/catalog/silver-dragonfly-amethyst-drop-earrings-salimsilver.webp', 0, '2025-12-08 08:17:56.249017+00'),
	('9c2603b5-1ea0-4224-82d7-75f511f494f6', '44a9a772-bb4f-4e64-aa94-c6d3d1fd71f5', 'https://twipnraxqejrjpfjoeyx.supabase.co/storage/v1/object/public/catalog/silver-filigree-ruby-cuff-bracelet-salimsilver.webp', 0, '2025-12-08 08:17:45.731499+00'),
	('2f07f901-9e8b-44de-a3f7-a55451114741', '51265bbe-67cd-4a5a-9fe6-3cd9ace223db', 'https://twipnraxqejrjpfjoeyx.supabase.co/storage/v1/object/public/catalog/silver-gold-floral-lotus-brooch-salimsilver.webp', 0, '2025-12-08 08:17:48.943165+00'),
	('7bbf1ba8-476e-41ea-aa41-5b0b09319115', '07bd01d7-a538-4439-8005-76bea8282c03', 'https://twipnraxqejrjpfjoeyx.supabase.co/storage/v1/object/public/catalog/silver-hibiscus-locket-purple-stone-pendant-necklace-salimsilver.webp', 0, '2025-12-08 08:17:57.445174+00'),
	('4862a110-b11d-419e-81b0-937e8e17e78e', '9ec23dfc-920c-4a6c-a55f-7da702d25c8e', 'https://twipnraxqejrjpfjoeyx.supabase.co/storage/v1/object/public/catalog/silver-mamuli-earrings-salimsilver.webp', 0, '2025-12-08 08:17:55.051971+00'),
	('281f2b00-57e9-441f-a30a-5ccbb6c8091a', '58836789-b114-41b3-816e-2b1c7c91697b', 'https://twipnraxqejrjpfjoeyx.supabase.co/storage/v1/object/public/catalog/silver-pagoda-ring-pearl-salimsilver.webp', 0, '2025-12-08 08:18:02.091748+00'),
	('fb26441d-a0b3-4ee3-89d2-1839aa22c534', 'b7ff9279-ce35-49cb-ba55-9bb00969e2ef', 'https://twipnraxqejrjpfjoeyx.supabase.co/storage/v1/object/public/catalog/silver-pendant-labradorite-eye-dot-jewelry-salimsilver.webp', 0, '2025-12-08 08:17:58.545046+00'),
	('0755f8fa-82e4-4713-b5e8-d83b93971321', '53c0aaaa-968d-4498-8979-4a3b850b087c', 'https://twipnraxqejrjpfjoeyx.supabase.co/storage/v1/object/public/catalog/silver-ruby-filigree-earrings-salimsilver.webp', 0, '2025-12-08 08:17:53.81142+00'),
	('adf2a297-95f1-400c-90c9-37234323cd4d', '4872ba9e-01ca-434e-af60-726baa474cd5', 'https://twipnraxqejrjpfjoeyx.supabase.co/storage/v1/object/public/catalog/silver-seahorse-charm-bracelet-salimsilver.webp', 0, '2025-12-08 08:17:47.325928+00'),
	('61b30065-4117-4664-90c1-942b48c86d33', 'c67c03ca-5dbe-4279-9043-b2c381c2122d', 'https://twipnraxqejrjpfjoeyx.supabase.co/storage/v1/object/public/catalog/silver-seahorse-pendant-amber-salimsilver.webp', 0, '2025-12-08 08:17:59.793412+00'),
	('e9b19fed-ed63-474c-aa54-670b58a7378d', 'accc8ec5-36a7-4604-bff9-8b492bf49675', 'https://twipnraxqejrjpfjoeyx.supabase.co/storage/v1/object/public/catalog/hand-carved-silver-floral-relief-cuff-bracelet-salimsilver.webp', 0, '2025-12-08 08:57:45.615337+00');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id", "type") VALUES
	('catalog', 'catalog', NULL, '2025-12-08 08:25:52.461385+00', '2025-12-08 08:25:52.461385+00', true, false, NULL, NULL, NULL, 'STANDARD');


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
	('a3bfc21a-76bc-4401-9de7-2cfd96e90ccc', 'catalog', 'baroque-pearl-citrine-silver-brooch.webp', NULL, '2025-12-08 08:25:53.536422+00', '2025-12-08 08:25:53.536422+00', '2025-12-08 08:25:53.536422+00', '{"eTag": "\"37eba633f445989e45c33429b40bb587\"", "size": 288812, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-08T08:25:54.000Z", "contentLength": 288812, "httpStatusCode": 200}', '49a90c03-0f37-4d00-95d3-2e7f22c087cd', NULL, '{}', 1),
	('c5340735-6bd3-4f4a-9644-2652110dbc2a', 'catalog', 'hand-carved-silver-floral-relief-cuff-bracelet-salimsilver.webp', NULL, '2025-12-08 08:25:54.992831+00', '2025-12-08 08:25:54.992831+00', '2025-12-08 08:25:54.992831+00', '{"eTag": "\"9207173cade628952ec4be945eb69d01\"", "size": 297872, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-08T08:25:55.000Z", "contentLength": 297872, "httpStatusCode": 200}', '6e2d7230-ebfe-42a5-b1d8-672a86ee9874', NULL, '{}', 1),
	('9c097a02-4192-4b47-90ec-b6d80cae00b9', 'catalog', 'hand-carved-silver-moonstone-brooch-salimsilver.webp', NULL, '2025-12-08 08:25:55.942659+00', '2025-12-08 08:25:55.942659+00', '2025-12-08 08:25:55.942659+00', '{"eTag": "\"e193d2391d78f1a69bc7c71e2378e266\"", "size": 272214, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-08T08:25:56.000Z", "contentLength": 272214, "httpStatusCode": 200}', 'e8cbf8ca-e4bf-4b8e-aaa3-9f2d2da06d95', NULL, '{}', 1),
	('0a4f1535-4671-4375-a3a1-591177486d91', 'catalog', 'hand-carved-silver-pearl-brooch-salimsilver.webp', NULL, '2025-12-08 08:25:56.955051+00', '2025-12-08 08:25:56.955051+00', '2025-12-08 08:25:56.955051+00', '{"eTag": "\"83232371b5614edfb2a2c894cd870de1\"", "size": 233966, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-08T08:25:57.000Z", "contentLength": 233966, "httpStatusCode": 200}', '17752ef2-7f29-41b6-954e-b41f7de8055e', NULL, '{}', 1),
	('8fee33a5-d97b-4132-a4ea-31d2a70e57cd', 'catalog', 'hand-carved-silver-rings-couple-salimsilver.webp', NULL, '2025-12-08 08:25:57.943667+00', '2025-12-08 08:25:57.943667+00', '2025-12-08 08:25:57.943667+00', '{"eTag": "\"dccf1f21179d94478f5d0e68c88bba2f\"", "size": 306422, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-08T08:25:58.000Z", "contentLength": 306422, "httpStatusCode": 200}', 'e3140cf7-016b-42cc-8a59-53743820cb44', NULL, '{}', 1),
	('eac959bf-50d5-467d-88c7-54a3e72969d7', 'catalog', 'hand-carved-silver-turquoise-ring-salimsilver.webp', NULL, '2025-12-08 08:25:58.902598+00', '2025-12-08 08:25:58.902598+00', '2025-12-08 08:25:58.902598+00', '{"eTag": "\"ad9153aa8cad7644d9811ee6365c8a66\"", "size": 284190, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-08T08:25:59.000Z", "contentLength": 284190, "httpStatusCode": 200}', '7532581a-43d8-448a-b7c7-844c16b6ac62', NULL, '{}', 1),
	('737e2eb6-2ff0-44d3-94cd-56eb6e994a8a', 'catalog', 'silver-dragonfly-amethyst-drop-earrings-salimsilver.webp', NULL, '2025-12-08 08:26:00.228236+00', '2025-12-08 08:26:00.228236+00', '2025-12-08 08:26:00.228236+00', '{"eTag": "\"bebd06251455c7336e45e629c239818c\"", "size": 478846, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-08T08:26:01.000Z", "contentLength": 478846, "httpStatusCode": 200}', '2ce9e2c3-7eb1-4391-88cc-d961300ce437', NULL, '{}', 1),
	('2d248a86-0265-440f-9aa0-229ab6967e74', 'catalog', 'silver-filigree-ruby-cuff-bracelet-salimsilver.webp', NULL, '2025-12-08 08:26:01.698499+00', '2025-12-08 08:26:01.698499+00', '2025-12-08 08:26:01.698499+00', '{"eTag": "\"53d70a18af9196d2cd57c37ce4868da0\"", "size": 345638, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-08T08:26:02.000Z", "contentLength": 345638, "httpStatusCode": 200}', '9cfd2ab7-c49b-4de6-858c-4a980ceeaf14', NULL, '{}', 1),
	('44818b78-6811-45bd-a8fe-680d1a2c1e17', 'catalog', 'silver-gold-floral-lotus-brooch-salimsilver.webp', NULL, '2025-12-08 08:26:02.839913+00', '2025-12-08 08:26:02.839913+00', '2025-12-08 08:26:02.839913+00', '{"eTag": "\"d24b01df760e4357bdc9643d537d8829\"", "size": 409160, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-08T08:26:03.000Z", "contentLength": 409160, "httpStatusCode": 200}', '379bf0d4-1395-4a99-a2db-9b3f47a661fa', NULL, '{}', 1),
	('3a7bd5fb-3df4-4d2b-b119-7e046138287b', 'catalog', 'silver-hibiscus-locket-purple-stone-pendant-necklace-salimsilver.webp', NULL, '2025-12-08 08:26:03.910313+00', '2025-12-08 08:26:03.910313+00', '2025-12-08 08:26:03.910313+00', '{"eTag": "\"c022b88f5fefade49cfffe683f343fc9\"", "size": 287996, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-08T08:26:04.000Z", "contentLength": 287996, "httpStatusCode": 200}', '72b2fb66-4ad0-4d14-acc5-8a89fba08f60', NULL, '{}', 1),
	('f59e161e-20f1-45b4-9dc0-1882ded98e34', 'catalog', 'silver-mamuli-earrings-salimsilver.webp', NULL, '2025-12-08 08:26:04.855923+00', '2025-12-08 08:26:04.855923+00', '2025-12-08 08:26:04.855923+00', '{"eTag": "\"dd275be4d9947914bfede62e8d253604\"", "size": 253346, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-08T08:26:05.000Z", "contentLength": 253346, "httpStatusCode": 200}', '86b2c1e2-0c2a-49f8-b0f0-2d20c6592c76', NULL, '{}', 1),
	('cd837714-06f6-424d-886e-676938d76043', 'catalog', 'silver-pagoda-ring-pearl-salimsilver.webp', NULL, '2025-12-08 08:26:06.442743+00', '2025-12-08 08:26:06.442743+00', '2025-12-08 08:26:06.442743+00', '{"eTag": "\"3c591401fb71a52f3655ec1a327c569f\"", "size": 240960, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-08T08:26:07.000Z", "contentLength": 240960, "httpStatusCode": 200}', 'abdb84f4-c5c8-4a77-8eea-5afeb4413e27', NULL, '{}', 1),
	('a122cebe-86a7-49e6-9a77-aa4913fc94ac', 'catalog', 'silver-pendant-labradorite-eye-dot-jewelry-salimsilver.webp', NULL, '2025-12-08 08:26:07.707526+00', '2025-12-08 08:26:07.707526+00', '2025-12-08 08:26:07.707526+00', '{"eTag": "\"aecac1db6ca0360233ae03e4a26604cf\"", "size": 372170, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-08T08:26:08.000Z", "contentLength": 372170, "httpStatusCode": 200}', 'df4678eb-9333-465f-869c-f9cd4c2a95d9', NULL, '{}', 1),
	('316f5737-c544-42e4-9c57-9046d759ef53', 'catalog', 'silver-ruby-filigree-earrings-salimsilver.webp', NULL, '2025-12-08 08:26:09.037722+00', '2025-12-08 08:26:09.037722+00', '2025-12-08 08:26:09.037722+00', '{"eTag": "\"42aab3549d8bfb2aa554bec8e9141a17\"", "size": 230228, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-08T08:26:09.000Z", "contentLength": 230228, "httpStatusCode": 200}', '3dd0602f-20e6-437c-9df4-a2967c2d8400', NULL, '{}', 1),
	('4ed20c11-01c5-47ee-ad56-0ac525592669', 'catalog', 'silver-seahorse-charm-bracelet-salimsilver.webp', NULL, '2025-12-08 08:26:09.986405+00', '2025-12-08 08:26:09.986405+00', '2025-12-08 08:26:09.986405+00', '{"eTag": "\"8dd0eb3f7455c94398acb5a1f9a00339\"", "size": 331542, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-08T08:26:10.000Z", "contentLength": 331542, "httpStatusCode": 200}', 'ff85fd5f-af2a-475b-8d7c-43b08865cf1c', NULL, '{}', 1),
	('95dbda08-0806-460d-870d-5302cd153e5a', 'catalog', 'silver-seahorse-pendant-amber-salimsilver.webp', NULL, '2025-12-08 08:26:10.975918+00', '2025-12-08 08:26:10.975918+00', '2025-12-08 08:26:10.975918+00', '{"eTag": "\"c0687527dcf8cc975bd58963c5a31ac0\"", "size": 260904, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-08T08:26:11.000Z", "contentLength": 260904, "httpStatusCode": 200}', '1bbd1fbe-f586-482f-979d-5b8c721b5578', NULL, '{}', 1);


--
-- Data for Name: prefixes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



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

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

-- \unrestrict A3UGYsQkhlp3HhplaBc5NWD2l10EZmaPMVWFcx9fVmk6JUxLMkv7N1JeAXZjgA0

RESET ALL;
