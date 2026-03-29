import React from 'react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 px-6 py-4">
        <h1 className="text-xl font-semibold">Integrated Education Platform</h1>
      </header>
      <main className="px-6 py-8">{children}</main>
    </div>
  );
};
