import React from 'react'
import { useCompany } from '../context/companyContext'

export default function Pagination() {
  const { mode, currentPage, goToPage, total, pageSize, setMode } = useCompany()
  if (mode === 'infinite') return (
    <div className="text-center mt-6 text-slate-400">
      <button onClick={() => setMode('pagination')} className="px-4 py-2 bg-white/10 rounded-md hover:bg-white/20 transition">
        Switch to Pagination
      </button>
    </div>
  )

  const totalPages = Math.ceil(total / pageSize)
  return (
    <div className="mt-8 flex justify-center items-center gap-3">
      <button
        onClick={() => goToPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-white/10 rounded-md disabled:opacity-40"
      >
        ← Prev
      </button>

      <span className="text-slate-200">Page {currentPage} of {totalPages}</span>

      <button
        onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-white/10 rounded-md disabled:opacity-40"
      >
        Next →
      </button>

      <button onClick={() => setMode('infinite')} className="ml-4 px-3 py-1 bg-white/10 rounded-md hover:bg-white/20">
        Infinite Scroll
      </button>
    </div>
  )
}
