-- Seed data: migrates the current static config (src/config/*) into real
-- rows so the cutover from static content to the database doesn't blank
-- the live homepage. Safe to re-run (upserts on natural keys).

insert into public.categories (slug, name, icon_url, bg, sort_order) values
  ('feeding', 'Feeding', '', 'mint', 1),
  ('diapering', 'Diapering', '', 'pink', 2),
  ('bath-skincare', 'Bath & Skincare', '', 'blue', 3),
  ('baby-clothing', 'Baby Clothing', '', 'yellow', 4),
  ('nursery', 'Nursery', '', 'peach', 5),
  ('toys-learning', 'Toys & Learning', '', 'mint', 6),
  ('baby-gear', 'Baby Gear', '', 'pink', 7),
  ('mom-care', 'Mom Care', '', 'blue', 8)
on conflict (slug) do update set
  name = excluded.name, bg = excluded.bg, sort_order = excluded.sort_order;

insert into public.products
  (slug, title, description, price, original_price, rating, review_count, badge,
   category_id, is_best_seller, is_new_arrival, sort_order)
select
  v.slug, v.title, v.description, v.price, v.original_price, v.rating, v.review_count, v.badge,
  c.id, v.is_best_seller, v.is_new_arrival, v.sort_order
from (values
  ('organic-cotton-onesie', 'Organic Cotton Onesie',
   'A soft, breathable onesie made from organic cotton — an easy everyday layer for warmer days.',
   599.00, 799.00, 4.8, 154, null::text, 'baby-clothing', true, false, 1),
  ('silicone-feeding-set', 'Silicone Feeding Set',
   'A bowl, plate and spoon set in food-grade silicone, sized for little hands learning to self-feed.',
   899.00, null, 4.6, 96, null, 'feeding', true, false, 2),
  ('wooden-stacking-toy', 'Wooden Stacking Toy',
   'A classic stacking ring toy in smooth, rounded wood pieces for early hand-eye coordination play.',
   749.00, null, 4.7, 128, null, 'toys-learning', true, false, 3),
  ('leak-proof-sippy-cup', 'Leak-Proof Sippy Cup',
   'A spill-resistant sippy cup with an easy-grip handle, built for the transition away from bottles.',
   449.00, 549.00, 4.5, 87, null, 'feeding', true, false, 4),
  ('baby-muslin-swaddle', 'Baby Muslin Swaddle Blanket',
   'A lightweight muslin swaddle that gets softer with every wash — useful for naps, strolls and tummy time.',
   649.00, null, 4.6, 112, null, 'nursery', true, false, 5),
  ('diaper-caddy-organizer', 'Diaper Caddy Organizer',
   'A portable caddy that keeps diapers, wipes and creams sorted and within reach at changing time.',
   999.00, null, 4.4, 79, null, 'diapering', true, false, 6),
  ('bamboo-baby-comb-set', 'Bamboo Baby Comb Set',
   'A gentle comb and brush set in smooth bamboo, sized for a newborn''s first grooming routine.',
   349.00, null, 4.7, 21, 'New', 'bath-skincare', false, true, 7),
  ('nursery-night-lamp', 'Nursery Night Lamp',
   'A soft-glow night lamp with adjustable brightness, designed for calm middle-of-the-night feeds and changes.',
   1199.00, null, 4.9, 14, 'New', 'nursery', false, true, 8),
  ('baby-grooming-kit', 'Baby Grooming Kit',
   'A rounded-tip nail clipper, brush and comb kit for safe, simple grooming in the first year.',
   799.00, null, 4.6, 33, 'New', 'bath-skincare', false, true, 9),
  ('cotton-muslin-wraps', 'Cotton Muslin Wraps (Pack of 3)',
   'Three breathable muslin wraps that double as swaddles, burp cloths or light pram covers.',
   899.00, null, 4.8, 19, 'New', 'baby-clothing', false, true, 10)
) as v(slug, title, description, price, original_price, rating, review_count, badge,
       category_slug, is_best_seller, is_new_arrival, sort_order)
join public.categories c on c.slug = v.category_slug
on conflict (slug) do update set
  title = excluded.title, description = excluded.description, price = excluded.price,
  original_price = excluded.original_price, rating = excluded.rating,
  review_count = excluded.review_count, badge = excluded.badge,
  category_id = excluded.category_id, is_best_seller = excluded.is_best_seller,
  is_new_arrival = excluded.is_new_arrival, sort_order = excluded.sort_order;

insert into public.testimonials (name, role, quote, rating, is_published, sort_order) values
  ('Ananya S.', 'Mom of 1',
   'PurelyBaby has become our go-to store. The quality is lovely and my little one loves every toy.',
   5, true, 1),
  ('Rahul K.', 'Dad of 2',
   'Everything feels well made and safe. Shipping was fast and customer service was genuinely helpful.',
   5, true, 2),
  ('Priya M.', 'Mom of 1',
   'Finally a store I trust for my little one''s everyday essentials. Highly recommend PurelyBaby to other parents.',
   5, true, 3)
on conflict do nothing;

insert into public.content_blocks (key, data) values
  ('site', '{"logoUrl": "", "name": "PurelyBaby", "description": "Thoughtfully selected baby essentials for feeding, play, sleep, travel and everyday care."}'),
  ('announcement_bar', '{"enabled": true, "message": "Free Shipping on Orders Over ₹999  |  10% Off Your First Order — Code: PURELY10"}'),
  ('hero', '{"titleLine1": "Little Things,", "titleLine2": "Big Happiness", "description": "Cute, thoughtful & high-quality essentials for your baby''s everyday moments.", "primaryButtonLabel": "Shop Now", "primaryButtonHref": "/shop", "secondaryButtonLabel": "Explore Categories", "secondaryButtonHref": "/#categories"}'),
  ('newsletter', '{"heading": "Let''s Stay in Touch!", "description": "Subscribe for special offers, new arrivals and parenting-friendly product updates.", "placeholder": "Enter your email address", "buttonLabel": "Subscribe"}')
on conflict (key) do update set data = excluded.data, updated_at = now();

insert into public.banners (title, subtitle, cta_label, href, sort_order, is_active) values
  ('Little Things, Big Happiness', 'Cute, thoughtful & high-quality essentials for your baby''s everyday moments.', 'Shop Now', '/shop', 1, true)
on conflict do nothing;
