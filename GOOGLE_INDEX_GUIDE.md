# How to Get Your Site in Google Search

Your site **won't appear in Google automatically**—you need to submit it. Follow these steps:

---

## Step 1: Add Your Site to Google Search Console (REQUIRED)

1. Go to **[Google Search Console](https://search.google.com/search-console)**
2. Sign in with your Google account
3. Click **"Add property"**
4. Enter: `https://www.artfusionbybasitlove.shop`
5. Choose **"URL prefix"** as the property type
6. Verify ownership using one of:
   - **HTML tag** (add meta tag to your site—ask if you need help)
   - **HTML file** (upload a file to your site)
   - **Google Analytics** (if you use it)
   - **DNS** (add a TXT record to your domain)

---

## Step 2: Submit Your Sitemap

1. After verification, go to **Sitemaps** in the left sidebar
2. In "Add a new sitemap", enter: `sitemap.xml`
3. Click **Submit**
4. Google will start crawling your site (can take a few days)

---

## Step 3: Request Indexing (Faster)

1. In Search Console, go to **URL Inspection** (top search bar)
2. Enter: `https://www.artfusionbybasitlove.shop/`
3. Click **Request indexing**
4. This asks Google to crawl your page sooner

---

## How Long Does It Take?

- **First index:** Usually 1–7 days after submission
- **Better rankings:** Can take weeks or months
- **New sites** are indexed more slowly

---

## Step 4: Redirect Non-WWW to WWW (Optional but Recommended)

In **Vercel** → Project → Settings → Domains:
- Add both `artfusionbybasitlove.shop` and `www.artfusionbybasitlove.shop`
- Set `www.artfusionbybasitlove.shop` as the primary
- Vercel will redirect the non-www version automatically

---

## Quick Checklist

- [ ] Add property in Google Search Console
- [ ] Verify ownership
- [ ] Submit sitemap: `sitemap.xml`
- [ ] Request indexing for your homepage
- [ ] Wait 3–7 days and search: `site:www.artfusionbybasitlove.shop`
