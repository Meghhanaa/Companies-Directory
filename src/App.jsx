import React from 'react'
import Tobar from './components/tobar'
import Home from './pages/Home'

export default function App(){
  return (
    <div className="min-h-screen">
      <Tobar>
        <div className="text-xs text-slate-500">React + Vite • Tailwind</div>
      </Tobar>
      <main className="py-6">
        <Home />
      </main>
    </div>
  )
}
