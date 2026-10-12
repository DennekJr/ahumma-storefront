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

1. Register `http://localhost:6543` for the test publishable key and `https://www.ahumma.com` for the live publishable key.
2. Enable Store API secret keys for the workspace.
3. Publish Ahumma's products and delivery zones.
4. Use test keys first, then replace them with live keys for production.

The secret key is read only by server-side route handlers. Never expose it with a `NEXT_PUBLIC_` prefix.

## Frontdesk webhook

The signed receiver is:

```text
https://www.ahumma.com/api/webhooks/frontdesk
```

In Frontdesk → Developers → Webhooks, add a destination named `Ahumma Website`, use the endpoint above, and subscribe to **Everything, including future event types**. Copy the destination's signing secret into Vercel as `FRONTDESK_WEBHOOK_SECRET`, set `NEXT_PUBLIC_SITE_URL=https://www.ahumma.com` for the Production environment, then redeploy.

The receiver verifies `X-FD-Signature` against the raw request body, rejects stale timestamps, checks `X-FD-Webhook-Id`, and acknowledges valid deliveries quickly. It logs only the event id and type. Frontdesk remains the source of truth; the payment return page still verifies a checkout directly before showing success.

## Commerce flow

- `GET /v1/store/products` fills the collection.
- `GET /v1/store/products/:slug` provides variants, media, stock and product information.
- `GET /v1/store/delivery-zones` fills the bag's delivery selector.
- `POST /v1/store/checkouts` creates a secure hosted checkout from immutable `variantRef` values.
- `GET /v1/store/checkouts/:ref` verifies payment when the buyer returns.

The return redirect is never treated as proof of payment; the confirmation page checks the checkout state directly with Frontdesk.

## NGN and USD pricing

Frontdesk already supports multi-currency storefronts. Ahumma keeps NGN as the base currency and stores an explicit USD price on every published variant. The header selector reads those API-provided amounts; it never calculates an exchange rate in the browser. The selected currency persists for the customer, updates product and bag totals, and is sent to Frontdesk when checkout is created.

In Frontdesk, keep both price entries complete:

1. Add NGN and USD prices to every active product variant.
2. If delivery zones are created, add delivery fees in both NGN and USD.
3. Publish the changes and verify both currencies on the storefront before accepting orders.

The delivery-area field appears only when the workspace returns at least one delivery zone.

## SEO production review

The official public site is `https://www.ahumma.com`. Before deploying this
storefront there, set `NEXT_PUBLIC_SITE_URL=https://www.ahumma.com` and
`AHUMMA_ALLOW_INDEXING=true` in that production environment, then rebuild.
Keep indexing disabled on ahumma.net, local development, and preview deployments.
The earlier .net webhook examples describe the testing deployment; register the
.com origin and its webhook separately when moving production, and verify checkout
return URLs. Do not change working payment/webhook destinations without testing.

After deployment:

- Confirm the public homepage has no `noindex` directive or blocking response header.
- Check `/robots.txt` allows public pages and lists the .com sitemap.
- Check `/sitemap.xml`, page canonical URLs, and JSON-LD all use the official origin.
- Confirm apex ahumma.com redirects to www.ahumma.com, preserving paths and queries.
- Validate homepage and product markup with Google's Rich Results Test.
- Verify product prices, stock and review counts against the visible product pages.
- Submit the sitemap in Search Console and inspect the homepage and product URLs.
- Measure searches containing Ahumma with Country set to United States.

Search Console ownership and reporting remain an account-side setup step. These
code changes neither verify ownership nor guarantee a ranking or rich result.
