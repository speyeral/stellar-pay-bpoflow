'use client';

import React from 'react';
import Link from 'next/link';
import { useStellar } from '@/contexts/StellarContext';

export default function Sidebar() {
  const { connect, status } = useStellar();

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-surface-container-low dark:bg-primary-container flex flex-col py-8 px-4 z-50">
      <div className="mb-12 px-2 flex items-center gap-3">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
          <span className="material-symbols-outlined text-sm">rocket_launch</span>
        </div>
        <div>
          <h1 className="font-headline-md text-headline-md font-semibold text-white">BPOFlow</h1>
          <p className="font-body-md text-label-md text-white">USDC &rarr; PHPT Bridge</p>
        </div>
      </div>
      <nav className="flex-1 space-y-2">
        <Link href="#" className="flex items-center gap-3 px-4 py-3 bg-stellar-blue-pastel text-on-secondary-container rounded-xl transition-all duration-150">
          <span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
          <span className="font-label-md text-label-md">Dashboard</span>
        </Link>
        <Link href="#" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-colors duration-200 rounded-xl">
          <span className="material-symbols-outlined" data-icon="group">group</span>
          <span className="font-label-md text-label-md">Contractors</span>
        </Link>
        <Link href="#" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-colors duration-200 rounded-xl">
          <span className="material-symbols-outlined" data-icon="sync_alt">sync_alt</span>
          <span className="font-label-md text-label-md">Streams</span>
        </Link>
        <Link href="#" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-colors duration-200 rounded-xl">
          <span className="material-symbols-outlined" data-icon="analytics">analytics</span>
          <span className="font-label-md text-label-md">Treasury</span>
        </Link>
        <Link href="#" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-colors duration-200 rounded-xl">
          <span className="material-symbols-outlined" data-icon="account_balance_wallet">account_balance_wallet</span>
          <span className="font-label-md text-label-md">Wallets</span>
        </Link>
      </nav>
      <div className="mt-auto pt-8 border-t border-data-border space-y-2">
        <button 
          onClick={connect}
          className="w-full bg-primary text-on-primary py-3 px-4 rounded-xl font-label-md text-label-md flex items-center justify-center gap-2 mb-4 hover:bg-primary-fixed-dim transition-colors"
        >
          <span className="material-symbols-outlined text-sm">account_balance_wallet</span>
          {status === 'connected' ? 'Connected' : 'Connect Freighter'}
        </button>
        <Link href="#" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-colors duration-200 rounded-xl">
          <span className="material-symbols-outlined" data-icon="help_outline">help_outline</span>
          <span className="font-label-md text-label-md">Trustline Help</span>
        </Link>
      </div>
    </aside>
  );
}
