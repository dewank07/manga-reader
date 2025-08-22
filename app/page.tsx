"use client"

import { useState } from "react"
import { Search, BookOpen, Heart, Star, Eye, TrendingUp, Users, Award, ArrowRight, Play, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navigation from "@/components/layout/Navigation"
import Link from "next/link"

// Mock featured manga data
const featuredManga = [
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
    featured: true,
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
    featured: true,
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
    featured: true,
  },
]

const stats = [
  { icon: BookOpen, label: "Total Manga", value: "50,000+", color: "text-indigo-400" },
  { icon: Users, label: "Active Readers", value: "2.5M+", color: "text-blue-400" },
  { icon: Award, label: "Top Rated", value: "10,000+", color: "text-yellow-400" },
  { icon: TrendingUp, label: "Daily Updates", value: "500+", color: "text-green-400" },
]

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showLoginModal, setShowLoginModal] = useState(false)

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    } else {
      window.location.href = "/search"
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900/20">
        <div className="absolute inset-0 bg-[url('/manga-page-sample-bw.png')] opacity-5 bg-cover bg-center" />
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Discover Your Next
                <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-600 bg-clip-text text-transparent">
                  Manga Adventure
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Dive into the world's largest collection of manga with over 50,000 titles, daily updates, and an
                immersive reading experience.
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                <Input
                  placeholder="Search for manga, authors, or genres..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-16 pr-6 py-6 text-lg bg-gray-800/50 border-gray-600 focus:border-indigo-500 transition-colors text-white placeholder:text-gray-400 rounded-2xl"
                />
                <Button
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-xl"
                >
                  Search
                </Button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/search">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 px-8 py-4 text-lg rounded-xl">
                  Start Reading
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="border-gray-600 hover:bg-indigo-500/20 px-8 py-4 text-lg rounded-xl bg-transparent"
              >
                <Play className="h-5 w-5 mr-2" />
                Watch Trailer
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-3">
                <div className="mx-auto w-16 h-16 bg-gray-700/50 rounded-2xl flex items-center justify-center">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Manga Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured This Week</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Discover the most popular and highly-rated manga that everyone's talking about
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {featuredManga.map((manga) => (
              <Card
                key={manga.id}
                className="group hover:shadow-2xl hover:shadow-indigo-500/25 transition-all duration-500 cursor-pointer bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-indigo-500/50 overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={manga.cover || "/placeholder.svg"}
                      alt={manga.title}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <Badge className="absolute top-4 left-4 bg-indigo-600/90 text-white px-3 py-1">
                      {manga.status}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm hover:bg-indigo-600/80 text-white"
                    >
                      <Heart className="h-5 w-5" />
                    </Button>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-bold text-xl text-white mb-2 group-hover:text-indigo-400 transition-colors">
                        {manga.title}
                      </h3>
                      <p className="text-gray-300 text-sm mb-3 line-clamp-2">{manga.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-yellow-400">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="font-semibold">{manga.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-300">
                          <Eye className="h-4 w-4" />
                          <span>{manga.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/search">
              <Button
                size="lg"
                variant="outline"
                className="border-indigo-500 hover:bg-indigo-500/20 px-8 py-4 bg-transparent"
              >
                View All Manga
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose MangaVault?</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience manga like never before with our cutting-edge features and vast library
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="bg-gray-800/50 border-gray-700 text-center p-8">
              <CardContent className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-indigo-600/20 rounded-2xl flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Vast Library</h3>
                <p className="text-gray-400">
                  Access over 50,000 manga titles from every genre imaginable, with new releases added daily.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 text-center p-8">
              <CardContent className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-indigo-600/20 rounded-2xl flex items-center justify-center">
                  <Star className="h-8 w-8 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Premium Quality</h3>
                <p className="text-gray-400">
                  Enjoy high-resolution images and crystal-clear text for the best reading experience possible.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 text-center p-8">
              <CardContent className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-indigo-600/20 rounded-2xl flex items-center justify-center">
                  <Users className="h-8 w-8 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Community</h3>
                <p className="text-gray-400">
                  Join millions of readers, share reviews, and discover new favorites through our community features.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-600/20 rounded-lg">
                  <BookOpen className="h-6 w-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent">
                  MangaVault
                </h3>
              </div>
              <p className="text-gray-400">
                Your ultimate destination for manga reading with the largest collection and best experience.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Browse</h4>
              <div className="space-y-2">
                <Link href="/search" className="block text-gray-400 hover:text-indigo-400 transition-colors">
                  All Manga
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-indigo-400 transition-colors">
                  Popular
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-indigo-400 transition-colors">
                  Latest Updates
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-indigo-400 transition-colors">
                  Top Rated
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Genres</h4>
              <div className="space-y-2">
                <Link href="#" className="block text-gray-400 hover:text-indigo-400 transition-colors">
                  Action
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-indigo-400 transition-colors">
                  Romance
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-indigo-400 transition-colors">
                  Fantasy
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-indigo-400 transition-colors">
                  Sci-Fi
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <div className="space-y-2">
                <Link href="#" className="block text-gray-400 hover:text-indigo-400 transition-colors">
                  Help Center
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-indigo-400 transition-colors">
                  Contact Us
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-indigo-400 transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MangaVault. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowLoginModal(false)}
                  className="hover:bg-gray-700"
                >
                  <LogIn className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Email</label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-gray-700/50 border-gray-600 focus:border-indigo-500 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Password</label>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    className="bg-gray-700/50 border-gray-600 focus:border-indigo-500 text-white"
                  />
                </div>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 py-3">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
                <div className="text-center">
                  <p className="text-gray-400">
                    Don't have an account?{" "}
                    <Button variant="link" className="text-indigo-400 hover:text-indigo-300 p-0">
                      Sign up here
                    </Button>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
