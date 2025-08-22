import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Info, Star, BookOpen } from "lucide-react";
import { Manga } from "../../types/manga";
import Button from "../ui/Button";

interface MangaCarouselProps {
  mangas: Manga[];
  onMangaClick: (manga: Manga) => void;
  onReadClick: (manga: Manga) => void;
}

export default function MangaCarousel({ mangas, onMangaClick, onReadClick }: MangaCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isAutoPlaying && mangas.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % mangas.length);
      }, 6000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoPlaying, mangas.length]);

  useEffect(() => {
    setImageLoaded(false);
  }, [currentIndex]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + mangas.length) % mangas.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % mangas.length);
    setIsAutoPlaying(false);
  };

  const currentManga = mangas[currentIndex];

  if (!currentManga) return null;

  return (
    <div className='relative h-[400px] md:h-[500px] overflow-hidden rounded-xl group'>
      <div className='absolute inset-0'>
        <img
          src={currentManga.coverImage}
          alt={currentManga.title}
          className={`w-full h-full object-cover transition-all duration-700 ${
            imageLoaded ? "scale-100 opacity-100" : "scale-110 opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className='absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-black/20' />
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all z-10 opacity-0 group-hover:opacity-100'
      >
        <ChevronLeft className='w-6 h-6' />
      </button>

      <button
        onClick={goToNext}
        className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all z-10 opacity-0 group-hover:opacity-100'
      >
        <ChevronRight className='w-6 h-6' />
      </button>

      {/* Content */}
      <div className='absolute inset-0 flex items-center'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
          <div className='max-w-2xl'>
            <div className='flex items-center space-x-2 mb-3'>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  currentManga.status === "completed"
                    ? "bg-green-600 text-white"
                    : currentManga.status === "ongoing"
                    ? "bg-blue-600 text-white"
                    : "bg-yellow-600 text-white"
                }`}
              >
                {currentManga.status}
              </span>
              <div className='flex items-center space-x-1 bg-black/50 rounded-full px-3 py-1'>
                <Star className='w-4 h-4 text-yellow-400 fill-current' />
                <span className='text-white text-sm font-medium'>{currentManga.rating}</span>
              </div>
            </div>

            <h2 className='text-3xl md:text-5xl font-bold text-white mb-4 leading-tight'>{currentManga.title}</h2>

            <p className='text-slate-300 text-lg mb-4 line-clamp-3 leading-relaxed'>{currentManga.description}</p>

            <div className='flex flex-wrap gap-2 mb-6'>
              {currentManga.genres.slice(0, 4).map((genre) => (
                <span
                  key={genre}
                  className='bg-purple-600/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium'
                >
                  {genre}
                </span>
              ))}
            </div>

            <div className='flex items-center space-x-4 mb-6 text-slate-300'>
              <div className='flex items-center space-x-1'>
                <BookOpen className='w-4 h-4' />
                <span className='text-sm'>{currentManga.totalChapters} chapters</span>
              </div>
              <div className='flex items-center space-x-1'>
                <span className='text-sm'>{currentManga.totalPages} pages</span>
              </div>
              <div className='flex items-center space-x-1'>
                <span className='text-sm capitalize'>{currentManga.language}</span>
              </div>
            </div>

            <div className='flex flex-col sm:flex-row gap-3'>
              <Button
                onClick={() => onReadClick(currentManga)}
                className='flex items-center space-x-2 bg-purple-600 hover:bg-purple-700'
                size='lg'
              >
                <Play className='w-5 h-5' />
                <span>Start Reading</span>
              </Button>
              <Button
                variant='ghost'
                onClick={() => onMangaClick(currentManga)}
                className='border border-slate-600 hover:border-purple-500 flex items-center space-x-2'
                size='lg'
              >
                <Info className='w-5 h-5' />
                <span>More Info</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Indicators */}
      <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2'>
        {mangas.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setIsAutoPlaying(false);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-purple-500 scale-125" : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      {isAutoPlaying && mangas.length > 1 && (
        <div className='absolute top-4 right-4 bg-black/50 rounded-full px-3 py-1 flex items-center space-x-2'>
          <div className='w-2 h-2 bg-purple-500 rounded-full animate-pulse' />
          <span className='text-white text-xs'>Auto</span>
        </div>
      )}
    </div>
  );
}
