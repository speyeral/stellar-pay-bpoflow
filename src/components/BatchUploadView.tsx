'use client';

import React, { useState } from 'react';
import RecipientTable from './RecipientTable';
import ExecutionPanel from './ExecutionPanel';
import { Recipient } from '@/types';

import DashboardMetrics from './DashboardMetrics';
import { hasPHPTTrustline } from '@/lib/stellar';

const MOCK_RECIPIENTS: Recipient[] = [
  { id: 'EMP-001', name: 'Mary Grace Piattos', publicKey: 'GDYJDDD4HB3THVE4QWOB2CSUIZOBWNS6LWGXWR6NLVP7ZYETVFGBTCGP', amountPHPT: '28,500.00', status: 'pending' },
  { id: 'EMP-002', name: 'Juan Dela Cruz', publicKey: 'GCALH2AMAHJZBTRNB6AMHXAGNWBXEVKH6DM5FNRWMUQPBYISBKRNKNMZ', amountPHPT: '17,100.00', status: 'pending' },
  { id: 'EMP-003', name: 'Ana Reyes', publicKey: 'GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF', amountPHPT: '34,200.00', status: 'pending' },
];

export default function BatchUploadView() {
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [isValidating, setIsValidating] = useState(false);

  const totalRecipients = recipients.length;
  const totalPHPT = recipients.reduce((sum, r) => sum + parseFloat(r.amountPHPT.replace(/,/g, '')), 0);
  const totalUSDC = totalPHPT / 57; // Mock rate 1 USDC = 57 PHPT

  const handleUploadMock = () => {
    // Simulate parsing a CSV file
    setRecipients(MOCK_RECIPIENTS);
  };

  const validateTrustlines = async () => {
    setIsValidating(true);
    
    const validatedRecipients = await Promise.all(recipients.map(async (r) => {
      const hasTrustline = await hasPHPTTrustline(r.publicKey);
      return {
        ...r,
        status: hasTrustline ? 'validated' : 'missing_trustline'
      } as Recipient;
    }));
    
    setRecipients(validatedRecipients);
    setIsValidating(false);
  };

  return (
    <>
      <DashboardMetrics 
        totalRecipients={totalRecipients} 
        totalPHPT={totalPHPT} 
        totalUSDC={totalUSDC} 
      />
      <section className="grid grid-cols-12 gap-gutter h-[600px]">
      <div className="col-span-8 bg-surface-container-lowest border border-data-border rounded-xl flex flex-col">
        <div className="p-6 border-b border-data-border flex justify-between items-center bg-surface-bright rounded-t-xl">
          <h3 className="serif-heading font-headline-md text-headline-md">Batch Upload & Validation</h3>
          <div className="flex gap-3">
            <button 
              onClick={handleUploadMock}
              className="px-4 py-2 border border-data-border rounded-lg text-label-md hover:bg-surface-container transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">upload_file</span>
              Load CSV
            </button>
            <button 
              onClick={validateTrustlines}
              disabled={Boolean(recipients.length === 0 || isValidating)}
              suppressHydrationWarning
              className={`px-4 py-2 border border-data-border rounded-lg text-label-md flex items-center gap-2 transition-colors ${
                (recipients.length === 0 || isValidating) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-surface-container'
              }`}
            >
              <span className={`material-symbols-outlined text-sm ${isValidating ? 'animate-spin' : ''}`}>
                {isValidating ? 'refresh' : 'fact_check'}
              </span>
              {isValidating ? 'Validating...' : 'Pre-flight Check'}
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <RecipientTable recipients={recipients} />
        </div>
      </div>
      
      <div className="col-span-4">
        <ExecutionPanel recipients={recipients} />
      </div>
    </section>
    </>
  );
}
