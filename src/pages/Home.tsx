import React, { useState } from 'react';
import { TrendingUp, Clock, Star, Grid, BookOpen, Zap } from 'lucide-react';
import { Manga } from '../types/manga';
import { mangaApi } from '../services/api';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAsyncData } from '../hooks/useApi';
import MangaCarousel from '../components/manga/MangaCarousel';
import MangaCard from '../components/manga/MangaCard';
import SearchBar from '../components/ui/SearchBar';
import Button from '../components/ui/Button';
import { LoadingCard, LoadingSpinner } from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';

interface HomeProps {
  onNavigate: (page: string, data?: any) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [recentlyRead] = useLocalStorage<any[]>('recentlyRead', []);
  const [searchQuery, setSearchQuery] = useState('');

  const [trendingMangas, trendingLoading, trendingError, refetchTrending] = useAsyncData(
    [],
    () => mangaApi.getTrendingManga(6),
    []
  );

  const [recentlyUpdated, updatedLoading, updatedError, refetchUpdated] = useAsyncData(
    [],
    () => mangaApi.getRecentlyUpdated(6),
    []
  );

  const [popularGenres, genresLoading] = useAsyncData(
    [],
    () => mangaApi.getPopularGenres(),
    []
  );

  const handleMangaClick = (manga: Manga) => {
    onNavigate('manga-detail', { manga });
  };

  const handleReadClick = (manga: Manga) => {
    onNavigate('reader', { mangaId: manga.id, chapter: 1 });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      onNavigate('search', { query });
    }
  };

  const handleGenreClick = (genre: string) => {
    onNavigate('search', { genres: [genre] });
  };

  return (
    <div className="min-h-screen bg-slate-900 pt-16 md:pt-20 pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Discover Amazing
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500"> Manga</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
              Explore thousands of manga titles with our advanced reader and personalized recommendations
            </p>
          </div>

          {/* Quick Search */}
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Search thousands of manga..."
            className="max-w-2xl mx-auto mb-8"
          />

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-slate-800 rounded-lg p-4 text-center">
              <BookOpen className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">10K+</div>
              <div className="text-slate-400 text-sm">Manga Titles</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-4 text-center">
              <Zap className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">50K+</div>
              <div className="text-slate-400 text-sm">Active Readers</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-4 text-center">
              <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">4.8</div>
              <div className="text-slate-400 text-sm">Average Rating</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-4 text-center">
              <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">Daily</div>
              <div className="text-slate-400 text-sm">Updates</div>
            </div>
          </div>
        </section>

        {/* Featured Carousel */}
        {trendingError ? (
          <ErrorMessage message={trendingError} onRetry={refetchTrending} />
        ) : trendingLoading ? (
          <div className="mb-12 h-[400px] md:h-[500px] bg-slate-800 rounded-xl animate-pulse flex items-center justify-center">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <section className="mb-12">
            <MangaCarousel 
              mangas={trendingMangas.slice(0, 3)}
              onMangaClick={handleMangaClick}
              onReadClick={handleReadClick}
            />
          </section>
        )}

        {/* Continue Reading */}
        {recentlyRead.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center space-x-2 mb-6">
              <Clock className="w-6 h-6 text-purple-500" />
              <h2 className="text-2xl font-bold text-white">Continue Reading</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {recentlyRead.slice(0, 6).map((item) => {
                // Find manga from trending or create placeholder
                const manga = trendingMangas.find(m => m.id === item.mangaId) || {
                  id: item.mangaId,
                  title: 'Loading...',
                  author: '',
                  coverImage: 'https://images.pexels.com/photos/159533/book-reading-read-literature-159533.jpeg?auto=compress&cs=tinysrgb&w=400',
                  genres: [],
                  tags: [],
                  status: 'ongoing' as const,
                  rating: 0,
                  year: 2024,
                  totalChapters: 1,
                  totalPages: 1,
                  lastUpdated: '',
                  popularity: 0,
                  language: '',
                  type: '',
                  galleryId: '',
                  description: ''
                };
                
                return (
                  <MangaCard
                    key={manga.id}
                    manga={manga}
                    onClick={() => handleReadClick(manga)}
                    showProgress={true}
                    progress={(item.currentChapter / manga.totalChapters) * 100}
                  />
                );
              })}
            </div>
          </section>
        )}

        {/* Popular Genres */}
        <section className="mb-12">
          <div className="flex items-center space-x-2 mb-6">
            <Grid className="w-6 h-6 text-purple-500" />
            <h2 className="text-2xl font-bold text-white">Popular Genres</h2>
          </div>
          {genresLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="bg-slate-800 h-20 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {popularGenres.slice(0, 12).map((genre) => (
                <Button
                  key={genre}
                  variant="ghost"
                  onClick={() => handleGenreClick(genre)}
                  className="bg-slate-800 hover:bg-purple-600 border border-slate-700 hover:border-purple-500 h-20 text-lg group"
                >
                  <span className="group-hover:scale-105 transition-transform">{genre}</span>
                </Button>
              ))}
            </div>
          )}
        </section>

        {/* Trending */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-6 h-6 text-purple-500" />
              <h2 className="text-2xl font-bold text-white">Trending Now</h2>
            </div>
            <Button 
              variant="ghost" 
              onClick={() => onNavigate('search', { sortBy: 'popularity' })}
            >
              View All
            </Button>
          </div>
          {trendingError ? (
            <ErrorMessage message={trendingError} onRetry={refetchTrending} />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {trendingLoading ? (
                Array.from({ length: 6 }).map((_, i) => <LoadingCard key={i} />)
              ) : (
                trendingMangas.map((manga) => (
                  <MangaCard
                    key={manga.id}
                    manga={manga}
                    onClick={() => handleMangaClick(manga)}
                  />
                ))
              )}
            </div>
          )}
        </section>

        {/* Recently Updated */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Star className="w-6 h-6 text-purple-500" />
              <h2 className="text-2xl font-bold text-white">Recently Updated</h2>
            </div>
            <Button 
              variant="ghost" 
              onClick={() => onNavigate('search', { sortBy: 'updated' })}
            >
              View All
            </Button>
          </div>
          {updatedError ? (
            <ErrorMessage message={updatedError} onRetry={refetchUpdated} />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {updatedLoading ? (
                Array.from({ length: 6 }).map((_, i) => <LoadingCard key={i} />)
              ) : (
                recentlyUpdated.map((manga) => (
                  <MangaCard
                    key={manga.id}
                    manga={manga}
                    onClick={() => handleMangaClick(manga)}
                  />
                ))
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
