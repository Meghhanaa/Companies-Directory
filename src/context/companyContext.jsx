import React, { createContext, useContext, useEffect, useState, useRef } from 'react'

const CompanyContext = createContext()
export const useCompany = () => useContext(CompanyContext)

export function CompanyProvider({ children }) {
  const [all, setAll] = useState([])
  const [visible, setVisible] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // filters, sorting & pagination mode
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('All')
  const [industry, setIndustry] = useState('All')
  const [sortBy, setSortBy] = useState('name_asc')
  const [mode, setMode] = useState('infinite') // 'infinite' or 'pagination'

  const pageSize = 12
  const pageRef = useRef(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const res = await fetch('/companies.json')
        if (!res.ok) throw new Error('Failed to fetch companies')
        const data = await res.json()
        setAll(data)
        setError(null)
      } catch (err) {
        setError(err.message || 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const locations = ['All', ...Array.from(new Set(all.map(c => c.location)))]
  const industries = ['All', ...Array.from(new Set(all.map(c => c.industry)))]

  const filtered = React.useMemo(() => {
    let items = all.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase())
      const matchesLocation = location === 'All' || c.location === location
      const matchesIndustry = industry === 'All' || c.industry === industry
      return matchesSearch && matchesLocation && matchesIndustry
    })
    if (sortBy === 'name_asc') items.sort((a, b) => a.name.localeCompare(b.name))
    if (sortBy === 'name_desc') items.sort((a, b) => b.name.localeCompare(a.name))
    if (sortBy === 'employees_desc') items.sort((a, b) => b.employees - a.employees)
    if (sortBy === 'employees_asc') items.sort((a, b) => a.employees - b.employees)
    return items
  }, [all, search, location, industry, sortBy])

  useEffect(() => {
    pageRef.current = 0
    if (mode === 'infinite') {
      setVisible(filtered.slice(0, pageSize))
      setHasMore(filtered.length > pageSize)
    } else {
      setCurrentPage(1)
      setVisible(filtered.slice(0, pageSize))
    }
  }, [filtered, mode])

  function loadMore() {
    const next = pageRef.current + 1
    const start = next * pageSize
    const nextItems = filtered.slice(start, start + pageSize)
    if (nextItems.length === 0) {
      setHasMore(false)
      return
    }
    setVisible(prev => [...prev, ...nextItems])
    pageRef.current = next
    setHasMore(filtered.length > (pageRef.current + 1) * pageSize)
  }

  function goToPage(page) {
    setCurrentPage(page)
    const start = (page - 1) * pageSize
    setVisible(filtered.slice(start, start + pageSize))
  }

  return (
    <CompanyContext.Provider
      value={{
        all, visible, loading, error, hasMore, loadMore,
        search, setSearch, location, setLocation, industry, setIndustry,
        locations, industries, sortBy, setSortBy,
        mode, setMode, pageSize, currentPage, goToPage, total: filtered.length
      }}
    >
      {children}
    </CompanyContext.Provider>
  )
}
