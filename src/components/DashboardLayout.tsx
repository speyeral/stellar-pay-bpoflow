import React from 'react';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden ml-64">
        <TopNav />
        <main className="flex-1 overflow-y-auto mt-16 p-margin-desktop max-w-container-max mx-auto w-full min-h-screen">
          {children}
          <footer className="h-24"></footer>
        </main>
      </div>
    </div>
  );
}
