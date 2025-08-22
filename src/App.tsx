"use client"

import { useState } from "react"
import Navbar from "./components/layout/Navbar"
import Home from "./pages/Home"
import Search from "./pages/Search"
import Reader from "./pages/Reader"

interface NavigationData {
  manga?: any
  mangaId?: string
  chapter?: number
  query?: string
  genres?: string[]
  sort?: string
  sortBy?: string
}

function App() {
  const [currentPage, setCurrentPage] = useState("home")
  const [navigationData, setNavigationData] = useState<NavigationData>({})

  const handleNavigate = (page: string, data?: NavigationData) => {
    setCurrentPage(page)
    setNavigationData(data || {})

    // Reset page scroll when navigating
    window.scrollTo(0, 0)
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "search":
        return (
          <Search
            onNavigate={handleNavigate}
            initialQuery={navigationData.query}
            initialGenres={navigationData.genres}
            initialSort={navigationData.sortBy || navigationData.sort}
          />
        )
      case "reader":
        return (
          <Reader
            mangaId={navigationData.mangaId || "589790"}
            chapterNumber={navigationData.chapter || 1}
            onNavigate={handleNavigate}
          />
        )
      case "library":
        return <Search onNavigate={handleNavigate} initialQuery="" />
      case "manga-detail":
        // For now, redirect to reader with first chapter
        return <Reader mangaId={navigationData.manga?.id || "589790"} chapterNumber={1} onNavigate={handleNavigate} />
      case "home":
      default:
        return <Home onNavigate={handleNavigate} />
    }
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {currentPage !== "reader" && <Navbar currentPage={currentPage} onNavigate={handleNavigate} />}
      <main className="relative">{renderCurrentPage()}</main>
    </div>
  )
}

export default App
