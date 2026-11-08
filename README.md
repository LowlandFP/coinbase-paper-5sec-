# Trading Operations Console

Independent, read-only Cloudflare Worker UI. No live Coinbase API connection, no order endpoint, no LFP dependencies. `GET /health` reports disabled execution.

## Risk gate
`risk.mjs` is a pure preflight module, not wired to a live execution service. It requires explicit authorization, collateral, manually verified derivatives access, passed integration tests, and explicit manual approval. Total allocated capital is capped at EUR 10. This is the **total** planned deposit, not per-trade sizing. A passing synthetic preflight test is **not** permission to trade.

Run `node --test risk.test.mjs`. Before any future live deployment, a separate execution service needs authenticated Coinbase account permissions, market-specific minimums, order idempotency, fee and slippage validation, reconciled fills, durable daily loss state, emergency stop and human approval. Never infer futures eligibility from a product listing.

No deployment or API configuration has been performed.
