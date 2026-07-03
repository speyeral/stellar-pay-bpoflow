# BPOFlow

Cross-Border Enterprise Payroll via Stellar Path Payments

## Problem
In the Philippines, BPO (Business Process Outsourcing) workers and remote freelancers suffer from high remittance fees, slow bank transfer times (3-7 days), and unfavorable foreign exchange rates when paid in USD by overseas employers. While paying in crypto solves the speed and fee issue, it introduces price volatility and the burden of off-ramping. Corporate treasuries want to fund payroll in stablecoins like USDC to maintain standard accounting, but local workers need a stable local currency (like the Philippine Peso) to pay their bills. Moreover, money sent by Filipinos abroad were at a record high of $35.634 billion in 2025, as reported by the Banko Sentral ng Pilipinas.

## How It Works
BPOFlow is a corporate treasury dashboard for enterprise payroll managers.
1. The manager connects their Stellar wallet (like Freighter) and uploads a standard CSV file containing the payroll roster (employee IDs, Stellar wallet addresses, and expected PHP amounts).
2. The dashboard runs a **Pre-flight Check** against the Stellar network to ensure all employee wallets are active and have established trustlines for the Philippine Peso stablecoin (PHPT).
3. If an employee is missing a trustline, the manager can instantly copy a specialized onboarding link and send it to them. The employee opens the link, connects their wallet, and establishes the required trustline in one click.
4. Once all trustlines are validated, the manager executes the batch payout.

## How It Uses Stellar
BPOFlow leverages specific, powerful Stellar primitives:
- **Path Payments (`pathPaymentStrictSend`)**: The core innovation. The corporate treasury funds the payroll in **USDC**. However, the workers receive **PHPT** (PHP-pegged stablecoin). The conversion happens atomically on the Stellar Decentralized Exchange (SDEX) at the time of sending. The employer only holds USDC, the worker receives local currency, and no one has to manually swap.
- **Client-Side Batch Chunking**: Stellar enforces a strict limit of 100 operations per transaction. BPOFlow includes an algorithm that splits enterprise-scale payroll lists into sequential 100-operation transaction chunks to adhere to protocol constraints.
- **Dynamic Slippage Protection**: SDEX liquidity fluctuates. BPOFlow allows the manager to set a slippage tolerance (e.g., 0.5%), dynamically calculating a safety floor (`destMin`) for each worker. If the market drops, the transaction reverts, protecting the payroll funds.
- **Trustlines & Classic Assets**: Ensures compliance and safety. The dashboard's pre-flight check explicitly queries Horizon to verify `changeTrust` operations before allowing the execution of payroll.

## Track
 Track 2 — Financial Inclusion & Everyday Payments 
 
## Tech Stack
- Framework: Next.js 16 (App Router) / React / Tailwind CSS
- Stellar SDK: @stellar/stellar-sdk
- Wallet Integration: @stellar/freighter-api
- Network: testnet

## Setup & Run
You will need Node.js installed and the Freighter browser extension configured for the Stellar Testnet.

```bash
git clone https://github.com/speyeral/bpoflow.git
cd stellar_global_payroll
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the dashboard.

## Network Details
- Network: testnet
- RPC URL: `https://horizon-testnet.stellar.org`
- Asset issuers: 
  - USDC: `GCALH2AMAHJZBTRNB6AMHXAGNWBXEVKH6DM5FNRWMUQPBYISBKRNKNMZ`
  - PHPT: `GCUIVILDCZJOJTYXJEC6RAINKFKJ3HWNU3Y56G3RZVU6CACBOEE5XWDE`

## Team
- Lemuel Sebastian Perez — @speyeral

## License
MIT
