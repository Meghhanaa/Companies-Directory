import React from 'react'

export default function Tobar({ children }) {
  return (
    <header className="sticky top-0 z-40 bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-sky-200">🌐 Companies Directory</h1>
          <p className="text-xs text-slate-300">Smart Companies Directory – Find the Right Company Instantly</p>
        </div>
        <div className="mt-2 sm:mt-0">{children}</div>
      </div>
    </header>
  )
}
