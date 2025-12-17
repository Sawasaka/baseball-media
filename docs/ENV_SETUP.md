# 環境変数セットアップ

このプロジェクトは **Cloudflare Pages** を前提にしています。

## ローカル開発（`.env.local`）

ルートに `.env.local` を作成して、以下を設定してください。

```bash
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Stripe（Payment Link方式）
# Stripe Dashboardで作成したPayment Linkを設定（例: https://buy.stripe.com/xxxx）
NEXT_PUBLIC_STRIPE_PAYMENT_LINK_URL=https://buy.stripe.com/your_payment_link
```

## Cloudflare Pages（Environment variables）

Cloudflare Pages → Project → Settings → Environment variables に以下を設定してください。

- `MICROCMS_SERVICE_DOMAIN`
- `MICROCMS_API_KEY`
- `NEXT_PUBLIC_BASE_URL`（例: `https://rookiesmart-jp.com`）
- `NEXT_PUBLIC_STRIPE_PAYMENT_LINK_URL`


