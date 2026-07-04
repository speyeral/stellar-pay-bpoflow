'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useStellar } from '@/contexts/StellarContext';
import { getAddress } from '@stellar/freighter-api';
import { buildAndSignTrustline } from '@/lib/stellar';

function TrustlineSetupContent() {
  const searchParams = useSearchParams();
  const assetCode = searchParams.get('asset') || 'PHPT';
  const assetIssuer = searchParams.get('issuer') || '';
  
  const { status: walletStatus, connect } = useStellar();
  const [setupStatus, setSetupStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSetup = async () => {
    if (walletStatus !== 'connected') {
      await connect();
      return;
    }

    try {
      // Force fetch the currently active address from Freighter to prevent tx_bad_auth
      // in case the user switched accounts without refreshing the page.
      const addressRes = await getAddress();
      const activePublicKey = addressRes.address;
      
      if (!activePublicKey) {
        throw new Error('Please unlock your Freighter wallet and select an account.');
      }

      if (!assetIssuer) {
        setSetupStatus('error');
        setErrorMessage('Missing asset issuer in the URL.');
        return;
      }

      setSetupStatus('processing');
      setErrorMessage('');

      await buildAndSignTrustline(activePublicKey, assetCode, assetIssuer);
      setSetupStatus('success');
    } catch (error: unknown) {
      console.error("Trustline setup failed:", error);
      setSetupStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Transaction failed or was rejected.');
    }
  };

  return (
    <div className="min-h-screen bg-surface-container flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest border border-data-border rounded-2xl p-8 max-w-md w-full shadow-lg">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-3xl text-white">account_balance_wallet</span>
          </div>
          <h1 className="font-headline-md text-headline-md serif-heading mb-2">Action Required</h1>
          <p className="text-on-surface-variant font-label-md">
            You have received a payroll invite that requires you to establish a trustline for the <strong>{assetCode}</strong> token on the Stellar network.
          </p>
        </div>

        {setupStatus === 'success' ? (
          <div className="bg-status-success-bg text-green-800 p-4 rounded-xl border border-green-200 text-center">
            <span className="material-symbols-outlined text-4xl mb-2">check_circle</span>
            <h3 className="font-semibold mb-1">Trustline Established</h3>
            <p className="text-sm">You can safely close this page. Your account is ready to receive {assetCode}.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-surface-container-low p-4 rounded-xl border border-data-border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-label-sm text-on-surface-variant uppercase tracking-wider">Asset</span>
                <span className="font-data-mono font-semibold">{assetCode}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-label-sm text-on-surface-variant uppercase tracking-wider">Issuer</span>
                <span className="font-data-mono text-xs text-on-surface-variant truncate w-32 text-right" title={assetIssuer}>
                  {assetIssuer ? `${assetIssuer.slice(0, 6)}...${assetIssuer.slice(-4)}` : 'Unknown'}
                </span>
              </div>
            </div>

            {setupStatus === 'error' && (
              <div className="p-3 bg-error-container text-on-error-container rounded-lg text-xs font-label-md border border-red-200 text-center">
                <span className="material-symbols-outlined text-sm align-middle mr-1">error</span>
                {errorMessage}
              </div>
            )}

            <button
              onClick={handleSetup}
              disabled={setupStatus === 'processing'}
              className="w-full bg-primary text-on-primary hover:bg-primary-fixed-dim transition-colors py-4 rounded-xl font-label-md flex justify-center items-center gap-2"
            >
              {setupStatus === 'processing' ? (
                <>
                  <span className="material-symbols-outlined text-sm animate-spin">refresh</span>
                  Processing...
                </>
              ) : walletStatus === 'connected' ? (
                'Establish Trustline'
              ) : (
                'Connect Freighter to Continue'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrustlineSetupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface-container flex items-center justify-center">Loading...</div>}>
      <TrustlineSetupContent />
    </Suspense>
  );
}
