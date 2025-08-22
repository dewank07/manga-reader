"use client"

import { useState, useEffect } from "react"
import { Search, Heart, Star, Eye, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Navigation from "@/components/layout/Navigation"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

// Mock manga data
const mangaData = [
  {
    id: 1,
    title: "Shadow Chronicles",
    author: "Akira Yamamoto",
    genre: ["Action", "Drama"],
    rating: 4.8,
    chapters: 156,
    views: "2.3M",
    cover: "/dark-manga-shadow-chronicles.png",
    description: "A tale of shadows and light in a world torn between dimensions.",
    status: "Ongoing",
    year: 2023,
  },
  {
    id: 2,
    title: "Silent Blade",
    author: "Mei Tanaka",
    genre: ["Action", "Thriller"],
    rating: 4.6,
    chapters: 89,
    views: "1.8M",
    cover: "/minimalist-manga-cover-silent-blade.png",
    description: "A master assassin's journey through betrayal and redemption.",
    status: "Completed",
    year: 2022,
  },
  {
    id: 3,
    title: "Monochrome Dreams",
    author: "Hiroshi Sato",
    genre: ["Romance", "Slice of Life"],
    rating: 4.9,
    chapters: 45,
    views: "956K",
    cover: "/black-and-white-manga-dreams.png",
    description: "Love blooms in a world painted in shades of gray.",
    status: "Ongoing",
    year: 2024,
  },
  {
    id: 4,
    title: "Steel Heart",
    author: "Yuki Nakamura",
    genre: ["Mecha", "Sci-Fi"],
    rating: 4.7,
    chapters: 203,
    views: "3.1M",
    cover: "/mecha-manga-steel-heart.png",
    description: "Humanity's last hope lies in the hands of young pilots.",
    status: "Ongoing",
    year: 2023,
  },
  {
    id: 5,
    title: "Ink & Shadows",
    author: "Ren Fujiwara",
    genre: ["Mystery", "Supernatural"],
    rating: 4.5,
    chapters: 67,
    views: "1.2M",
    cover: "/mysterious-manga-cover.png",
    description: "Ancient secrets hidden in modern Tokyo's underground.",
    status: "Ongoing",
    year: 2024,
  },
  {
    id: 6,
    title: "Void Walker",
    author: "Kenji Matsuda",
    genre: ["Fantasy", "Adventure"],
    rating: 4.8,
    chapters: 134,
    views: "2.7M",
    cover: "/fantasy-manga-void-walker.png",
    description: "A journey through realms beyond realms beyond imagination.",
    status: "Ongoing",
    year: 2023,
  },
]

const genres = [
  "All",
  "Action",
  "Romance",
  "Fantasy",
  "Sci-Fi",
  "Mystery",
  "Drama",
  "Thriller",
  "Slice of Life",
  "Mecha",
  "Supernatural",
  "Adventure",
]

const years = ["All", "2024", "2023", "2022", "2021", "2020"]
const ratings = ["All", "4.5+", "4.0+", "3.5+", "3.0+"]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [favorites, setFavorites] = useState<number[]>([])
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("rating")
  const [statusFilter, setStatusFilter] = useState("All")
  const [yearFilter, setYearFilter] = useState("All")
  const [ratingFilter, setRatingFilter] = useState("All")

  const searchParams = useSearchParams()

  useEffect(() => {
    const query = searchParams.get("q")
    if (query) {
      setSearchQuery(query)
    }
  }, [searchParams])

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) => (prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]))
  }

  const clearAllFilters = () => {
    setSelectedGenres([])
    setStatusFilter("All")
    setYearFilter("All")
    setRatingFilter("All")
    setSortBy("rating")
    setSearchQuery("")
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const filteredManga = mangaData
    .filter((manga) => {
      const matchesSearch =
        manga.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        manga.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        manga.genre.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesGenres = selectedGenres.length === 0 || selectedGenres.some((genre) => manga.genre.includes(genre))
      const matchesStatus = statusFilter === "All" || manga.status === statusFilter
      const matchesYear = yearFilter === "All" || manga.year.toString() === yearFilter
      const matchesRating = ratingFilter === "All" || manga.rating >= Number.parseFloat(ratingFilter.replace("+", ""))

      return matchesSearch && matchesGenres && matchesStatus && matchesYear && matchesRating
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "views":
          return Number.parseFloat(b.views.replace(/[^\d.]/g, "")) - Number.parseFloat(a.views.replace(/[^\d.]/g, ""))
        case "chapters":
          return b.chapters - a.chapters
        case "year":
          return b.year - a.year
        case "title":
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation showSearch={true} onSearch={handleSearch} />

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-80 space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filters
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="text-indigo-400 hover:text-indigo-300"
                  >
                    Clear All
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Sort By */}
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Sort By</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                        <SelectItem value="views">Most Popular</SelectItem>
                        <SelectItem value="chapters">Most Chapters</SelectItem>
                        <SelectItem value="year">Newest</SelectItem>
                        <SelectItem value="title">Title A-Z</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Genres */}
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-3 block">Genres</label>
                    <div className="flex flex-wrap gap-2">
                      {genres
                        .filter((g) => g !== "All")
                        .map((genre) => (
                          <Button
                            key={genre}
                            variant={selectedGenres.includes(genre) ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleGenre(genre)}
                            className={`text-xs ${
                              selectedGenres.includes(genre)
                                ? "bg-indigo-600 hover:bg-indigo-700"
                                : "border-gray-600 hover:bg-indigo-500/20"
                            }`}
                          >
                            {genre}
                          </Button>
                        ))}
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Status</label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Status</SelectItem>
                        <SelectItem value="Ongoing">Ongoing</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Year */}
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Year</label>
                    <Select value={yearFilter} onValueChange={setYearFilter}>
                      <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Minimum Rating</label>
                    <Select value={ratingFilter} onValueChange={setRatingFilter}>
                      <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ratings.map((rating) => (
                          <SelectItem key={rating} value={rating}>
                            {rating === "All" ? "Any Rating" : `${rating} Stars`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Filters */}
            {(selectedGenres.length > 0 ||
              statusFilter !== "All" ||
              yearFilter !== "All" ||
              ratingFilter !== "All") && (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4">
                  <h3 className="text-sm font-medium text-gray-300 mb-3">Active Filters</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedGenres.map((genre) => (
                      <Badge
                        key={genre}
                        variant="secondary"
                        className="bg-indigo-600/20 text-indigo-400 cursor-pointer hover:bg-indigo-600/30"
                        onClick={() => toggleGenre(genre)}
                      >
                        {genre} <X className="h-3 w-3 ml-1" />
                      </Badge>
                    ))}
                    {statusFilter !== "All" && (
                      <Badge
                        variant="secondary"
                        className="bg-indigo-600/20 text-indigo-400 cursor-pointer hover:bg-indigo-600/30"
                        onClick={() => setStatusFilter("All")}
                      >
                        {statusFilter} <X className="h-3 w-3 ml-1" />
                      </Badge>
                    )}
                    {yearFilter !== "All" && (
                      <Badge
                        variant="secondary"
                        className="bg-indigo-600/20 text-indigo-400 cursor-pointer hover:bg-indigo-600/30"
                        onClick={() => setYearFilter("All")}
                      >
                        {yearFilter} <X className="h-3 w-3 ml-1" />
                      </Badge>
                    )}
                    {ratingFilter !== "All" && (
                      <Badge
                        variant="secondary"
                        className="bg-indigo-600/20 text-indigo-400 cursor-pointer hover:bg-indigo-600/30"
                        onClick={() => setRatingFilter("All")}
                      >
                        {ratingFilter} <X className="h-3 w-3 ml-1" />
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  {searchQuery ? `Search Results for "${searchQuery}"` : "Browse Manga"}
                </h2>
                <p className="text-gray-400">
                  {filteredManga.length} manga found
                  {selectedGenres.length > 0 && ` in ${selectedGenres.join(", ")}`}
                </p>
              </div>
            </div>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
                {filteredManga.map((manga) => (
                  <Card
                    key={manga.id}
                    className="group hover:shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 cursor-pointer bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-indigo-500/50 overflow-hidden"
                  >
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden">
                        <img
                          src={manga.cover || "/placeholder.svg"}
                          alt={manga.title}
                          className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm hover:bg-indigo-600/80 text-white"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleFavorite(manga.id)
                          }}
                        >
                          <Heart
                            className={`h-4 w-4 ${favorites.includes(manga.id) ? "fill-current text-red-500" : ""}`}
                          />
                        </Button>
                        <Badge className="absolute bottom-3 left-3 bg-indigo-600/90 text-white font-medium px-3 py-1">
                          {manga.status}
                        </Badge>
                        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
                          <Star className="h-3 w-3 fill-current text-yellow-400" />
                          <span className="text-white text-xs font-medium">{manga.rating}</span>
                        </div>
                      </div>
                      <div className="p-5 space-y-4">
                        <div className="space-y-2">
                          <h3 className="font-bold text-xl line-clamp-2 group-hover:text-indigo-400 transition-colors text-white leading-tight">
                            {manga.title}
                          </h3>
                          <p className="text-sm text-gray-400 font-medium">{manga.author}</p>
                        </div>
                        <p className="text-sm text-gray-300 line-clamp-3 leading-relaxed">{manga.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1 text-yellow-400">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="font-semibold">{manga.rating}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-400">
                            <Eye className="h-4 w-4" />
                            <span className="font-medium">{manga.views}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {manga.genre.slice(0, 3).map((genre) => (
                            <Badge
                              key={genre}
                              variant="secondary"
                              className="text-xs bg-gray-700/70 text-gray-200 hover:bg-indigo-600/20 hover:text-indigo-300 transition-colors cursor-pointer px-2 py-1"
                            >
                              {genre}
                            </Badge>
                          ))}
                          {manga.genre.length > 3 && (
                            <Badge variant="secondary" className="text-xs bg-gray-700/50 text-gray-400 px-2 py-1">
                              +{manga.genre.length - 3}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-gray-700/50">
                          <span className="text-xs text-gray-400">{manga.chapters} chapters</span>
                          <Link href={`/reader/${manga.id}`}>
                            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-xs px-4">
                              Read Now
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredManga.map((manga) => (
                  <Card
                    key={manga.id}
                    className="hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 cursor-pointer bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-indigo-500/50 overflow-hidden"
                  >
                    <CardContent className="p-0">
                      <div className="flex gap-6 p-6">
                        <div className="relative flex-shrink-0">
                          <img
                            src={manga.cover || "/placeholder.svg"}
                            alt={manga.title}
                            className="w-32 h-44 object-cover rounded-lg shadow-lg"
                          />
                          <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
                            <Star className="h-3 w-3 fill-current text-yellow-400" />
                            <span className="text-white text-xs font-medium">{manga.rating}</span>
                          </div>
                        </div>
                        <div className="flex-1 space-y-4 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0 flex-1">
                              <h3 className="font-bold text-2xl hover:text-indigo-400 transition-colors text-white leading-tight">
                                {manga.title}
                              </h3>
                              <p className="text-gray-400 font-medium mt-1">{manga.author}</p>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="hover:bg-indigo-600/20"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleFavorite(manga.id)
                                }}
                              >
                                <Heart
                                  className={`h-5 w-5 ${favorites.includes(manga.id) ? "fill-current text-red-500" : ""}`}
                                />
                              </Button>
                              <Link href={`/reader/${manga.id}`}>
                                <Button className="bg-indigo-600 hover:bg-indigo-700 px-6">Read Now</Button>
                              </Link>
                            </div>
                          </div>
                          <p className="text-gray-300 line-clamp-3 leading-relaxed text-base">{manga.description}</p>
                          <div className="flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-1 text-yellow-400">
                              <Star className="h-4 w-4 fill-current" />
                              <span className="font-semibold">{manga.rating}</span>
                            </div>
                            <span className="text-gray-400 font-medium">{manga.chapters} chapters</span>
                            <span className="text-gray-400 font-medium">{manga.views} views</span>
                            <Badge variant="secondary" className="bg-indigo-600/20 text-indigo-400 font-medium">
                              {manga.status}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {manga.genre.map((genre) => (
                              <Badge
                                key={genre}
                                variant="outline"
                                className="border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/20 cursor-pointer transition-colors font-medium px-3 py-1"
                                onClick={() => toggleGenre(genre)}
                              >
                                {genre}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {filteredManga.length === 0 && (
              <div className="text-center py-16">
                <Search className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold mb-2 text-white">No manga found</h3>
                <p className="text-gray-400 mb-4">Try adjusting your search terms or filters</p>
                <Button onClick={clearAllFilters} className="bg-indigo-600 hover:bg-indigo-700">
                  Clear All Filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
