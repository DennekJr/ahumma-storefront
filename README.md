# Ahumma custom storefront

A responsive, editorial commerce site for Ahumma, powered by the [Frontdesk Storefront API](https://api.frontdesk.africa/v1/store/docs). The site uses Ahumma-owned campaign and product photography, with a warm, minimal shopping experience informed by Arami Essentials and Aesop.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:6543](http://localhost:6543). Until API keys are added, the site runs in preview mode with Ahumma's current three-product collection. The bag works locally and clearly marks checkout as pending configuration.

## Connect Frontdesk

Add the values below to `.env.local`:

```dotenv
FRONTDESK_PUBLISHABLE_KEY=fd_pk_test_...
FRONTDESK_SECRET_KEY=fd_sk_test_...
FRONTDESK_PREVIEW_ONLY=false
NEXT_PUBLIC_SITE_URL=http://localhost:6543
```

In Frontdesk → Developers:

1. Register `http://localhost:6543` as an allowed origin for the test publishable key.
2. Enable Store API secret keys for the workspace.
3. Publish Ahumma's products and delivery zones.
4. Use test keys first, then replace them with live keys for production.

The secret key is read only by server-side route handlers. Never expose it with a `NEXT_PUBLIC_` prefix.

## Commerce flow

- `GET /v1/store/products` fills the collection.
- `GET /v1/store/products/:slug` provides variants, media, stock and product information.
- `GET /v1/store/delivery-zones` fills the bag's delivery selector.
- `POST /v1/store/checkouts` creates a secure hosted checkout from immutable `variantRef` values.
- `GET /v1/store/checkouts/:ref` verifies payment when the buyer returns.

The return redirect is never treated as proof of payment; the confirmation page checks the checkout state directly with Frontdesk.
