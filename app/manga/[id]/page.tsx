import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Eye, Calendar, User, BookOpen, Play } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock manga details
const mangaDetails = {
  id: 1,
  title: "Dragon's Legacy",
  cover: "/placeholder.svg?height=400&width=300",
  banner: "/placeholder.svg?height=300&width=800",
  rating: 4.8,
  totalChapters: 156,
  status: "Ongoing",
  genre: ["Action", "Fantasy", "Adventure", "Magic"],
  views: "2.1M",
  year: 2023,
  author: "Akira Yamamoto",
  artist: "Kenji Sato",
  description:
    "In a world where dragons once ruled the skies, young Kai discovers he possesses the legendary Dragon's Legacy - a power that could either save humanity or destroy it. Follow his epic journey as he masters ancient magic, faces powerful enemies, and uncovers the truth about his mysterious heritage. With stunning artwork and an engaging storyline, Dragon's Legacy combines intense action sequences with deep character development.",
  chapters: [
    { number: 156, title: "The Final Battle Begins", date: "2024-01-15", isNew: true },
    { number: 155, title: "Secrets of the Ancient Temple", date: "2024-01-08", isNew: true },
    { number: 154, title: "Dragon's Awakening", date: "2024-01-01", isNew: false },
    { number: 153, title: "The Forbidden Technique", date: "2023-12-25", isNew: false },
    { number: 152, title: "Battle in the Sky", date: "2023-12-18", isNew: false },
    { number: 151, title: "Memories of the Past", date: "2023-12-11", isNew: false },
    { number: 150, title: "The Dragon King's Return", date: "2023-12-04", isNew: false },
    { number: 149, title: "Alliance of Heroes", date: "2023-11-27", isNew: false },
  ],
}

export default function MangaDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Banner Section */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <Image src={mangaDetails.banner || "/placeholder.svg"} alt={mangaDetails.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Manga Cover and Basic Info */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800/80 border-slate-700 overflow-hidden">
              <div className="relative aspect-[3/4]">
                <Image
                  src={mangaDetails.cover || "/placeholder.svg"}
                  alt={mangaDetails.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white font-semibold">{mangaDetails.rating}</span>
                    <span className="text-gray-400 text-sm">(4.2K reviews)</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Eye className="w-4 h-4" />
                    <span>{mangaDetails.views} views</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <BookOpen className="w-4 h-4" />
                    <span>{mangaDetails.totalChapters} chapters</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{mangaDetails.year}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <User className="w-4 h-4" />
                    <span>{mangaDetails.author}</span>
                  </div>

                  <Badge
                    variant={mangaDetails.status === "Completed" ? "default" : "secondary"}
                    className="w-full justify-center"
                  >
                    {mangaDetails.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Title and Action Buttons */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{mangaDetails.title}</h1>

              <div className="flex flex-wrap gap-2 mb-6">
                {mangaDetails.genre.map((g) => (
                  <Badge key={g} variant="outline" className="border-slate-600 text-slate-300">
                    {g}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
                  <Link href={`/reader/${mangaDetails.id}/1`}>
                    <Play className="w-5 h-5 mr-2" />
                    Start Reading
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-slate-600 text-white hover:bg-slate-700 bg-transparent"
                >
                  <Link href={`/reader/${mangaDetails.id}/${mangaDetails.chapters[0].number}`}>Continue Reading</Link>
                </Button>
              </div>
            </div>

            {/* Description */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Synopsis</h2>
                <p className="text-gray-300 leading-relaxed">{mangaDetails.description}</p>
              </CardContent>
            </Card>

            {/* Chapters List */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white">Chapters</h2>
                  <span className="text-gray-400 text-sm">{mangaDetails.totalChapters} chapters available</span>
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {mangaDetails.chapters.map((chapter) => (
                    <Link key={chapter.number} href={`/reader/${mangaDetails.id}/${chapter.number}`} className="block">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors group">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <span className="text-purple-400 font-medium">Chapter {chapter.number}</span>
                            {chapter.isNew && (
                              <Badge variant="secondary" className="text-xs">
                                New
                              </Badge>
                            )}
                          </div>
                          <h3 className="text-white group-hover:text-purple-300 transition-colors">{chapter.title}</h3>
                        </div>
                        <div className="text-gray-400 text-sm">{new Date(chapter.date).toLocaleDateString()}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
