# Why Your Site Isn't in Google Search - Complete Checklist

## 1. Verify the Verification File Works

**Test this URL in your browser:**
```
https://www.artfusionbybasitlove.shop/google0b6256b35d0410e5.html
```

- If you see the verification text → File is working ✓
- If you see your homepage instead → The file isn't being served (we fixed vercel.json - redeploy)

---

## 2. Complete Google Search Console Steps

### A. Verify Ownership
- Go to [Google Search Console](https://search.google.com/search-console)
- Add property: `https://www.artfusionbybasitlove.shop`
- Complete verification (HTML file method)
- **Redeploy your site first** (with the vercel.json fix), then verify

### B. Submit Sitemap (CRITICAL)
1. In Search Console → **Sitemaps** (left sidebar)
2. Enter: `sitemap.xml`
3. Click **Submit**
4. Wait for "Success" status

### C. Request Indexing
1. **URL Inspection** (search bar at top)
2. Enter: `https://www.artfusionbybasitlove.shop/`
3. Click **Request indexing**
4. This tells Google to crawl your page ASAP

---

## 3. How Long Does It Take?

| Action | Timeframe |
|--------|-----------|
| Verification | Instant (if file is accessible) |
| Sitemap processed | 1-3 days |
| First appearance in search | **3-14 days** (sometimes longer for new sites) |
| Rankings improve | Weeks to months |

---

## 4. Check If You're Indexed

Search in Google:
```
site:www.artfusionbybasitlove.shop
```

- **No results** = Not indexed yet (keep waiting, or request indexing again)
- **Your page shows** = Indexed ✓

---

## 5. Quick Fix Applied

**vercel.json** was updated so the rewrite no longer blocks:
- `google*.html` (verification file)
- `assets/`, `favicon`, `robots.txt`, `sitemap.xml`, `paintings/`

**→ Commit, push, and redeploy** so the verification file is accessible.

---

## 6. Share Your Site to Speed Up Discovery

- Post on Instagram, Facebook with the link
- Share on WhatsApp
- Add to your social media bio
- Links from other sites help Google find you faster
