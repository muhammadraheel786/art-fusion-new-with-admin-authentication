# Supabase Setup Guide for ArtFusion

Your Supabase credentials are configured. Complete these steps in your Supabase dashboard:

## 1. Run the Database Schema

1. Go to [Supabase Dashboard](https://supabase.com/dashboard) → Your Project
2. Click **SQL Editor** in the left sidebar
3. Click **New query**
4. Copy the entire content from `supabase/schema.sql`
5. Paste and click **Run**

## 2. Create Storage Bucket for Images

1. Go to **Storage** in the left sidebar
2. Click **New bucket**
3. Name it: `paintings`
4. Enable **Public bucket** (so uploaded images can be viewed)
5. Click **Create bucket**
6. Go to **Policies** tab for the bucket
7. Add policy to allow public read:
   - Policy name: `Public read`
   - Allowed operation: `SELECT` (read)
   - Target roles: `public`
   - USING expression: `true`
8. Add policy for authenticated upload (admin):
   - Policy name: `Authenticated upload`
   - Allowed operation: `INSERT`
   - Target roles: `authenticated`
   - WITH CHECK: `auth.role() = 'authenticated'`

## 3. Create Admin User

1. Go to **Authentication** → **Users**
2. Click **Add user** → **Create new user**
3. Enter your email and password (this will be your admin login)
4. Click **Create user**

## 4. Seed Initial Data (Optional)

If you want to import your existing paintings:

1. Go to **SQL Editor**
2. Run insert statements for your paintings, or use the Table Editor to add rows manually

Example:
```sql
INSERT INTO paintings (title, description, price, image, category, featured)
VALUES 
  ('Golden Horizon', 'A calming scene of the sun touching the horizon', 'Price on request', '/paintings/25.png', 'Landscape', false),
  ('Tranquil Waters', 'Gentle ripples on a peaceful lake', 'Price on request', '/paintings/24.png', 'Seascape', true);
```

**Note:** Image paths like `/paintings/25.png` work for local files. For production, upload images to the Storage bucket and use the public URL.

## 5. Run the App

```bash
npm run dev
```

Then:
- Open http://localhost:8080
- Click **Admin** in the footer
- Log in with the email/password you created in step 3
- Add or manage paintings

## Security Note

Your `.env` file contains secrets. Add it to `.gitignore` if not already there, and never commit it to Git. For Vercel deployment, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as environment variables in the Vercel project settings.
