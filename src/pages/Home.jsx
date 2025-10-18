import React, { useState } from 'react'
import Filters from '../components/filters'
import CompanyList from '../components/CompanyList'
import CompanyModal from '../components/CompanyModal'
import { useCompany } from '../context/companyContext'

export default function Home(){
  const [selected, setSelected] = useState(null)
  const { all } = useCompany()

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-4">
      <Filters />
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-600">{all.length} companies</div>
      </div>
      <CompanyList onSelect={setSelected} />
      <CompanyModal company={selected} onClose={()=>setSelected(null)} />
    </div>
  )
}
