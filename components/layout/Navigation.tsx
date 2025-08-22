"use client"

import { useState } from "react"
import { BookOpen, Search, Home, Heart, User, LogIn, Menu, X, TrendingUp, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavigationProps {
  showSearch?: boolean
  onSearch?: (query: string) => void
}

export default function Navigation({ showSearch = false, onSearch }: NavigationProps) {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery)
    } else if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    } else {
      window.location.href = "/search"
    }
  }

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/search", label: "Browse", icon: Search },
    { href: "/popular", label: "Popular", icon: TrendingUp },
    { href: "/top-rated", label: "Top Rated", icon: Star },
  ]

  return (
    <nav className="border-b border-gray-700 bg-gray-800/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600/20 rounded-lg">
              <BookOpen className="h-8 w-8 text-indigo-400" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent">
              MangaVault
            </h1>
          </Link>

          {/* Search Bar (if enabled) */}
          {showSearch && (
            <div className="flex items-center gap-4 flex-1 max-w-3xl w-full lg:w-auto">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search manga, authors, genres..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-12 pr-4 py-3 bg-gray-700/50 border-gray-600 focus:border-indigo-500 transition-colors text-white placeholder:text-gray-400 text-lg"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  pathname === item.href
                    ? "bg-indigo-600/20 text-indigo-400"
                    : "text-gray-300 hover:text-indigo-400 hover:bg-indigo-500/10"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" className="hover:bg-indigo-500/20 text-gray-300">
              <Heart className="h-4 w-4 mr-2" />
              Favorites
            </Button>
            <Button variant="ghost" className="hover:bg-indigo-500/20 text-gray-300">
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <User className="h-4 w-4 mr-2" />
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setShowMobileMenu(!showMobileMenu)}>
            {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-700 pt-4">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    pathname === item.href
                      ? "bg-indigo-600/20 text-indigo-400"
                      : "text-gray-300 hover:text-indigo-400 hover:bg-indigo-500/10"
                  }`}
                  onClick={() => setShowMobileMenu(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-gray-700 pt-4 mt-2">
                <div className="flex flex-col gap-3">
                  <Button variant="ghost" className="justify-start hover:bg-indigo-500/20 text-gray-300">
                    <Heart className="h-4 w-4 mr-3" />
                    Favorites
                  </Button>
                  <Button variant="ghost" className="justify-start hover:bg-indigo-500/20 text-gray-300">
                    <LogIn className="h-4 w-4 mr-3" />
                    Login
                  </Button>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 justify-start">
                    <User className="h-4 w-4 mr-3" />
                    Sign Up
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
