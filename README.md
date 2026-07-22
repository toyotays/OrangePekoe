# Project Orange Pekoe

健康・身だしなみ・生活・Fordays活動を長期的に記録する、プライベートWebアプリです。

## Local development

```bash
npm install
npm run dev
```

## Verification

```bash
npm run verify
```

## Cloudflare Pages

- Framework preset: `Next.js (Static HTML Export)`
- Build command: `npm run build`
- Build output directory: `out`

直接デプロイする場合は、Cloudflareへログインした状態で次を実行します。

```bash
npm run pages:deploy
```

個人データを扱うため、公開後はPagesプロジェクトのAccess policyを有効にしてください。
