SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict FWTc6SH0LrzxFkGBZgLZNDpcHxTV9MphWREAGvza5aeCig9oRRAYEFUFNpDa4Vh

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
	('00000000-0000-0000-0000-000000000000', 'c815afc1-3f72-4a58-a4d6-0b475433c58e', 'authenticated', 'authenticated', 'salimsilver925@gmail.com', '$2a$10$NA39TmvYTIjn72j540jwF.7dbVgrvZsgZRNhEqE2MeB.iR.yC/pEu', '2025-12-16 04:10:40.058343+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-01-13 14:50:15.061485+00', '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-12-16 04:10:40.042332+00', '2026-01-13 14:50:15.108283+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'da94210b-5152-497a-8634-3fc5b3b0178c', 'authenticated', 'authenticated', 'bat.bane@gmail.com', '$2a$10$QEGKY8shAX.Y9ia.fpx2Vuic.CyDciIKhKwj5oesQpfZ0..CW8CTy', '2026-01-09 04:18:38.838852+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-01-09 07:17:46.77872+00', '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2026-01-09 04:18:38.798772+00', '2026-01-13 22:44:55.525638+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '975d5e46-7a11-46a8-833a-da92ba8162c0', 'authenticated', 'authenticated', 'wangiglue@gmail.com', '$2a$10$D8OJJUyb7lKeuofmkPXg0uB.i7b.5hYjFUmnY/H.0k/cVxu9ZBIwa', '2025-12-16 07:33:45.620808+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-01-12 05:00:44.216468+00', '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-12-16 07:33:45.524209+00', '2026-01-13 03:55:35.707243+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


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
	('9e89442a-47b5-4c26-ad49-ea5700a8c8d5', '975d5e46-7a11-46a8-833a-da92ba8162c0', '2026-01-12 05:00:44.217378+00', '2026-01-13 03:55:40.774372+00', NULL, 'aal1', NULL, '2026-01-13 03:55:40.774248', 'node', '3.0.249.218', NULL, NULL, NULL, NULL, NULL),
	('c799dc89-4f9a-4c47-8240-b551bb3f46fd', 'da94210b-5152-497a-8634-3fc5b3b0178c', '2026-01-09 07:17:46.778825+00', '2026-01-13 22:44:55.54503+00', NULL, 'aal1', NULL, '2026-01-13 22:44:55.543241', 'node', '54.254.252.126', NULL, NULL, NULL, NULL, NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('c799dc89-4f9a-4c47-8240-b551bb3f46fd', '2026-01-09 07:17:46.781109+00', '2026-01-09 07:17:46.781109+00', 'password', 'ce5bf71e-c342-4886-9721-074615f9c993'),
	('9e89442a-47b5-4c26-ad49-ea5700a8c8d5', '2026-01-12 05:00:44.229599+00', '2026-01-12 05:00:44.229599+00', 'password', '26574234-1100-4880-af30-9b296ab2e15d');


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
	('00000000-0000-0000-0000-000000000000', 89, 'whm3sfm6tfjq', 'da94210b-5152-497a-8634-3fc5b3b0178c', true, '2026-01-09 07:17:46.779866+00', '2026-01-09 08:20:09.150542+00', NULL, 'c799dc89-4f9a-4c47-8240-b551bb3f46fd'),
	('00000000-0000-0000-0000-000000000000', 90, 'isqd2kkggzss', 'da94210b-5152-497a-8634-3fc5b3b0178c', true, '2026-01-09 08:20:09.185061+00', '2026-01-09 09:19:31.762457+00', 'whm3sfm6tfjq', 'c799dc89-4f9a-4c47-8240-b551bb3f46fd'),
	('00000000-0000-0000-0000-000000000000', 91, '63maq35hwup6', 'da94210b-5152-497a-8634-3fc5b3b0178c', true, '2026-01-09 09:19:31.793263+00', '2026-01-09 10:24:43.308847+00', 'isqd2kkggzss', 'c799dc89-4f9a-4c47-8240-b551bb3f46fd'),
	('00000000-0000-0000-0000-000000000000', 92, 'j3eyxpprvghr', 'da94210b-5152-497a-8634-3fc5b3b0178c', true, '2026-01-09 10:24:43.335915+00', '2026-01-09 11:43:26.437804+00', '63maq35hwup6', 'c799dc89-4f9a-4c47-8240-b551bb3f46fd'),
	('00000000-0000-0000-0000-000000000000', 93, 'hwzf2d5f6lrw', 'da94210b-5152-497a-8634-3fc5b3b0178c', true, '2026-01-09 11:43:26.461939+00', '2026-01-10 02:30:40.822679+00', 'j3eyxpprvghr', 'c799dc89-4f9a-4c47-8240-b551bb3f46fd'),
	('00000000-0000-0000-0000-000000000000', 94, 'xukuv6zm4m24', 'da94210b-5152-497a-8634-3fc5b3b0178c', true, '2026-01-10 02:30:40.846626+00', '2026-01-10 08:45:29.413952+00', 'hwzf2d5f6lrw', 'c799dc89-4f9a-4c47-8240-b551bb3f46fd'),
	('00000000-0000-0000-0000-000000000000', 95, '3p3umdvbotg7', 'da94210b-5152-497a-8634-3fc5b3b0178c', true, '2026-01-10 08:45:29.440808+00', '2026-01-10 11:33:02.919672+00', 'xukuv6zm4m24', 'c799dc89-4f9a-4c47-8240-b551bb3f46fd'),
	('00000000-0000-0000-0000-000000000000', 96, 'k2uuk3mijy5s', 'da94210b-5152-497a-8634-3fc5b3b0178c', true, '2026-01-10 11:33:02.947925+00', '2026-01-10 12:53:39.821269+00', '3p3umdvbotg7', 'c799dc89-4f9a-4c47-8240-b551bb3f46fd'),
	('00000000-0000-0000-0000-000000000000', 97, 'gwzt4ufmycdw', 'da94210b-5152-497a-8634-3fc5b3b0178c', true, '2026-01-10 12:53:39.852864+00', '2026-01-11 02:58:09.537084+00', 'k2uuk3mijy5s', 'c799dc89-4f9a-4c47-8240-b551bb3f46fd'),
	('00000000-0000-0000-0000-000000000000', 98, 'slkahfubsoyo', 'da94210b-5152-497a-8634-3fc5b3b0178c', true, '2026-01-11 02:58:09.570893+00', '2026-01-11 04:13:04.584105+00', 'gwzt4ufmycdw', 'c799dc89-4f9a-4c47-8240-b551bb3f46fd'),
	('00000000-0000-0000-0000-000000000000', 99, '5l5ny7ovwuta', 'da94210b-5152-497a-8634-3fc5b3b0178c', true, '2026-01-11 04:13:04.61231+00', '2026-01-11 11:57:04.165615+00', 'slkahfubsoyo', 'c799dc89-4f9a-4c47-8240-b551bb3f46fd'),
	('00000000-0000-0000-0000-000000000000', 100, 'pi2p4jp3p6p3', 'da94210b-5152-497a-8634-3fc5b3b0178c', true, '2026-01-11 11:57:04.196128+00', '2026-01-12 03:36:48.543263+00', '5l5ny7ovwuta', 'c799dc89-4f9a-4c47-8240-b551bb3f46fd'),
	('00000000-0000-0000-0000-000000000000', 101, 'zbposqyvk6yd', 'da94210b-5152-497a-8634-3fc5b3b0178c', true, '2026-01-12 03:36:48.565826+00', '2026-01-12 04:37:59.661271+00', 'pi2p4jp3p6p3', 'c799dc89-4f9a-4c47-8240-b551bb3f46fd'),
	('00000000-0000-0000-0000-000000000000', 103, 'camkvnxvecwc', 'da94210b-5152-497a-8634-3fc5b3b0178c', true, '2026-01-12 04:37:59.672269+00', '2026-01-12 05:45:12.383407+00', 'zbposqyvk6yd', 'c799dc89-4f9a-4c47-8240-b551bb3f46fd'),
	('00000000-0000-0000-0000-000000000000', 104, 'gwlwou5dvyoa', '975d5e46-7a11-46a8-833a-da92ba8162c0', true, '2026-01-12 05:00:44.22478+00', '2026-01-12 06:07:14.269845+00', NULL, '9e89442a-47b5-4c26-ad49-ea5700a8c8d5'),
	('00000000-0000-0000-0000-000000000000', 105, '3ge577d23d3d', 'da94210b-5152-497a-8634-3fc5b3b0178c', true, '2026-01-12 05:45:12.407464+00', '2026-01-12 06:55:21.746099+00', 'camkvnxvecwc', 'c799dc89-4f9a-4c47-8240-b551bb3f46fd'),
	('00000000-0000-0000-0000-000000000000', 106, 'iajkuqvpnkkx', '975d5e46-7a11-46a8-833a-da92ba8162c0', true, '2026-01-12 06:07:14.279805+00', '2026-01-12 07:11:59.890814+00', 'gwlwou5dvyoa', '9e89442a-47b5-4c26-ad49-ea5700a8c8d5'),
	('00000000-0000-0000-0000-000000000000', 108, 'nscfidcty7cu', '975d5e46-7a11-46a8-833a-da92ba8162c0', true, '2026-01-12 07:11:59.901343+00', '2026-01-12 08:10:07.200852+00', 'iajkuqvpnkkx', '9e89442a-47b5-4c26-ad49-ea5700a8c8d5'),
	('00000000-0000-0000-0000-000000000000', 109, 'owpumdmazzxb', '975d5e46-7a11-46a8-833a-da92ba8162c0', true, '2026-01-12 08:10:07.230606+00', '2026-01-12 09:14:56.387532+00', 'nscfidcty7cu', '9e89442a-47b5-4c26-ad49-ea5700a8c8d5'),
	('00000000-0000-0000-0000-000000000000', 107, 'cgo4g6zhbwwi', 'da94210b-5152-497a-8634-3fc5b3b0178c', true, '2026-01-12 06:55:21.762128+00', '2026-01-12 09:16:28.472945+00', '3ge577d23d3d', 'c799dc89-4f9a-4c47-8240-b551bb3f46fd'),
	('00000000-0000-0000-0000-000000000000', 110, 'ta4ffjkcck3r', '975d5e46-7a11-46a8-833a-da92ba8162c0', true, '2026-01-12 09:14:56.411967+00', '2026-01-12 10:13:09.690295+00', 'owpumdmazzxb', '9e89442a-47b5-4c26-ad49-ea5700a8c8d5'),
	('00000000-0000-0000-0000-000000000000', 111, 'ahsd73hchtzt', 'da94210b-5152-497a-8634-3fc5b3b0178c', true, '2026-01-12 09:16:28.474336+00', '2026-01-12 10:19:22.319897+00', 'cgo4g6zhbwwi', 'c799dc89-4f9a-4c47-8240-b551bb3f46fd'),
	('00000000-0000-0000-0000-000000000000', 114, 'mljqz4sxmznn', 'da94210b-5152-497a-8634-3fc5b3b0178c', true, '2026-01-12 10:19:22.321726+00', '2026-01-12 12:11:39.18645+00', 'ahsd73hchtzt', 'c799dc89-4f9a-4c47-8240-b551bb3f46fd'),
	('00000000-0000-0000-0000-000000000000', 113, 'rqchkgvxv6pa', '975d5e46-7a11-46a8-833a-da92ba8162c0', true, '2026-01-12 10:13:09.70234+00', '2026-01-12 14:15:59.481642+00', 'ta4ffjkcck3r', '9e89442a-47b5-4c26-ad49-ea5700a8c8d5'),
	('00000000-0000-0000-0000-000000000000', 115, 'te5hihgjwgzi', 'da94210b-5152-497a-8634-3fc5b3b0178c', true, '2026-01-12 12:11:39.199524+00', '2026-01-12 15:10:56.61567+00', 'mljqz4sxmznn', 'c799dc89-4f9a-4c47-8240-b551bb3f46fd'),
	('00000000-0000-0000-0000-000000000000', 116, 'mnhptuxk6v5i', '975d5e46-7a11-46a8-833a-da92ba8162c0', true, '2026-01-12 14:15:59.50966+00', '2026-01-12 15:17:37.003839+00', 'rqchkgvxv6pa', '9e89442a-47b5-4c26-ad49-ea5700a8c8d5'),
	('00000000-0000-0000-0000-000000000000', 117, 'ggqvofdrm5wk', 'da94210b-5152-497a-8634-3fc5b3b0178c', true, '2026-01-12 15:10:56.63426+00', '2026-01-12 23:23:31.931934+00', 'te5hihgjwgzi', 'c799dc89-4f9a-4c47-8240-b551bb3f46fd'),
	('00000000-0000-0000-0000-000000000000', 118, 'b2i2wyvqs2l4', '975d5e46-7a11-46a8-833a-da92ba8162c0', true, '2026-01-12 15:17:37.01036+00', '2026-01-13 03:55:35.6587+00', 'mnhptuxk6v5i', '9e89442a-47b5-4c26-ad49-ea5700a8c8d5'),
	('00000000-0000-0000-0000-000000000000', 120, 'qnxbfmlnuhhd', '975d5e46-7a11-46a8-833a-da92ba8162c0', false, '2026-01-13 03:55:35.69076+00', '2026-01-13 03:55:35.69076+00', 'b2i2wyvqs2l4', '9e89442a-47b5-4c26-ad49-ea5700a8c8d5'),
	('00000000-0000-0000-0000-000000000000', 119, 'ok6vemooj2cb', 'da94210b-5152-497a-8634-3fc5b3b0178c', true, '2026-01-12 23:23:31.959043+00', '2026-01-13 06:43:23.823151+00', 'ggqvofdrm5wk', 'c799dc89-4f9a-4c47-8240-b551bb3f46fd'),
	('00000000-0000-0000-0000-000000000000', 121, 'ivydxh2agwtk', 'da94210b-5152-497a-8634-3fc5b3b0178c', true, '2026-01-13 06:43:23.85311+00', '2026-01-13 07:41:53.876359+00', 'ok6vemooj2cb', 'c799dc89-4f9a-4c47-8240-b551bb3f46fd'),
	('00000000-0000-0000-0000-000000000000', 122, 'l5dcz7ugmd7o', 'da94210b-5152-497a-8634-3fc5b3b0178c', true, '2026-01-13 07:41:53.909145+00', '2026-01-13 08:40:23.525553+00', 'ivydxh2agwtk', 'c799dc89-4f9a-4c47-8240-b551bb3f46fd'),
	('00000000-0000-0000-0000-000000000000', 123, 'fbuskqvmuu32', 'da94210b-5152-497a-8634-3fc5b3b0178c', true, '2026-01-13 08:40:23.546354+00', '2026-01-13 09:40:17.531265+00', 'l5dcz7ugmd7o', 'c799dc89-4f9a-4c47-8240-b551bb3f46fd'),
	('00000000-0000-0000-0000-000000000000', 124, 'acz2ciphqijm', 'da94210b-5152-497a-8634-3fc5b3b0178c', true, '2026-01-13 09:40:17.558017+00', '2026-01-13 10:38:43.157703+00', 'fbuskqvmuu32', 'c799dc89-4f9a-4c47-8240-b551bb3f46fd'),
	('00000000-0000-0000-0000-000000000000', 125, 'u2xhis5fugnz', 'da94210b-5152-497a-8634-3fc5b3b0178c', true, '2026-01-13 10:38:43.182033+00', '2026-01-13 13:08:35.38003+00', 'acz2ciphqijm', 'c799dc89-4f9a-4c47-8240-b551bb3f46fd'),
	('00000000-0000-0000-0000-000000000000', 126, '4yrpsu24j7qy', 'da94210b-5152-497a-8634-3fc5b3b0178c', true, '2026-01-13 13:08:35.402837+00', '2026-01-13 14:07:05.072982+00', 'u2xhis5fugnz', 'c799dc89-4f9a-4c47-8240-b551bb3f46fd'),
	('00000000-0000-0000-0000-000000000000', 127, 'labxzxso7zxw', 'da94210b-5152-497a-8634-3fc5b3b0178c', true, '2026-01-13 14:07:05.1025+00', '2026-01-13 15:14:00.891291+00', '4yrpsu24j7qy', 'c799dc89-4f9a-4c47-8240-b551bb3f46fd'),
	('00000000-0000-0000-0000-000000000000', 129, 'rx64wzj7gh4a', 'da94210b-5152-497a-8634-3fc5b3b0178c', true, '2026-01-13 15:14:00.911137+00', '2026-01-13 22:44:55.50595+00', 'labxzxso7zxw', 'c799dc89-4f9a-4c47-8240-b551bb3f46fd'),
	('00000000-0000-0000-0000-000000000000', 130, '35rkw5ou7flk', 'da94210b-5152-497a-8634-3fc5b3b0178c', false, '2026-01-13 22:44:55.519397+00', '2026-01-13 22:44:55.519397+00', 'rx64wzj7gh4a', 'c799dc89-4f9a-4c47-8240-b551bb3f46fd');


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
	('2cc56012-a490-4c33-9f31-9139eb984fe6', 'pendants', 'Pendants', 'Artisan silver pendants', '7bbf1ba8-476e-41ea-aa41-5b0b09319115', false, '2025-12-08 07:57:00.982488+00', '2025-12-08 07:57:00.982488+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e'),
	('9836e22f-df52-4452-b693-efc1b84d311b', 'roimar', 'Roimar', 'Handcrafted couple rings and bridal sets. The Roimar collection blends gold, silver and diamonds into unique symbols of love.', 'd14583f0-d836-456b-ae66-34bb9154bf25', false, '2026-01-12 04:33:12.32527+00', '2026-01-12 04:33:12.32527+00', '975d5e46-7a11-46a8-833a-da92ba8162c0');


--
-- Data for Name: jewelry; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."jewelry" ("id", "collection_id", "slug", "title", "description", "material", "material_purity", "weight_grams", "crafting_time_hours", "production_year", "status", "variants", "created_at", "updated_at", "created_by") VALUES
	('1cdd00b6-c259-4a48-9391-18dd59c14813', '0c3a39ae-9f0c-423d-8baf-5a0166c105c0', 'hand-carved-silver-rings-couple-salimsilver', 'The Carved Couple: Artisan Carved Silver & White Gemstone Rings', 'Hand-carved sterling silver rings featuring deep, oxidized organic vine engravings and bezel-set clear gemstones.', 'silver', '925', NULL, NULL, NULL, 'available', '[{"type": "Size", "options": ["6", "7", "8", "9"]}]', '2025-12-08 07:56:58.889657+00', '2025-12-08 07:56:58.889657+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e'),
	('58836789-b114-41b3-816e-2b1c7c91697b', '0c3a39ae-9f0c-423d-8baf-5a0166c105c0', 'silver-pagoda-ring-pearl-salimsilver', 'The Sanctuary: Sterling Silver Pagoda Ring with Pearl Finial', 'Sculptural silver ring crafted in the shape of a miniature tiered pagoda with intricate metalwork, tiled roofing, and window cutouts, crowned with a lustrous peach pearl.', 'silver', '925', NULL, NULL, NULL, 'available', NULL, '2025-12-08 07:56:59.273154+00', '2025-12-08 07:56:59.273154+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e'),
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
	('90af6c73-7e1b-4a49-acdf-f239144b8ec4', '3fc15fb3-bffb-46c1-82c2-ebb3176902d8', 'antique-style-silver-garuda-pancasila-plate-salimsilver', 'Silver Plate with Intricate Garuda Pancasila Relief', 'A finely crafted silver decorative plate featuring a central medallion of the Indonesian Garuda Pancasila. The rim is heavily embellished with deep, repoussé-style floral motifs and scalloped edges, offering a rich texture and a brilliant, polished metallic finish that highlights the detailed craftsmanship.', 'silver', '', NULL, NULL, NULL, 'available', NULL, '2025-12-10 05:21:03.731032+00', '2025-12-10 05:21:03.731032+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e'),
	('25262d5a-f84a-439e-8e61-000a2b3853a3', '0c3a39ae-9f0c-423d-8baf-5a0166c105c0', 'hand-carved-silver-turquoise-ring-salimsilver', 'The Verde Repoussé: An Artisanal Silver and Turquoise Statement Ring', 'Substantial silver ring set with three round turquoise cabochons, featuring intricate floral repoussé and an aged patina.', 'silver', '925', NULL, NULL, NULL, 'available', NULL, '2025-12-08 07:56:59.619476+00', '2025-12-08 07:56:59.619476+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e'),
	('7d794eb4-51ec-4dcd-8b2c-17418bfd940a', '9836e22f-df52-4452-b693-efc1b84d311b', 'aria-minimalist-blue-gemstone-diamond-set', 'Aria', 'Mencerminkan kemurnian udara dan kebebasan. Cincin ini menampilkan potongan batu permata biru berbentuk cushion yang elegan, dipasangkan dengan kemewahan cincin berlian tipis untuk menciptakan siluet yang modern dan sophisticated. Diciptakan untuk pasangan yang menghargai quiet luxury.', 'gold', '', NULL, NULL, NULL, 'available', NULL, '2026-01-12 05:16:15.743547+00', '2026-01-12 05:16:15.743547+00', '975d5e46-7a11-46a8-833a-da92ba8162c0'),
	('864ff9ad-4bfd-4d93-afcd-997f3f3ae370', '3fc15fb3-bffb-46c1-82c2-ebb3176902d8', 'silver-paksi-naga-liman-chariot-home-decor-salimsilver', 'Handcrafted Silver Paksi Naga Liman Chariot Decor', 'An exquisite artisanal home decor piece representing the mythical Paksi Naga Liman chariot, sculpted from premium silver. The intricate design showcases a fusion of three legendary creatures: the elephant (Liman) trunk, the dragon (Naga) body, and the bird (Paksi) wings, all rendered in detailed relief. The chariot features ornate filigree patterns throughout the carriage and detailed spoked wheels, finished with a lustrous metallic sheen that accentuates the depth of the traditional craftsmanship.', 'silver', '', NULL, NULL, NULL, 'available', NULL, '2025-12-10 05:18:19.90913+00', '2025-12-10 05:18:19.90913+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e'),
	('d75f78a1-e1af-44c6-8ac4-0e918a1d9e85', '9836e22f-df52-4452-b693-efc1b84d311b', 'enzo-chunky-gold-blue-stone-duo', 'Enzo', 'Perpaduan tekstur yang memukau dalam satu set. Cincin wanita ini menonjolkan detail emas bergelombang yang menangkap cahaya dengan sempurna di sekitar batu safir biru. Dilengkapi dengan cincin pria perak bertekstur matte yang memberikan kesan tenang namun tangguh, merepresentasikan harmoni dalam perbedaan.', 'gold', '', NULL, NULL, NULL, 'available', NULL, '2026-01-12 05:51:57.232835+00', '2026-01-12 05:51:57.232835+00', '975d5e46-7a11-46a8-833a-da92ba8162c0'),
	('6a56602d-4e81-4eba-b37b-514510e81692', '9836e22f-df52-4452-b693-efc1b84d311b', 'legame-bespoke-bonding-ring', 'Legame', 'Melambangkan ikatan suci, desain minimalis ini mengintegrasikan perpaduan sidik jari pasangan yang saling bertumpuk ke dalam lingkar cincin yang elegan. Setiap garis sidik jari diproses secara digital untuk hasil yang sangat akurat.', 'gold', '', NULL, NULL, NULL, 'available', NULL, '2026-01-12 06:15:17.990531+00', '2026-01-12 06:15:17.990531+00', '975d5e46-7a11-46a8-833a-da92ba8162c0'),
	('909a20e9-4338-44c9-8f77-900e8bff0613', '9836e22f-df52-4452-b693-efc1b84d311b', 'cincin-pasangan-chiara-white-gold-black', 'Chiara', 'Kejernihan dan kontras. Set Chiara adalah tentang keseimbangan, menampilkan cincin hammered hitam disandingkan dengan kemewahan halus cincin perak bertahta tiga berlian.', 'gold', '', NULL, NULL, NULL, 'available', NULL, '2026-01-12 06:53:40.096307+00', '2026-01-12 06:53:40.096307+00', '975d5e46-7a11-46a8-833a-da92ba8162c0'),
	('557cd058-b661-4980-8e7c-a45b5cd77fa4', '9836e22f-df52-4452-b693-efc1b84d311b', 'cincin-bianca-white-gold-ruby', 'Bianca', 'Definisi kemewahan minimalis dalam palet monokromatik white gold. Kejernihan warna merah Ruby sebagai centerpiece yang kontras dengan tekstur logam matte yang halus, menciptakan harmoni visual yang anggun.', 'gold', '', NULL, NULL, NULL, 'available', NULL, '2026-01-12 07:02:10.245312+00', '2026-01-12 07:02:10.245312+00', '975d5e46-7a11-46a8-833a-da92ba8162c0'),
	('03601048-92ca-4a04-9993-1f5ae59ad31c', '9836e22f-df52-4452-b693-efc1b84d311b', 'cincin-siena-gold-silver', 'Siena', 'Mencerminkan keindahan klasik, set ini mengombinasikan kilaunya emas 18k dan aksen permata ganda dengan cincin perak kontemporer yang minimalis.', 'silver', '', NULL, NULL, NULL, 'available', NULL, '2026-01-12 07:14:22.252791+00', '2026-01-12 07:14:22.252791+00', '975d5e46-7a11-46a8-833a-da92ba8162c0'),
	('0266e1fe-0969-4bef-be01-4c8037eb10d9', '9836e22f-df52-4452-b693-efc1b84d311b', 'vieri-organic-knot-yellow-gold-matte-silver-duo', 'Vieri', 'Sepasang cincin yang memancarkan kemurnian dan kebenaran. Cincin ini menampilkan desain simpul yang organik, mengalir mengikuti lekukan logam emas yang solid. Dipasangkan dengan cincin perak matte yang ramping, set ini dirancang untuk mereka yang menghargai detail mikro dan filosofi hubungan yang kokoh namun tetap fleksibel.', 'gold', '', NULL, NULL, NULL, 'available', NULL, '2026-01-12 08:54:09.020991+00', '2026-01-12 08:54:09.020991+00', '975d5e46-7a11-46a8-833a-da92ba8162c0'),
	('56502e9f-24f9-4407-8622-6b69ff365786', '9836e22f-df52-4452-b693-efc1b84d311b', 'dante-couple-ring-set-gold-diamond', 'Dante', 'Perpaduan abadi antara kekuatan dan kelembutan. Set ini menghadirkan cincin wishbone berhias permata yang presisi berpasangan dengan cincin perak simpel yang tangguh.', 'gold', '', NULL, NULL, NULL, 'available', NULL, '2026-01-12 08:58:42.338591+00', '2026-01-12 08:58:42.338591+00', '975d5e46-7a11-46a8-833a-da92ba8162c0'),
	('547fe2ed-6572-49d8-9b27-e4313cf19e06', '9836e22f-df52-4452-b693-efc1b84d311b', 'loto-lotus-emerald-root-couple-gold-rings', 'Loto', 'Deskripsi Produk: Simbol kebangkitan dan kemurnian cinta. Koleksi Loto menampilkan kontras puitis antara mahkota teratai emas 18k dengan batu emerald hijau yang cerah, serta cincin perak yang ditempa menyerupai tekstur akar yang kuat. Sebuah penghormatan bagi pasangan yang tumbuh bersama dari kedalaman menuju cahaya.', 'gold', '', NULL, NULL, NULL, 'available', NULL, '2026-01-12 09:00:53.953281+00', '2026-01-12 09:00:53.953281+00', '975d5e46-7a11-46a8-833a-da92ba8162c0'),
	('cd40444d-33e3-43bf-875a-5b0925db6baf', '9836e22f-df52-4452-b693-efc1b84d311b', 'cincin-pasangan-noemi-gold-silver-minimalist-diamond', 'Noemi', 'Menampilkan keanggunan yang tenang dan harmoni visual, koleksi Noemi adalah perpaduan antara kemewahan yang berani dan kesederhanaan yang murni. Set ini dirancang khusus untuk pasangan yang mencari keseimbangan antara tradisi yang kaya dan modernitas minimalis dalam satu kesatuan yang kohesif.', 'gold', '', NULL, NULL, NULL, 'available', NULL, '2026-01-12 09:06:05.985432+00', '2026-01-12 09:06:05.985432+00', '975d5e46-7a11-46a8-833a-da92ba8162c0'),
	('a3b76ec5-58f3-4d63-ba55-3a8d41c4f866', '9836e22f-df52-4452-b693-efc1b84d311b', 'cincin-pasangan-rocco-white-gold-diamond', 'Rocco', 'Didesain untuk melengkapi satu sama lain, Rocco memadukan kemewahan pavé yang detail dengan sentuhan band polos yang elegan. Pilihan tepat bagi pasangan yang mencari cincin yang teak lekang oleh waktu', 'gold', '', NULL, NULL, NULL, 'available', NULL, '2026-01-12 09:25:22.012324+00', '2026-01-12 09:25:22.012324+00', '975d5e46-7a11-46a8-833a-da92ba8162c0'),
	('fd56cb6d-5d99-494e-8192-916ba91a0ca2', '9836e22f-df52-4452-b693-efc1b84d311b', 'paola-diamond-brushed-white-gold-pair', 'Paola', 'Cincin pertunangan dan pernikahan yang serasi dengan sentuhan akhir hand-brushed. Menawarkan kenyamanan fit dengan detail berlian minimalis yang memancarkan kemewahan tersembunyi.', 'gold', '', NULL, NULL, NULL, 'available', NULL, '2026-01-12 09:36:00.484211+00', '2026-01-12 09:36:00.484211+00', '975d5e46-7a11-46a8-833a-da92ba8162c0'),
	('aa35feb7-5636-4fe3-99e8-54db35ee8522', '9836e22f-df52-4452-b693-efc1b84d311b', 'flavio-bridal-duo-gold-rings', 'Flavio', 'Terinspirasi dari makna ''emas'' dan ''cahaya'', koleksi Flavio menonjolkan harmoni antara cincin emas polos yang elegan dengan cincin pasangan bermahkotakan berlian kualitas excellent cut untuk kilau maksimal.', 'gold', '', NULL, NULL, NULL, 'available', NULL, '2026-01-12 09:49:12.680969+00', '2026-01-12 09:49:12.680969+00', '975d5e46-7a11-46a8-833a-da92ba8162c0'),
	('3eca98aa-d74e-469d-84d9-7414e20b29e9', '9836e22f-df52-4452-b693-efc1b84d311b', 'cincin-pasangan-hilaria-diamond-gold', 'Hilaria', 'Cincin yang merayakan kegembiraan dalam kesederhanaan. Bentuknya yang dinamis dan perpaduan dua warna logam (bicolor) menciptakan tampilan kontemporer yang tetap terasa klasik disertai grafir yang personal.', 'gold', '', NULL, NULL, NULL, 'available', NULL, '2026-01-12 09:29:47.098781+00', '2026-01-12 09:29:47.098781+00', '975d5e46-7a11-46a8-833a-da92ba8162c0'),
	('33e62a51-155b-405f-bad0-3ae4c1fc8085', '9836e22f-df52-4452-b693-efc1b84d311b', 'cincin-ginevra-white-gold-diamond', 'Ginevra', 'Cincin Ginevra yang berarti "Bayangan Putih" (White Shadow) adalah cincin yang mengeksplorasi konsep dualitas. Cincin pasangan ini menampilkan siluet bypass yang ikonik, di mana dua jalur emas putih melengkung dengan anggun, melambangkan dua perjalanan hidup yang berbeda yang kini menyatu dalam satu harmoni yang sempurna.', 'gold', '', NULL, NULL, NULL, 'available', NULL, '2026-01-12 04:56:20.91843+00', '2026-01-12 04:56:20.91843+00', '975d5e46-7a11-46a8-833a-da92ba8162c0'),
	('eb25df3e-89cb-464a-a5c4-c4153602cd2b', '9836e22f-df52-4452-b693-efc1b84d311b', 'cincin-pasangan-ilaria-white-gold-sapphire-diamond', 'Ilaria', 'Set cincin yang memadukan keanggunan safir biru oval dengan cincin band berukir aksara kuno yang melambangkan kesetiaan abadi.', 'gold', '', NULL, NULL, NULL, 'available', NULL, '2026-01-12 15:22:31.648146+00', '2026-01-12 15:22:31.648146+00', '975d5e46-7a11-46a8-833a-da92ba8162c0'),
	('7e203f33-67c9-4e9c-9324-11bf94816da9', '9836e22f-df52-4452-b693-efc1b84d311b', 'cincin-pernikahan-jemma-silver-white-gold-diamond-solitaire', 'Jemma', 'Jemma menghadirkan harmoni antara kekuatan dan kelembutan. Cincin pernikahan dengan desain band lebar yang elegan, dipertegas dengan satu permata brilian dalam bingkai persegi yang presisi. Sebuah simbol cinta yang abadi dalam balutan kemewahan yang tenang dan modern.', 'gold', '', NULL, NULL, NULL, 'available', NULL, '2026-01-13 04:08:48.330913+00', '2026-01-13 04:08:48.330913+00', '975d5e46-7a11-46a8-833a-da92ba8162c0');


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
	('93b7762f-6a2c-433f-b69f-c17acce349c0', '90af6c73-7e1b-4a49-acdf-f239144b8ec4', 'https://ckrypbqakgmeujbdmeks.supabase.co/storage/v1/object/public/catalog/90af6c73-7e1b-4a49-acdf-f239144b8ec4/1765344093685.webp', 0, '2025-12-10 05:21:36.791091+00', 'c815afc1-3f72-4a58-a4d6-0b475433c58e'),
	('c8e0f695-d752-4abc-9043-c4e46ab7cbb2', '33e62a51-155b-405f-bad0-3ae4c1fc8085', 'https://ckrypbqakgmeujbdmeks.supabase.co/storage/v1/object/public/catalog/33e62a51-155b-405f-bad0-3ae4c1fc8085/1768193843530.webp', 0, '2026-01-12 04:57:24.801174+00', NULL),
	('f5f04f9f-bb3a-47e5-b3d5-7e25bcaf93a3', '7d794eb4-51ec-4dcd-8b2c-17418bfd940a', 'https://ckrypbqakgmeujbdmeks.supabase.co/storage/v1/object/public/catalog/7d794eb4-51ec-4dcd-8b2c-17418bfd940a/1768194995781.webp', 0, '2026-01-12 05:16:37.156215+00', NULL),
	('194c2328-c2d1-42a2-9bb6-9c2345528c51', 'd75f78a1-e1af-44c6-8ac4-0e918a1d9e85', 'https://ckrypbqakgmeujbdmeks.supabase.co/storage/v1/object/public/catalog/d75f78a1-e1af-44c6-8ac4-0e918a1d9e85/1768197134495.webp', 0, '2026-01-12 05:52:15.969175+00', NULL),
	('5180af52-d8c0-4e90-962d-fae810595bd7', '6a56602d-4e81-4eba-b37b-514510e81692', 'https://ckrypbqakgmeujbdmeks.supabase.co/storage/v1/object/public/catalog/6a56602d-4e81-4eba-b37b-514510e81692/1768198532058.webp', 0, '2026-01-12 06:15:33.458132+00', NULL),
	('e7bac184-2670-454a-b0a7-f1f1b1edf058', '909a20e9-4338-44c9-8f77-900e8bff0613', 'https://ckrypbqakgmeujbdmeks.supabase.co/storage/v1/object/public/catalog/909a20e9-4338-44c9-8f77-900e8bff0613/1768200832976.webp', 0, '2026-01-12 06:53:55.009041+00', NULL),
	('27d28963-a92d-48ba-a54b-5cada7deffca', '557cd058-b661-4980-8e7c-a45b5cd77fa4', 'https://ckrypbqakgmeujbdmeks.supabase.co/storage/v1/object/public/catalog/557cd058-b661-4980-8e7c-a45b5cd77fa4/1768201342761.webp', 0, '2026-01-12 07:02:23.582807+00', NULL),
	('28bf37d1-f1a3-4632-b846-7ce6666c5ef1', '03601048-92ca-4a04-9993-1f5ae59ad31c', 'https://ckrypbqakgmeujbdmeks.supabase.co/storage/v1/object/public/catalog/03601048-92ca-4a04-9993-1f5ae59ad31c/1768202072640.webp', 0, '2026-01-12 07:14:34.086016+00', NULL),
	('46c84264-cdca-40c2-813e-cd1be6bf240c', '0266e1fe-0969-4bef-be01-4c8037eb10d9', 'https://ckrypbqakgmeujbdmeks.supabase.co/storage/v1/object/public/catalog/0266e1fe-0969-4bef-be01-4c8037eb10d9/1768208165964.webp', 0, '2026-01-12 08:56:07.565993+00', NULL),
	('e6827932-4d88-4d15-8a18-317f897c41cd', '56502e9f-24f9-4407-8622-6b69ff365786', 'https://ckrypbqakgmeujbdmeks.supabase.co/storage/v1/object/public/catalog/56502e9f-24f9-4407-8622-6b69ff365786/1768208351690.webp', 0, '2026-01-12 08:59:12.792369+00', NULL),
	('7ffdad63-3e0d-4c43-a369-77a29cfac2f3', '547fe2ed-6572-49d8-9b27-e4313cf19e06', 'https://ckrypbqakgmeujbdmeks.supabase.co/storage/v1/object/public/catalog/547fe2ed-6572-49d8-9b27-e4313cf19e06/1768208461577.webp', 0, '2026-01-12 09:01:03.832903+00', NULL),
	('5ca96ff0-7289-42a9-8423-25128edbfb97', 'cd40444d-33e3-43bf-875a-5b0925db6baf', 'https://ckrypbqakgmeujbdmeks.supabase.co/storage/v1/object/public/catalog/cd40444d-33e3-43bf-875a-5b0925db6baf/1768208782771.webp', 0, '2026-01-12 09:06:23.801216+00', NULL),
	('f0a5ba26-2539-4a7b-ae0e-b40c1e2aeb69', 'a3b76ec5-58f3-4d63-ba55-3a8d41c4f866', 'https://ckrypbqakgmeujbdmeks.supabase.co/storage/v1/object/public/catalog/a3b76ec5-58f3-4d63-ba55-3a8d41c4f866/1768209931469.webp', 0, '2026-01-12 09:25:32.479522+00', NULL),
	('5747813d-e588-49e9-b519-d7c37d173cdb', '3eca98aa-d74e-469d-84d9-7414e20b29e9', 'https://ckrypbqakgmeujbdmeks.supabase.co/storage/v1/object/public/catalog/3eca98aa-d74e-469d-84d9-7414e20b29e9/1768210197377.webp', 0, '2026-01-12 09:29:58.798587+00', NULL),
	('d828a0bc-e19a-4f87-90ae-052ce4849c66', 'fd56cb6d-5d99-494e-8192-916ba91a0ca2', 'https://ckrypbqakgmeujbdmeks.supabase.co/storage/v1/object/public/catalog/fd56cb6d-5d99-494e-8192-916ba91a0ca2/1768210573064.webp', 0, '2026-01-12 09:36:15.257375+00', NULL),
	('d14583f0-d836-456b-ae66-34bb9154bf25', 'aa35feb7-5636-4fe3-99e8-54db35ee8522', 'https://ckrypbqakgmeujbdmeks.supabase.co/storage/v1/object/public/catalog/aa35feb7-5636-4fe3-99e8-54db35ee8522/1768211360203.webp', 0, '2026-01-12 09:49:21.276948+00', NULL),
	('9ca93a0b-b10a-477c-a8ac-fe13bc569297', 'eb25df3e-89cb-464a-a5c4-c4153602cd2b', 'https://ckrypbqakgmeujbdmeks.supabase.co/storage/v1/object/public/catalog/eb25df3e-89cb-464a-a5c4-c4153602cd2b/1768231866953.webp', 0, '2026-01-12 15:31:11.487696+00', NULL),
	('6172942b-199f-400a-b365-709831180d2f', '7e203f33-67c9-4e9c-9324-11bf94816da9', 'https://ckrypbqakgmeujbdmeks.supabase.co/storage/v1/object/public/catalog/7e203f33-67c9-4e9c-9324-11bf94816da9/1768277342846.webp', 0, '2026-01-13 04:09:04.875078+00', NULL);


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

INSERT INTO "public"."posts" ("id", "slug", "title", "excerpt", "content", "cover_image_url", "meta_title", "meta_description", "published", "published_at", "tags", "featured", "author_id", "created_at", "updated_at", "views") VALUES
	('3bdc42ab-d244-4528-9410-2026a4255768', 'rekor-perak-pecah-rekor-panduan-pantau-harga-real-time-dalam-rupiah', 'Harga Perak Pecah Rekor: Panduan Pantau Harga Real-Time dalam Rupiah', 'Di tengah lonjakan harga perak dunia yang mencatatkan rekor tertinggi sepanjang masa (ATH) dengan kenaikan 160% sejak awal 2025, Salim Silver menghadirkan solusi berupa fitur Halaman Live Harga Perak dalam Rupiah (IDR) per gram untuk memudahkan investor Indonesia. Ketegangan geopolitik global telah mendorong harga perak menembus level signifikan, namun volatilitas yang tinggi menuntut akses data yang cepat dan akurat. Fitur terbaru dari Salim Silver ini menjawab kebutuhan pasar akan informasi harga perak real-time yang relevan dengan transaksi lokal, sehingga para kolektor dan investor dapat mengambil keputusan strategis secara instan tanpa perlu repot melakukan konversi kurs manual atau tertinggal momentum pasar.', '<p>Belakangan ini, pasar logam mulia dunia sedang memanas dengan harga perak yang mencatatkan rekor tertinggi sepanjang masa (All-Time High). Data terbaru menunjukkan lonjakan nilai yang luar biasa, mencapai kenaikan hampir 160% sejak awal tahun 2025. Bahkan dalam satu bulan terakhir saja, tercatat pertumbuhan lebih dari 30%. Sentimen ini sebagian besar didorong oleh meningkatnya ketegangan geopolitik global, seperti friksi antara Amerika Serikat dan Venezuela, yang memicu gelombang permintaan investor terhadap aset "safe-haven" atau pelindung nilai.<br><br>Volatilitas pasar pun sangat terasa. Sempat menyentuh level tertinggi, harga perak sempat mengalami koreksi sedikit di bawah level $80 per troy ounce pada awal Januari, sebuah pergerakan yang memutus tren kenaikan beruntun selama beberapa hari. Rick Kanda, Managing Director dari The Gold Bullion Company, menyoroti bahwa meskipun perak memiliki volatilitas yang lebih tinggi dibandingkan emas karena besarnya permintaan industri dan ukuran pasar yang lebih kecil, perak tetap menjadi titik masuk investasi yang sangat menarik. Harganya yang lebih terjangkau dibandingkan emas menjadikannya pilihan strategis bagi investor pemula maupun kolektor yang ingin melakukan diversifikasi portofolio sekaligus lindung nilai terhadap inflasi.<br><br>Namun, di tengah antusiasme dan pergerakan harga yang cepat ini, ada satu kendala yang sering dialami oleh masyarakat Indonesia: sulitnya mencari sumber informasi harga perak yang akurat, relevan, dan <em>real-time</em>.<br><br>Mayoritas referensi harga perak dunia disajikan dalam mata uang Dolar AS (USD) per troy ounce. Bagi kita yang bertransaksi di pasar lokal, konversi manual ke Rupiah (IDR) per gram seringkali membingungkan karena fluktuasi kurs mata uang yang juga bergerak setiap detik. Selain itu, banyak situs lokal yang menyajikan harga perak namun dengan pembaruan data yang lambat—terkadang hanya diperbarui sekali sehari. Padahal, di saat volatilitas tinggi seperti sekarang dimana harga bisa berubah drastis dalam hitungan jam, keterlambatan informasi bisa berarti hilangnya peluang.<br><br>Menjawab kebutuhan tersebut, Salim Silver kini menghadirkan fitur baru di situs web kami: Halaman Live Harga Perak.<br><br>Kami memahami bahwa transparansi dan kecepatan data adalah kunci. Oleh karena itu, halaman ini dirancang khusus untuk menyajikan:</p><ol><li><p>1. <strong>Harga Perak dalam Rupiah (IDR)</strong>: Tidak perlu lagi repot menghitung kurs sendiri.</p></li><li><p>2. <strong>Satuan Gram</strong>: Satuan yang paling umum digunakan dalam transaksi perhiasan dan batangan di Indonesia.</p></li><li><p>3. <strong>Update Berkala</strong>: Data harga yang diperbarui secara otomatis dan sering (real-time/near real-time), sehingga Anda tidak akan tertinggal momentum pasar.</p></li><li><p><br></p></li><li><p>Entah Anda sedang merencanakan untuk menambah koleksi perhiasan perak Salim Silver, atau sekadar memantau nilai aset Anda di tengah tren kenaikan harga saat ini, halaman ini akan menjadi referensi andalan Anda.<br><br>Jangan sampai terlewat momen penting di pasar perak. Cek harga perak terkini, akurat, dan terpercaya langsung di website Salim Silver.<br><br><a target="_blank" rel="noopener noreferrer nofollow" class="text-primary underline hover:text-primary/80" href="https://salimsilver.com/silver-price">Kunjungi Halaman Harga Perak</a></p></li></ol><p></p>', 'https://ckrypbqakgmeujbdmeks.supabase.co/storage/v1/object/public/blog/blog/1767944220100-GeminiGeneratedImagehrtabbhrtabbhrta.webp', 'Harga Perak Pecah Rekor: Panduan Pantau Harga Real-Time dalam Rupiah | Salim Silver', 'Di tengah lonjakan harga perak dunia yang mencatatkan rekor tertinggi sepanjang masa (ATH) dengan kenaikan 160% sejak awal 2025, Salim Silver menghadirkan solusi berupa fitur Halaman Live Harga Perak dalam Rupiah (IDR) per gram untuk memudahkan investor Indonesia. Ketegangan geopolitik global telah mendorong harga perak menembus level signifikan, namun volatilitas yang tinggi menuntut akses data yang cepat dan akurat. Fitur terbaru dari Salim Silver ini menjawab kebutuhan pasar akan informasi harga perak real-time yang relevan dengan transaksi lokal, sehingga para kolektor dan investor dapat mengambil keputusan strategis secara instan tanpa perlu repot melakukan konversi kurs manual atau tertinggal momentum pasar.', true, '2026-01-09 07:37:13.942+00', '{"silver price","harga perak rupiah","rekor harga perak"}', false, 'da94210b-5152-497a-8634-3fc5b3b0178c', '2026-01-09 07:37:03.767585+00', NULL, 17),
	('c928492a-5413-4b4e-a1e6-531399075342', 'benarkah-budaya-kerajinan-perak-kotagede-dimulai-sejak-senopati', 'Benarkah Budaya Kerajinan Perak Kotagede Dimulai Sejak Jaman Panembahan Senopati?', 'While Kotagede’s silver craft is traditionally linked to the 16th-century Mataram Islam era under Panembahan Senopati, physical evidence from that period remains elusive. Unlike Majapahit-era gold, 16th-century silver artifacts are rarely found in Indonesian museums.

This scarcity is attributed to the recyclable nature of silver. Historically, raw silver was scarce, leading craftsmen to melt down old or damaged pieces to create new designs. This cycle of melting and reshaping—which continued through various reigns and as recently as 2025—has effectively erased the physical "design trail" of Kotagede’s earliest silver masterpieces.', '<p>Seperti sudah menjadi pemahaman umum jika budaya kerajinan perak Kotagede dimulai sejak jaman Mataram Islam saat pemerintahan Panembahan Senopati pada abad XVI Masehi, apakah hal itu sesuai fakta ataukah hanya ceritera yang tidak bisa dibuktikan secara ilmiah? Sebagai orang yang dilahirkan di Kotagede dan besar di Kotagede serta hidup dari usaha kerajinan perak, tentu hal ini sangat menggoda hati dan pikiran untuk menemukan jawaban dari pertanyaan itu. Marilah kita coba telaah secara detail dan berusaha mencari bukti yang bisa kita ketemukan.<br><br>Tentu saja apa yang saya tulisan ini bukan jaminan kebenaran, tapi setidaknya tulisan ini sudah berusaha mengumpulkan data-data yang mendukung pernyataan yang ditulis. Penelitian dari pihak manapun akan sangat ditunggu untuk mengetahui kebenaran sejarah kerajinan perak Kotagede yang dikatakan dimulai sejak jaman Mataram Islam dibawah pemerintahan Panembahan Senopati apada abad XVI Masehi.<br><br>Perak sebagai logam tidak akan mengalami pelapukan atau kehancuran karena pengaruh cuaca, maka jika kerajinan perak Kotagede sudah ada sejak jaman Senopati pada abad XVI maka pada abad XXI ini semestinya kita masih bisa menemukan jejak peradaban kerajinan perak Kotagede yang dibikin pada abad XVI. Jika kita berkunjung ke luar negeri maka masih banyak tersimpan di museum negara tetangga karya perak yang dibikin pada abad XVI, atau bahkan dibikin sebelum abad XVI. Kenyataanya di museum-museum Indonesia tidak kita jumpai koleksi perak yang dibikin pada jaman Senopati, padahal banyak diketemukan koleksi perhiasan atau peralatan emas yang dibikin masa Majapahit sekitar abad XII.<br><br>Kenapa hal itu terjadi? Apakah pada jaman Senopati di Kotagede belum ada budaya kerajinan perak?<br><br>Ada seorang mahasiswa yang pernah mengadakan penelitian di Salim Silver menceriterakan bahwa dia pernah bertemu dan bertanya kepada budayawan Yogyakarta yaitu Romo Suryanto Sastroatmodjo pengasuh rubrik budaya Bokor Kencana di harian Bernas Yogyakarta. Romo Sur menceriterakan bahwa sebenarnya sudah ada budaya kerajinan perak di jaman Panembahan Senopati.<br><br>Kenapa saat ini sangat sulit kita ketemukan peninggalan karya seni perak yang dibuat saat masa pemerintahan Panembahan Senopati? Jawabnya adalah pada masa itu tambang perak belum banyak digali sehingga perak sebagai bahan baku kerajinan jumlahnya sangat kurang. Logam perak dan emas sebagai bahan kerajinan memiliki karakter bisa direcycle (diolah ulang dijadikan karya baru). Dari karakter logam yang bisa direcycle inilah maka jika suatu karya kerajinan perak di jaman Panembahan Senopati rusak maka dilebur lagi dijadikan bahan perak untuk dibikin karya dengan bentuk yang baru. Peleburan dan pembuatan karya kerajinan perak baru dari material hasil peleburan karya kerajinan perak lama inilah maka menjadikan tidak dapat dilacaknya design karya kerajinan lama sebelumnya.<br><br>Peleburan ulang dan pembuatan karya kerajinan perak baru dari peleburan karya kerajinan perak lama itu terus berulang pada jaman Mataram Islam pemerintahan Sultan Agung, Amangkurat dan seterusnya sampai didapatkannya persediaan bahan perak untuk membuat kerajinan perak. Jika persediaan bahan perak mencukupi maka pembuatan kerajinan baru tidak perlu melebur karya kerajinan lama.<br><br>Dalam cerita masa kini proses peleburan karya kerajinan perak lama untuk dijual sebagai perak murni (acir) atau untuk produksi kerajinan perak design baru itu terulang dalam beberapa waktu belakangan ini. Bisa dicatat terjadi peleburan karya kerajinan perak Kotagede pada tahun 1998, tahun 2008 dan tahun 2020 serta terakhir tahun 2025 tahun kemarin.</p><p></p>', 'https://ckrypbqakgmeujbdmeks.supabase.co/storage/v1/object/public/blog/blog/1768212538345-49616817261c710cd6f3dc.jpg', 'Benarkah Budaya Kerajinan Perak Kotagede Dimulai Sejak Jaman Panembahan Senopati? | Salim Silver', 'While Kotagede’s silver craft is traditionally linked to the 16th-century Mataram Islam era under Panembahan Senopati, physical evidence from that period remains elusive. Unlike Majapahit-era gold, 16th-century silver artifacts are rarely found in Indonesian museums.

This scarcity is attributed to the recyclable nature of silver. Historically, raw silver was scarce, leading craftsmen to melt down old or damaged pieces to create new designs. This cycle of melting and reshaping—which continued through various reigns and as recently as 2025—has effectively erased the physical "design trail" of Kotagede’s earliest silver masterpieces.', true, '2026-01-12 10:12:46.137+00', '{}', false, 'c815afc1-3f72-4a58-a4d6-0b475433c58e', '2026-01-12 10:11:23.520516+00', NULL, 17);


--
-- Data for Name: silver_price_summary; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."silver_price_summary" ("id", "price_idr", "price_24h_ago", "price_7d_ago", "price_30d_ago", "price_1y_ago", "updated_at", "price_180d_ago") VALUES
	(1, 47138491, 46205065, 43766208, 33140348, 15483695, '2026-01-13 22:30:29.008+00', NULL);


--
-- Data for Name: silver_prices; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."silver_prices" ("price_idr", "updated_at", "source") VALUES
	(40041815, '2026-01-02 09:30:18.851+00', 'goldprice'),
	(40066217, '2026-01-02 11:00:24.667+00', 'goldprice'),
	(39921440, '2026-01-02 12:30:20.637+00', 'goldprice'),
	(39762673, '2026-01-02 14:00:22.185+00', 'goldprice'),
	(39104081, '2026-01-02 15:30:01.098+00', 'goldprice'),
	(38686264, '2026-01-02 16:30:07.181+00', 'goldprice'),
	(39020522, '2026-01-02 17:30:14.327+00', 'goldprice'),
	(38539364, '2026-01-02 18:30:27.345+00', 'goldprice'),
	(38767460, '2026-01-02 19:30:05.265+00', 'goldprice'),
	(39061325, '2026-01-02 20:30:01.924+00', 'goldprice'),
	(38901270, '2026-01-02 21:30:09.915+00', 'goldprice'),
	(39106236, '2026-01-03 09:30:29.176+00', 'bullion_rates'),
	(39106236, '2026-01-03 17:30:30.116+00', 'bullion_rates'),
	(39106331, '2026-01-03 18:30:09.964+00', 'goldprice'),
	(39315760, '2026-01-04 23:30:08.467+00', 'goldprice'),
	(40236148, '2026-01-05 00:30:15.559+00', 'goldprice'),
	(40763752, '2026-01-05 01:30:30.064+00', 'bullion_rates'),
	(40738631, '2026-01-05 02:30:29.004+00', 'bullion_rates'),
	(40720641, '2026-01-05 03:30:29.054+00', 'bullion_rates'),
	(40614017, '2026-01-05 04:30:29.308+00', 'bullion_rates'),
	(40655012, '2026-01-05 05:30:13.37+00', 'goldprice'),
	(40619593, '2026-01-05 06:30:19.669+00', 'goldprice'),
	(40582662, '2026-01-05 07:30:18.838+00', 'goldprice'),
	(40701019, '2026-01-05 08:30:28.729+00', 'goldprice'),
	(40927317, '2026-01-05 09:30:25.725+00', 'goldprice'),
	(41045262, '2026-01-05 10:30:03.301+00', 'goldprice'),
	(40366200, '2026-01-05 11:30:10.402+00', 'goldprice'),
	(40390825, '2026-01-05 12:30:29.513+00', 'goldprice'),
	(40410892, '2026-01-05 13:30:28.891+00', 'goldprice'),
	(41273176, '2026-01-05 14:30:28.99+00', 'bullion_rates'),
	(41286888, '2026-01-05 15:30:34.431+00', 'bullion_rates'),
	(41388173, '2026-01-05 16:30:29.028+00', 'bullion_rates'),
	(41295140, '2026-01-05 17:30:28.91+00', 'bullion_rates'),
	(41277012, '2026-01-05 18:30:29.038+00', 'bullion_rates'),
	(40912272, '2026-01-05 19:30:04.766+00', 'goldprice'),
	(41002998, '2026-01-05 20:30:06.36+00', 'goldprice'),
	(41081044, '2026-01-05 21:30:29.397+00', 'bullion_rates'),
	(41241241, '2026-01-05 22:30:29.947+00', 'bullion_rates'),
	(41019812, '2026-01-05 23:30:29.022+00', 'bullion_rates'),
	(41113988, '2026-01-06 00:30:28.96+00', 'bullion_rates'),
	(41067473, '2026-01-06 01:30:28.698+00', 'bullion_rates'),
	(41777750, '2026-01-06 02:30:28.774+00', 'bullion_rates'),
	(42395956, '2026-01-06 03:30:28.99+00', 'bullion_rates'),
	(42454593, '2026-01-06 04:30:28.956+00', 'bullion_rates'),
	(42643834, '2026-01-06 05:30:19.199+00', 'goldprice'),
	(42568183, '2026-01-06 06:30:28.876+00', 'goldprice'),
	(42440420, '2026-01-06 07:30:11.487+00', 'goldprice'),
	(42232681, '2026-01-06 08:30:31.052+00', 'goldprice'),
	(42176813, '2026-01-06 09:30:07.538+00', 'goldprice'),
	(41958947, '2026-01-06 10:30:19.484+00', 'goldprice'),
	(42123335, '2026-01-06 11:30:13.012+00', 'goldprice'),
	(42319259, '2026-01-06 12:30:28.518+00', 'goldprice'),
	(42193615, '2026-01-06 13:30:04.683+00', 'goldprice'),
	(42490735, '2026-01-06 14:30:18.559+00', 'goldprice'),
	(43377632, '2026-01-06 15:30:19.391+00', 'goldprice'),
	(43313469, '2026-01-06 16:29:59.455+00', 'goldprice'),
	(43545553, '2026-01-06 17:30:28.992+00', 'bullion_rates'),
	(43495728, '2026-01-06 18:30:29.124+00', 'bullion_rates'),
	(43162911, '2026-01-06 19:30:12.949+00', 'goldprice'),
	(43315071, '2026-01-06 20:30:21.318+00', 'goldprice'),
	(43750347, '2026-01-06 21:30:29.334+00', 'bullion_rates'),
	(43766208, '2026-01-06 22:30:29.305+00', 'bullion_rates'),
	(44430092, '2026-01-06 23:30:28.981+00', 'bullion_rates'),
	(44450630, '2026-01-07 00:30:29.261+00', 'bullion_rates'),
	(43476304, '2026-01-07 01:30:29.014+00', 'bullion_rates'),
	(43670185, '2026-01-07 02:30:29.131+00', 'bullion_rates'),
	(43578608, '2026-01-07 03:30:29.043+00', 'bullion_rates'),
	(42965388, '2026-01-07 04:30:10.619+00', 'goldprice'),
	(42992372, '2026-01-07 05:30:18.829+00', 'goldprice'),
	(42660685, '2026-01-07 06:30:08.826+00', 'goldprice'),
	(43062006, '2026-01-07 07:30:27.216+00', 'goldprice'),
	(43141481, '2026-01-07 08:30:18.682+00', 'goldprice'),
	(42683907, '2026-01-07 09:30:00.996+00', 'goldprice'),
	(42654280, '2026-01-07 10:30:04.388+00', 'goldprice'),
	(42849612, '2026-01-07 11:30:09.564+00', 'goldprice'),
	(42384666, '2026-01-07 12:30:07.655+00', 'goldprice'),
	(42001673, '2026-01-07 13:30:27+00', 'goldprice'),
	(41499398, '2026-01-07 14:30:30.192+00', 'bullion_rates'),
	(41582236, '2026-01-07 15:30:01.947+00', 'goldprice'),
	(42106306, '2026-01-07 16:30:20.546+00', 'goldprice'),
	(42248532, '2026-01-07 17:30:22.035+00', 'goldprice'),
	(41939175, '2026-01-07 18:30:29.887+00', 'bullion_rates'),
	(42003962, '2026-01-07 19:30:15.533+00', 'goldprice'),
	(42205424, '2026-01-07 20:29:59.47+00', 'goldprice'),
	(42111378, '2026-01-07 21:30:04.119+00', 'goldprice'),
	(42138443, '2026-01-07 22:30:22.742+00', 'goldprice'),
	(42377089, '2026-01-07 23:30:29.644+00', 'goldprice'),
	(42301243, '2026-01-08 00:30:25.577+00', 'goldprice'),
	(42472313, '2026-01-08 01:29:59.084+00', 'goldprice'),
	(42229454, '2026-01-08 02:30:06.242+00', 'goldprice'),
	(42210317, '2026-01-08 03:30:04.621+00', 'goldprice'),
	(41997696, '2026-01-08 04:30:11.296+00', 'goldprice'),
	(41532460, '2026-01-08 05:30:30.207+00', 'bullion_rates'),
	(41020015, '2026-01-08 06:30:24.442+00', 'goldprice'),
	(41077791, '2026-01-08 07:30:24.274+00', 'goldprice'),
	(40927638, '2026-01-08 08:30:03.359+00', 'goldprice'),
	(41042961, '2026-01-08 09:30:22.66+00', 'goldprice'),
	(40887278, '2026-01-08 10:30:17.063+00', 'goldprice'),
	(40978769, '2026-01-08 11:30:28.951+00', 'goldprice'),
	(40513961, '2026-01-08 12:30:27.827+00', 'goldprice'),
	(40618854, '2026-01-08 13:30:16.59+00', 'goldprice'),
	(40206791, '2026-01-08 14:29:59.529+00', 'goldprice'),
	(40851691, '2026-01-08 15:30:24.109+00', 'goldprice'),
	(40977240, '2026-01-08 16:30:17.711+00', 'goldprice'),
	(41116826, '2026-01-08 17:30:11.198+00', 'goldprice'),
	(40878417, '2026-01-08 18:30:19.235+00', 'goldprice'),
	(40874459, '2026-01-08 19:30:00.602+00', 'goldprice'),
	(41008016, '2026-01-08 20:00:08.033+00', 'goldprice'),
	(41339209, '2026-01-08 20:30:26.906+00', 'goldprice'),
	(41657718, '2026-01-08 21:00:18.808+00', 'goldprice'),
	(41593660, '2026-01-08 21:30:20.176+00', 'goldprice'),
	(40019336, '2026-01-02 10:00:10.911+00', 'goldprice'),
	(39987614, '2026-01-02 11:30:24.049+00', 'goldprice'),
	(39775575, '2026-01-02 13:00:05.786+00', 'goldprice'),
	(39922049, '2026-01-02 14:30:23.903+00', 'goldprice'),
	(37825451, '2025-12-31 20:00:04.296+00', 'metals_dev'),
	(38448300, '2026-01-01 00:30:03.616+00', 'metals_dev'),
	(38449199, '2026-01-01 01:00:04.455+00', 'metals_dev'),
	(38448686, '2026-01-01 01:29:14.837+00', 'metals_dev'),
	(38449007, '2026-01-01 01:59:10.793+00', 'metals_dev'),
	(38449649, '2026-01-01 02:30:03.145+00', 'metals_dev'),
	(38449071, '2026-01-01 03:30:03.363+00', 'metals_dev'),
	(38449071, '2026-01-01 04:00:07.779+00', 'metals_dev'),
	(38449970, '2026-01-01 04:30:03.753+00', 'metals_dev'),
	(38449585, '2026-01-01 04:59:09.444+00', 'metals_dev'),
	(42811000, '2025-12-27 22:00:03.987+00', 'goldprice'),
	(42801000, '2025-12-28 06:00:04.686+00', 'goldprice'),
	(42798000, '2025-12-28 10:00:02.775+00', 'goldprice'),
	(42801000, '2025-12-28 14:00:02.295+00', 'goldprice'),
	(42768000, '2025-12-28 18:00:01.483+00', 'goldprice'),
	(42758000, '2025-12-28 22:00:02.803+00', 'goldprice'),
	(41583000, '2025-12-29 02:00:02.301+00', 'goldprice'),
	(42940000, '2025-12-29 06:00:02.96+00', 'goldprice'),
	(40820000, '2025-12-29 10:00:02.314+00', 'goldprice'),
	(39155859, '2025-12-29 14:20:00+00', 'goldprice'),
	(38307085, '2025-12-29 15:50:00+00', 'goldprice'),
	(38624993, '2025-12-29 17:55:00+00', 'goldprice'),
	(38642993, '2025-12-29 18:55:00+00', 'goldprice'),
	(38939418, '2025-12-29 19:55:00+00', 'goldprice'),
	(38925765, '2025-12-29 21:55:00+00', 'goldprice'),
	(39058237, '2025-12-29 23:55:00+00', 'goldprice'),
	(39274485, '2025-12-30 01:00:00+00', 'goldprice'),
	(39664085, '2025-12-30 01:55:00+00', 'goldprice'),
	(39872029, '2025-12-30 03:00:00+00', 'goldprice'),
	(40098180, '2025-12-30 04:00:00+00', 'goldprice'),
	(40113633, '2025-12-30 05:00:00+00', 'goldprice'),
	(40465505, '2025-12-30 06:00:00+00', 'goldprice'),
	(40399835, '2025-12-30 07:00:00+00', 'goldprice'),
	(40378675, '2025-12-30 08:00:00+00', 'goldprice'),
	(40035772, '2025-12-30 09:00:00+00', 'goldprice'),
	(40082054, '2025-12-30 09:29:50.227+00', 'goldprice'),
	(40236636, '2025-12-30 09:59:54.83+00', 'goldprice'),
	(40118258, '2025-12-30 10:29:32.354+00', 'goldprice'),
	(40169893, '2025-12-30 10:59:36.775+00', 'goldprice'),
	(40366111, '2025-12-30 11:30:51.627+00', 'goldprice'),
	(40368096, '2025-12-30 12:00:33.479+00', 'goldprice'),
	(40757145, '2025-12-30 12:31:01.116+00', 'goldprice'),
	(40989615, '2025-12-30 13:00:01.595+00', 'goldprice'),
	(41012030, '2025-12-30 13:29:44.629+00', 'goldprice'),
	(41150403, '2025-12-30 13:59:37.182+00', 'goldprice'),
	(41077003, '2025-12-30 14:29:55.423+00', 'goldprice'),
	(40574389, '2025-12-30 15:00:00.693+00', 'goldprice'),
	(40710706, '2025-12-30 15:29:43.704+00', 'goldprice'),
	(40900186, '2025-12-30 15:59:54.019+00', 'goldprice'),
	(41038634, '2025-12-30 16:29:42.279+00', 'goldprice'),
	(41454873, '2025-12-30 16:59:58.542+00', 'goldprice'),
	(41775005, '2025-12-30 17:29:38.786+00', 'goldprice'),
	(41687745, '2025-12-30 18:00:00.645+00', 'goldprice'),
	(41821669, '2025-12-30 18:29:34.883+00', 'goldprice'),
	(41632014, '2025-12-30 18:59:38.554+00', 'goldprice'),
	(41785000, '2025-12-30 19:29:53.568+00', 'goldprice'),
	(40991952, '2025-12-30 19:59:42.51+00', 'goldprice'),
	(41010206, '2025-12-30 20:29:35.557+00', 'goldprice'),
	(40882563, '2025-12-30 20:59:42.092+00', 'goldprice'),
	(41109865, '2025-12-30 21:29:37.519+00', 'goldprice'),
	(41000687, '2025-12-30 22:00:02.285+00', 'goldprice'),
	(41000687, '2025-12-30 22:59:38.533+00', 'goldprice'),
	(40434188, '2025-12-30 23:29:43.776+00', 'goldprice'),
	(40447766, '2025-12-31 00:00:03.735+00', 'goldprice'),
	(40138744, '2025-12-31 00:30:07.33+00', 'goldprice'),
	(40172838, '2025-12-31 00:59:52.046+00', 'goldprice'),
	(40355043, '2025-12-31 01:30:16.447+00', 'goldprice'),
	(40574677, '2025-12-31 02:00:12.808+00', 'goldprice'),
	(40363976, '2025-12-31 02:30:03.404+00', 'goldprice'),
	(39293318, '2025-12-31 02:59:56.839+00', 'goldprice'),
	(39001424, '2025-12-31 03:30:11.447+00', 'goldprice'),
	(38722902, '2025-12-31 04:00:11.628+00', 'goldprice'),
	(38984522, '2025-12-31 04:30:04.275+00', 'goldprice'),
	(38487527, '2025-12-31 05:00:08.946+00', 'goldprice'),
	(38866463, '2025-12-31 05:29:56.73+00', 'goldprice'),
	(38120457, '2025-12-31 06:00:18.061+00', 'goldprice'),
	(38133345, '2025-12-31 06:30:07.132+00', 'goldprice'),
	(38567384, '2025-12-31 07:00:04.912+00', 'goldprice'),
	(38799477, '2025-12-31 07:30:06.573+00', 'goldprice'),
	(38767633, '2025-12-31 08:00:12.65+00', 'goldprice'),
	(38746296, '2025-12-31 08:30:16.413+00', 'goldprice'),
	(38182895, '2025-12-31 09:00:07.457+00', 'goldprice'),
	(38646287, '2025-12-31 09:29:48.239+00', 'goldprice'),
	(38608679, '2025-12-31 09:59:50.307+00', 'goldprice'),
	(38643851, '2025-12-31 10:29:52.908+00', 'goldprice'),
	(38644919, '2025-12-31 11:00:04.586+00', 'goldprice'),
	(38655164, '2025-12-31 11:30:23.323+00', 'goldprice'),
	(38679077, '2025-12-31 12:00:01.189+00', 'goldprice'),
	(38397877, '2025-12-31 12:30:21.725+00', 'goldprice'),
	(38637995, '2025-12-31 13:00:22.001+00', 'goldprice'),
	(38757958, '2025-12-31 13:30:26.431+00', 'goldprice'),
	(38809608, '2025-12-31 14:00:27.112+00', 'goldprice'),
	(38857272, '2025-12-31 14:30:16.184+00', 'goldprice'),
	(39346659, '2025-12-31 15:00:24.313+00', 'goldprice'),
	(39084045, '2025-12-31 15:29:59.445+00', 'goldprice'),
	(38829957, '2025-12-31 16:00:18.769+00', 'goldprice'),
	(38490710, '2025-12-31 16:29:59.206+00', 'goldprice'),
	(38505741, '2025-12-31 17:00:07.535+00', 'goldprice'),
	(38334408, '2025-12-31 17:30:15.483+00', 'goldprice'),
	(38329728, '2025-12-31 18:00:20.874+00', 'goldprice'),
	(38357075, '2026-01-01 00:00:16.672+00', 'goldprice'),
	(38355773, '2026-01-01 05:30:28.944+00', 'goldprice'),
	(38355773, '2026-01-01 21:00:29.057+00', 'goldprice'),
	(38313482, '2026-01-01 21:30:28.909+00', 'goldprice'),
	(38313472, '2026-01-01 22:00:29.378+00', 'goldprice'),
	(38313472, '2026-01-01 23:00:29.297+00', 'goldprice'),
	(38795012, '2026-01-01 23:30:28.844+00', 'goldprice'),
	(38963111, '2026-01-02 00:00:28.983+00', 'goldprice'),
	(38844371, '2026-01-02 00:30:29.026+00', 'goldprice'),
	(38980335, '2026-01-02 01:00:29.303+00', 'goldprice'),
	(39020253, '2026-01-02 01:30:28.876+00', 'goldprice'),
	(39035056, '2026-01-02 02:00:29.774+00', 'goldprice'),
	(38969705, '2026-01-02 02:30:29.42+00', 'goldprice'),
	(39176137, '2026-01-02 03:00:29.073+00', 'goldprice'),
	(39246121, '2026-01-02 03:30:29.317+00', 'goldprice'),
	(39443538, '2026-01-02 04:00:29.069+00', 'goldprice'),
	(39478472, '2026-01-02 04:30:28.86+00', 'goldprice'),
	(39437784, '2026-01-02 05:00:16.667+00', 'goldprice'),
	(39705237, '2026-01-02 05:30:18.414+00', 'goldprice'),
	(39772518, '2026-01-02 06:00:07.568+00', 'goldprice'),
	(39835628, '2026-01-02 06:30:18.177+00', 'goldprice'),
	(39754542, '2026-01-02 07:00:25.017+00', 'goldprice'),
	(39747640, '2026-01-02 07:30:05.932+00', 'goldprice'),
	(39821634, '2026-01-02 08:00:28.993+00', 'goldprice'),
	(40055487, '2026-01-02 08:30:02.173+00', 'goldprice'),
	(40008744, '2026-01-02 09:00:13.741+00', 'goldprice'),
	(40024889, '2026-01-02 10:30:16.615+00', 'goldprice'),
	(39899354, '2026-01-02 12:00:12.963+00', 'goldprice'),
	(39620837, '2026-01-02 13:30:00.741+00', 'goldprice'),
	(39516427, '2026-01-02 15:00:24.955+00', 'goldprice'),
	(39108593, '2026-01-02 16:00:07.796+00', 'goldprice'),
	(38780995, '2026-01-02 16:59:59.172+00', 'goldprice'),
	(38618033, '2026-01-02 18:00:24.214+00', 'goldprice'),
	(38635220, '2026-01-02 19:00:17.176+00', 'goldprice'),
	(38691118, '2026-01-02 20:00:03.117+00', 'goldprice'),
	(38978627, '2026-01-02 21:00:30.13+00', 'bullion_rates'),
	(39106331, '2026-01-02 22:00:23.581+00', 'goldprice'),
	(39106331, '2026-01-03 09:00:13.301+00', 'goldprice'),
	(39106331, '2026-01-03 10:00:15.37+00', 'goldprice'),
	(39106331, '2026-01-03 17:00:09.348+00', 'goldprice'),
	(39106236, '2026-01-03 18:00:29.318+00', 'bullion_rates'),
	(39106331, '2026-01-04 23:00:28.057+00', 'goldprice'),
	(39716736, '2026-01-05 00:00:16.131+00', 'goldprice'),
	(40550806, '2026-01-05 01:00:28.924+00', 'bullion_rates'),
	(40573539, '2026-01-05 02:00:29.557+00', 'bullion_rates'),
	(40680489, '2026-01-05 03:00:29.465+00', 'bullion_rates'),
	(40490740, '2026-01-05 04:00:28.988+00', 'bullion_rates'),
	(40672587, '2026-01-05 05:00:29.267+00', 'bullion_rates'),
	(40603022, '2026-01-05 06:00:07.623+00', 'goldprice'),
	(40613625, '2026-01-05 07:00:17.597+00', 'goldprice'),
	(40618367, '2026-01-05 08:00:00.111+00', 'goldprice'),
	(40797064, '2026-01-05 09:00:02.673+00', 'goldprice'),
	(41064604, '2026-01-05 10:00:38.317+00', 'bullion_rates'),
	(40826541, '2026-01-05 11:00:11.816+00', 'goldprice'),
	(40273934, '2026-01-05 12:00:27.163+00', 'goldprice'),
	(40366870, '2026-01-05 13:00:25.267+00', 'goldprice'),
	(40741148, '2026-01-05 14:00:06.751+00', 'goldprice'),
	(41349575, '2026-01-05 15:00:30.784+00', 'bullion_rates'),
	(41553975, '2026-01-05 16:00:33.898+00', 'bullion_rates'),
	(41506342, '2026-01-05 17:00:29.027+00', 'bullion_rates'),
	(41166395, '2026-01-05 18:00:38.51+00', 'bullion_rates'),
	(41209277, '2026-01-05 19:00:29.085+00', 'bullion_rates'),
	(40956650, '2026-01-05 20:00:12.076+00', 'goldprice'),
	(41014889, '2026-01-05 21:00:12.068+00', 'goldprice'),
	(41239990, '2026-01-05 22:00:29.216+00', 'bullion_rates'),
	(41241241, '2026-01-05 23:00:29.008+00', 'bullion_rates'),
	(41018250, '2026-01-06 00:00:29.257+00', 'bullion_rates'),
	(41089510, '2026-01-06 01:00:29.219+00', 'bullion_rates'),
	(41280679, '2026-01-06 02:00:29.221+00', 'bullion_rates'),
	(41899650, '2026-01-06 03:00:28.94+00', 'bullion_rates'),
	(42490453, '2026-01-06 04:00:28.859+00', 'bullion_rates'),
	(42395036, '2026-01-06 05:00:29.108+00', 'bullion_rates'),
	(42311080, '2026-01-06 06:00:18.627+00', 'goldprice'),
	(42539387, '2026-01-06 07:00:13.432+00', 'goldprice'),
	(42062021, '2026-01-06 08:00:09.74+00', 'goldprice'),
	(42359771, '2026-01-06 09:00:22.39+00', 'goldprice'),
	(41842714, '2026-01-06 10:00:10.979+00', 'goldprice'),
	(41952482, '2026-01-06 11:00:25.907+00', 'goldprice'),
	(42254466, '2026-01-06 12:00:09.807+00', 'goldprice'),
	(42327789, '2026-01-06 13:00:16.848+00', 'goldprice'),
	(42578993, '2026-01-06 14:00:07.102+00', 'goldprice'),
	(43273073, '2026-01-06 15:00:15.446+00', 'goldprice'),
	(43226621, '2026-01-06 16:00:26.747+00', 'goldprice'),
	(43449609, '2026-01-06 17:00:28.978+00', 'bullion_rates'),
	(43708978, '2026-01-06 18:00:28.907+00', 'bullion_rates'),
	(43618486, '2026-01-06 19:00:29.025+00', 'bullion_rates'),
	(43113231, '2026-01-06 20:00:00.224+00', 'goldprice'),
	(43785213, '2026-01-06 21:00:29.091+00', 'bullion_rates'),
	(43763039, '2026-01-06 22:00:29.877+00', 'bullion_rates'),
	(43766208, '2026-01-06 23:00:28.986+00', 'bullion_rates'),
	(44441606, '2026-01-07 00:00:29.139+00', 'bullion_rates'),
	(44446374, '2026-01-07 01:00:29.065+00', 'bullion_rates'),
	(43288350, '2026-01-07 02:00:23.812+00', 'goldprice'),
	(43714348, '2026-01-07 03:00:29.378+00', 'bullion_rates'),
	(43360470, '2026-01-07 04:00:17.506+00', 'goldprice'),
	(42939433, '2026-01-07 05:00:26.58+00', 'goldprice'),
	(42694038, '2026-01-07 06:00:10.694+00', 'goldprice'),
	(42605243, '2026-01-07 07:00:26.266+00', 'goldprice'),
	(43131403, '2026-01-07 08:00:24.424+00', 'goldprice'),
	(42897877, '2026-01-07 09:00:18.15+00', 'goldprice'),
	(42846448, '2026-01-07 10:00:16.833+00', 'goldprice'),
	(42843734, '2026-01-07 11:00:09.341+00', 'goldprice'),
	(42558833, '2026-01-07 12:00:15.904+00', 'goldprice'),
	(42367921, '2026-01-07 13:00:04.711+00', 'goldprice'),
	(41804535, '2026-01-07 14:00:14.281+00', 'goldprice'),
	(41725015, '2026-01-07 15:00:15.056+00', 'goldprice'),
	(41610948, '2026-01-07 16:00:14.509+00', 'goldprice'),
	(42487180, '2026-01-07 17:00:07.124+00', 'goldprice'),
	(42087783, '2026-01-07 17:59:58.97+00', 'goldprice'),
	(42096003, '2026-01-07 19:00:08.169+00', 'goldprice'),
	(42257211, '2026-01-07 20:00:00.737+00', 'goldprice'),
	(42144531, '2026-01-07 21:00:11.134+00', 'goldprice'),
	(42138443, '2026-01-07 22:00:29.842+00', 'goldprice'),
	(42138443, '2026-01-07 23:00:11.063+00', 'goldprice'),
	(42442704, '2026-01-08 00:00:19.112+00', 'goldprice'),
	(41975874, '2026-01-08 01:00:03.268+00', 'goldprice'),
	(42366133, '2026-01-08 02:00:08.417+00', 'goldprice'),
	(42101330, '2026-01-08 03:00:28.646+00', 'goldprice'),
	(42102478, '2026-01-08 04:00:07.818+00', 'goldprice'),
	(41892234, '2026-01-08 05:00:16.983+00', 'goldprice'),
	(41079994, '2026-01-08 06:00:27.015+00', 'goldprice'),
	(41189552, '2026-01-08 07:00:13.225+00', 'goldprice'),
	(41049194, '2026-01-08 08:00:20.441+00', 'goldprice'),
	(40931562, '2026-01-08 09:00:03.869+00', 'goldprice'),
	(41209971, '2026-01-08 10:00:25.501+00', 'goldprice'),
	(41142724, '2026-01-08 11:00:01.267+00', 'goldprice'),
	(40740869, '2026-01-08 12:00:16.538+00', 'goldprice'),
	(40724863, '2026-01-08 13:00:15.657+00', 'goldprice'),
	(40105809, '2026-01-08 14:00:07.7+00', 'goldprice'),
	(40373730, '2026-01-08 15:00:01.443+00', 'goldprice'),
	(40986497, '2026-01-08 16:00:17.138+00', 'goldprice'),
	(41207790, '2026-01-08 16:59:59.94+00', 'goldprice'),
	(41143882, '2026-01-08 18:00:20.412+00', 'goldprice'),
	(40929069, '2026-01-08 19:00:23.579+00', 'goldprice'),
	(41612691, '2026-01-08 22:00:28.365+00', 'goldprice'),
	(41612691, '2026-01-08 22:30:13.734+00', 'goldprice'),
	(41612691, '2026-01-08 23:00:26.241+00', 'goldprice'),
	(41601909, '2026-01-08 23:30:21.414+00', 'goldprice'),
	(41444151, '2026-01-09 00:00:15.621+00', 'goldprice'),
	(41181340, '2026-01-09 00:30:02.938+00', 'goldprice'),
	(41118460, '2026-01-09 01:00:21.267+00', 'goldprice'),
	(40997188, '2026-01-09 01:30:15.872+00', 'goldprice'),
	(41395222, '2026-01-09 02:00:02.734+00', 'goldprice'),
	(41823375, '2026-01-09 02:30:25.244+00', 'goldprice'),
	(41633288, '2026-01-09 03:00:00.348+00', 'goldprice'),
	(41323610, '2026-01-09 03:30:27.256+00', 'goldprice'),
	(41429833, '2026-01-09 04:00:26.08+00', 'goldprice'),
	(41416845, '2026-01-09 04:29:59.755+00', 'goldprice'),
	(41484456, '2026-01-09 04:59:59.725+00', 'goldprice'),
	(41552983, '2026-01-09 05:30:25.923+00', 'goldprice'),
	(41741103, '2026-01-09 06:00:07.104+00', 'goldprice'),
	(41705038, '2026-01-09 06:30:09.247+00', 'goldprice'),
	(41820855, '2026-01-09 07:00:13.797+00', 'goldprice'),
	(41813046, '2026-01-09 07:30:06.948+00', 'goldprice'),
	(41759901, '2026-01-09 08:00:09.952+00', 'goldprice'),
	(42093124, '2026-01-09 08:30:18.02+00', 'goldprice'),
	(41998149, '2026-01-09 09:00:18.467+00', 'goldprice'),
	(42334635, '2026-01-09 09:30:27.258+00', 'goldprice'),
	(42262074, '2026-01-09 10:00:14.814+00', 'goldprice'),
	(42199783, '2026-01-09 10:30:24.85+00', 'goldprice'),
	(42331496, '2026-01-09 11:00:17.522+00', 'goldprice'),
	(42222274, '2026-01-09 11:30:21.25+00', 'goldprice'),
	(42251829, '2026-01-09 12:00:03.772+00', 'goldprice'),
	(42246723, '2026-01-09 12:30:16.574+00', 'goldprice'),
	(41979828, '2026-01-09 13:00:22.917+00', 'goldprice'),
	(41986718, '2026-01-09 13:30:24.088+00', 'goldprice'),
	(42494394, '2026-01-09 14:00:09.425+00', 'goldprice'),
	(42614173, '2026-01-09 14:30:11.805+00', 'goldprice'),
	(42961872, '2026-01-09 15:00:28.946+00', 'bullion_rates'),
	(43249948, '2026-01-09 15:30:31.575+00', 'bullion_rates'),
	(43412415, '2026-01-09 16:00:29.009+00', 'bullion_rates'),
	(43438632, '2026-01-09 16:30:29.9+00', 'bullion_rates'),
	(43569220, '2026-01-09 17:00:29.469+00', 'bullion_rates'),
	(43295486, '2026-01-09 17:30:29.139+00', 'bullion_rates'),
	(43049747, '2026-01-09 18:00:29.926+00', 'bullion_rates'),
	(43062147, '2026-01-09 18:30:29.238+00', 'bullion_rates'),
	(43314445, '2026-01-09 19:00:29.377+00', 'bullion_rates'),
	(43239361, '2026-01-09 19:30:29.382+00', 'bullion_rates'),
	(43282515, '2026-01-09 20:00:29.246+00', 'bullion_rates'),
	(43244195, '2026-01-09 20:30:29.23+00', 'bullion_rates'),
	(43292814, '2026-01-09 21:00:28.975+00', 'bullion_rates'),
	(43285175, '2026-01-09 21:30:28.868+00', 'bullion_rates'),
	(43274569, '2026-01-09 22:00:31.637+00', 'bullion_rates'),
	(43268795, '2026-01-09 22:30:28.971+00', 'bullion_rates'),
	(43268795, '2026-01-09 23:00:28.915+00', 'bullion_rates'),
	(43268795, '2026-01-09 23:30:29.332+00', 'bullion_rates'),
	(43268795, '2026-01-10 00:00:29.266+00', 'bullion_rates'),
	(43268795, '2026-01-10 00:30:29.344+00', 'bullion_rates'),
	(43268795, '2026-01-10 01:00:29.265+00', 'bullion_rates'),
	(43268795, '2026-01-10 01:30:28.92+00', 'bullion_rates'),
	(43268795, '2026-01-10 02:00:29.284+00', 'bullion_rates'),
	(43268795, '2026-01-10 02:30:29.056+00', 'bullion_rates'),
	(43268795, '2026-01-10 03:00:29.144+00', 'bullion_rates'),
	(43268795, '2026-01-10 03:30:29.008+00', 'bullion_rates'),
	(43268795, '2026-01-10 04:00:29.27+00', 'bullion_rates'),
	(43268795, '2026-01-10 04:30:28.991+00', 'bullion_rates'),
	(43268795, '2026-01-10 05:00:28.849+00', 'bullion_rates'),
	(43268795, '2026-01-10 05:30:29.153+00', 'bullion_rates'),
	(43268795, '2026-01-10 06:00:30.82+00', 'bullion_rates'),
	(43268795, '2026-01-10 06:30:29.038+00', 'bullion_rates'),
	(43268795, '2026-01-10 07:00:29.753+00', 'bullion_rates'),
	(43268795, '2026-01-10 07:30:29.051+00', 'bullion_rates'),
	(43268795, '2026-01-10 08:00:29.304+00', 'bullion_rates'),
	(43268795, '2026-01-10 08:30:29.264+00', 'bullion_rates'),
	(43268795, '2026-01-10 09:00:28.823+00', 'bullion_rates'),
	(43268795, '2026-01-10 09:30:28.769+00', 'bullion_rates'),
	(43268795, '2026-01-10 10:00:28.813+00', 'bullion_rates'),
	(43268795, '2026-01-10 10:30:29.394+00', 'bullion_rates'),
	(43268795, '2026-01-10 11:00:29.013+00', 'bullion_rates'),
	(43268795, '2026-01-10 11:30:29.113+00', 'bullion_rates'),
	(43268795, '2026-01-10 12:00:28.986+00', 'bullion_rates'),
	(43268795, '2026-01-10 12:30:43.705+00', 'bullion_rates'),
	(43268795, '2026-01-10 13:00:40.242+00', 'bullion_rates'),
	(43268795, '2026-01-10 13:30:28.999+00', 'bullion_rates'),
	(43268795, '2026-01-10 14:00:28.797+00', 'bullion_rates'),
	(43268795, '2026-01-10 14:30:29.067+00', 'bullion_rates'),
	(43268795, '2026-01-10 15:00:34.585+00', 'bullion_rates'),
	(43268795, '2026-01-10 15:30:36.884+00', 'bullion_rates'),
	(43268795, '2026-01-10 16:00:29.305+00', 'bullion_rates'),
	(43268795, '2026-01-10 16:30:29.217+00', 'bullion_rates'),
	(43268795, '2026-01-10 17:00:28.913+00', 'bullion_rates'),
	(43268795, '2026-01-10 17:30:29.383+00', 'bullion_rates'),
	(43268795, '2026-01-10 18:00:29.45+00', 'bullion_rates'),
	(43268795, '2026-01-10 18:30:29.491+00', 'bullion_rates'),
	(43268795, '2026-01-10 19:00:28.792+00', 'bullion_rates'),
	(43268795, '2026-01-10 19:30:29.6+00', 'bullion_rates'),
	(43268795, '2026-01-10 20:00:29.951+00', 'bullion_rates'),
	(43268795, '2026-01-10 20:30:28.969+00', 'bullion_rates'),
	(43268795, '2026-01-10 21:00:29.306+00', 'bullion_rates'),
	(43268795, '2026-01-10 21:30:29.899+00', 'bullion_rates'),
	(43268795, '2026-01-10 22:00:29.794+00', 'bullion_rates'),
	(43268795, '2026-01-10 22:30:28.827+00', 'bullion_rates'),
	(43268795, '2026-01-10 23:00:28.884+00', 'bullion_rates'),
	(43268795, '2026-01-10 23:30:29.252+00', 'bullion_rates'),
	(43268795, '2026-01-11 00:00:29.73+00', 'bullion_rates'),
	(43268795, '2026-01-11 00:30:29.039+00', 'bullion_rates'),
	(43268795, '2026-01-11 01:00:28.999+00', 'bullion_rates'),
	(43268795, '2026-01-11 01:30:29.296+00', 'bullion_rates'),
	(43268795, '2026-01-11 02:00:29.186+00', 'bullion_rates'),
	(43268795, '2026-01-11 02:30:29.017+00', 'bullion_rates'),
	(43268795, '2026-01-11 03:00:28.947+00', 'bullion_rates'),
	(43268795, '2026-01-11 03:30:28.945+00', 'bullion_rates'),
	(43268795, '2026-01-11 04:00:29.292+00', 'bullion_rates'),
	(43268795, '2026-01-11 04:30:28.874+00', 'bullion_rates'),
	(43268795, '2026-01-11 05:00:28.759+00', 'bullion_rates'),
	(43268795, '2026-01-11 05:30:28.987+00', 'bullion_rates'),
	(43268795, '2026-01-11 06:00:28.824+00', 'bullion_rates'),
	(43268795, '2026-01-11 06:30:29.04+00', 'bullion_rates'),
	(43268795, '2026-01-11 07:00:28.917+00', 'bullion_rates'),
	(43268795, '2026-01-11 07:30:28.76+00', 'bullion_rates'),
	(43268795, '2026-01-11 08:00:29.489+00', 'bullion_rates'),
	(43268795, '2026-01-11 08:30:29.208+00', 'bullion_rates'),
	(43268795, '2026-01-11 09:00:29.026+00', 'bullion_rates'),
	(43268795, '2026-01-11 09:30:29.037+00', 'bullion_rates'),
	(43268795, '2026-01-11 10:00:28.841+00', 'bullion_rates'),
	(43268795, '2026-01-11 10:30:28.996+00', 'bullion_rates'),
	(43268795, '2026-01-11 11:00:29.056+00', 'bullion_rates'),
	(43268795, '2026-01-11 11:30:29.078+00', 'bullion_rates'),
	(43268795, '2026-01-11 12:00:28.968+00', 'bullion_rates'),
	(43268795, '2026-01-11 12:30:29.263+00', 'bullion_rates'),
	(43268795, '2026-01-11 13:00:29.169+00', 'bullion_rates'),
	(43268795, '2026-01-11 13:30:28.934+00', 'bullion_rates'),
	(43268795, '2026-01-11 14:00:29.233+00', 'bullion_rates'),
	(43268795, '2026-01-11 14:30:29.12+00', 'bullion_rates'),
	(43268795, '2026-01-11 15:00:29.123+00', 'bullion_rates'),
	(43268795, '2026-01-11 15:30:29.148+00', 'bullion_rates'),
	(43268795, '2026-01-11 16:00:29.525+00', 'bullion_rates'),
	(43268795, '2026-01-11 16:30:29.105+00', 'bullion_rates'),
	(43268795, '2026-01-11 17:00:28.924+00', 'bullion_rates'),
	(43268795, '2026-01-11 17:30:29.402+00', 'bullion_rates'),
	(43268795, '2026-01-11 18:00:28.988+00', 'bullion_rates'),
	(43268795, '2026-01-11 18:30:29.06+00', 'bullion_rates'),
	(43268795, '2026-01-11 19:00:29.258+00', 'bullion_rates'),
	(43268795, '2026-01-11 19:30:29.175+00', 'bullion_rates'),
	(43268795, '2026-01-11 20:00:29.114+00', 'bullion_rates'),
	(43268795, '2026-01-11 20:30:29.456+00', 'bullion_rates'),
	(43268859, '2026-01-11 21:00:09.334+00', 'goldprice'),
	(43268859, '2026-01-11 21:30:00.268+00', 'goldprice'),
	(43268859, '2026-01-11 22:00:15.935+00', 'goldprice'),
	(43268859, '2026-01-11 22:30:27.764+00', 'goldprice'),
	(43268859, '2026-01-11 23:00:18.28+00', 'goldprice'),
	(44175458, '2026-01-11 23:30:00.268+00', 'goldprice'),
	(44221486, '2026-01-12 00:00:11.57+00', 'goldprice'),
	(44493064, '2026-01-12 00:30:24.729+00', 'goldprice'),
	(45064555, '2026-01-12 00:59:59.124+00', 'goldprice'),
	(45293233, '2026-01-12 01:30:29.023+00', 'bullion_rates'),
	(44897281, '2026-01-12 02:00:09.426+00', 'goldprice'),
	(44723733, '2026-01-12 02:30:16.235+00', 'goldprice'),
	(45183796, '2026-01-12 03:00:22.013+00', 'goldprice'),
	(45402203, '2026-01-12 03:30:28.889+00', 'bullion_rates'),
	(45169528, '2026-01-12 04:00:17.249+00', 'goldprice'),
	(45150800, '2026-01-12 04:30:20.185+00', 'goldprice'),
	(45197211, '2026-01-12 05:00:29.378+00', 'goldprice'),
	(45263886, '2026-01-12 05:30:16.342+00', 'goldprice'),
	(45830208, '2026-01-12 06:00:28.988+00', 'bullion_rates'),
	(45753067, '2026-01-12 06:30:29.083+00', 'bullion_rates'),
	(45803428, '2026-01-12 07:00:28.8+00', 'bullion_rates'),
	(45472008, '2026-01-12 07:30:28.704+00', 'bullion_rates'),
	(45594593, '2026-01-12 08:00:29.433+00', 'bullion_rates'),
	(45640894, '2026-01-12 08:30:29.068+00', 'bullion_rates'),
	(45590241, '2026-01-12 09:00:35.979+00', 'bullion_rates'),
	(45693228, '2026-01-12 09:30:28.772+00', 'bullion_rates'),
	(45622665, '2026-01-12 10:00:29.054+00', 'bullion_rates'),
	(45641487, '2026-01-12 10:30:29.895+00', 'bullion_rates'),
	(45618158, '2026-01-12 11:00:35.306+00', 'bullion_rates'),
	(45421137, '2026-01-12 11:30:28.958+00', 'bullion_rates'),
	(45455193, '2026-01-12 12:00:28.717+00', 'bullion_rates'),
	(45556048, '2026-01-12 12:30:29.052+00', 'bullion_rates'),
	(45779244, '2026-01-12 13:00:29.334+00', 'bullion_rates'),
	(46292418, '2026-01-12 13:30:29.007+00', 'bullion_rates'),
	(46498678, '2026-01-12 14:00:29.03+00', 'bullion_rates'),
	(45600970, '2026-01-12 14:30:29.022+00', 'bullion_rates'),
	(46155666, '2026-01-12 15:00:29.287+00', 'bullion_rates'),
	(46390464, '2026-01-12 15:30:29.182+00', 'bullion_rates'),
	(46377441, '2026-01-12 16:00:24.072+00', 'goldprice'),
	(46631210, '2026-01-12 16:30:24.044+00', 'goldprice'),
	(46696209, '2026-01-12 17:00:02.258+00', 'goldprice'),
	(46545771, '2026-01-12 17:30:08.5+00', 'goldprice'),
	(46628224, '2026-01-12 18:00:18.829+00', 'goldprice'),
	(46289428, '2026-01-12 18:30:20.936+00', 'goldprice'),
	(46405247, '2026-01-12 19:00:09.976+00', 'goldprice'),
	(46557223, '2026-01-12 19:30:18.227+00', 'goldprice'),
	(46460914, '2026-01-12 20:00:30.67+00', 'goldprice'),
	(46149139, '2026-01-12 20:30:07.842+00', 'goldprice'),
	(46224149, '2026-01-12 21:00:29.708+00', 'goldprice'),
	(46040448, '2026-01-12 21:30:11.705+00', 'goldprice'),
	(46205065, '2026-01-12 22:00:02.681+00', 'goldprice'),
	(46205065, '2026-01-12 22:30:29.636+00', 'goldprice'),
	(46205065, '2026-01-12 23:00:11.986+00', 'goldprice'),
	(45458667, '2026-01-12 23:30:23.234+00', 'goldprice'),
	(45772838, '2026-01-12 23:59:58.863+00', 'goldprice'),
	(45508933, '2026-01-13 00:30:20.809+00', 'goldprice'),
	(45640363, '2026-01-13 01:00:01.318+00', 'goldprice'),
	(45568003, '2026-01-13 01:30:29.678+00', 'bullion_rates'),
	(45430604, '2026-01-13 02:00:11.229+00', 'goldprice'),
	(45717194, '2026-01-13 02:30:14.8+00', 'goldprice'),
	(46378794, '2026-01-13 03:00:14.955+00', 'goldprice'),
	(46455496, '2026-01-13 03:30:06.24+00', 'goldprice'),
	(46373917, '2026-01-13 04:00:19.493+00', 'goldprice'),
	(46486276, '2026-01-13 04:30:25.832+00', 'goldprice'),
	(46497269, '2026-01-13 05:00:18.262+00', 'goldprice'),
	(46476195, '2026-01-13 05:30:21.376+00', 'goldprice'),
	(46244287, '2026-01-13 06:00:29.018+00', 'goldprice'),
	(46152911, '2026-01-13 06:30:26.82+00', 'goldprice'),
	(46093561, '2026-01-13 06:59:59.801+00', 'goldprice'),
	(46252310, '2026-01-13 07:30:28.261+00', 'goldprice'),
	(46284993, '2026-01-13 08:00:23.671+00', 'goldprice'),
	(46592254, '2026-01-13 08:30:22.922+00', 'goldprice'),
	(46503345, '2026-01-13 09:00:11.757+00', 'goldprice'),
	(46436708, '2026-01-13 09:30:06.566+00', 'goldprice'),
	(46351000, '2026-01-13 09:59:59.189+00', 'goldprice'),
	(46288799, '2026-01-13 10:30:16.005+00', 'goldprice'),
	(46404295, '2026-01-13 11:00:11.051+00', 'goldprice'),
	(46471505, '2026-01-13 11:30:14.551+00', 'goldprice'),
	(46496170, '2026-01-13 12:00:10.859+00', 'goldprice'),
	(46366442, '2026-01-13 12:30:15.034+00', 'goldprice'),
	(46584256, '2026-01-13 13:00:16.207+00', 'goldprice'),
	(47204327, '2026-01-13 13:30:17.704+00', 'goldprice'),
	(47462885, '2026-01-13 14:00:21.925+00', 'goldprice'),
	(47788197, '2026-01-13 14:30:05.826+00', 'goldprice'),
	(48131471, '2026-01-13 15:00:14.907+00', 'goldprice'),
	(47586830, '2026-01-13 15:30:10.931+00', 'goldprice'),
	(48101768, '2026-01-13 16:00:34.088+00', 'tradingview'),
	(47879422, '2026-01-13 16:30:37.125+00', 'tradingview'),
	(48231499, '2026-01-13 17:00:29.075+00', 'tradingview'),
	(42753864, '2025-12-26 22:00:00+00', 'tradingview'),
	(38696418, '2025-12-24 22:00:00+00', 'tradingview'),
	(38555816, '2025-12-23 22:00:00+00', 'tradingview'),
	(37222948, '2025-12-22 22:00:00+00', 'tradingview'),
	(36120405, '2025-12-19 22:00:00+00', 'tradingview'),
	(35173237, '2025-12-18 22:00:00+00', 'tradingview'),
	(35530717, '2025-12-17 22:00:00+00', 'tradingview'),
	(34153494, '2025-12-16 22:00:00+00', 'tradingview'),
	(34324507, '2025-12-15 22:00:00+00', 'tradingview'),
	(33140348, '2025-12-12 22:00:00+00', 'tradingview'),
	(34046008, '2025-12-11 22:00:00+00', 'tradingview'),
	(33111751, '2025-12-10 22:00:00+00', 'tradingview'),
	(32511067, '2025-12-09 22:00:00+00', 'tradingview'),
	(31180861, '2025-12-08 22:00:00+00', 'tradingview'),
	(31175654, '2025-12-05 22:00:00+00', 'tradingview'),
	(30545887, '2025-12-04 22:00:00+00', 'tradingview'),
	(31255268, '2025-12-03 22:00:00+00', 'tradingview'),
	(31242964, '2025-12-02 22:00:00+00', 'tradingview'),
	(31048168, '2025-12-01 22:00:00+00', 'tradingview'),
	(30200493, '2025-11-28 22:00:00+00', 'tradingview'),
	(28571119, '2025-11-27 22:00:00+00', 'tradingview'),
	(28577286, '2025-11-26 22:00:00+00', 'tradingview'),
	(27626244, '2025-11-25 22:00:00+00', 'tradingview'),
	(27553187, '2025-11-24 22:00:00+00', 'tradingview'),
	(26899372, '2025-11-21 22:00:00+00', 'tradingview'),
	(27251853, '2025-11-20 22:00:00+00', 'tradingview'),
	(27582990, '2025-11-19 22:00:00+00', 'tradingview'),
	(27267005, '2025-11-18 22:00:00+00', 'tradingview'),
	(26989230, '2025-11-17 22:00:00+00', 'tradingview'),
	(27131593, '2025-11-14 22:00:00+00', 'tradingview'),
	(28142843, '2025-11-13 22:00:00+00', 'tradingview'),
	(28624853, '2025-11-12 22:00:00+00', 'tradingview'),
	(27486193, '2025-11-11 22:00:00+00', 'tradingview'),
	(27046801, '2025-11-10 22:00:00+00', 'tradingview'),
	(25945570, '2025-11-07 22:00:00+00', 'tradingview'),
	(25778368, '2025-11-06 22:00:00+00', 'tradingview'),
	(25794094, '2025-11-05 22:00:00+00', 'tradingview'),
	(25293092, '2025-11-04 22:00:00+00', 'tradingview'),
	(25730744, '2025-11-03 22:00:00+00', 'tradingview'),
	(25999165, '2025-10-31 22:00:00+00', 'tradingview'),
	(26156874, '2025-10-30 22:00:00+00', 'tradingview'),
	(25386239, '2025-10-29 22:00:00+00', 'tradingview'),
	(25126233, '2025-10-28 22:00:00+00', 'tradingview'),
	(25101727, '2025-10-27 22:00:00+00', 'tradingview'),
	(25989530, '2025-10-24 22:00:00+00', 'tradingview'),
	(26096848, '2025-10-23 22:00:00+00', 'tradingview'),
	(25869369, '2025-10-22 22:00:00+00', 'tradingview'),
	(25945834, '2025-10-21 22:00:00+00', 'tradingview'),
	(27925197, '2025-10-20 22:00:00+00', 'tradingview'),
	(27636658, '2025-10-17 22:00:00+00', 'tradingview'),
	(28851937, '2025-10-16 22:00:00+00', 'tradingview'),
	(28244736, '2025-10-15 22:00:00+00', 'tradingview'),
	(27391362, '2025-10-14 22:00:00+00', 'tradingview'),
	(27886112, '2025-10-13 22:00:00+00', 'tradingview'),
	(26720162, '2025-10-10 22:00:00+00', 'tradingview'),
	(26165949, '2025-10-09 22:00:00+00', 'tradingview'),
	(26016679, '2025-10-08 22:00:00+00', 'tradingview'),
	(25416726, '2025-10-07 22:00:00+00', 'tradingview'),
	(25867823, '2025-10-06 22:00:00+00', 'tradingview'),
	(25606120, '2025-10-03 22:00:00+00', 'tradingview'),
	(25060461, '2025-10-02 22:00:00+00', 'tradingview'),
	(25232996, '2025-10-01 22:00:00+00', 'tradingview'),
	(25028831, '2025-09-30 22:00:00+00', 'tradingview'),
	(25147568, '2025-09-29 22:00:00+00', 'tradingview'),
	(24823793, '2025-09-26 22:00:00+00', 'tradingview'),
	(24298222, '2025-09-25 22:00:00+00', 'tradingview'),
	(23520370, '2025-09-24 22:00:00+00', 'tradingview'),
	(23573733, '2025-09-23 22:00:00+00', 'tradingview'),
	(23480793, '2025-09-22 22:00:00+00', 'tradingview'),
	(22945981, '2025-09-19 22:00:00+00', 'tradingview'),
	(22154387, '2025-09-18 22:00:00+00', 'tradingview'),
	(21995235, '2025-09-17 22:00:00+00', 'tradingview'),
	(22404892, '2025-09-16 22:00:00+00', 'tradingview'),
	(22478212, '2025-09-15 22:00:00+00', 'tradingview'),
	(22212742, '2025-09-12 22:00:00+00', 'tradingview'),
	(21955742, '2025-09-11 22:00:00+00', 'tradingview'),
	(21766674, '2025-09-10 22:00:00+00', 'tradingview'),
	(21586060, '2025-09-09 22:00:00+00', 'tradingview'),
	(21822886, '2025-09-08 22:00:00+00', 'tradingview'),
	(21655906, '2025-09-05 22:00:00+00', 'tradingview'),
	(21478260, '2025-09-04 22:00:00+00', 'tradingview'),
	(21743025, '2025-09-03 22:00:00+00', 'tradingview'),
	(21516142, '2025-09-02 22:00:00+00', 'tradingview'),
	(21538585, '2025-09-01 22:00:00+00', 'tradingview'),
	(20999502, '2025-08-29 22:00:00+00', 'tradingview'),
	(20512166, '2025-08-28 22:00:00+00', 'tradingview'),
	(20271221, '2025-08-27 22:00:00+00', 'tradingview'),
	(20195993, '2025-08-26 22:00:00+00', 'tradingview'),
	(20145125, '2025-08-25 22:00:00+00', 'tradingview'),
	(20423324, '2025-08-22 22:00:00+00', 'tradingview'),
	(19950154, '2025-08-21 22:00:00+00', 'tradingview'),
	(19795644, '2025-08-20 22:00:00+00', 'tradingview'),
	(19478979, '2025-08-19 22:00:00+00', 'tradingview'),
	(19744662, '2025-08-18 22:00:00+00', 'tradingview'),
	(19736997, '2025-08-15 22:00:00+00', 'tradingview'),
	(19661696, '2025-08-14 22:00:00+00', 'tradingview'),
	(20076387, '2025-08-13 22:00:00+00', 'tradingview'),
	(19852695, '2025-08-12 22:00:00+00', 'tradingview'),
	(19630184, '2025-08-11 22:00:00+00', 'tradingview'),
	(20084473, '2025-08-08 22:00:00+00', 'tradingview'),
	(20052229, '2025-08-07 22:00:00+00', 'tradingview'),
	(19866083, '2025-08-06 22:00:00+00', 'tradingview'),
	(19902464, '2025-08-05 22:00:00+00', 'tradingview'),
	(19699083, '2025-08-04 22:00:00+00', 'tradingview'),
	(19623889, '2025-08-01 22:00:00+00', 'tradingview'),
	(19394988, '2025-07-31 22:00:00+00', 'tradingview'),
	(19537665, '2025-07-30 22:00:00+00', 'tradingview'),
	(20108399, '2025-07-29 22:00:00+00', 'tradingview'),
	(20038064, '2025-07-28 22:00:00+00', 'tradingview'),
	(20010442, '2025-07-25 22:00:00+00', 'tradingview'),
	(20425797, '2025-07-24 22:00:00+00', 'tradingview'),
	(20530988, '2025-07-23 22:00:00+00', 'tradingview'),
	(20577120, '2025-07-22 22:00:00+00', 'tradingview'),
	(20415555, '2025-07-21 22:00:00+00', 'tradingview'),
	(19986229, '2025-07-18 22:00:00+00', 'tradingview'),
	(20014367, '2025-07-17 22:00:00+00', 'tradingview'),
	(19822691, '2025-07-16 22:00:00+00', 'tradingview'),
	(19720490, '2025-07-15 22:00:00+00', 'tradingview'),
	(19902297, '2025-07-14 22:00:00+00', 'tradingview'),
	(20014436, '2025-07-11 22:00:00+00', 'tradingview'),
	(19285797, '2025-07-10 22:00:00+00', 'tradingview'),
	(19002881, '2025-07-09 22:00:00+00', 'tradingview'),
	(19171660, '2025-07-08 22:00:00+00', 'tradingview'),
	(19170479, '2025-07-07 22:00:00+00', 'tradingview'),
	(19200321, '2025-07-04 22:00:00+00', 'tradingview'),
	(19185860, '2025-07-03 22:00:00+00', 'tradingview'),
	(19070613, '2025-07-02 22:00:00+00', 'tradingview'),
	(18738543, '2025-07-01 22:00:00+00', 'tradingview'),
	(18827352, '2025-06-30 22:00:00+00', 'tradingview'),
	(18727362, '2025-06-27 22:00:00+00', 'tradingview'),
	(19119180, '2025-06-26 22:00:00+00', 'tradingview'),
	(18979028, '2025-06-25 22:00:00+00', 'tradingview'),
	(18889792, '2025-06-24 22:00:00+00', 'tradingview'),
	(19120426, '2025-06-23 22:00:00+00', 'tradingview'),
	(18944944, '2025-06-20 22:00:00+00', 'tradingview'),
	(19155264, '2025-06-19 22:00:00+00', 'tradingview'),
	(19259982, '2025-06-18 22:00:00+00', 'tradingview'),
	(19410758, '2025-06-17 22:00:00+00', 'tradingview'),
	(19005895, '2025-06-16 22:00:00+00', 'tradingview'),
	(19009236, '2025-06-13 22:00:00+00', 'tradingview'),
	(18961735, '2025-06-12 22:00:00+00', 'tradingview'),
	(18932168, '2025-06-11 22:00:00+00', 'tradingview'),
	(19105571, '2025-06-10 22:00:00+00', 'tradingview'),
	(19222276, '2025-06-09 22:00:00+00', 'tradingview'),
	(18817609, '2025-06-06 22:00:00+00', 'tradingview'),
	(18640064, '2025-06-05 22:00:00+00', 'tradingview'),
	(18041655, '2025-06-04 22:00:00+00', 'tradingview'),
	(18069457, '2025-06-03 22:00:00+00', 'tradingview'),
	(18197349, '2025-06-02 22:00:00+00', 'tradingview'),
	(17275470, '2025-05-30 22:00:00+00', 'tradingview'),
	(17447801, '2025-05-29 22:00:00+00', 'tradingview'),
	(17253387, '2025-05-28 22:00:00+00', 'tradingview'),
	(17387656, '2025-05-27 22:00:00+00', 'tradingview'),
	(17467886, '2025-05-26 22:00:00+00', 'tradingview'),
	(17452912, '2025-05-23 22:00:00+00', 'tradingview'),
	(17321216, '2025-05-22 22:00:00+00', 'tradingview'),
	(17588109, '2025-05-21 22:00:00+00', 'tradingview'),
	(17444408, '2025-05-20 22:00:00+00', 'tradingview'),
	(17075869, '2025-05-19 22:00:00+00', 'tradingview'),
	(17054055, '2025-05-16 22:00:00+00', 'tradingview'),
	(17318106, '2025-05-15 22:00:00+00', 'tradingview'),
	(17130858, '2025-05-14 22:00:00+00', 'tradingview'),
	(17465764, '2025-05-13 22:00:00+00', 'tradingview'),
	(17291031, '2025-05-12 22:00:00+00', 'tradingview'),
	(17365487, '2025-05-09 22:00:00+00', 'tradingview'),
	(17201655, '2025-05-08 22:00:00+00', 'tradingview'),
	(17234458, '2025-05-07 22:00:00+00', 'tradingview'),
	(17565398, '2025-05-06 22:00:00+00', 'tradingview'),
	(17141197, '2025-05-05 22:00:00+00', 'tradingview'),
	(16901662, '2025-05-02 22:00:00+00', 'tradingview'),
	(17282983, '2025-05-01 22:00:00+00', 'tradingview'),
	(17390180, '2025-04-30 22:00:00+00', 'tradingview'),
	(17734444, '2025-04-29 22:00:00+00', 'tradingview'),
	(17952610, '2025-04-28 22:00:00+00', 'tradingview'),
	(17893670, '2025-04-25 22:00:00+00', 'tradingview'),
	(18197774, '2025-04-24 22:00:00+00', 'tradingview'),
	(18190861, '2025-04-23 22:00:00+00', 'tradingview'),
	(17585975, '2025-04-22 22:00:00+00', 'tradingview'),
	(17647685, '2025-04-21 22:00:00+00', 'tradingview'),
	(17600074, '2025-04-18 22:00:00+00', 'tradingview'),
	(17603270, '2025-04-17 22:00:00+00', 'tradingview'),
	(17702670, '2025-04-16 22:00:00+00', 'tradingview'),
	(17456651, '2025-04-15 22:00:00+00', 'tradingview'),
	(17430705, '2025-04-14 22:00:00+00', 'tradingview'),
	(17421442, '2025-04-11 22:00:00+00', 'tradingview'),
	(16856470, '2025-04-10 22:00:00+00', 'tradingview'),
	(16792744, '2025-04-09 22:00:00+00', 'tradingview'),
	(16147887, '2025-04-08 22:00:00+00', 'tradingview'),
	(16008877, '2025-04-07 22:00:00+00', 'tradingview'),
	(15747986, '2025-04-04 22:00:00+00', 'tradingview'),
	(16935901, '2025-04-03 22:00:00+00', 'tradingview'),
	(18039749, '2025-04-02 22:00:00+00', 'tradingview'),
	(17920291, '2025-04-01 22:00:00+00', 'tradingview'),
	(18126630, '2025-03-31 22:00:00+00', 'tradingview'),
	(18155268, '2025-03-28 22:00:00+00', 'tradingview'),
	(18299123, '2025-03-27 22:00:00+00', 'tradingview'),
	(17905721, '2025-03-26 22:00:00+00', 'tradingview'),
	(17979490, '2025-03-25 22:00:00+00', 'tradingview'),
	(17562130, '2025-03-24 22:00:00+00', 'tradingview'),
	(17511422, '2025-03-21 22:00:00+00', 'tradingview'),
	(17769977, '2025-03-20 22:00:00+00', 'tradingview'),
	(17945581, '2025-03-19 22:00:00+00', 'tradingview'),
	(17953520, '2025-03-18 22:00:00+00', 'tradingview'),
	(17837760, '2025-03-17 22:00:00+00', 'tradingview'),
	(17778840, '2025-03-14 22:00:00+00', 'tradingview'),
	(17871753, '2025-03-13 22:00:00+00', 'tradingview'),
	(17552742, '2025-03-12 22:00:00+00', 'tradingview'),
	(17360801, '2025-03-11 22:00:00+00', 'tradingview'),
	(16851624, '2025-03-10 22:00:00+00', 'tradingview'),
	(17025589, '2025-03-07 22:00:00+00', 'tradingview'),
	(17123060, '2025-03-06 22:00:00+00', 'tradingview'),
	(17111566, '2025-03-05 22:00:00+00', 'tradingview'),
	(16887497, '2025-03-04 22:00:00+00', 'tradingview'),
	(16769873, '2025-03-03 22:00:00+00', 'tradingview'),
	(16581127, '2025-02-28 22:00:00+00', 'tradingview'),
	(16512918, '2025-02-27 22:00:00+00', 'tradingview'),
	(16761972, '2025-02-26 22:00:00+00', 'tradingview'),
	(16668067, '2025-02-25 22:00:00+00', 'tradingview'),
	(16909511, '2025-02-24 22:00:00+00', 'tradingview'),
	(16990957, '2025-02-21 22:00:00+00', 'tradingview'),
	(17294135, '2025-02-20 22:00:00+00', 'tradingview'),
	(17162503, '2025-02-19 22:00:00+00', 'tradingview'),
	(17187222, '2025-02-18 22:00:00+00', 'tradingview'),
	(16861736, '2025-02-17 22:00:00+00', 'tradingview'),
	(16781012, '2025-02-14 22:00:00+00', 'tradingview'),
	(16994681, '2025-02-13 22:00:00+00', 'tradingview'),
	(16941053, '2025-02-12 22:00:00+00', 'tradingview'),
	(16739267, '2025-02-11 22:00:00+00', 'tradingview'),
	(16821981, '2025-02-10 22:00:00+00', 'tradingview'),
	(16617645, '2025-02-07 22:00:00+00', 'tradingview'),
	(16885872, '2025-02-06 22:00:00+00', 'tradingview'),
	(16895811, '2025-02-05 22:00:00+00', 'tradingview'),
	(16871978, '2025-02-04 22:00:00+00', 'tradingview'),
	(16666892, '2025-02-03 22:00:00+00', 'tradingview'),
	(16396163, '2025-01-31 22:00:00+00', 'tradingview'),
	(16530643, '2025-01-30 22:00:00+00', 'tradingview'),
	(16012322, '2025-01-29 22:00:00+00', 'tradingview'),
	(15798568, '2025-01-28 22:00:00+00', 'tradingview'),
	(15687972, '2025-01-27 22:00:00+00', 'tradingview'),
	(15865184, '2025-01-24 22:00:00+00', 'tradingview'),
	(15898559, '2025-01-23 22:00:00+00', 'tradingview'),
	(16112303, '2025-01-22 22:00:00+00', 'tradingview'),
	(16156076, '2025-01-21 22:00:00+00', 'tradingview'),
	(16020378, '2025-01-20 22:00:00+00', 'tradingview'),
	(15949043, '2025-01-17 22:00:00+00', 'tradingview'),
	(16190296, '2025-01-16 22:00:00+00', 'tradingview'),
	(16077773, '2025-01-15 22:00:00+00', 'tradingview'),
	(15613193, '2025-01-14 22:00:00+00', 'tradingview'),
	(15483695, '2025-01-13 22:00:00+00', 'tradingview'),
	(48136015, '2026-01-13 17:30:36.425+00', 'tradingview'),
	(47163459, '2026-01-13 18:00:30.122+00', 'tradingview'),
	(47077253, '2026-01-13 18:30:29.1+00', 'tradingview'),
	(47463429, '2026-01-13 19:00:29.057+00', 'tradingview'),
	(47617361, '2026-01-13 19:30:29.678+00', 'tradingview'),
	(47367496, '2026-01-13 20:00:29.116+00', 'tradingview'),
	(46990169, '2026-01-13 20:30:29.451+00', 'tradingview'),
	(47037883, '2026-01-13 21:00:29.131+00', 'tradingview'),
	(47160254, '2026-01-13 21:30:29.089+00', 'tradingview'),
	(47134105, '2026-01-13 22:00:29.077+00', 'tradingview'),
	(15802676, '2025-01-10 22:00:00+00', 'tradingview'),
	(15670930, '2025-01-09 22:00:00+00', 'tradingview'),
	(15655244, '2025-01-08 22:00:00+00', 'tradingview'),
	(15564981, '2025-01-07 22:00:00+00', 'tradingview'),
	(15580294, '2025-01-06 22:00:00+00', 'tradingview'),
	(15400209, '2025-01-03 22:00:00+00', 'tradingview'),
	(15365304, '2025-01-02 22:00:00+00', 'tradingview'),
	(14946966, '2025-01-01 22:00:00+00', 'tradingview'),
	(47138491, '2026-01-13 22:30:29.008+00', 'tradingview');


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
	('985e02a6-100c-484d-9a88-905b17b1ddc8', 'catalog', '909a20e9-4338-44c9-8f77-900e8bff0613/1768200832976.webp', '975d5e46-7a11-46a8-833a-da92ba8162c0', '2026-01-12 06:53:54.56128+00', '2026-01-12 06:53:54.56128+00', '2026-01-12 06:53:54.56128+00', '{"eTag": "\"d166e0d327aa326e07e34671fc1d55cd\"", "size": 361940, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-01-12T06:53:55.000Z", "contentLength": 361940, "httpStatusCode": 200}', 'a713f394-ef6b-4ef8-974b-c4bbecdcdca9', '975d5e46-7a11-46a8-833a-da92ba8162c0', '{}', 2),
	('892ffdd3-9e22-4240-ac5e-491c970b0553', 'catalog', '864ff9ad-4bfd-4d93-afcd-997f3f3ae370/1765343924999.webp', NULL, '2025-12-16 01:57:52.76352+00', '2025-12-16 01:57:52.76352+00', '2025-12-16 01:57:52.76352+00', '{"eTag": "\"c445917bf3403768cf19211195a4c8d3\"", "size": 600206, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-16T01:57:53.000Z", "contentLength": 600206, "httpStatusCode": 200}', 'd6cd2760-54dd-4ada-9163-d37a6ffce335', NULL, '{}', 2),
	('3dea13b7-4639-44b9-a09f-6b1fedc77d01', 'catalog', '90af6c73-7e1b-4a49-acdf-f239144b8ec4/1765344093685.webp', NULL, '2025-12-16 01:57:54.914983+00', '2025-12-16 01:57:54.914983+00', '2025-12-16 01:57:54.914983+00', '{"eTag": "\"94a9cf774755c6e2528beadeabd2271d\"", "size": 629414, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-16T01:57:55.000Z", "contentLength": 629414, "httpStatusCode": 200}', 'ab2b6518-219c-4fa2-b8dd-750bb04efc2a', NULL, '{}', 2),
	('956b2992-551e-44a9-bd48-d16edb0da5dd', 'catalog', 'b8a7aa3d-5369-444a-80c6-10bfb2b42601/1768205606050.webp', '975d5e46-7a11-46a8-833a-da92ba8162c0', '2026-01-12 08:13:26.849317+00', '2026-01-12 08:13:26.849317+00', '2026-01-12 08:13:26.849317+00', '{"eTag": "\"87790dffa5894c429717e02c25ebda24\"", "size": 275200, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-01-12T08:13:27.000Z", "contentLength": 275200, "httpStatusCode": 200}', 'b7875ead-5a35-49cb-bfa5-e20e614e77f1', '975d5e46-7a11-46a8-833a-da92ba8162c0', '{}', 2),
	('7fe627a1-aa7f-4d9e-830d-9a788c761a79', 'catalog', 'baroque-pearl-citrine-silver-brooch.webp', NULL, '2025-12-16 01:57:56.280978+00', '2025-12-16 01:57:56.280978+00', '2025-12-16 01:57:56.280978+00', '{"eTag": "\"37eba633f445989e45c33429b40bb587\"", "size": 288812, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-16T01:57:57.000Z", "contentLength": 288812, "httpStatusCode": 200}', '2209082f-ed1d-4775-a4e2-f683807d5714', NULL, '{}', 1),
	('a73ac259-77aa-4e5d-8e05-5e5fe57d250b', 'catalog', 'hand-carved-silver-floral-relief-cuff-bracelet-salimsilver.webp', NULL, '2025-12-16 01:57:57.586001+00', '2025-12-16 01:57:57.586001+00', '2025-12-16 01:57:57.586001+00', '{"eTag": "\"9207173cade628952ec4be945eb69d01\"", "size": 297872, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-16T01:57:58.000Z", "contentLength": 297872, "httpStatusCode": 200}', 'b70a07dc-6a1c-4ec5-9094-1a89b1f16a82', NULL, '{}', 1),
	('4aaa587b-8160-4e5a-9ffb-9eff7e428c8f', 'catalog', 'hand-carved-silver-moonstone-brooch-salimsilver.webp', NULL, '2025-12-16 01:57:58.689649+00', '2025-12-16 01:57:58.689649+00', '2025-12-16 01:57:58.689649+00', '{"eTag": "\"e193d2391d78f1a69bc7c71e2378e266\"", "size": 272214, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-16T01:57:59.000Z", "contentLength": 272214, "httpStatusCode": 200}', 'dd4b6e27-5062-4abd-ab7b-cb2081bce219', NULL, '{}', 1),
	('9a6ecf85-7cd9-4b47-a7d9-e23c8c464d5d', 'catalog', 'hand-carved-silver-pearl-brooch-salimsilver.webp', NULL, '2025-12-16 01:58:01.179539+00', '2025-12-16 01:58:01.179539+00', '2025-12-16 01:58:01.179539+00', '{"eTag": "\"83232371b5614edfb2a2c894cd870de1\"", "size": 233966, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-16T01:58:02.000Z", "contentLength": 233966, "httpStatusCode": 200}', '404489e3-a8a7-435c-a544-e29de02a4280', NULL, '{}', 1),
	('8a77a470-1931-440e-a034-16c292581662', 'catalog', 'hand-carved-silver-rings-couple-salimsilver.webp', NULL, '2025-12-16 01:58:02.341297+00', '2025-12-16 01:58:02.341297+00', '2025-12-16 01:58:02.341297+00', '{"eTag": "\"dccf1f21179d94478f5d0e68c88bba2f\"", "size": 306422, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-16T01:58:03.000Z", "contentLength": 306422, "httpStatusCode": 200}', '7f74f625-e1d7-4539-b5de-77b667de25f5', NULL, '{}', 1),
	('d6a2bc5e-15bf-4042-bb09-cae41da13666', 'catalog', 'hand-carved-silver-turquoise-ring-salimsilver.webp', NULL, '2025-12-16 01:58:03.506292+00', '2025-12-16 01:58:03.506292+00', '2025-12-16 01:58:03.506292+00', '{"eTag": "\"ad9153aa8cad7644d9811ee6365c8a66\"", "size": 284190, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-16T01:58:04.000Z", "contentLength": 284190, "httpStatusCode": 200}', 'fb6f0190-35f0-4335-9a6e-63b6d647972a', NULL, '{}', 1),
	('1dc1d5dd-6592-47f7-a9da-6dbe2ba3595c', 'catalog', 'silver-dragonfly-amethyst-drop-earrings-salimsilver.webp', NULL, '2025-12-16 01:58:04.842885+00', '2025-12-16 01:58:04.842885+00', '2025-12-16 01:58:04.842885+00', '{"eTag": "\"bebd06251455c7336e45e629c239818c\"", "size": 478846, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-16T01:58:05.000Z", "contentLength": 478846, "httpStatusCode": 200}', '13eae940-5abb-4631-b0c6-2a41b164e7e1', NULL, '{}', 1),
	('e444c2b1-49c7-4fa7-b6fe-00ae6fbbe7cf', 'catalog', 'silver-filigree-ruby-cuff-bracelet-salimsilver.webp', NULL, '2025-12-16 01:58:06.080248+00', '2025-12-16 01:58:06.080248+00', '2025-12-16 01:58:06.080248+00', '{"eTag": "\"53d70a18af9196d2cd57c37ce4868da0\"", "size": 345638, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-16T01:58:07.000Z", "contentLength": 345638, "httpStatusCode": 200}', 'ee53c698-3b98-4487-a7a9-b1574148074f', NULL, '{}', 1),
	('da444bcf-0f83-4c7e-a52f-ce4797296be3', 'catalog', 'silver-gold-floral-lotus-brooch-salimsilver.webp', NULL, '2025-12-16 01:58:07.397482+00', '2025-12-16 01:58:07.397482+00', '2025-12-16 01:58:07.397482+00', '{"eTag": "\"d24b01df760e4357bdc9643d537d8829\"", "size": 409160, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-16T01:58:08.000Z", "contentLength": 409160, "httpStatusCode": 200}', '477638a9-7277-4540-b302-658f4df22d35', NULL, '{}', 1),
	('c159c3cc-6cd2-431e-aa35-a30ac379e500', 'catalog', '557cd058-b661-4980-8e7c-a45b5cd77fa4/1768201342761.webp', '975d5e46-7a11-46a8-833a-da92ba8162c0', '2026-01-12 07:02:23.301449+00', '2026-01-12 07:02:23.301449+00', '2026-01-12 07:02:23.301449+00', '{"eTag": "\"7ec1d418faa7f9641c4aeea1c045b906\"", "size": 311524, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-01-12T07:02:24.000Z", "contentLength": 311524, "httpStatusCode": 200}', '738e1abb-bcae-407b-90ba-51a4b8e5d27c', '975d5e46-7a11-46a8-833a-da92ba8162c0', '{}', 2),
	('cdfa2a60-34e3-4cf2-9f9b-cce0db602441', 'catalog', 'silver-hibiscus-locket-purple-stone-pendant-necklace-salimsilver.webp', NULL, '2025-12-16 01:58:08.651315+00', '2025-12-16 01:58:08.651315+00', '2025-12-16 01:58:08.651315+00', '{"eTag": "\"c022b88f5fefade49cfffe683f343fc9\"", "size": 287996, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-16T01:58:09.000Z", "contentLength": 287996, "httpStatusCode": 200}', '7677e493-9578-45ba-a68a-f0aada2eedfa', NULL, '{}', 1),
	('068de96d-0b5f-4a4f-95e0-89adc7b4d000', 'catalog', 'silver-mamuli-earrings-salimsilver.webp', NULL, '2025-12-16 01:58:09.841503+00', '2025-12-16 01:58:09.841503+00', '2025-12-16 01:58:09.841503+00', '{"eTag": "\"dd275be4d9947914bfede62e8d253604\"", "size": 253346, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-16T01:58:10.000Z", "contentLength": 253346, "httpStatusCode": 200}', '15cbd700-c9d4-4c42-88b3-5198b43c3ee3', NULL, '{}', 1),
	('39b75f4e-1b75-4ad5-9e63-17601ffa0cf9', 'catalog', '0266e1fe-0969-4bef-be01-4c8037eb10d9/1768208165964.webp', '975d5e46-7a11-46a8-833a-da92ba8162c0', '2026-01-12 08:56:07.070784+00', '2026-01-12 08:56:07.070784+00', '2026-01-12 08:56:07.070784+00', '{"eTag": "\"3b03d627757023dc9de8530e0abbbb72\"", "size": 98376, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-01-12T08:56:08.000Z", "contentLength": 98376, "httpStatusCode": 200}', '93de4c55-5e39-415d-8168-3dea53e79caf', '975d5e46-7a11-46a8-833a-da92ba8162c0', '{}', 2),
	('1c1ca3cf-f25b-4f1f-90c6-4f54e20b7a1d', 'catalog', 'silver-pagoda-ring-pearl-salimsilver.webp', NULL, '2025-12-16 01:58:11.000313+00', '2025-12-16 01:58:11.000313+00', '2025-12-16 01:58:11.000313+00', '{"eTag": "\"3c591401fb71a52f3655ec1a327c569f\"", "size": 240960, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-16T01:58:11.000Z", "contentLength": 240960, "httpStatusCode": 200}', 'd2441917-bc7b-401e-a39d-79e9905e916c', NULL, '{}', 1),
	('e37b8873-913e-4cc5-b67c-2ab83c91206c', 'catalog', 'silver-pendant-labradorite-eye-dot-jewelry-salimsilver.webp', NULL, '2025-12-16 01:58:12.214695+00', '2025-12-16 01:58:12.214695+00', '2025-12-16 01:58:12.214695+00', '{"eTag": "\"aecac1db6ca0360233ae03e4a26604cf\"", "size": 372170, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-16T01:58:13.000Z", "contentLength": 372170, "httpStatusCode": 200}', '86b5ec8b-f7eb-4517-90e6-dba369eedbc7', NULL, '{}', 1),
	('56775557-f934-4064-85fb-dd5f7f5b50a9', 'catalog', '56502e9f-24f9-4407-8622-6b69ff365786/1768208351690.webp', '975d5e46-7a11-46a8-833a-da92ba8162c0', '2026-01-12 08:59:12.442755+00', '2026-01-12 08:59:12.442755+00', '2026-01-12 08:59:12.442755+00', '{"eTag": "\"87790dffa5894c429717e02c25ebda24\"", "size": 275200, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-01-12T08:59:13.000Z", "contentLength": 275200, "httpStatusCode": 200}', 'f1d7ffcb-bdab-4615-8c87-bb5f99167532', '975d5e46-7a11-46a8-833a-da92ba8162c0', '{}', 2),
	('97b5ac7a-84e6-4166-b91f-af6a76087ab2', 'catalog', 'silver-ruby-filigree-earrings-salimsilver.webp', NULL, '2025-12-16 01:58:13.332983+00', '2025-12-16 01:58:13.332983+00', '2025-12-16 01:58:13.332983+00', '{"eTag": "\"42aab3549d8bfb2aa554bec8e9141a17\"", "size": 230228, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-16T01:58:14.000Z", "contentLength": 230228, "httpStatusCode": 200}', '463ca99c-b572-419a-b28e-021628d2f7a4', NULL, '{}', 1),
	('b1d4153d-5916-4592-a243-b6e6d9cf8057', 'catalog', 'cd40444d-33e3-43bf-875a-5b0925db6baf/1768208782771.webp', '975d5e46-7a11-46a8-833a-da92ba8162c0', '2026-01-12 09:06:23.44222+00', '2026-01-12 09:06:23.44222+00', '2026-01-12 09:06:23.44222+00', '{"eTag": "\"0959ff0af0190beb19a56480ccd1f1f2\"", "size": 346422, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-01-12T09:06:24.000Z", "contentLength": 346422, "httpStatusCode": 200}', 'dedc2a0e-79b2-49e8-b306-d38725ca1613', '975d5e46-7a11-46a8-833a-da92ba8162c0', '{}', 2),
	('cf4364ba-0b5f-4cd8-beb1-cf5490363fdd', 'catalog', 'silver-seahorse-charm-bracelet-salimsilver.webp', NULL, '2025-12-16 01:58:14.599087+00', '2025-12-16 01:58:14.599087+00', '2025-12-16 01:58:14.599087+00', '{"eTag": "\"8dd0eb3f7455c94398acb5a1f9a00339\"", "size": 331542, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-16T01:58:15.000Z", "contentLength": 331542, "httpStatusCode": 200}', '9988eb0a-b641-42ed-9abd-2169a415c674', NULL, '{}', 1),
	('50676642-ade9-47de-996b-f54aab8dbc3d', 'catalog', '3eca98aa-d74e-469d-84d9-7414e20b29e9/1768210197377.webp', '975d5e46-7a11-46a8-833a-da92ba8162c0', '2026-01-12 09:29:58.305115+00', '2026-01-12 09:29:58.305115+00', '2026-01-12 09:29:58.305115+00', '{"eTag": "\"89cf85b3ddc353e2defc7656aa5832c6\"", "size": 387390, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-01-12T09:29:59.000Z", "contentLength": 387390, "httpStatusCode": 200}', '62c67471-4f2d-422c-a9c1-124eb48d49f2', '975d5e46-7a11-46a8-833a-da92ba8162c0', '{}', 2),
	('2c1e8667-7a98-40c4-9b10-4a8f203f041a', 'catalog', 'silver-seahorse-pendant-amber-salimsilver.webp', NULL, '2025-12-16 01:58:15.817054+00', '2025-12-16 01:58:15.817054+00', '2025-12-16 01:58:15.817054+00', '{"eTag": "\"c0687527dcf8cc975bd58963c5a31ac0\"", "size": 260904, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-12-16T01:58:16.000Z", "contentLength": 260904, "httpStatusCode": 200}', 'f2623246-4760-4d35-b541-04f0c2d57901', NULL, '{}', 1),
	('832ad305-3c4d-4925-b961-8d31e6b2312d', 'blog', 'blog/1767944220100-GeminiGeneratedImagehrtabbhrtabbhrta.webp', 'da94210b-5152-497a-8634-3fc5b3b0178c', '2026-01-09 07:37:00.633296+00', '2026-01-09 07:37:00.633296+00', '2026-01-09 07:37:00.633296+00', '{"eTag": "\"02460893a7bf01db199e7f08493eeee6\"", "size": 163420, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-01-09T07:37:01.000Z", "contentLength": 163420, "httpStatusCode": 200}', '64ec493e-d444-4845-836b-32618c3a6f22', 'da94210b-5152-497a-8634-3fc5b3b0178c', '{}', 2),
	('53012332-ae55-4f3e-92d5-a7ecb167775f', 'catalog', '03601048-92ca-4a04-9993-1f5ae59ad31c/1768202072640.webp', '975d5e46-7a11-46a8-833a-da92ba8162c0', '2026-01-12 07:14:33.628307+00', '2026-01-12 07:14:33.628307+00', '2026-01-12 07:14:33.628307+00', '{"eTag": "\"983506f49acde2fcf823d495812a298d\"", "size": 336310, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-01-12T07:14:34.000Z", "contentLength": 336310, "httpStatusCode": 200}', '8d3b4118-e094-4251-96cc-3d6643bdb80b', '975d5e46-7a11-46a8-833a-da92ba8162c0', '{}', 2),
	('85019419-66cf-4d51-af98-afe3d2e3e620', 'catalog', '547fe2ed-6572-49d8-9b27-e4313cf19e06/1768208461577.webp', '975d5e46-7a11-46a8-833a-da92ba8162c0', '2026-01-12 09:01:02.572333+00', '2026-01-12 09:01:02.572333+00', '2026-01-12 09:01:02.572333+00', '{"eTag": "\"5bc7cf86c65690d8df110ee446657f20\"", "size": 57072, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-01-12T09:01:03.000Z", "contentLength": 57072, "httpStatusCode": 200}', '2f9dd71e-b663-4935-889c-7230f5eae3b4', '975d5e46-7a11-46a8-833a-da92ba8162c0', '{}', 2),
	('ba796662-2198-4bc7-9d48-74f23cdd73c7', 'catalog', 'a3b76ec5-58f3-4d63-ba55-3a8d41c4f866/1768209931469.webp', '975d5e46-7a11-46a8-833a-da92ba8162c0', '2026-01-12 09:25:32.136776+00', '2026-01-12 09:25:32.136776+00', '2026-01-12 09:25:32.136776+00', '{"eTag": "\"0472f6903e8b481c0d4d1c5f2d7e7a31\"", "size": 336654, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-01-12T09:25:33.000Z", "contentLength": 336654, "httpStatusCode": 200}', 'a0fbe211-c8bb-4f94-a513-46f921188da8', '975d5e46-7a11-46a8-833a-da92ba8162c0', '{}', 2),
	('c062a8dc-5bef-4d30-b866-4b2c81990649', 'catalog', 'fd56cb6d-5d99-494e-8192-916ba91a0ca2/1768210573064.webp', '975d5e46-7a11-46a8-833a-da92ba8162c0', '2026-01-12 09:36:14.77404+00', '2026-01-12 09:36:14.77404+00', '2026-01-12 09:36:14.77404+00', '{"eTag": "\"245e751d607de31ed4512cca7c64dbe1\"", "size": 115516, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-01-12T09:36:15.000Z", "contentLength": 115516, "httpStatusCode": 200}', 'c4a7d59b-0018-43be-bfb1-6d25b9fa9ea3', '975d5e46-7a11-46a8-833a-da92ba8162c0', '{}', 2),
	('9e4234a8-7557-4640-8854-b3340ea3fd40', 'catalog', 'aa35feb7-5636-4fe3-99e8-54db35ee8522/1768211360203.webp', '975d5e46-7a11-46a8-833a-da92ba8162c0', '2026-01-12 09:49:20.869245+00', '2026-01-12 09:49:20.869245+00', '2026-01-12 09:49:20.869245+00', '{"eTag": "\"5b1667eb9e34146845aa8bf336ec8811\"", "size": 357314, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-01-12T09:49:21.000Z", "contentLength": 357314, "httpStatusCode": 200}', '7ccceb92-e2b9-4af3-a68d-99c64cf5c92c', '975d5e46-7a11-46a8-833a-da92ba8162c0', '{}', 2),
	('e0779db7-b97c-4583-93b8-46bb0fcd026c', 'blog', 'priyo-s.webp', NULL, '2026-01-09 11:14:48.451059+00', '2026-01-09 11:14:48.451059+00', '2026-01-09 11:14:48.451059+00', '{"eTag": "\"0387a33d9d089d82a2955a54299c8aac-1\"", "size": 5944, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-01-09T11:14:49.000Z", "contentLength": 5944, "httpStatusCode": 200}', '652e783a-400f-47fa-8bfa-1875d906267f', NULL, NULL, 1),
	('5743c436-fccb-4eaa-9352-60257f01a601', 'blog', 'aditya-c.webp', NULL, '2026-01-09 11:14:48.480172+00', '2026-01-09 11:14:48.480172+00', '2026-01-09 11:14:48.480172+00', '{"eTag": "\"3d37d210adea9bd6bcfb4198e2ed6fdb-1\"", "size": 9284, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-01-09T11:14:49.000Z", "contentLength": 9284, "httpStatusCode": 200}', '11c0ae50-029e-483d-a943-40cc399af1da', NULL, NULL, 1),
	('b9402c98-283e-4f87-9f2d-36a52a8b9942', 'blog', 'wangi-g.webp', NULL, '2026-01-09 11:26:49.453344+00', '2026-01-09 11:26:49.453344+00', '2026-01-09 11:26:49.453344+00', '{"eTag": "\"45e62633bf215cc85606a7a67b2f8f72-1\"", "size": 7920, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-01-09T11:26:50.000Z", "contentLength": 7920, "httpStatusCode": 200}', 'd211b995-0f13-4008-ae92-15e94fe14fc0', NULL, NULL, 1),
	('4303e0ff-3b60-4a07-8e08-dcd78ba33697', 'catalog', '33e62a51-155b-405f-bad0-3ae4c1fc8085/1768193843530.webp', 'c815afc1-3f72-4a58-a4d6-0b475433c58e', '2026-01-12 04:57:24.236689+00', '2026-01-12 04:57:24.236689+00', '2026-01-12 04:57:24.236689+00', '{"eTag": "\"f7e021698886cd05176ef987e13b3364\"", "size": 421080, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-01-12T04:57:25.000Z", "contentLength": 421080, "httpStatusCode": 200}', '0e28b9c8-bb91-4b62-b210-a58d898cd838', 'c815afc1-3f72-4a58-a4d6-0b475433c58e', '{}', 2),
	('e093bd34-0d05-4149-92e5-f140e2091cc6', 'catalog', '7d794eb4-51ec-4dcd-8b2c-17418bfd940a/1768194995781.webp', '975d5e46-7a11-46a8-833a-da92ba8162c0', '2026-01-12 05:16:36.618446+00', '2026-01-12 05:16:36.618446+00', '2026-01-12 05:16:36.618446+00', '{"eTag": "\"890a63ef7f45644bea0facb6fa345d3f\"", "size": 308984, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-01-12T05:16:37.000Z", "contentLength": 308984, "httpStatusCode": 200}', 'd869a62f-fead-4ef5-9827-08f5b0212489', '975d5e46-7a11-46a8-833a-da92ba8162c0', '{}', 2),
	('8cefd97e-bfb6-437d-b623-3a26d232ab30', 'catalog', 'd75f78a1-e1af-44c6-8ac4-0e918a1d9e85/1768197134495.webp', '975d5e46-7a11-46a8-833a-da92ba8162c0', '2026-01-12 05:52:15.281396+00', '2026-01-12 05:52:15.281396+00', '2026-01-12 05:52:15.281396+00', '{"eTag": "\"d2f9eb0d99ac4cc5cc4d7a610ef736ee\"", "size": 502560, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-01-12T05:52:16.000Z", "contentLength": 502560, "httpStatusCode": 200}', '8e34729b-607c-4a89-b359-2c09e7c39141', '975d5e46-7a11-46a8-833a-da92ba8162c0', '{}', 2),
	('dd675f27-834d-46eb-8042-561bf578040c', 'catalog', '6a56602d-4e81-4eba-b37b-514510e81692/1768198532058.webp', '975d5e46-7a11-46a8-833a-da92ba8162c0', '2026-01-12 06:15:33.017055+00', '2026-01-12 06:15:33.017055+00', '2026-01-12 06:15:33.017055+00', '{"eTag": "\"b173c59f1ded3cd81767fef391a013ec\"", "size": 752660, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-01-12T06:15:33.000Z", "contentLength": 752660, "httpStatusCode": 200}', '6f764348-3a53-421a-a8b6-ba6ac808b5ff', '975d5e46-7a11-46a8-833a-da92ba8162c0', '{}', 2),
	('8b08afa5-8daf-47bb-a741-ee16c9857915', 'blog', 'blog/1768212538345-49616817261c710cd6f3dc.jpg', 'c815afc1-3f72-4a58-a4d6-0b475433c58e', '2026-01-12 10:09:00.419304+00', '2026-01-12 10:09:00.419304+00', '2026-01-12 10:09:00.419304+00', '{"eTag": "\"3cf345898522155532d681a138cb3242\"", "size": 110668, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-01-12T10:09:01.000Z", "contentLength": 110668, "httpStatusCode": 200}', 'b9fdbc1d-fcd9-49e0-bf71-49888f03217d', 'c815afc1-3f72-4a58-a4d6-0b475433c58e', '{}', 2),
	('a44f436c-b561-4266-a3d7-bc7da4d0bcda', 'catalog', 'eb25df3e-89cb-464a-a5c4-c4153602cd2b/1768231866953.webp', '975d5e46-7a11-46a8-833a-da92ba8162c0', '2026-01-12 15:31:10.418187+00', '2026-01-12 15:31:10.418187+00', '2026-01-12 15:31:10.418187+00', '{"eTag": "\"988ffa0d431b316a0e76afe895b13fa0\"", "size": 494552, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-01-12T15:31:11.000Z", "contentLength": 494552, "httpStatusCode": 200}', '6f5af69f-e300-4c4a-b564-5e8664969364', '975d5e46-7a11-46a8-833a-da92ba8162c0', '{}', 2),
	('7d20e1a7-059a-44da-b26e-872d7e106e1e', 'catalog', '7e203f33-67c9-4e9c-9324-11bf94816da9/1768277342846.webp', '975d5e46-7a11-46a8-833a-da92ba8162c0', '2026-01-13 04:09:04.540429+00', '2026-01-13 04:09:04.540429+00', '2026-01-13 04:09:04.540429+00', '{"eTag": "\"810ddf1ee8e055f8604a45847679c1be\"", "size": 449474, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-01-13T04:09:05.000Z", "contentLength": 449474, "httpStatusCode": 200}', '6d3fc5fa-698d-4f41-a5f2-008e92899f4b', '975d5e46-7a11-46a8-833a-da92ba8162c0', '{}', 2);


--
-- Data for Name: prefixes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."prefixes" ("bucket_id", "name", "created_at", "updated_at") VALUES
	('catalog', '0eb1b852-2762-4363-baf3-56e270456aa5', '2025-12-16 01:57:51.157327+00', '2025-12-16 01:57:51.157327+00'),
	('catalog', '864ff9ad-4bfd-4d93-afcd-997f3f3ae370', '2025-12-16 01:57:52.76352+00', '2025-12-16 01:57:52.76352+00'),
	('catalog', '90af6c73-7e1b-4a49-acdf-f239144b8ec4', '2025-12-16 01:57:54.914983+00', '2025-12-16 01:57:54.914983+00'),
	('blog', 'blog', '2026-01-09 07:12:07.591224+00', '2026-01-09 07:12:07.591224+00'),
	('catalog', '33e62a51-155b-405f-bad0-3ae4c1fc8085', '2026-01-12 04:57:24.236689+00', '2026-01-12 04:57:24.236689+00'),
	('catalog', '7d794eb4-51ec-4dcd-8b2c-17418bfd940a', '2026-01-12 05:16:36.618446+00', '2026-01-12 05:16:36.618446+00'),
	('catalog', 'd75f78a1-e1af-44c6-8ac4-0e918a1d9e85', '2026-01-12 05:52:15.281396+00', '2026-01-12 05:52:15.281396+00'),
	('catalog', '6a56602d-4e81-4eba-b37b-514510e81692', '2026-01-12 06:15:33.017055+00', '2026-01-12 06:15:33.017055+00'),
	('catalog', '909a20e9-4338-44c9-8f77-900e8bff0613', '2026-01-12 06:53:54.56128+00', '2026-01-12 06:53:54.56128+00'),
	('catalog', '557cd058-b661-4980-8e7c-a45b5cd77fa4', '2026-01-12 07:02:23.301449+00', '2026-01-12 07:02:23.301449+00'),
	('catalog', '03601048-92ca-4a04-9993-1f5ae59ad31c', '2026-01-12 07:14:33.628307+00', '2026-01-12 07:14:33.628307+00'),
	('catalog', 'b8a7aa3d-5369-444a-80c6-10bfb2b42601', '2026-01-12 08:13:26.849317+00', '2026-01-12 08:13:26.849317+00'),
	('catalog', '0266e1fe-0969-4bef-be01-4c8037eb10d9', '2026-01-12 08:56:07.070784+00', '2026-01-12 08:56:07.070784+00'),
	('catalog', '56502e9f-24f9-4407-8622-6b69ff365786', '2026-01-12 08:59:12.442755+00', '2026-01-12 08:59:12.442755+00'),
	('catalog', '547fe2ed-6572-49d8-9b27-e4313cf19e06', '2026-01-12 09:01:02.572333+00', '2026-01-12 09:01:02.572333+00'),
	('catalog', 'cd40444d-33e3-43bf-875a-5b0925db6baf', '2026-01-12 09:06:23.44222+00', '2026-01-12 09:06:23.44222+00'),
	('catalog', 'a3b76ec5-58f3-4d63-ba55-3a8d41c4f866', '2026-01-12 09:25:32.136776+00', '2026-01-12 09:25:32.136776+00'),
	('catalog', '3eca98aa-d74e-469d-84d9-7414e20b29e9', '2026-01-12 09:29:58.305115+00', '2026-01-12 09:29:58.305115+00'),
	('catalog', 'fd56cb6d-5d99-494e-8192-916ba91a0ca2', '2026-01-12 09:36:14.77404+00', '2026-01-12 09:36:14.77404+00'),
	('catalog', 'aa35feb7-5636-4fe3-99e8-54db35ee8522', '2026-01-12 09:49:20.869245+00', '2026-01-12 09:49:20.869245+00'),
	('catalog', 'eb25df3e-89cb-464a-a5c4-c4153602cd2b', '2026-01-12 15:31:10.418187+00', '2026-01-12 15:31:10.418187+00'),
	('catalog', '7e203f33-67c9-4e9c-9324-11bf94816da9', '2026-01-13 04:09:04.540429+00', '2026-01-13 04:09:04.540429+00');


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

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 130, true);


--
-- PostgreSQL database dump complete
--

-- \unrestrict FWTc6SH0LrzxFkGBZgLZNDpcHxTV9MphWREAGvza5aeCig9oRRAYEFUFNpDa4Vh

RESET ALL;
