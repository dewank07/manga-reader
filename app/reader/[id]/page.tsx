"use client"

import { useState, useEffect } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Settings,
  Maximize,
  Minimize,
  ZoomIn,
  ZoomOut,
  BookOpen,
  List,
  Home,
  Bookmark,
  Share,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import Link from "next/link"

// Mock manga data
const mangaData = {
  1: {
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
    pages: [
      "/manga-page-sample-bw.png",
      "/dark-manga-shadow-chronicles.png",
      "/minimalist-manga-cover-silent-blade.png",
      "/black-and-white-manga-dreams.png",
    ],
  },
}

export default function ReaderPage({ params }: { params: { id: string } }) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [zoom, setZoom] = useState(100)
  const [brightness, setBrightness] = useState(100)
  const [showControls, setShowControls] = useState(true)
  const [readingDirection, setReadingDirection] = useState("ltr")
  const [pageLayout, setPageLayout] = useState("single")
  const [showSettings, setShowSettings] = useState(false)
  const [autoHideTimer, setAutoHideTimer] = useState<NodeJS.Timeout | null>(null)

  const manga = mangaData[1] // Using first manga as example
  const totalPages = manga?.pages.length || 0

  // Auto-hide controls in fullscreen
  useEffect(() => {
    if (isFullscreen) {
      const resetTimer = () => {
        if (autoHideTimer) clearTimeout(autoHideTimer)
        setShowControls(true)
        const timer = setTimeout(() => setShowControls(false), 3000)
        setAutoHideTimer(timer)
      }

      const handleMouseMove = () => resetTimer()
      const handleKeyPress = () => resetTimer()

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("keydown", handleKeyPress)
      resetTimer()

      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("keydown", handleKeyPress)
        if (autoHideTimer) clearTimeout(autoHideTimer)
      }
    }
  }, [isFullscreen, autoHideTimer])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          if (readingDirection === "ltr") {
            setCurrentPage((prev) => Math.max(1, prev - 1))
          } else {
            setCurrentPage((prev) => Math.min(totalPages, prev + 1))
          }
          break
        case "ArrowRight":
          if (readingDirection === "ltr") {
            setCurrentPage((prev) => Math.min(totalPages, prev + 1))
          } else {
            setCurrentPage((prev) => Math.max(1, prev - 1))
          }
          break
        case "f":
        case "F":
          toggleFullscreen()
          break
        case "Escape":
          if (isFullscreen) setIsFullscreen(false)
          break
      }
    }

    document.addEventListener("keydown", handleKeyPress)
    return () => document.removeEventListener("keydown", handleKeyPress)
  }, [readingDirection, totalPages, isFullscreen])

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen?.()
    } else {
      document.exitFullscreen?.()
    }
    setIsFullscreen(!isFullscreen)
  }

  const nextPage = () => {
    if (readingDirection === "ltr") {
      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
    } else {
      setCurrentPage((prev) => Math.max(1, prev - 1))
    }
  }

  const prevPage = () => {
    if (readingDirection === "ltr") {
      setCurrentPage((prev) => Math.max(1, prev - 1))
    } else {
      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
    }
  }

  if (!manga) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Manga not found</h1>
          <Link href="/">
            <Button className="bg-indigo-600 hover:bg-indigo-700">Return Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`${
        isFullscreen ? "fixed inset-0 z-50" : "min-h-screen"
      } bg-black transition-all duration-300 select-none`}
    >
      {/* Header Controls */}
      <header
        className={`${
          isFullscreen && !showControls ? "opacity-0 pointer-events-none" : "opacity-100"
        } transition-all duration-300 absolute top-0 left-0 right-0 z-40 bg-gradient-to-b from-black/80 to-transparent`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/search">
                <Button variant="ghost" size="sm" className="hover:bg-white/10 text-white">
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back to Browse
                </Button>
              </Link>
              <div className="text-white">
                <h1 className="font-semibold text-lg">{manga.title}</h1>
                <p className="text-sm text-gray-300">
                  Chapter 1 - Page {currentPage} of {totalPages}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="hover:bg-white/10 text-white">
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-white/10 text-white">
                <Share className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-white/10 text-white">
                <Download className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
                className="hover:bg-white/10 text-white"
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={toggleFullscreen} className="hover:bg-white/10 text-white">
                {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Settings Panel */}
      {showSettings && (
        <div
          className={`${
            isFullscreen && !showControls ? "opacity-0 pointer-events-none" : "opacity-100"
          } transition-all duration-300 absolute top-20 right-4 z-40`}
        >
          <Card className="bg-gray-800/95 backdrop-blur-sm border-gray-700 w-80">
            <CardContent className="p-6 space-y-6">
              <h3 className="text-lg font-semibold text-white">Reading Settings</h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Reading Direction</label>
                  <Select value={readingDirection} onValueChange={setReadingDirection}>
                    <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ltr">Left to Right</SelectItem>
                      <SelectItem value="rtl">Right to Left</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Page Layout</label>
                  <Select value={pageLayout} onValueChange={setPageLayout}>
                    <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single Page</SelectItem>
                      <SelectItem value="double">Double Page</SelectItem>
                      <SelectItem value="webtoon">Webtoon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-3 block">Zoom: {zoom}%</label>
                  <Slider
                    value={[zoom]}
                    onValueChange={(value) => setZoom(value[0])}
                    min={50}
                    max={200}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setZoom(Math.max(50, zoom - 10))}
                      className="bg-transparent border-gray-600 hover:bg-white/10"
                    >
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setZoom(100)}
                      className="bg-transparent border-gray-600 hover:bg-white/10"
                    >
                      Fit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setZoom(Math.min(200, zoom + 10))}
                      className="bg-transparent border-gray-600 hover:bg-white/10"
                    >
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-3 block">Brightness: {brightness}%</label>
                  <Slider
                    value={[brightness]}
                    onValueChange={(value) => setBrightness(value[0])}
                    min={50}
                    max={150}
                    step={5}
                    className="w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Reader Area */}
      <main className="flex items-center justify-center min-h-screen p-4 pt-20 pb-20">
        <div className="relative max-w-full max-h-full">
          <img
            src={manga.pages[currentPage - 1] || "/placeholder.svg"}
            alt={`${manga.title} - Page ${currentPage}`}
            className="max-w-full max-h-full object-contain transition-all duration-300 cursor-pointer"
            style={{
              transform: `scale(${zoom / 100})`,
              filter: `brightness(${brightness}%)`,
            }}
            onClick={nextPage}
            draggable={false}
          />

          {/* Navigation Overlays */}
          <div
            className="absolute left-0 top-0 w-1/3 h-full cursor-pointer flex items-center justify-start pl-4 opacity-0 hover:opacity-100 transition-opacity duration-200"
            onClick={prevPage}
          >
            <div className="bg-black/50 backdrop-blur-sm rounded-full p-3">
              <ChevronLeft className="h-8 w-8 text-white" />
            </div>
          </div>
          <div
            className="absolute right-0 top-0 w-1/3 h-full cursor-pointer flex items-center justify-end pr-4 opacity-0 hover:opacity-100 transition-opacity duration-200"
            onClick={nextPage}
          >
            <div className="bg-black/50 backdrop-blur-sm rounded-full p-3">
              <ChevronRight className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Controls */}
      <footer
        className={`${
          isFullscreen && !showControls ? "opacity-0 pointer-events-none" : "opacity-100"
        } transition-all duration-300 absolute bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-black/80 to-transparent`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={prevPage}
                disabled={currentPage === 1}
                className="hover:bg-white/10 text-white disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <span className="text-white text-sm">
                {currentPage} / {totalPages}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="hover:bg-white/10 text-white disabled:opacity-50"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="hover:bg-white/10 text-white">
                <List className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-white/10 text-white">
                <BookOpen className="h-4 w-4" />
              </Button>
              <Link href="/">
                <Button variant="ghost" size="sm" className="hover:bg-white/10 text-white">
                  <Home className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-700/50 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentPage / totalPages) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </footer>

      {/* Keyboard Shortcuts Help */}
      {isFullscreen && (
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white/60 text-xs space-y-1">
          <div>← → Navigate</div>
          <div>F Fullscreen</div>
          <div>ESC Exit</div>
        </div>
      )}
    </div>
  )
}
