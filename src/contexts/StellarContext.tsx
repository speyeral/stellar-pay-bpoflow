'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { isAllowed, setAllowed, getAddress } from '@stellar/freighter-api';

interface StellarContextType {
  publicKey: string | null;
  status: 'disconnected' | 'connecting' | 'connected';
  connect: () => Promise<void>;
  disconnect: () => void;
}

const StellarContext = createContext<StellarContextType | undefined>(undefined);

export function StellarProvider({ children }: { children: ReactNode }) {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [status, setStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');

  useEffect(() => {
    // Check if previously connected
    const checkConnection = async () => {
      try {
        const allowedRes = await isAllowed();
        if (allowedRes.isAllowed) {
          const addressRes = await getAddress();
          if (addressRes.address) {
            setPublicKey(addressRes.address);
            setStatus('connected');
          }
        }
      } catch (error) {
        console.error("Error checking Freighter connection:", error);
      }
    };
    checkConnection();
  }, []);

  const connect = async () => {
    setStatus('connecting');
    try {
      await setAllowed();
      const addressRes = await getAddress();
      if (addressRes.address) {
        setPublicKey(addressRes.address);
        setStatus('connected');
      } else {
        setStatus('disconnected');
      }
    } catch (error) {
      console.error("Error connecting to Freighter:", error);
      setStatus('disconnected');
    }
  };

  const disconnect = () => {
    setPublicKey(null);
    setStatus('disconnected');
    // Note: Freighter doesn't have a direct "disconnect" API to revoke permission, 
    // but we can clear local state.
  };

  return (
    <StellarContext.Provider value={{ publicKey, status, connect, disconnect }}>
      {children}
    </StellarContext.Provider>
  );
}

export function useStellar() {
  const context = useContext(StellarContext);
  if (context === undefined) {
    throw new Error('useStellar must be used within a StellarProvider');
  }
  return context;
}
