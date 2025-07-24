"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { ChevronLeft, ChevronRight, Home, Maximize, Minimize, RotateCcw, ZoomIn, ZoomOut } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock chapter data
const chapterData = {
  mangaId: 1,
  mangaTitle: "Dragon's Legacy",
  chapterNumber: 1,
  chapterTitle: "The Beginning of Legend",
  pages: [
    "/placeholder.svg?height=800&width=600",
    "/placeholder.svg?height=800&width=600",
    "/placeholder.svg?height=800&width=600",
    "/placeholder.svg?height=800&width=600",
    "/placeholder.svg?height=800&width=600",
    "/placeholder.svg?height=800&width=600",
    "/placeholder.svg?height=800&width=600",
    "/placeholder.svg?height=800&width=600",
  ],
  nextChapter: 2,
  prevChapter: null,
}

export default function ReaderPage({ params }: { params: { id: string; chapter: string } }) {
  const [currentPage, setCurrentPage] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [zoom, setZoom] = useState(100)
  const [isLoading, setIsLoading] = useState(true)
  const [readingMode, setReadingMode] = useState<"single" | "double">("single")

  const totalPages = chapterData.pages.length

  // Auto-hide controls
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (showControls) {
      timer = setTimeout(() => setShowControls(false), 3000)
    }
    return () => clearTimeout(timer)
  }, [showControls, currentPage])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
        case "a":
          goToPrevPage()
          break
        case "ArrowRight":
        case "d":
          goToNextPage()
          break
        case "f":
          toggleFullscreen()
          break
        case "Escape":
          if (isFullscreen) setIsFullscreen(false)
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [currentPage, isFullscreen])

  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1)
      setShowControls(true)
    }
  }, [currentPage, totalPages])

  const goToPrevPage = useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1)
      setShowControls(true)
    }
  }, [currentPage])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  const handleImageClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const centerX = rect.width / 2

    if (clickX > centerX) {
      goToNextPage()
    } else {
      goToPrevPage()
    }
  }

  return (
    <div className={`min-h-screen bg-black ${isFullscreen ? "fixed inset-0 z-50" : ""}`}>
      {/* Header Controls */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-black/80 to-transparent transition-transform duration-300 ${
          showControls ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild className="text-white hover:bg-white/20">
              <Link href={`/manga/${params.id}`}>
                <Home className="w-5 h-5" />
              </Link>
            </Button>
            <div className="text-white">
              <h1 className="font-semibold">{chapterData.mangaTitle}</h1>
              <p className="text-sm text-gray-300">
                Chapter {chapterData.chapterNumber}: {chapterData.chapterTitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setZoom(Math.max(50, zoom - 25))}
              className="text-white hover:bg-white/20"
            >
              <ZoomOut className="w-5 h-5" />
            </Button>
            <span className="text-white text-sm min-w-[3rem] text-center">{zoom}%</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setZoom(Math.min(200, zoom + 25))}
              className="text-white hover:bg-white/20"
            >
              <ZoomIn className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setZoom(100)} className="text-white hover:bg-white/20">
              <RotateCcw className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="text-white hover:bg-white/20">
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Reading Area */}
      <div
        className="flex items-center justify-center min-h-screen p-4 pt-20"
        onMouseMove={() => setShowControls(true)}
        onClick={() => setShowControls(true)}
      >
        <div className="relative max-w-4xl w-full">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-800 rounded-lg">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
          )}

          <div
            className="relative cursor-pointer select-none"
            style={{ transform: `scale(${zoom / 100})` }}
            onClick={handleImageClick}
          >
            <Image
              src={chapterData.pages[currentPage] || "/placeholder.svg"}
              alt={`Page ${currentPage + 1}`}
              width={800}
              height={1200}
              className="w-full h-auto rounded-lg shadow-2xl"
              onLoad={handleImageLoad}
              priority
            />

            {/* Navigation Zones (invisible) */}
            <div className="absolute inset-0 flex">
              <div className="w-1/2 h-full" />
              <div className="w-1/2 h-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-black/80 to-transparent transition-transform duration-300 ${
          showControls ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="p-4 space-y-4">
          {/* Progress Bar */}
          <div className="flex items-center gap-4">
            <span className="text-white text-sm min-w-[3rem]">
              {currentPage + 1} / {totalPages}
            </span>
            <Slider
              value={[currentPage]}
              onValueChange={([value]) => setCurrentPage(value)}
              max={totalPages - 1}
              step={1}
              className="flex-1 [&>span:first-child]:h-2 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-purple-500 [&_[role=slider]]:w-4 [&_[role=slider]]:h-4 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-purple-500"
            />
            <span className="text-white text-sm min-w-[3rem] text-right">
              {Math.round(((currentPage + 1) / totalPages) * 100)}%
            </span>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {chapterData.prevChapter && (
                <Button
                  variant="outline"
                  asChild
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  <Link href={`/reader/${params.id}/${chapterData.prevChapter}`}>
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Prev Chapter
                  </Link>
                </Button>
              )}

              <Button
                variant="ghost"
                onClick={goToPrevPage}
                disabled={currentPage === 0}
                className="text-white hover:bg-white/20 disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Prev Page
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={goToNextPage}
                disabled={currentPage === totalPages - 1}
                className="text-white hover:bg-white/20 disabled:opacity-50"
              >
                Next Page
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>

              {chapterData.nextChapter && (
                <Button
                  variant="outline"
                  asChild
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  <Link href={`/reader/${params.id}/${chapterData.nextChapter}`}>
                    Next Chapter
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Touch Instructions */}
      <div className="fixed top-1/2 left-4 transform -translate-y-1/2 text-white/50 text-xs md:hidden">
        Tap left/right to navigate
      </div>
    </div>
  )
}
