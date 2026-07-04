'use client';

import React from 'react';

interface DashboardMetricsProps {
  totalRecipients: number;
  totalPHPT: number;
  totalUSDC: number;
}

export default function DashboardMetrics({ totalRecipients, totalPHPT, totalUSDC }: DashboardMetricsProps) {
  return (
    <section className="grid grid-cols-3 gap-gutter mb-8">
      <div className="bg-surface-container-lowest border border-data-border p-6 rounded-xl flex items-center justify-between">
        <div>
          <p className="text-[10px] font-label-sm text-on-surface-variant uppercase tracking-widest mb-1">Total Batch Value (USDC)</p>
          <p className="serif-heading text-headline-md font-bold" suppressHydrationWarning>
            {totalUSDC.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
        <div className="w-12 h-12 bg-status-success-bg flex items-center justify-center rounded-full">
          <span className="material-symbols-outlined text-on-surface text-green-700">monetization_on</span>
        </div>
      </div>
      <div className="bg-surface-container-lowest border border-data-border p-6 rounded-xl flex items-center justify-between">
        <div>
          <p className="text-[10px] font-label-sm text-on-surface-variant uppercase tracking-widest mb-1">Total Payout (PHPT)</p>
          <p className="serif-heading text-headline-md font-bold" suppressHydrationWarning>
            {totalPHPT.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
        <div className="w-12 h-12 bg-stellar-blue-pastel flex items-center justify-center rounded-full">
          <span className="material-symbols-outlined text-on-surface text-blue-700">account_balance</span>
        </div>
      </div>
      <div className="bg-surface-container-lowest border border-data-border p-6 rounded-xl flex items-center justify-between">
        <div>
          <p className="text-[10px] font-label-sm text-on-surface-variant uppercase tracking-widest mb-1">Total Recipients</p>
          <p className="serif-heading text-headline-md font-bold" suppressHydrationWarning>
            {totalRecipients.toLocaleString('en-US')}
          </p>
        </div>
        <div className="w-12 h-12 bg-stellar-purple-pastel flex items-center justify-center rounded-full">
          <span className="material-symbols-outlined text-on-surface text-purple-700">group</span>
        </div>
      </div>
    </section>
  );
}
