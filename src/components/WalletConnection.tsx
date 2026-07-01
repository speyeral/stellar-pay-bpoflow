'use client';

import React from 'react';
import { useStellar } from '@/contexts/StellarContext';

export default function WalletConnection() {
  const { status, publicKey, connect, disconnect } = useStellar();

  return (
    <div className="flex items-center gap-3">
      {status === 'disconnected' && (
        <button 
          onClick={connect}
          className="px-4 py-2 border border-data-border rounded-lg text-label-md hover:bg-surface-container transition-colors bg-white shadow-sm"
        >
          Connect Freighter
        </button>
      )}
      
      {status === 'connecting' && (
        <button 
          disabled
          className="px-4 py-2 border border-data-border rounded-lg text-label-md bg-surface-container opacity-70 flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm animate-spin">refresh</span>
          Connecting...
        </button>
      )}

      {status === 'connected' && (
        <div className="flex items-center gap-3 px-4 py-2 bg-surface-container-low border border-data-border rounded-lg">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          <span className="font-data-mono text-sm text-on-surface">
            {publicKey ? `${publicKey.slice(0, 6)}...${publicKey.slice(-4)}` : 'Connected'}
          </span>
          <button 
            onClick={disconnect}
            className="text-on-surface-variant hover:text-primary transition-colors ml-2 flex items-center"
            title="Disconnect"
          >
             <span className="material-symbols-outlined text-sm">logout</span>
          </button>
        </div>
      )}
    </div>
  );
}
