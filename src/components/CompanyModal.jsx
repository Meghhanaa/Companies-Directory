import React from 'react'
export default function CompanyModal({company, onClose}){
  if(!company) return null
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" role="dialog" aria-modal="true">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-lg">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold">{company.name}</h2>
            <p className="text-sm text-slate-600">{company.location} • {company.industry}</p>
          </div>
          <button onClick={onClose} className="text-slate-500">Close</button>
        </div>
        <p className="mt-4">{company.description}</p>
        <div className="mt-4 flex justify-end gap-2">
          <a href={company.website} target="_blank" rel="noreferrer" className="px-3 py-1 bg-slate-100 rounded-md">Visit Website</a>
          <button onClick={onClose} className="px-3 py-1 bg-sky-500 text-white rounded-md">Done</button>
        </div>
      </div>
    </div>
  )
}
