'use client';

import React, { useState } from 'react';
import { Recipient } from '@/types';
import { useStellar } from '@/contexts/StellarContext';
import { buildAndSignBatchPayout } from '@/lib/stellar';

interface ExecutionPanelProps {
  recipients: Recipient[];
}

export default function ExecutionPanel({ recipients }: ExecutionPanelProps) {
  const { publicKey, status: walletStatus, connect } = useStellar();
  const [isProcessing, setIsProcessing] = useState(false);
  const [txStatus, setTxStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [slippage, setSlippage] = useState<number>(0.5);

  const totalPHPT = recipients.reduce((acc, curr) => acc + parseFloat(curr.amountPHPT.replace(/,/g, '')), 0);
  // Mock conversion rate: 1 USDC = 57 PHPT (In production, SDEX will determine the real rate)
  const totalUSDC = totalPHPT / 57;

  // Prevent execution if any recipient is not validated (e.g., pending or missing trustline)
  const hasInvalid = recipients.some(r => r.status !== 'validated');

  const handleExecute = async () => {
    if (walletStatus !== 'connected' || !publicKey) {
      await connect();
      return;
    }

    setIsProcessing(true);
    setTxStatus('idle');
    setErrorMessage('');

    try {
      // Build and sign the path payment transactions (chunked) via Freighter
      await buildAndSignBatchPayout(publicKey, recipients, slippage);
      setTxStatus('success');
    } catch (error: unknown) {
      console.error("Payout failed:", error);
      setTxStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Transaction failed or was rejected by user.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-surface-container-lowest border border-data-border rounded-xl p-6 h-full flex flex-col justify-between">
      <div>
        <h3 className="font-headline-md text-headline-md serif-heading mb-6">Execution Summary</h3>
        
        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center pb-4 border-b border-data-border">
            <span className="text-sm font-label-md text-on-surface-variant">Total Recipients</span>
            <span className="font-semibold">{recipients.length}</span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-data-border">
            <span className="text-sm font-label-md text-on-surface-variant">Total Output (PHPT)</span>
            <span className="font-semibold text-blue-700">{totalPHPT.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-data-border">
            <span className="text-sm font-label-md text-on-surface-variant flex items-center gap-1">
              Slippage Tolerance
              <span className="material-symbols-outlined text-[14px] text-on-surface-variant cursor-help" title="Maximum allowed output variance due to SDEX liquidity.">info</span>
            </span>
            <select 
              value={slippage} 
              onChange={(e) => setSlippage(parseFloat(e.target.value))}
              className="bg-surface-container-low border border-data-border text-on-surface text-sm rounded-lg focus:ring-primary focus:border-primary block p-1.5 font-data-mono"
            >
              <option value={0.1}>0.1%</option>
              <option value={0.5}>0.5%</option>
              <option value={1.0}>1.0%</option>
              <option value={5.0}>5.0%</option>
            </select>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-sm font-label-md text-on-surface-variant">Estimated Cost (USDC)</span>
            <span className="font-display-lg text-2xl font-bold">
              {totalUSDC > 0 ? totalUSDC.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}
            </span>
          </div>
        </div>

        {hasInvalid && (
          <div className="mb-4 p-3 bg-error-container text-on-error-container rounded-lg text-xs font-label-md border border-red-200">
             <span className="material-symbols-outlined text-sm align-middle mr-1">warning</span>
            Cannot execute. Please resolve trustline errors first.
          </div>
        )}

        {txStatus === 'success' && (
          <div className="mb-4 p-3 bg-status-success-bg text-green-800 rounded-lg text-xs font-label-md border border-green-200">
             <span className="material-symbols-outlined text-sm align-middle mr-1">check_circle</span>
            Batch payout executed successfully!
          </div>
        )}

        {txStatus === 'error' && (
          <div className="mb-4 p-3 bg-error-container text-on-error-container rounded-lg text-xs font-label-md border border-red-200">
             <span className="material-symbols-outlined text-sm align-middle mr-1">error</span>
            {errorMessage}
          </div>
        )}
      </div>

      <button 
        onClick={handleExecute}
        disabled={Boolean(isProcessing || hasInvalid || recipients.length === 0)}
        suppressHydrationWarning
        className={`w-full py-4 rounded-xl font-label-md text-label-md flex items-center justify-center gap-2 transition-colors ${
          isProcessing || hasInvalid || recipients.length === 0
            ? 'bg-surface-container text-on-surface-variant cursor-not-allowed'
            : 'bg-primary text-on-primary hover:bg-primary-fixed-dim hover:text-primary-container'
        }`}
      >
        {isProcessing ? (
          <>
            <span className="material-symbols-outlined text-sm animate-spin">refresh</span>
            Processing Transaction...
          </>
        ) : (
          <>
            <span className="material-symbols-outlined text-sm">send</span>
            Execute Batch Payout
          </>
        )}
      </button>
    </div>
  );
}
