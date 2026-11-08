# Trading Operations Console

Independent, read-only Cloudflare Worker UI. No live Coinbase API connection, no order endpoint, no LFP dependencies. `GET /health` reports disabled execution.

## Risk gate
`risk.mjs` is a pure preflight module, not wired to a live execution service. It requires explicit authorization, collateral, manually verified derivatives access, passed integration tests, and explicit manual approval. Total allocated capital is capped at EUR 10. This is the **total** planned deposit, not per-trade sizing. A passing synthetic preflight test is **not** permission to trade.

Run `node --test risk.test.mjs`. Before any future live deployment, a separate execution service needs authenticated Coinbase account permissions, market-specific minimums, order idempotency, fee and slippage validation, reconciled fills, durable daily loss state, emergency stop and human approval. Never infer futures eligibility from a product listing.

No deployment or API configuration has been performed.

## Offline order intent planner
`planner.mjs` produces a frozen, non-executable intent preview after risk checks. It deliberately has no Coinbase SDK, network client, signing or order-submission code. Even a successful synthetic preflight returns `eligibleForSubmission: false`. `planner.test.mjs` adds negative cases for invalid sizes, costs, permissions, emergency stop and order identifiers. Run `node --test *.test.mjs` in a checked-out repository. Tests are not proof of exchange connectivity, trading eligibility, or safe production operation.
