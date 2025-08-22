import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  Settings,
  Bookmark,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Sun,
  Moon,
  Book,
  SkipBack,
  SkipForward,
  Eye,
  EyeOff,
} from "lucide-react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { mangaApi } from "../services/api";
import { useAsyncData } from "../hooks/useApi";
import { ReadingSettings, ReadingProgress, Manga, Chapter } from "../types/manga";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import { LoadingPage } from "../components/ui/LoadingSpinner";
import ErrorMessage from "../components/ui/ErrorMessage";

interface ReaderProps {
  mangaId: string;
  chapterNumber: number;
  onNavigate: (page: string, data?: any) => void;
}

export default function Reader({ mangaId, chapterNumber, onNavigate }: ReaderProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showChapterList, setShowChapterList] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isBookmarked, setIsBookmarked] = useLocalStorage(`bookmark-${mangaId}`, false);

  const [settings, setSettings] = useLocalStorage<ReadingSettings>("readingSettings", {
    brightness: 100,
    readingDirection: "ltr",
    pageDisplay: "single",
    autoHideControls: true,
    pageTransition: "slide",
  });

  const [progress, setProgress] = useLocalStorage<ReadingProgress[]>("recentlyRead", []);

  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();
  const imageRef = useRef<HTMLImageElement>(null);

  // Load manga and chapters data
  const [manga, mangaLoading, mangaError] = useAsyncData(null, () => mangaApi.getMangaById(mangaId), [mangaId]);

  const [chapters, chaptersLoading, chaptersError] = useAsyncData([], () => mangaApi.getMangaChapters(mangaId), [
    mangaId,
  ]);

  const currentChapter = chapters.find((c) => c.number === chapterNumber);
  const pages = currentChapter?.pages || [];

  // Auto-hide controls
  useEffect(() => {
    if (!settings.autoHideControls) return;

    const hideControls = () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    };

    if (showControls) {
      hideControls();
    }

    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [currentPage, showControls, settings.autoHideControls]);

  // Update reading progress
  useEffect(() => {
    if (!manga) return;

    const existingProgress = progress.find((p) => p.mangaId === mangaId);
    const newProgress = {
      mangaId,
      currentChapter: chapterNumber,
      currentPage,
      lastRead: new Date().toISOString(),
    };

    if (existingProgress) {
      setProgress((prev) => prev.map((p) => (p.mangaId === mangaId ? newProgress : p)));
    } else {
      setProgress((prev) => [newProgress, ...prev.slice(0, 19)]); // Keep only 20 recent items
    }
  }, [mangaId, chapterNumber, currentPage, manga]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (showSettings || showChapterList) return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          settings.readingDirection === "ltr" ? prevPage() : nextPage();
          break;
        case "ArrowRight":
          e.preventDefault();
          settings.readingDirection === "ltr" ? nextPage() : prevPage();
          break;
        case " ":
          e.preventDefault();
          nextPage();
          break;
        case "Escape":
          e.preventDefault();
          onNavigate("home");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [settings.readingDirection, showSettings, showChapterList]);

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage((prev) => prev + 1);
    } else if (chapterNumber < chapters.length) {
      onNavigate("reader", { mangaId, chapter: chapterNumber + 1 });
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    } else if (chapterNumber > 1) {
      onNavigate("reader", { mangaId, chapter: chapterNumber - 1 });
    }
  };

  const goToChapter = (chapter: number) => {
    onNavigate("reader", { mangaId, chapter });
    setShowChapterList(false);
  };

  // Touch handling
  const handleTouchStart = useRef({ x: 0, y: 0 });
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - handleTouchStart.current.x;
    const deltaY = touch.clientY - handleTouchStart.current.y;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        settings.readingDirection === "ltr" ? prevPage() : nextPage();
      } else {
        settings.readingDirection === "ltr" ? nextPage() : prevPage();
      }
    }
  };

  const handleTouchStartCapture = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleTouchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const toggleControls = () => {
    setShowControls(!showControls);
  };

  if (mangaLoading || chaptersLoading) {
    return <LoadingPage />;
  }

  if (mangaError || chaptersError || !manga || !currentChapter) {
    return (
      <div className='min-h-screen bg-slate-900 flex items-center justify-center'>
        <div className='text-center'>
          <ErrorMessage
            message={mangaError || chaptersError || "Chapter not found"}
            onRetry={() => onNavigate("home")}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className='min-h-screen bg-black relative overflow-hidden select-none'
      style={{ filter: `brightness(${settings.brightness}%)` }}
    >
      {/* Main Content */}
      <div
        ref={containerRef}
        className='relative h-screen flex items-center justify-center'
        onClick={toggleControls}
        onTouchStart={handleTouchStartCapture}
        onTouchEnd={handleTouchEnd}
      >
        {pages.length > 0 && (
          <img
            ref={imageRef}
            src={pages[currentPage]}
            alt={`Page ${currentPage + 1}`}
            className={`max-w-full max-h-full object-contain transition-all duration-300 ${
              settings.pageTransition === "fade"
                ? "transition-opacity"
                : settings.pageTransition === "slide"
                ? "transition-transform"
                : ""
            }`}
            style={{
              transform: `scale(${zoom})`,
              imageRendering: zoom > 1 ? "pixelated" : "auto",
            }}
            draggable={false}
            loading='lazy'
          />
        )}

        {/* Page Navigation Areas */}
        <div className='absolute inset-0 flex'>
          <div
            className='flex-1 cursor-pointer z-10'
            onClick={(e) => {
              e.stopPropagation();
              settings.readingDirection === "ltr" ? prevPage() : nextPage();
            }}
          />
          <div
            className='flex-1 cursor-pointer z-10'
            onClick={(e) => {
              e.stopPropagation();
              settings.readingDirection === "ltr" ? nextPage() : prevPage();
            }}
          />
        </div>
      </div>

      {/* Top Controls */}
      <div
        className={`absolute top-0 left-0 right-0 bg-gradient-to-b from-black/90 to-transparent transition-all duration-300 z-20 ${
          showControls ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className='flex items-center justify-between p-4'>
          <Button variant='ghost' onClick={() => onNavigate("home")} className='text-white hover:bg-white/10'>
            <ChevronLeft className='w-5 h-5' />
          </Button>

          <div className='text-center text-white flex-1 mx-4'>
            <h3 className='font-medium truncate'>{manga.title}</h3>
            <p className='text-sm text-slate-300 truncate'>
              Chapter {chapterNumber}: {currentChapter.title}
            </p>
          </div>

          <div className='flex items-center space-x-2'>
            <Button
              variant='ghost'
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`text-white hover:bg-white/10 ${isBookmarked ? "text-purple-400" : ""}`}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`} />
            </Button>
            <Button variant='ghost' onClick={() => setShowSettings(true)} className='text-white hover:bg-white/10'>
              <Settings className='w-5 h-5' />
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent transition-all duration-300 z-20 ${
          showControls ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full pointer-events-none"
        }`}
      >
        <div className='p-4'>
          {/* Progress Bar */}
          <div className='mb-4'>
            <div className='flex items-center justify-between text-white text-sm mb-2'>
              <span>
                Page {currentPage + 1} of {pages.length}
              </span>
              <span>{Math.round(((currentPage + 1) / pages.length) * 100)}%</span>
            </div>
            <div
              className='bg-slate-700 rounded-full h-2 cursor-pointer'
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const percentage = x / rect.width;
                const newPage = Math.floor(percentage * pages.length);
                setCurrentPage(Math.max(0, Math.min(pages.length - 1, newPage)));
              }}
            >
              <div
                className='bg-purple-500 h-2 rounded-full transition-all duration-300'
                style={{ width: `${((currentPage + 1) / pages.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Control Buttons */}
          <div className='flex items-center justify-center space-x-2 md:space-x-4'>
            <Button
              variant='ghost'
              onClick={() => goToChapter(1)}
              disabled={chapterNumber === 1}
              className='text-white hover:bg-white/10'
              size='sm'
            >
              <SkipBack className='w-4 h-4' />
            </Button>

            <Button
              variant='ghost'
              onClick={prevPage}
              disabled={currentPage === 0 && chapterNumber === 1}
              className='text-white hover:bg-white/10'
            >
              <ChevronLeft className='w-5 h-5' />
            </Button>

            <Button variant='ghost' onClick={() => setShowChapterList(true)} className='text-white hover:bg-white/10'>
              <Menu className='w-5 h-5' />
            </Button>

            <Button
              variant='ghost'
              onClick={() => setZoom((prev) => Math.max(0.5, prev - 0.25))}
              className='text-white hover:bg-white/10'
            >
              <ZoomOut className='w-5 h-5' />
            </Button>

            <Button variant='ghost' onClick={() => setZoom(1)} className='text-white hover:bg-white/10'>
              <RotateCcw className='w-5 h-5' />
            </Button>

            <Button
              variant='ghost'
              onClick={() => setZoom((prev) => Math.min(3, prev + 0.25))}
              className='text-white hover:bg-white/10'
            >
              <ZoomIn className='w-5 h-5' />
            </Button>

            <Button
              variant='ghost'
              onClick={nextPage}
              disabled={currentPage === pages.length - 1 && chapterNumber === chapters.length}
              className='text-white hover:bg-white/10'
            >
              <ChevronRight className='w-5 h-5' />
            </Button>

            <Button
              variant='ghost'
              onClick={() => goToChapter(chapters.length)}
              disabled={chapterNumber === chapters.length}
              className='text-white hover:bg-white/10'
              size='sm'
            >
              <SkipForward className='w-4 h-4' />
            </Button>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      <Modal isOpen={showSettings} onClose={() => setShowSettings(false)} title='Reading Settings'>
        <div className='space-y-6'>
          {/* Brightness */}
          <div>
            <label className='flex items-center space-x-2 text-white mb-3'>
              <Sun className='w-4 h-4' />
              <span>Brightness: {settings.brightness}%</span>
            </label>
            <input
              type='range'
              min='20'
              max='150'
              value={settings.brightness}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  brightness: parseInt(e.target.value),
                })
              }
              className='w-full accent-purple-500'
            />
          </div>

          {/* Reading Direction */}
          <div>
            <label className='flex items-center space-x-2 text-white mb-3'>
              <Book className='w-4 h-4' />
              <span>Reading Direction</span>
            </label>
            <div className='grid grid-cols-2 gap-2'>
              <button
                onClick={() => setSettings({ ...settings, readingDirection: "ltr" })}
                className={`px-3 py-2 rounded-lg text-sm transition-colors min-h-[44px] ${
                  settings.readingDirection === "ltr"
                    ? "bg-purple-600 text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                Left to Right
              </button>
              <button
                onClick={() => setSettings({ ...settings, readingDirection: "rtl" })}
                className={`px-3 py-2 rounded-lg text-sm transition-colors min-h-[44px] ${
                  settings.readingDirection === "rtl"
                    ? "bg-purple-600 text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                Right to Left
              </button>
            </div>
          </div>

          {/* Page Transition */}
          <div>
            <label className='flex items-center space-x-2 text-white mb-3'>
              <RotateCcw className='w-4 h-4' />
              <span>Page Transition</span>
            </label>
            <div className='grid grid-cols-3 gap-2'>
              {["none", "slide", "fade"].map((transition) => (
                <button
                  key={transition}
                  onClick={() => setSettings({ ...settings, pageTransition: transition as any })}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors capitalize min-h-[44px] ${
                    settings.pageTransition === transition
                      ? "bg-purple-600 text-white"
                      : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  }`}
                >
                  {transition}
                </button>
              ))}
            </div>
          </div>

          {/* Auto-hide Controls */}
          <div>
            <label className='flex items-center justify-between text-white'>
              <div className='flex items-center space-x-2'>
                <Eye className='w-4 h-4' />
                <span>Auto-hide Controls</span>
              </div>
              <button
                onClick={() => setSettings({ ...settings, autoHideControls: !settings.autoHideControls })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.autoHideControls ? "bg-purple-600" : "bg-slate-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.autoHideControls ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </label>
          </div>
        </div>
      </Modal>

      {/* Chapter List Modal */}
      <Modal isOpen={showChapterList} onClose={() => setShowChapterList(false)} title={`Chapters - ${manga.title}`}>
        <div className='space-y-2 max-h-96 overflow-y-auto'>
          {chapters.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => goToChapter(chapter.number)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors min-h-[44px] ${
                chapter.number === chapterNumber
                  ? "bg-purple-600 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              <div className='flex items-center justify-between'>
                <div>
                  <div className='font-medium'>Chapter {chapter.number}</div>
                  <div className='text-sm opacity-75'>{chapter.title}</div>
                </div>
                <div className='text-xs opacity-60'>{chapter.pages.length} pages</div>
              </div>
            </button>
          ))}
        </div>
      </Modal>

      {/* Page Preloader */}
      {currentPage < pages.length - 1 && <link rel='prefetch' href={pages[currentPage + 1]} />}
    </div>
  );
}
