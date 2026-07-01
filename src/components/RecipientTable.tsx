'use client';

import React, { useState } from 'react';
import { Recipient } from '@/types';
import { PHPT_ISSUER } from '@/lib/stellar';

interface RecipientTableProps {
  recipients: Recipient[];
}

export default function RecipientTable({ recipients }: RecipientTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyLink = (id: string) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    const link = `${origin}/trustline-setup?asset=PHPT&issuer=${PHPT_ISSUER}`;
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (recipients.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-on-surface-variant">
        <span className="material-symbols-outlined text-4xl mb-2 opacity-50">description</span>
        <p className="font-label-md">Upload a batch file to populate the table</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto custom-scrollbar">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-surface-container-low border-b border-data-border">
            <th className="px-6 py-4 font-label-sm text-on-surface-variant uppercase text-[10px] tracking-widest">Recipient</th>
            <th className="px-6 py-4 font-label-sm text-on-surface-variant uppercase text-[10px] tracking-widest">Public Key</th>
            <th className="px-6 py-4 font-label-sm text-on-surface-variant uppercase text-[10px] tracking-widest">Amount (PHPT)</th>
            <th className="px-6 py-4 font-label-sm text-on-surface-variant uppercase text-[10px] tracking-widest">Pre-flight Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-data-border">
          {recipients.map((recipient) => (
            <tr key={recipient.id} className="hover:bg-surface-container transition-colors">
              <td className="px-6 py-4 font-label-md text-on-surface">
                {recipient.name}
                <div className="text-[10px] text-on-surface-variant">{recipient.id}</div>
              </td>
              <td className="px-6 py-4 font-data-mono text-xs text-on-surface-variant">
                {recipient.publicKey.slice(0, 8)}...{recipient.publicKey.slice(-8)}
              </td>
              <td className="px-6 py-4 font-semibold text-sm">
                {recipient.amountPHPT}
              </td>
              <td className="px-6 py-4">
                {recipient.status === 'pending' && (
                  <span className="px-3 py-1 rounded-full bg-status-pending-bg text-[10px] font-label-sm text-yellow-800 border border-yellow-200">
                    PENDING
                  </span>
                )}
                {recipient.status === 'validated' && (
                  <span className="px-3 py-1 rounded-full bg-status-success-bg text-[10px] font-label-sm text-green-800 border border-green-200">
                    VALIDATED
                  </span>
                )}
                {recipient.status === 'missing_trustline' && (
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-error-container text-[10px] font-label-sm text-error border border-red-200">
                      TRUSTLINE_MISSING
                    </span>
                    <button 
                      onClick={() => handleCopyLink(recipient.id)}
                      className="flex items-center gap-1 text-[10px] font-label-sm text-primary hover:text-primary-fixed-dim transition-colors"
                      title="Copy Setup Link"
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {copiedId === recipient.id ? 'check' : 'content_copy'}
                      </span>
                      {copiedId === recipient.id ? 'Copied!' : 'Invite Link'}
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
