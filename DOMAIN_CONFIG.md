# Domain Configuration

## Production Domain
**beforeigo.app** - https://beforeigo.app

## Contact Email
hello@beforeigo.app

## Domain References Updated

### 1. Base HTML (`index.html`)
- Meta tags with beforeigo.app
- Open Graph tags pointing to beforeigo.app
- Canonical URL: https://beforeigo.app

### 2. Blog SEO (`src/pages/BlogPost.tsx`)
- Dynamic canonical URLs: https://beforeigo.app/blog/{slug}
- Open Graph URLs for each blog post
- Meta descriptions and titles

### 3. Footer Contact (`src/components/Layout.tsx`)
- Contact email: hello@beforeigo.app
- Footer domain reference: beforeigo.app

### 4. Gift Links (`src/pages/Checkout.tsx`)
- Gift redemption links use beforeigo.app in production
- Format: https://beforeigo.app/gift-access?token=...

### 5. Domain Config (`src/config/domain.ts`)
- Centralized domain configuration
- Helper functions for generating URLs
- Easy to update across the entire app

## Newsletter Emails
All newsletter signup forms reference beforeigo.app implicitly through the site domain.

## Blog Images
- Blog listing thumbnails: Fixed at 200px height
- Blog post hero images: Max 400px height
- All images use object-fit: cover
- Responsive and properly sized on all devices
