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

## Cloudflare Workers

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Static assets directory: `out`

Next.jsの静的書き出しをWorkers Static Assetsとして配信します。直接デプロイする場合は、Cloudflareへログインした状態で次を実行します。

```bash
npm run deploy
```

個人データを扱うため、公開後はWorkerのAccess policyを有効にしてください。
