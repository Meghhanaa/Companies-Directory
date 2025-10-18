import React, { useRef, useEffect } from 'react'
import { useCompany } from '../context/companyContext'

export default function CompanyList({ onSelect }) {
  const { visible, loading, error, hasMore, loadMore, mode } = useCompany()
  const loaderRef = useRef()

  // infinite scroll
  useEffect(() => {
    if (mode !== 'infinite' || !loaderRef.current) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && hasMore) loadMore()
      })
    }, { rootMargin: '200px' })
    obs.observe(loaderRef.current)
    return () => obs.disconnect()
  }, [loaderRef.current, hasMore, mode])

  if (loading)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse p-6">
        {Array(6).fill().map((_, i) => (
          <div key={i} className="bg-white/20 backdrop-blur-md rounded-2xl h-40"></div>
        ))}
      </div>
    )

  if (error) return <div className="p-8 text-center text-red-600">Error: {error}</div>
  if (!visible.length) return <div className="p-8 text-center">No results found.</div>

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map(c => (
          <article
            key={c.id}
            className="p-5 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-md hover:shadow-xl hover:bg-white/20 transition-all duration-300 cursor-pointer"
            onClick={() => onSelect && onSelect(c)}
          >
            <h3 className="font-semibold text-lg mb-1 text-sky-100">{c.name}</h3>
            <p className="text-sm text-slate-300">{c.location} • {c.industry}</p>
            <p className="mt-2 text-sm text-slate-100 line-clamp-3">{c.description}</p>
            <div className="mt-3 flex justify-between items-center text-sm">
              <a href={c.website} target="_blank" rel="noreferrer" className="text-sky-300 hover:underline">Website</a>
              <span className="text-slate-400">{c.employees} emp</span>
            </div>
          </article>
        ))}
      </div>
      {mode === 'infinite' && (
        <div ref={loaderRef} className="col-span-full p-4 text-center">
          {hasMore ? <div className="text-slate-400 animate-pulse">Loading more...</div> : <div className="text-slate-400">— End of results —</div>}
        </div>
      )}
    </>
  )
}
