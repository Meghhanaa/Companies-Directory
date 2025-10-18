import React from 'react'
import { useCompany } from '../context/companyContext'

export default function Filters(){
  const { search, setSearch, location, setLocation, industry, setIndustry, locations, industries, sortBy, setSortBy } = useCompany()

  function reset(){
    setSearch(''); setLocation('All'); setIndustry('All'); setSortBy('name_asc')
  }

  return (
    <div className="card flex flex-col md:flex-row gap-3 items-center">
      <input
        aria-label="Search companies"
        placeholder="Search by name..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="p-3 border border-slate-600 rounded-md flex-1 bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
      />

      <select
        value={location}
        onChange={e => setLocation(e.target.value)}
        className="p-2 border border-slate-600 rounded-md bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
      >
        {locations.map(l => <option key={l} value={l}>{l}</option>)}
      </select>

      <select
        value={industry}
        onChange={e => setIndustry(e.target.value)}
        className="p-2 border border-slate-600 rounded-md bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
      >
        {industries.map(i => <option key={i} value={i}>{i}</option>)}
      </select>

      <select
        value={sortBy}
        onChange={e => setSortBy(e.target.value)}
        className="p-2 border border-slate-600 rounded-md bg-slate-800 text-white font-black focus:outline-none focus:ring-2 focus:ring-sky-400"
      >
        <option value="name_asc">Name ↑</option>
        <option value="name_desc">Name ↓</option>
        <option value="employees_desc">Employees ↓</option>
        <option value="employees_asc">Employees ↑</option>
      </select>

      <button
        onClick={reset}
        className="ml-auto px-3 py-1 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition"
      >
        Reset
      </button>
    </div>
  )
}
