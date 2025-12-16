-- Data Dump
BEGIN;

        INSERT INTO public.collections (id, slug, title, description, featured, created_at, updated_at, cover_image_id)
        VALUES ('0c3a39ae-9f0c-423d-8baf-5a0166c105c0', 'rings', 'Rings', 'Handcrafted silver rings', TRUE, '2025-12-08T07:56:58.61044+00:00', '2025-12-08T07:56:58.61044+00:00', NULL)
        ON CONFLICT (id) DO NOTHING;
      

        INSERT INTO public.collections (id, slug, title, description, featured, created_at, updated_at, cover_image_id)
        VALUES ('2cc56012-a490-4c33-9f31-9139eb984fe6', 'pendants', 'Pendants', 'Artisan silver pendants', TRUE, '2025-12-08T07:57:00.982488+00:00', '2025-12-08T07:57:00.982488+00:00', NULL)
        ON CONFLICT (id) DO NOTHING;
      

        INSERT INTO public.collections (id, slug, title, description, featured, created_at, updated_at, cover_image_id)
        VALUES ('372c6c63-1d81-46e7-8c57-3a2dd5918add', 'bracelets', 'Bracelets', 'Artisan silver bracelets', TRUE, '2025-12-08T07:57:03.008148+00:00', '2025-12-08T07:57:03.008148+00:00', NULL)
        ON CONFLICT (id) DO NOTHING;
      

        INSERT INTO public.collections (id, slug, title, description, featured, created_at, updated_at, cover_image_id)
        VALUES ('26982604-8d84-4a7e-80ce-b80b2ac58544', 'brooches', 'Brooches', 'Elegant silver brooches', FALSE, '2025-12-08T07:57:05.135324+00:00', '2025-12-08T07:57:05.135324+00:00', NULL)
        ON CONFLICT (id) DO NOTHING;
      

        INSERT INTO public.collections (id, slug, title, description, featured, created_at, updated_at, cover_image_id)
        VALUES ('3e75b39a-f602-4e34-ac9d-f0dbb35c5264', 'earrings', 'Earrings', 'Handcrafted silver earrings', FALSE, '2025-12-08T07:57:07.115256+00:00', '2025-12-08T07:57:07.115256+00:00', NULL)
        ON CONFLICT (id) DO NOTHING;
      

        INSERT INTO public.collections (id, slug, title, description, featured, created_at, updated_at, cover_image_id)
        VALUES ('3fc15fb3-bffb-46c1-82c2-ebb3176902d8', 'collectibles', 'Collectibles', 'Handcrafted silver collectibles and home decor', FALSE, '2025-12-10T04:22:28.685179+00:00', '2025-12-10T04:22:28.685179+00:00', NULL)
        ON CONFLICT (id) DO NOTHING;
      

        INSERT INTO public.jewelry (id, collection_id, slug, title, description, material, material_purity, weight_grams, crafting_time_hours, production_year, status, variants, created_at, updated_at)
        VALUES ('1cdd00b6-c259-4a48-9391-18dd59c14813', '0c3a39ae-9f0c-423d-8baf-5a0166c105c0', 'hand-carved-silver-rings-couple-salimsilver', 'The Carved Couple: Artisan Carved Silver & White Gemstone Rings', 'Hand-carved sterling silver rings featuring deep, oxidized organic vine engravings and bezel-set clear gemstones.', 'silver', '925', NULL, NULL, NULL, 'available', '[{"type":"Size","options":["6","7","8","9"]}]', '2025-12-08T07:56:58.889657+00:00', '2025-12-08T07:56:58.889657+00:00')
        ON CONFLICT (id) DO NOTHING;
      

        INSERT INTO public.jewelry (id, collection_id, slug, title, description, material, material_purity, weight_grams, crafting_time_hours, production_year, status, variants, created_at, updated_at)
        VALUES ('58836789-b114-41b3-816e-2b1c7c91697b', '0c3a39ae-9f0c-423d-8baf-5a0166c105c0', 'silver-pagoda-ring-pearl-salimsilver', 'The Sanctuary: Sterling Silver Pagoda Ring with Pearl Finial', 'Sculptural silver ring crafted in the shape of a miniature tiered pagoda with intricate metalwork, tiled roofing, and window cutouts, crowned with a lustrous peach pearl.', 'silver', '925', NULL, NULL, NULL, 'available', NULL, '2025-12-08T07:56:59.273154+00:00', '2025-12-08T07:56:59.273154+00:00')
        ON CONFLICT (id) DO NOTHING;
      

        INSERT INTO public.jewelry (id, collection_id, slug, title, description, material, material_purity, weight_grams, crafting_time_hours, production_year, status, variants, created_at, updated_at)
        VALUES ('25262d5a-f84a-439e-8e61-000a2b3853a3', '0c3a39ae-9f0c-423d-8baf-5a0166c105c0', 'hand-carved-silver-turquoise-ring-salimsilver', 'The Verde Filigree: An Artisanal Silver and Turquoise Statement Ring', 'Substantial silver ring set with three round turquoise cabochons, featuring intricate floral filigree and an aged patina.', 'silver', '925', NULL, NULL, NULL, 'available', NULL, '2025-12-08T07:56:59.619476+00:00', '2025-12-08T07:56:59.619476+00:00')
        ON CONFLICT (id) DO NOTHING;
      

        INSERT INTO public.jewelry (id, collection_id, slug, title, description, material, material_purity, weight_grams, crafting_time_hours, production_year, status, variants, created_at, updated_at)
        VALUES ('07bd01d7-a538-4439-8005-76bea8282c03', '2cc56012-a490-4c33-9f31-9139eb984fe6', 'silver-hibiscus-locket-purple-stone-pendant-necklace-salimsilver', 'The Hibiscus Locket: A Hand Carved Silver Statement Piece', 'Open silver locket featuring intricate hibiscus floral engravings and a deep purple stone.', 'silver', '925', NULL, NULL, NULL, 'available', NULL, '2025-12-08T07:57:01.227791+00:00', '2025-12-08T07:57:01.227791+00:00')
        ON CONFLICT (id) DO NOTHING;
      

        INSERT INTO public.jewelry (id, collection_id, slug, title, description, material, material_purity, weight_grams, crafting_time_hours, production_year, status, variants, created_at, updated_at)
        VALUES ('b7ff9279-ce35-49cb-ba55-9bb00969e2ef', '2cc56012-a490-4c33-9f31-9139eb984fe6', 'silver-pendant-labradorite-eye-dot-jewelry-salimsilver', 'The Celestial Shield: Granulated Silver Pendant with Labradorite Eye', 'Handcrafted sterling silver pendant featuring a circular ''shield'' design with intricate granulation beads radiating from a central, bezel-set labradorite stone. The silver boasts a rich antique finish.', 'silver', '925', NULL, NULL, NULL, 'available', NULL, '2025-12-08T07:57:01.622288+00:00', '2025-12-08T07:57:01.622288+00:00')
        ON CONFLICT (id) DO NOTHING;
      

        INSERT INTO public.jewelry (id, collection_id, slug, title, description, material, material_purity, weight_grams, crafting_time_hours, production_year, status, variants, created_at, updated_at)
        VALUES ('c67c03ca-5dbe-4279-9043-b2c381c2122d', '2cc56012-a490-4c33-9f31-9139eb984fe6', 'silver-seahorse-pendant-amber-salimsilver', 'The Maritime Dual: Artisan Silver Seahorse Pendant', 'Intricate silver double-seahorse pendant featuring amber and green gemstone accents with detailed metal texture.', 'silver', '925', NULL, NULL, NULL, 'available', NULL, '2025-12-08T07:57:01.985765+00:00', '2025-12-08T07:57:01.985765+00:00')
        ON CONFLICT (id) DO NOTHING;
      

        INSERT INTO public.jewelry (id, collection_id, slug, title, description, material, material_purity, weight_grams, crafting_time_hours, production_year, status, variants, created_at, updated_at)
        VALUES ('44a9a772-bb4f-4e64-aa94-c6d3d1fd71f5', '372c6c63-1d81-46e7-8c57-3a2dd5918add', 'silver-filigree-ruby-cuff-bracelet-salimsilver', 'The Filigree Sunburst Cuff: An Artisan Statement Piece with Ruby', 'Handcrafted silver filigree cuff bracelet featuring a large, hammered silver disc with an intricate central filigree pattern and a deep red ruby gemstone. The openwork band is adorned with delicate silver scrollwork.', 'silver', '925', NULL, NULL, NULL, 'available', NULL, '2025-12-08T07:57:03.274324+00:00', '2025-12-08T07:57:03.274324+00:00')
        ON CONFLICT (id) DO NOTHING;
      

        INSERT INTO public.jewelry (id, collection_id, slug, title, description, material, material_purity, weight_grams, crafting_time_hours, production_year, status, variants, created_at, updated_at)
        VALUES ('4872ba9e-01ca-434e-af60-726baa474cd5', '372c6c63-1d81-46e7-8c57-3a2dd5918add', 'silver-seahorse-charm-bracelet-salimsilver', 'The Coastal Artisan: A Silver Seahorse Charm Bracelet', 'Silver seahorse charm bracelet with metallic texture and intricate detailing on the charms and chain. A piece that evokes an artisanal and luxurious feel.', 'silver', '925', NULL, NULL, NULL, 'available', NULL, '2025-12-08T07:57:03.935109+00:00', '2025-12-08T07:57:03.935109+00:00')
        ON CONFLICT (id) DO NOTHING;
      

        INSERT INTO public.jewelry (id, collection_id, slug, title, description, material, material_purity, weight_grams, crafting_time_hours, production_year, status, variants, created_at, updated_at)
        VALUES ('51265bbe-67cd-4a5a-9fe6-3cd9ace223db', '26982604-8d84-4a7e-80ce-b80b2ac58544', 'silver-gold-floral-lotus-brooch-salimsilver', 'The Gilded Bloom: Silver and Gold Lotus Flower Brooch', 'Two-tone floral brooch with a textured gold top layer of petals over a silver base, featuring a detailed beaded center.', 'silver', '925', NULL, NULL, NULL, 'available', NULL, '2025-12-08T07:57:05.477707+00:00', '2025-12-08T07:57:05.477707+00:00')
        ON CONFLICT (id) DO NOTHING;
      

        INSERT INTO public.jewelry (id, collection_id, slug, title, description, material, material_purity, weight_grams, crafting_time_hours, production_year, status, variants, created_at, updated_at)
        VALUES ('e2651c43-0e53-4190-8c69-51a9ae90a857', '26982604-8d84-4a7e-80ce-b80b2ac58544', 'hand-carved-silver-moonstone-brooch-salimsilver', 'The Moonlit Hand Carved: An Artisan Silver Moonstone Brooch', 'Ornate silver brooch with a central moonstone cabochon and intricate metalwork.', 'silver', '925', NULL, NULL, NULL, 'available', NULL, '2025-12-08T07:57:05.773946+00:00', '2025-12-08T07:57:05.773946+00:00')
        ON CONFLICT (id) DO NOTHING;
      

        INSERT INTO public.jewelry (id, collection_id, slug, title, description, material, material_purity, weight_grams, crafting_time_hours, production_year, status, variants, created_at, updated_at)
        VALUES ('44722374-e1ef-49f2-ba3c-412f00aba906', '26982604-8d84-4a7e-80ce-b80b2ac58544', 'baroque-pearl-citrine-silver-brooch', 'The Luminous Baroque: Artisan Pearl and Citrine Brooch', 'Handcrafted silver brooch featuring lustrous baroque pearls and faceted yellow citrine gemstones arranged in an intricate, swirling floral motif.', 'silver', '925', NULL, NULL, NULL, 'available', NULL, '2025-12-08T07:57:06.08118+00:00', '2025-12-08T07:57:06.08118+00:00')
        ON CONFLICT (id) DO NOTHING;
      

        INSERT INTO public.jewelry (id, collection_id, slug, title, description, material, material_purity, weight_grams, crafting_time_hours, production_year, status, variants, created_at, updated_at)
        VALUES ('53c0aaaa-968d-4498-8979-4a3b850b087c', '3e75b39a-f602-4e34-ac9d-f0dbb35c5264', 'silver-ruby-filigree-earrings-salimsilver', 'Golden Hour Embrace: Organic Amber Filigree Earrings', 'Gold organic-shaped earrings with amber gemstones. The design highlights the metallic sheen and organic forms.', 'silver', '925', NULL, NULL, NULL, 'available', '[{"type":"Size","options":["6","7","8","9"]}]', '2025-12-08T07:57:07.424579+00:00', '2025-12-08T07:57:07.424579+00:00')
        ON CONFLICT (id) DO NOTHING;
      

        INSERT INTO public.jewelry (id, collection_id, slug, title, description, material, material_purity, weight_grams, crafting_time_hours, production_year, status, variants, created_at, updated_at)
        VALUES ('9ec23dfc-920c-4a6c-a55f-7da702d25c8e', '3e75b39a-f602-4e34-ac9d-f0dbb35c5264', 'silver-mamuli-earrings-salimsilver', 'The Hand Carved Mamuli: Handcrafted Silver Spiral Earrings', 'Handcrafted silver Mamuli earrings featuring hammered textures and spiral motifs.', 'silver', '925', NULL, NULL, NULL, 'available', '[{"type":"Size","options":["6","7","8","9"]}]', '2025-12-08T07:57:07.71584+00:00', '2025-12-08T07:57:07.71584+00:00')
        ON CONFLICT (id) DO NOTHING;
      

        INSERT INTO public.jewelry (id, collection_id, slug, title, description, material, material_purity, weight_grams, crafting_time_hours, production_year, status, variants, created_at, updated_at)
        VALUES ('464e0478-9919-4ad5-aa06-e90476c583c6', '3e75b39a-f602-4e34-ac9d-f0dbb35c5264', 'silver-dragonfly-amethyst-drop-earrings-salimsilver', 'The Twilight Garden: Silver Dragonfly & Amethyst Earrings', 'Intricate sterling silver drop earrings with a floral stud and dragonfly motif, anchored by a deep purple amethyst.', 'silver', '925', NULL, NULL, NULL, 'available', '[{"type":"Size","options":["6","7","8","9"]}]', '2025-12-08T07:57:07.969418+00:00', '2025-12-08T07:57:07.969418+00:00')
        ON CONFLICT (id) DO NOTHING;
      

        INSERT INTO public.jewelry (id, collection_id, slug, title, description, material, material_purity, weight_grams, crafting_time_hours, production_year, status, variants, created_at, updated_at)
        VALUES ('accc8ec5-36a7-4604-bff9-8b492bf49675', '372c6c63-1d81-46e7-8c57-3a2dd5918add', 'hand-carved-silver-floral-relief-cuff-bracelet-salimsilver', 'The Quinity Floral Cuff: An Artisan Silver Statement', 'Artisan sterling silver cuff bracelet defined by five interlocking circles with intricate floral repoussé relief work. The design emphasizes the depth of the metal and fine craftsmanship.', 'silver', '925', NULL, NULL, NULL, 'available', NULL, '2025-12-08T07:57:03.52711+00:00', '2025-12-08T07:57:03.52711+00:00')
        ON CONFLICT (id) DO NOTHING;
      

        INSERT INTO public.jewelry (id, collection_id, slug, title, description, material, material_purity, weight_grams, crafting_time_hours, production_year, status, variants, created_at, updated_at)
        VALUES ('0eb1b852-2762-4363-baf3-56e270456aa5', '3fc15fb3-bffb-46c1-82c2-ebb3176902d8', 'antique-silver-kinangan-palembang-betel-set-salimsilver', 'Palembang Kinangan Ceremonial Silverware Set', 'A masterful example of traditional Palembang metalwork, this Kinangan betel nut set features an intricately crafted tiered design. The piece showcases exceptional repoussé and chasing techniques, with elaborate floral and geometric motifs covering the central basin and accompanying containers. The finials are delicate and tapered, adding vertical elegance to the silhouette. Crafted from high-polish silver with natural oxidation in the recesses, the set exudes a timeless, ceremonial grandeur indicative of its cultural heritage.', 'silver', '', NULL, NULL, NULL, 'available', NULL, '2025-12-10T05:14:22.800874+00:00', '2025-12-10T05:14:22.800874+00:00')
        ON CONFLICT (id) DO NOTHING;
      

        INSERT INTO public.jewelry (id, collection_id, slug, title, description, material, material_purity, weight_grams, crafting_time_hours, production_year, status, variants, created_at, updated_at)
        VALUES ('864ff9ad-4bfd-4d93-afcd-997f3f3ae370', '3fc15fb3-bffb-46c1-82c2-ebb3176902d8', 'silver-paksi-naga-liman-chariot-home-decor-salimsilver', 'Handcrafted Silver Paksi Naga Liman Chariot Decor"', 'An exquisite artisanal home decor piece representing the mythical Paksi Naga Liman chariot, sculpted from premium silver. The intricate design showcases a fusion of three legendary creatures: the elephant (Liman) trunk, the dragon (Naga) body, and the bird (Paksi) wings, all rendered in detailed relief. The chariot features ornate filigree patterns throughout the carriage and detailed spoked wheels, finished with a lustrous metallic sheen that accentuates the depth of the traditional craftsmanship.', 'silver', '', NULL, NULL, NULL, 'available', NULL, '2025-12-10T05:18:19.90913+00:00', '2025-12-10T05:18:19.90913+00:00')
        ON CONFLICT (id) DO NOTHING;
      

        INSERT INTO public.jewelry (id, collection_id, slug, title, description, material, material_purity, weight_grams, crafting_time_hours, production_year, status, variants, created_at, updated_at)
        VALUES ('90af6c73-7e1b-4a49-acdf-f239144b8ec4', '3fc15fb3-bffb-46c1-82c2-ebb3176902d8', 'antique-style-silver-garuda-pancasila-plate-salimsilver', 'Silver Plate with Intricate Garuda Pancasila Relief', 'A finely crafted silver decorative plate featuring a central medallion of the Indonesian Garuda Pancasila. The rim is heavily embellished with deep, repoussé-style floral motifs and scalloped edges, offering a rich texture and a brilliant, polished metallic finish that highlights the detailed craftsmanship.', 'silver', '', NULL, NULL, NULL, 'available', NULL, '2025-12-10T05:21:03.731032+00:00', '2025-12-10T05:21:03.731032+00:00')
        ON CONFLICT (id) DO NOTHING;
      

        INSERT INTO public.jewelry_images (id, jewelry_id, src, display_order, created_at)
        VALUES ('37ac401b-4d4d-4e4d-9bbf-00b9b8900360', '44722374-e1ef-49f2-ba3c-412f00aba906', 'https://twipnraxqejrjpfjoeyx.supabase.co/storage/v1/object/public/catalog/baroque-pearl-citrine-silver-brooch.webp', 0, '2025-12-08T08:17:52.57366+00:00')
        ON CONFLICT (id) DO NOTHING;
      

        INSERT INTO public.jewelry_images (id, jewelry_id, src, display_order, created_at)
        VALUES ('bb701707-cd4b-43b5-b55e-913f90b2de2e', 'e2651c43-0e53-4190-8c69-51a9ae90a857', 'https://twipnraxqejrjpfjoeyx.supabase.co/storage/v1/object/public/catalog/hand-carved-silver-moonstone-brooch-salimsilver.webp', 0, '2025-12-08T08:17:51.028981+00:00')
        ON CONFLICT (id) DO NOTHING;
      

        INSERT INTO public.jewelry_images (id, jewelry_id, src, display_order, created_at)
        VALUES ('7bd1d0a8-93d0-4577-9835-e0814a18e6ec', '1cdd00b6-c259-4a48-9391-18dd59c14813', 'https://twipnraxqejrjpfjoeyx.supabase.co/storage/v1/object/public/catalog/hand-carved-silver-rings-couple-salimsilver.webp', 0, '2025-12-08T08:18:00.934976+00:00')
        ON CONFLICT (id) DO NOTHING;
      

        INSERT INTO public.jewelry_images (id, jewelry_id, src, display_order, created_at)
        VALUES ('5468d733-b36e-4364-86ea-675075c8577f', '25262d5a-f84a-439e-8e61-000a2b3853a3', 'https://twipnraxqejrjpfjoeyx.supabase.co/storage/v1/object/public/catalog/hand-carved-silver-turquoise-ring-salimsilver.webp', 0, '2025-12-08T08:18:03.302005+00:00')
        ON CONFLICT (id) DO NOTHING;
      

        INSERT INTO public.jewelry_images (id, jewelry_id, src, display_order, created_at)
        VALUES ('55306487-73ca-46d2-b36c-9df0097ee8bf', '464e0478-9919-4ad5-aa06-e90476c583c6', 'https://twipnraxqejrjpfjoeyx.supabase.co/storage/v1/object/public/catalog/silver-dragonfly-amethyst-drop-earrings-salimsilver.webp', 0, '2025-12-08T08:17:56.249017+00:00')
        ON CONFLICT (id) DO NOTHING;
      

        INSERT INTO public.jewelry_images (id, jewelry_id, src, display_order, created_at)
        VALUES ('9c2603b5-1ea0-4224-82d7-75f511f494f6', '44a9a772-bb4f-4e64-aa94-c6d3d1fd71f5', 'https://twipnraxqejrjpfjoeyx.supabase.co/storage/v1/object/public/catalog/silver-filigree-ruby-cuff-bracelet-salimsilver.webp', 0, '2025-12-08T08:17:45.731499+00:00')
        ON CONFLICT (id) DO NOTHING;
      

        INSERT INTO public.jewelry_images (id, jewelry_id, src, display_order, created_at)
        VALUES ('2f07f901-9e8b-44de-a3f7-a55451114741', '51265bbe-67cd-4a5a-9fe6-3cd9ace223db', 'https://twipnraxqejrjpfjoeyx.supabase.co/storage/v1/object/public/catalog/silver-gold-floral-lotus-brooch-salimsilver.webp', 0, '2025-12-08T08:17:48.943165+00:00')
        ON CONFLICT (id) DO NOTHING;
      

        INSERT INTO public.jewelry_images (id, jewelry_id, src, display_order, created_at)
        VALUES ('7bbf1ba8-476e-41ea-aa41-5b0b09319115', '07bd01d7-a538-4439-8005-76bea8282c03', 'https://twipnraxqejrjpfjoeyx.supabase.co/storage/v1/object/public/catalog/silver-hibiscus-locket-purple-stone-pendant-necklace-salimsilver.webp', 0, '2025-12-08T08:17:57.445174+00:00')
        ON CONFLICT (id) DO NOTHING;
      

        INSERT INTO public.jewelry_images (id, jewelry_id, src, display_order, created_at)
        VALUES ('4862a110-b11d-419e-81b0-937e8e17e78e', '9ec23dfc-920c-4a6c-a55f-7da702d25c8e', 'https://twipnraxqejrjpfjoeyx.supabase.co/storage/v1/object/public/catalog/silver-mamuli-earrings-salimsilver.webp', 0, '2025-12-08T08:17:55.051971+00:00')
        ON CONFLICT (id) DO NOTHING;
      

        INSERT INTO public.jewelry_images (id, jewelry_id, src, display_order, created_at)
        VALUES ('281f2b00-57e9-441f-a30a-5ccbb6c8091a', '58836789-b114-41b3-816e-2b1c7c91697b', 'https://twipnraxqejrjpfjoeyx.supabase.co/storage/v1/object/public/catalog/silver-pagoda-ring-pearl-salimsilver.webp', 0, '2025-12-08T08:18:02.091748+00:00')
        ON CONFLICT (id) DO NOTHING;
      

        INSERT INTO public.jewelry_images (id, jewelry_id, src, display_order, created_at)
        VALUES ('fb26441d-a0b3-4ee3-89d2-1839aa22c534', 'b7ff9279-ce35-49cb-ba55-9bb00969e2ef', 'https://twipnraxqejrjpfjoeyx.supabase.co/storage/v1/object/public/catalog/silver-pendant-labradorite-eye-dot-jewelry-salimsilver.webp', 0, '2025-12-08T08:17:58.545046+00:00')
        ON CONFLICT (id) DO NOTHING;
      

        INSERT INTO public.jewelry_images (id, jewelry_id, src, display_order, created_at)
        VALUES ('0755f8fa-82e4-4713-b5e8-d83b93971321', '53c0aaaa-968d-4498-8979-4a3b850b087c', 'https://twipnraxqejrjpfjoeyx.supabase.co/storage/v1/object/public/catalog/silver-ruby-filigree-earrings-salimsilver.webp', 0, '2025-12-08T08:17:53.81142+00:00')
        ON CONFLICT (id) DO NOTHING;
      

        INSERT INTO public.jewelry_images (id, jewelry_id, src, display_order, created_at)
        VALUES ('adf2a297-95f1-400c-90c9-37234323cd4d', '4872ba9e-01ca-434e-af60-726baa474cd5', 'https://twipnraxqejrjpfjoeyx.supabase.co/storage/v1/object/public/catalog/silver-seahorse-charm-bracelet-salimsilver.webp', 0, '2025-12-08T08:17:47.325928+00:00')
        ON CONFLICT (id) DO NOTHING;
      

        INSERT INTO public.jewelry_images (id, jewelry_id, src, display_order, created_at)
        VALUES ('61b30065-4117-4664-90c1-942b48c86d33', 'c67c03ca-5dbe-4279-9043-b2c381c2122d', 'https://twipnraxqejrjpfjoeyx.supabase.co/storage/v1/object/public/catalog/silver-seahorse-pendant-amber-salimsilver.webp', 0, '2025-12-08T08:17:59.793412+00:00')
        ON CONFLICT (id) DO NOTHING;
      

        INSERT INTO public.jewelry_images (id, jewelry_id, src, display_order, created_at)
        VALUES ('e9b19fed-ed63-474c-aa54-670b58a7378d', 'accc8ec5-36a7-4604-bff9-8b492bf49675', 'https://twipnraxqejrjpfjoeyx.supabase.co/storage/v1/object/public/catalog/hand-carved-silver-floral-relief-cuff-bracelet-salimsilver.webp', 0, '2025-12-08T08:57:45.615337+00:00')
        ON CONFLICT (id) DO NOTHING;
      

        INSERT INTO public.jewelry_images (id, jewelry_id, src, display_order, created_at)
        VALUES ('6a6a1f5a-5e11-4124-b0dd-0e7aa278e37d', '0eb1b852-2762-4363-baf3-56e270456aa5', 'https://twipnraxqejrjpfjoeyx.supabase.co/storage/v1/object/public/catalog/0eb1b852-2762-4363-baf3-56e270456aa5/1765343720627.webp', 1, '2025-12-10T05:15:23.759331+00:00')
        ON CONFLICT (id) DO NOTHING;
      

        INSERT INTO public.jewelry_images (id, jewelry_id, src, display_order, created_at)
        VALUES ('a08aa306-0341-4fc9-ad97-e5c73249044b', '864ff9ad-4bfd-4d93-afcd-997f3f3ae370', 'https://twipnraxqejrjpfjoeyx.supabase.co/storage/v1/object/public/catalog/864ff9ad-4bfd-4d93-afcd-997f3f3ae370/1765343924999.webp', 0, '2025-12-10T05:18:48.35032+00:00')
        ON CONFLICT (id) DO NOTHING;
      

        INSERT INTO public.jewelry_images (id, jewelry_id, src, display_order, created_at)
        VALUES ('93b7762f-6a2c-433f-b69f-c17acce349c0', '90af6c73-7e1b-4a49-acdf-f239144b8ec4', 'https://twipnraxqejrjpfjoeyx.supabase.co/storage/v1/object/public/catalog/90af6c73-7e1b-4a49-acdf-f239144b8ec4/1765344093685.webp', 0, '2025-12-10T05:21:36.791091+00:00')
        ON CONFLICT (id) DO NOTHING;
      
UPDATE public.collections SET cover_image_id = '7bd1d0a8-93d0-4577-9835-e0814a18e6ec' WHERE id = '0c3a39ae-9f0c-423d-8baf-5a0166c105c0';
UPDATE public.collections SET cover_image_id = '7bbf1ba8-476e-41ea-aa41-5b0b09319115' WHERE id = '2cc56012-a490-4c33-9f31-9139eb984fe6';
UPDATE public.collections SET cover_image_id = '9c2603b5-1ea0-4224-82d7-75f511f494f6' WHERE id = '372c6c63-1d81-46e7-8c57-3a2dd5918add';
UPDATE public.collections SET cover_image_id = '2f07f901-9e8b-44de-a3f7-a55451114741' WHERE id = '26982604-8d84-4a7e-80ce-b80b2ac58544';
UPDATE public.collections SET cover_image_id = '55306487-73ca-46d2-b36c-9df0097ee8bf' WHERE id = '3e75b39a-f602-4e34-ac9d-f0dbb35c5264';
UPDATE public.collections SET cover_image_id = 'a08aa306-0341-4fc9-ad97-e5c73249044b' WHERE id = '3fc15fb3-bffb-46c1-82c2-ebb3176902d8';
COMMIT;