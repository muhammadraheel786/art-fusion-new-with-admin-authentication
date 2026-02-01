-- Optional: Seed initial paintings (run after schema.sql)
-- Image paths use /paintings/ which will work when deployed (e.g. https://yoursite.vercel.app/paintings/1.png)

insert into paintings (title, description, price, image, category, featured) values
('Golden Horizon', 'A calming scene of the sun touching the horizon with warm tones', 'Price on request', '/paintings/25.png', 'Landscape', false),
('Tranquil Waters', 'Gentle ripples on a peaceful lake surrounded by nature', 'Price on request', '/paintings/24.png', 'Seascape', true),
('Spring Blossom', 'Fresh flowers in full bloom celebrating the season of life', 'Price on request', '/paintings/21.png', 'Floral', false),
('Urban Lights', 'The vibrant cityscape glowing with lights at night', 'Price on request', '/paintings/4.png', 'Cityscape', true);
