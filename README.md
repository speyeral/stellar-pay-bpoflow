 # BPOFlow


Automated cross-border B2B2C payroll rails enabling global enterprises to stream USDC disbursements that atomically land as PHP stablecoins in local freelancers' wallets using native Stellar Path Payments.


## Problem

The Philippine IT-BPM and remote freelance sectors generate over $40 billion annually, employing roughly 1.9 million professionals. Yet, cross-border payouts remain fundamentally broken. Global clients utilizing traditional bank wires subject local workers to 3–5 day settlement delays and 3–5% predatory FX conversion spreads. Furthermore, banking compliance barriers systematically exclude the 44% of Filipino adults who remain unbanked. Existing Web3 alternatives require non-technical workers to manually manage slippage, execute decentralized swaps, and handle transaction gas fees just to access their local currency.


## How It Works

1. **Corporate Login:** A global enterprise manager opens the BPOFlow web dashboard and authenticates their corporate identity securely by connecting their browser's **Freighter App** wallet extension.

2. **Payroll Batch Upload:** The manager imports a list of recipient public keys alongside their respective payroll amounts calculated in Philippine Pesos (PHP).

3. **One-Click Execution:** The manager reviews the total batch invoice, which calculates the exact global stablecoin (USDC) equivalent required to fulfill the local currency balances. 

4. **Atomic Delivery:** The corporate manager signs the transaction via Freighter. BPOFlow pushes the payload to the network, routing the funds so that the business spends USDC while the contractors seamlessly receive their local PHP stablecoins instantly into their self-custodial accounts.


## How It Uses Stellar

BPOFlow intentionally minimizes smart contract execution risk to optimize processing speed by leveraging Stellar’s high-performance native core layer primitives:

* **Native Path Payments:** BPOFlow executes `PathPaymentStrictSend` operations. This instructs the Stellar ledger to execute an atomic, real-time conversion through the built-in decentralized order book (SDEX). The global business spends exactly USDC, while the recipient receives the exact target amount of PHP stablecoins in a single immutable ledger close event (under 5 seconds).

* **Classic Assets & Trustlines:** The infrastructure tracks balances using standardized asset codes on the network (e.g., USDC issued by Circle, and a PHP-pegged anchor stablecoin).

* **Freighter Wallet Integration:** Provides institutional-grade security for the corporate portal, ensuring that secret keys never touch the app backend and transaction XDRs are signed strictly client-side.


## Track

Track 2 — Financial Inclusion & Everyday Payments


## Tech Stack

- Framework: Next.js (App Router) & Node.js

- Stellar SDK: `@stellar/stellar-sdk` v13.0.0

- Wallet Bridge: `@stellar/freighter-api`

- Network: Testnet

- Styling: Tailwind CSS & shadcn/ui


## Setup & Run

To run the corporate payroll platform locally, a judge must execute the following commands:


\`\`\`bash

git clone https://github.com/speyeral/stellar-pay-bpoflow.git

cd bpoflow

npm install


# Create a .env.local file in the root directory and add:

# NEXT_PUBLIC_STELLAR_NETWORK=testnet

# NEXT_PUBLIC_HORIZON_URL=https://horizon-testnet.stellar.org


npm run dev

\`\`\`


Open [http://localhost:3000](http://localhost:3000) inside your browser with the Freighter extension active and configured to the Stellar Testnet.


## Network Details

- Network: testnet

- Horizon API URL: `https://horizon-testnet.stellar.org`

- Testnet USDC Issuer: `GBBD47IF6LWK7P7MDEV6B2X7S34M62RMCHSTCELL5AFI3SI6SBE2WTYD`

- Testnet PHPT Issuer: `GBNZSU3MNGSTCELL6AFI3SI6SBE2WTYD47IF6LWK7P7MDEV6B2X7S34M`


## Team

- Lemuel Sebastian Perez — @speyeral


## License

MIT 
