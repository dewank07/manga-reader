"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Star, Eye, SlidersHorizontal } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock manga data
const allManga = [
  {
    id: 1,
    title: "Dragon's Legacy",
    cover: "/placeholder.svg?height=300&width=200",
    rating: 4.8,
    chapters: 156,
    status: "Ongoing",
    genre: ["Action", "Fantasy", "Adventure"],
    views: "2.1M",
    year: 2023,
    author: "Akira Yamamoto",
  },
  {
    id: 2,
    title: "Mystic Academy",
    cover: "/placeholder.svg?height=300&width=200",
    rating: 4.6,
    chapters: 89,
    status: "Ongoing",
    genre: ["Romance", "School", "Magic"],
    views: "1.8M",
    year: 2022,
    author: "Yuki Tanaka",
  },
  {
    id: 3,
    title: "Shadow Hunter",
    cover: "/placeholder.svg?height=300&width=200",
    rating: 4.9,
    chapters: 203,
    status: "Completed",
    genre: ["Action", "Thriller", "Martial Arts"],
    views: "3.2M",
    year: 2021,
    author: "Kenji Sato",
  },
  {
    id: 4,
    title: "Celestial Warrior",
    cover: "/placeholder.svg?height=300&width=200",
    rating: 4.7,
    chapters: 124,
    status: "Ongoing",
    genre: ["Sci-Fi", "Action", "Space"],
    views: "1.9M",
    year: 2023,
    author: "Hiroshi Nakamura",
  },
  {
    id: 5,
    title: "Love in Tokyo",
    cover: "/placeholder.svg?height=300&width=200",
    rating: 4.5,
    chapters: 67,
    status: "Ongoing",
    genre: ["Romance", "Slice of Life", "Drama"],
    views: "1.4M",
    year: 2023,
    author: "Sakura Matsui",
  },
  {
    id: 6,
    title: "Demon Slayer Chronicles",
    cover: "/placeholder.svg?height=300&width=200",
    rating: 4.8,
    chapters: 178,
    status: "Ongoing",
    genre: ["Action", "Supernatural", "Historical"],
    views: "2.7M",
    year: 2022,
    author: "Tanjiro Kamado",
  },
  {
    id: 7,
    title: "Magic Knight Academy",
    cover: "/placeholder.svg?height=300&width=200",
    rating: 4.4,
    chapters: 45,
    status: "Ongoing",
    genre: ["Fantasy", "Action", "School"],
    views: "980K",
    year: 2023,
    author: "Asta Clover",
  },
  {
    id: 8,
    title: "Cyber Punk 2087",
    cover: "/placeholder.svg?height=300&width=200",
    rating: 4.6,
    chapters: 23,
    status: "Ongoing",
    genre: ["Sci-Fi", "Action", "Cyberpunk"],
    views: "750K",
    year: 2023,
    author: "Neo Matrix",
  },
]

const genres = [
  "Action",
  "Romance",
  "Fantasy",
  "Sci-Fi",
  "School",
  "Thriller",
  "Magic",
  "Adventure",
  "Slice of Life",
  "Drama",
  "Supernatural",
  "Historical",
  "Martial Arts",
  "Space",
  "Cyberpunk",
]

function MangaCard({ manga }: { manga: any }) {
  return (
    <Card className="group overflow-hidden border-0 bg-slate-800/50 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
      <Link href={`/manga/${manga.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={manga.cover || "/placeholder.svg"}
            alt={manga.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-2 left-2 right-2">
            <h3 className="text-white font-semibold text-sm line-clamp-2 mb-1">{manga.title}</h3>
            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center gap-1 text-yellow-400">
                <Star className="w-3 h-3 fill-current" />
                <span>{manga.rating}</span>
              </div>
              <span className="text-gray-400">{manga.chapters} ch</span>
            </div>
          </div>
          <Badge
            variant={manga.status === "Completed" ? "default" : "secondary"}
            className="absolute top-2 right-2 text-xs"
          >
            {manga.status}
          </Badge>
        </div>
        <CardContent className="p-3">
          <div className="flex flex-wrap gap-1 mb-2">
            {manga.genre.slice(0, 2).map((g: string) => (
              <Badge key={g} variant="outline" className="text-xs border-slate-600 text-slate-300">
                {g}
              </Badge>
            ))}
          </div>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>{manga.author}</span>
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>{manga.views}</span>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredManga, setFilteredManga] = useState(allManga)
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("popularity")
  const [showFilters, setShowFilters] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      let filtered = allManga

      // Filter by search query
      if (searchQuery) {
        filtered = filtered.filter(
          (manga) =>
            manga.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            manga.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
            manga.genre.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase())),
        )
      }

      // Filter by genres
      if (selectedGenres.length > 0) {
        filtered = filtered.filter((manga) => selectedGenres.every((genre) => manga.genre.includes(genre)))
      }

      // Filter by status
      if (statusFilter !== "all") {
        filtered = filtered.filter((manga) => manga.status.toLowerCase() === statusFilter)
      }

      // Sort results
      filtered.sort((a, b) => {
        switch (sortBy) {
          case "rating":
            return b.rating - a.rating
          case "chapters":
            return b.chapters - a.chapters
          case "year":
            return b.year - a.year
          case "title":
            return a.title.localeCompare(b.title)
          default: // popularity
            return Number.parseFloat(b.views.replace(/[^\d.]/g, "")) - Number.parseFloat(a.views.replace(/[^\d.]/g, ""))
        }
      })

      setFilteredManga(filtered)
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery, selectedGenres, statusFilter, sortBy])

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres((prev) => (prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]))
  }

  const clearFilters = () => {
    setSelectedGenres([])
    setStatusFilter("all")
    setSortBy("popularity")
    setSearchQuery("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-6">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-6">Search Manga</h1>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search by title, author, or genre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder-gray-400 h-12"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="border-slate-600 text-white hover:bg-slate-700"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 bg-slate-800/50 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="popularity">Popularity</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="chapters">Chapters</SelectItem>
                  <SelectItem value="year">Year</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <Card className="bg-slate-800/50 border-slate-600 p-6 mb-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Status Filter */}
                <div>
                  <h3 className="text-white font-semibold mb-3">Status</h3>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Genre Filter */}
                <div>
                  <h3 className="text-white font-semibold mb-3">Genres</h3>
                  <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                    {genres.map((genre) => (
                      <div key={genre} className="flex items-center space-x-2">
                        <Checkbox
                          id={genre}
                          checked={selectedGenres.includes(genre)}
                          onCheckedChange={() => handleGenreToggle(genre)}
                          className="border-slate-600"
                        />
                        <label htmlFor={genre} className="text-sm text-gray-300 cursor-pointer">
                          {genre}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="border-slate-600 text-white hover:bg-slate-700 bg-transparent"
                >
                  Clear Filters
                </Button>
              </div>
            </Card>
          )}
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-400">{isLoading ? "Searching..." : `Found ${filteredManga.length} manga`}</p>
        </div>

        {/* Manga Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-slate-700 aspect-[3/4] rounded-lg mb-2" />
                <div className="bg-slate-700 h-4 rounded mb-1" />
                <div className="bg-slate-700 h-3 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : filteredManga.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {filteredManga.map((manga) => (
              <MangaCard key={manga.id} manga={manga} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-4">No manga found</div>
            <p className="text-gray-500 mb-6">Try adjusting your search criteria</p>
            <Button
              onClick={clearFilters}
              variant="outline"
              className="border-slate-600 text-white hover:bg-slate-700 bg-transparent"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
