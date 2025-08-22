"use client"

import Navigation from "@/components/layout/Navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Eye, Heart, TrendingUp } from "lucide-react"
import Link from "next/link"

const popularManga = [
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
    trending: true,
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
    trending: true,
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
    description: "A journey through realms beyond imagination.",
    status: "Ongoing",
    trending: false,
  },
]

export default function PopularPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="h-8 w-8 text-indigo-400" />
            <h1 className="text-3xl font-bold text-white">Popular Manga</h1>
          </div>
          <p className="text-gray-400 text-lg">Discover the most popular manga that everyone's reading</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
          {popularManga.map((manga, index) => (
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

                  {/* Ranking Badge */}
                  <div className="absolute top-3 left-3 bg-indigo-600/90 text-white font-bold text-lg px-3 py-2 rounded-lg">
                    #{index + 1}
                  </div>

                  {manga.trending && (
                    <Badge className="absolute top-3 right-3 bg-red-600/90 text-white font-medium px-3 py-1">
                      🔥 Trending
                    </Badge>
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm hover:bg-indigo-600/80 text-white"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>

                  <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
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
      </div>
    </div>
  )
}
