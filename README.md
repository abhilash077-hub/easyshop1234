# ShopEase
React Product Catalogue & Shopping Cart — a Flipkart-style clothing store built with React, Vite and plain CSS.

## Features
Product catalogue · Product details · Category filtering · Price/name sorting · Search · Shopping cart (Context API + useReducer) · Checkout form with validation · localStorage cart persistence · Responsive design · Netlify deployment

Products load from the Fake Store API; if it fails, an error with a Retry button is shown and local fallback products (`src/data/products.json`) are used.

## Installation
`npm install`

## Run
`npm run dev`

## Build
`npm run build`

## Preview
`npm run preview`

## Upload to GitHub
```
git init
git add .
git commit -m "ShopEase"
git branch -M main
git remote add origin https://github.com/<you>/shopease.git
git push -u origin main
```

## Deploy to Netlify
1. Netlify → Add new site → Import from GitHub → pick the repo.
2. Build command `npm run build`, publish dir `dist` (already set in `netlify.toml`).
3. Deploy. The SPA redirect makes URLs like `/product/3` work on refresh.
