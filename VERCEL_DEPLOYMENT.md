# Vercel Deployment Checklist

If your site shows a blank page or doesn't load, check these:

## 1. Root Directory (IMPORTANT)

If your GitHub repo root is `artfusion by basit` (parent folder):

1. Go to Vercel Dashboard → Your Project → **Settings**
2. Under **General** → **Root Directory**
3. Set to: `artfusion-gallery`
4. Click **Save**
5. **Redeploy** the project

## 2. Environment Variables

1. Go to **Settings** → **Environment Variables**
2. Add these (from your Supabase project settings):

| Name | Value |
|------|-------|
| `VITE_SUPABASE_URL` | `https://xxxxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon/public key |

3. Apply to **Production**, **Preview**, and **Development**
4. **Redeploy** after adding variables

## 3. Build Settings

Vercel should auto-detect Vite. Verify:

- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

## 4. Redeploy

After any change: **Deployments** → click **⋯** on latest → **Redeploy**

## 5. Check Build Logs

If it still fails: **Deployments** → click the failed deployment → **Building** tab to see the error.
