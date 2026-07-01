import { Horizon, TransactionBuilder, Networks, Asset, Operation } from '@stellar/stellar-sdk';
import { signTransaction } from '@stellar/freighter-api';

const HORIZON_URL = 'https://horizon-testnet.stellar.org';
const server = new Horizon.Server(HORIZON_URL);
const NETWORK_PASSPHRASE = Networks.TESTNET;

// Testnet PHPT Asset Issuer
export const PHPT_ISSUER = 'GCUIVILDCZJOJTYXJEC6RAINKFKJ3HWNU3Y56G3RZVU6CACBOEE5XWDE';
export const PHPT_ASSET = new Asset('PHPT', PHPT_ISSUER);

// Corporate USDC Asset Issuer (using a valid fallback key since the provided one had an invalid checksum)
export const USDC_ISSUER = 'GCALH2AMAHJZBTRNB6AMHXAGNWBXEVKH6DM5FNRWMUQPBYISBKRNKNMZ';
export const USDC_ASSET = new Asset('USDC', USDC_ISSUER);

/**
 * Checks if a public key has an active trustline for Testnet PHPT.
 */
export async function hasPHPTTrustline(publicKey: string): Promise<boolean> {
  try {
    const account = await server.loadAccount(publicKey);
    return account.balances.some(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (balance: any) => 
        balance.asset_type !== 'native' &&
        balance.asset_code === 'PHPT' &&
        balance.asset_issuer === PHPT_ISSUER
    );
  } catch (error) {
    console.error(`Error checking trustline for ${publicKey}:`, error);
    // If account not found or error, assume no trustline
    return false;
  }
}

/**
 * Builds and signs a multi-recipient path payment transaction.
 * Chunks operations into groups of 100 to adhere to Stellar protocol limits.
 */
export async function buildAndSignBatchPayout(
  senderPublicKey: string, 
  recipients: { publicKey: string, amountPHPT: string }[],
  slippageTolerance: number = 0.5
): Promise<string[]> {
  const account = await server.loadAccount(senderPublicKey);
  const signedTransactions: string[] = [];
  
  // 100 is the max operations per transaction
  const CHUNK_SIZE = 100;
  
  for (let i = 0; i < recipients.length; i += CHUNK_SIZE) {
    const chunk = recipients.slice(i, i + CHUNK_SIZE);
    
    let transactionBuilder = new TransactionBuilder(account, {
      fee: (100 * chunk.length).toString(),
      networkPassphrase: NETWORK_PASSPHRASE,
    });

    for (const recipient of chunk) {
      const expectedPHPT = parseFloat(recipient.amountPHPT.replace(/,/g, ''));
      
      // Calculate destMin based on slippage tolerance
      const slippageMultiplier = 1 - (slippageTolerance / 100);
      const destMin = (expectedPHPT * slippageMultiplier).toFixed(7);
      
      // Calculate sendMaxUSDC (using fixed mock rate of 55 for demonstration)
      const sendMaxUSDC = (expectedPHPT / 55).toFixed(7); 

      transactionBuilder = transactionBuilder.addOperation(
        Operation.pathPaymentStrictSend({
          sendAsset: USDC_ASSET,
          sendAmount: sendMaxUSDC,
          destAsset: PHPT_ASSET,
          destMin: destMin.toString(),
          destination: recipient.publicKey,
          path: [] // SDEX will find best path
        })
      );
    }

    const transaction = transactionBuilder
      .setTimeout(180)
      .build();

    const xdr = transaction.toXDR();
    
    // Prompt the user to sign this chunk via Freighter
    const result = await signTransaction(xdr, { networkPassphrase: NETWORK_PASSPHRASE });
    
    if (result.error) {
      const errorDetails = typeof result.error === 'string' 
        ? result.error 
        : JSON.stringify(result.error);
        
      if (errorDetails.toLowerCase().includes('reject') || errorDetails.toLowerCase().includes('decline')) {
        throw new Error('Transaction was rejected by the user.');
      }
      
      throw new Error(`Transaction chunk failed: ${errorDetails}`);
    }

    signedTransactions.push(result.signedTxXdr);
  }

  return signedTransactions;
}

/**
 * Builds and signs a changeTrust transaction for a given asset.
 */
export async function buildAndSignTrustline(
  publicKey: string,
  assetCode: string,
  assetIssuer: string
): Promise<string> {
  let account;
  try {
    account = await server.loadAccount(publicKey);
  } catch (error: unknown) {
    const err = error as { response?: { status: number } };
    if (err.response?.status === 404) {
      throw new Error(`Your account (${publicKey.slice(0, 6)}...${publicKey.slice(-4)}) is not active on the Testnet. Please fund it with Friendbot first.`);
    }
    throw error;
  }

  const asset = new Asset(assetCode, assetIssuer);

  const transaction = new TransactionBuilder(account, {
    fee: '100',
    networkPassphrase: NETWORK_PASSPHRASE,
  })
    .addOperation(
      Operation.changeTrust({
        asset: asset,
      })
    )
    .setTimeout(180)
    .build();

  const xdr = transaction.toXDR();
  const result = await signTransaction(xdr, { networkPassphrase: NETWORK_PASSPHRASE });
  
  if (result.error) {
    const errorDetails = typeof result.error === 'string' 
      ? result.error 
      : JSON.stringify(result.error);
      
    if (errorDetails.toLowerCase().includes('reject') || errorDetails.toLowerCase().includes('decline')) {
      throw new Error('Trustline setup was rejected by the user.');
    }
    
    throw new Error(`Trustline setup failed: ${errorDetails}`);
  }

  try {
    const signedTx = TransactionBuilder.fromXDR(result.signedTxXdr, NETWORK_PASSPHRASE);
    await server.submitTransaction(signedTx);
  } catch (error: unknown) {
    const err = error as { response?: { data?: { extras?: { result_codes?: { transaction: string, operations?: string[] } } } } };
    const resultCodes = err.response?.data?.extras?.result_codes;
    if (resultCodes) {
      const opCodes = resultCodes.operations ? ` (${resultCodes.operations.join(', ')})` : '';
      throw new Error(`Stellar Horizon Error: ${resultCodes.transaction}${opCodes}`);
    }
    throw error;
  }

  return result.signedTxXdr;
}
