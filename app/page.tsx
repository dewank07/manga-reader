import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, TrendingUp, Clock, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock data for manga
const featuredManga = [
  {
    id: 1,
    title: "Dragon's Legacy",
    cover: "/placeholder.svg?height=300&width=200",
    rating: 4.8,
    chapters: 156,
    status: "Ongoing",
    genre: ["Action", "Fantasy"],
    views: "2.1M",
  },
  {
    id: 2,
    title: "Mystic Academy",
    cover: "/placeholder.svg?height=300&width=200",
    rating: 4.6,
    chapters: 89,
    status: "Ongoing",
    genre: ["Romance", "School"],
    views: "1.8M",
  },
  {
    id: 3,
    title: "Shadow Hunter",
    cover: "/placeholder.svg?height=300&width=200",
    rating: 4.9,
    chapters: 203,
    status: "Completed",
    genre: ["Action", "Thriller"],
    views: "3.2M",
  },
]

const popularManga = [
  {
    id: 4,
    title: "Celestial Warrior",
    cover: "/placeholder.svg?height=300&width=200",
    rating: 4.7,
    chapters: 124,
    status: "Ongoing",
    genre: ["Sci-Fi", "Action"],
    views: "1.9M",
  },
  {
    id: 5,
    title: "Love in Tokyo",
    cover: "/placeholder.svg?height=300&width=200",
    rating: 4.5,
    chapters: 67,
    status: "Ongoing",
    genre: ["Romance", "Slice of Life"],
    views: "1.4M",
  },
  {
    id: 6,
    title: "Demon Slayer Chronicles",
    cover: "/placeholder.svg?height=300&width=200",
    rating: 4.8,
    chapters: 178,
    status: "Ongoing",
    genre: ["Action", "Supernatural"],
    views: "2.7M",
  },
]

const recentUpdates = [
  {
    id: 7,
    title: "Magic Knight Academy",
    cover: "/placeholder.svg?height=300&width=200",
    chapter: "Chapter 45",
    timeAgo: "2 hours ago",
    genre: ["Fantasy", "Action"],
  },
  {
    id: 8,
    title: "Cyber Punk 2087",
    cover: "/placeholder.svg?height=300&width=200",
    chapter: "Chapter 23",
    timeAgo: "5 hours ago",
    genre: ["Sci-Fi", "Action"],
  },
  {
    id: 9,
    title: "High School Heroes",
    cover: "/placeholder.svg?height=300&width=200",
    chapter: "Chapter 78",
    timeAgo: "1 day ago",
    genre: ["School", "Superhero"],
  },
]

function MangaCard({ manga, showChapter = false }: { manga: any; showChapter?: boolean }) {
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
            {showChapter ? (
              <div className="flex items-center justify-between text-xs">
                <span className="text-blue-400">{manga.chapter}</span>
                <span className="text-gray-400">{manga.timeAgo}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs">
                {manga.rating && (
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{manga.rating}</span>
                  </div>
                )}
                {manga.chapters && <span className="text-gray-400">{manga.chapters} ch</span>}
              </div>
            )}
          </div>
          {manga.status && (
            <Badge
              variant={manga.status === "Completed" ? "default" : "secondary"}
              className="absolute top-2 right-2 text-xs"
            >
              {manga.status}
            </Badge>
          )}
        </div>
        <CardContent className="p-3">
          <div className="flex flex-wrap gap-1 mb-2">
            {manga.genre?.slice(0, 2).map((g: string) => (
              <Badge key={g} variant="outline" className="text-xs border-slate-600 text-slate-300">
                {g}
              </Badge>
            ))}
          </div>
          {manga.views && (
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Eye className="w-3 h-3" />
              <span>{manga.views}</span>
            </div>
          )}
        </CardContent>
      </Link>
    </Card>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Hero Section */}
        <section className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-purple-900/50 to-blue-900/50 p-6 md:p-8">
          <div className="relative z-10">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Discover Amazing Manga</h1>
            <p className="text-lg text-gray-300 mb-6 max-w-2xl">
              Dive into thousands of manga series with our premium reading experience. Updated daily with the latest
              chapters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
                <Link href="/search">Explore Manga</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                <Link href="#trending">View Trending</Link>
              </Button>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20" />
        </section>

        {/* Featured Manga */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold text-white">Featured Manga</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredManga.map((manga) => (
              <MangaCard key={manga.id} manga={manga} />
            ))}
          </div>
        </section>

        {/* Popular This Week */}
        <section id="trending">
          <div className="flex items-center gap-3 mb-6">
            <Star className="w-6 h-6 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">Popular This Week</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularManga.map((manga) => (
              <MangaCard key={manga.id} manga={manga} />
            ))}
          </div>
        </section>

        {/* Recent Updates */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Recent Updates</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {recentUpdates.map((manga) => (
              <MangaCard key={manga.id} manga={manga} showChapter />
            ))}
          </div>
        </section>

        {/* Quick Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-slate-800/50 border-slate-700 text-center p-6">
            <div className="text-2xl font-bold text-purple-400 mb-2">10,000+</div>
            <div className="text-gray-300">Manga Series</div>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 text-center p-6">
            <div className="text-2xl font-bold text-blue-400 mb-2">500K+</div>
            <div className="text-gray-300">Chapters</div>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 text-center p-6">
            <div className="text-2xl font-bold text-green-400 mb-2">1M+</div>
            <div className="text-gray-300">Active Readers</div>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 text-center p-6">
            <div className="text-2xl font-bold text-yellow-400 mb-2">Daily</div>
            <div className="text-gray-300">Updates</div>
          </Card>
        </section>
      </div>
    </div>
  )
}
