'use client';

import React from 'react';

export default function TopNav() {
  return (
    <header className="fixed top-0 right-0 left-64 h-16 bg-surface dark:bg-background border-b border-data-border flex items-center justify-between px-margin-desktop z-40">
      <div className="flex items-center bg-surface-container-low px-4 py-2 rounded-full w-96">
        <span className="material-symbols-outlined text-on-surface-variant mr-2">search</span>
        <input 
          className="bg-transparent border-none focus:ring-0 text-sm w-full font-body-md outline-none" 
          placeholder="Search hash or recipient..." 
          type="text"
        />
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 border-r border-data-border pr-6">
          <button className="relative text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
            <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full"></span>
          </button>
          <button className="text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined" data-icon="history_edu">history_edu</span>
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="font-label-md text-label-md font-semibold">Alex Sterling</p>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">Treasury Manager</p>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-data-border overflow-hidden bg-stellar-purple-pastel flex items-center justify-center">
             <span className="material-symbols-outlined text-on-surface-variant">person</span>
          </div>
        </div>
      </div>
    </header>
  );
}
