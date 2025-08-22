import React, { useState, useEffect, useCallback } from "react";
import { Filter, Grid, List, SortAsc, Search as SearchIcon, Tag, Globe } from "lucide-react";
import { Manga, SearchFilters } from "../types/manga";
import { mangaApi } from "../services/api";
import { useAsyncData } from "../hooks/useApi";
import MangaCard from "../components/manga/MangaCard";
import SearchBar from "../components/ui/SearchBar";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import FilterChip from "../components/ui/FilterChip";
import { LoadingCard } from "../components/ui/LoadingSpinner";
import ErrorMessage from "../components/ui/ErrorMessage";

interface SearchProps {
  onNavigate: (page: string, data?: any) => void;
  initialQuery?: string;
  initialGenres?: string[];
  initialSort?: string;
}

export default function Search({ onNavigate, initialQuery = "", initialGenres = [], initialSort = "" }: SearchProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: initialQuery,
    genres: initialGenres,
    tags: [],
    status: "",
    language: "",
    minRating: 0,
    minPages: 0,
    maxPages: 0,
    sortBy: (initialSort as any) || "popularity",
    sortOrder: "desc",
  });

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [allResults, setAllResults] = useState<Manga[]>([]);

  // Load filter options
  const [availableGenres] = useAsyncData([], () => mangaApi.getPopularGenres(), []);
  const [availableTags] = useAsyncData([], () => mangaApi.getAvailableTags(), []);
  const [availableLanguages] = useAsyncData([], () => mangaApi.getAvailableLanguages(), []);

  // Search results
  const [searchResults, searchLoading, searchError, refetchResults] = useAsyncData(
    { data: [], total: 0, page: 1, limit: 20, hasMore: false },
    () => mangaApi.searchManga(filters, currentPage, 20),
    [filters, currentPage],
  );

  useEffect(() => {
    if (currentPage === 1) {
      setAllResults(searchResults.data);
    } else {
      setAllResults((prev) => [...prev, ...searchResults.data]);
    }
  }, [searchResults, currentPage]);

  const updateFilter = useCallback((key: keyof SearchFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
    setAllResults([]);
  }, []);

  const handleGenreToggle = (genre: string) => {
    const newGenres = filters.genres.includes(genre)
      ? filters.genres.filter((g) => g !== genre)
      : [...filters.genres, genre];
    updateFilter("genres", newGenres);
  };

  const handleTagToggle = (tag: string) => {
    const newTags = filters.tags.includes(tag) ? filters.tags.filter((t) => t !== tag) : [...filters.tags, tag];
    updateFilter("tags", newTags);
  };

  const clearFilters = () => {
    setFilters({
      query: "",
      genres: [],
      tags: [],
      status: "",
      language: "",
      minRating: 0,
      minPages: 0,
      maxPages: 0,
      sortBy: "popularity",
      sortOrder: "desc",
    });
    setCurrentPage(1);
    setAllResults([]);
  };

  const loadMore = () => {
    if (searchResults.hasMore && !searchLoading) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleMangaClick = (manga: Manga) => {
    onNavigate("manga-detail", { manga });
  };

  const activeFilterCount =
    filters.genres.length +
    filters.tags.length +
    (filters.status ? 1 : 0) +
    (filters.language ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.minPages > 0 ? 1 : 0) +
    (filters.maxPages > 0 ? 1 : 0);

  return (
    <div className='min-h-screen bg-slate-900 pt-16 md:pt-20 pb-20 md:pb-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Search Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-white mb-6'>Discover Manga</h1>
          <SearchBar onSearch={(query) => updateFilter("query", query)} className='mb-4' />

          {/* Filter Controls */}
          <div className='flex flex-wrap items-center gap-4 mb-4'>
            <Button variant='ghost' onClick={() => setShowFilters(true)} className='flex items-center space-x-2'>
              <Filter className='w-4 h-4' />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className='bg-purple-600 text-white text-xs px-2 py-1 rounded-full'>{activeFilterCount}</span>
              )}
            </Button>

            <select
              value={`${filters.sortBy}-${filters.sortOrder}`}
              onChange={(e) => {
                const [sortBy, sortOrder] = e.target.value.split("-");
                updateFilter("sortBy", sortBy);
                updateFilter("sortOrder", sortOrder);
              }}
              className='bg-slate-800 border border-slate-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[44px]'
            >
              <option value='popularity-desc'>Most Popular</option>
              <option value='rating-desc'>Highest Rated</option>
              <option value='updated-desc'>Recently Updated</option>
              <option value='year-desc'>Newest</option>
              <option value='pages-desc'>Most Pages</option>
              <option value='title-asc'>A-Z</option>
              <option value='title-desc'>Z-A</option>
            </select>

            <div className='flex items-center bg-slate-800 rounded-lg p-1'>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded transition-colors min-h-[44px] min-w-[44px] ${
                  viewMode === "grid" ? "bg-purple-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                <Grid className='w-4 h-4' />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded transition-colors min-h-[44px] min-w-[44px] ${
                  viewMode === "list" ? "bg-purple-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                <List className='w-4 h-4' />
              </button>
            </div>
          </div>

          {/* Active Filters */}
          {activeFilterCount > 0 && (
            <div className='flex flex-wrap items-center gap-2 mb-4'>
              <span className='text-slate-400 text-sm'>Active filters:</span>
              {filters.genres.map((genre) => (
                <FilterChip key={genre} label={genre} onRemove={() => handleGenreToggle(genre)} color='purple' />
              ))}
              {filters.tags.map((tag) => (
                <FilterChip key={tag} label={tag} onRemove={() => handleTagToggle(tag)} color='blue' />
              ))}
              {filters.status && (
                <FilterChip label={filters.status} onRemove={() => updateFilter("status", "")} color='green' />
              )}
              {filters.language && (
                <FilterChip label={filters.language} onRemove={() => updateFilter("language", "")} color='yellow' />
              )}
              {filters.minRating > 0 && (
                <FilterChip
                  label={`${filters.minRating}+ stars`}
                  onRemove={() => updateFilter("minRating", 0)}
                  color='yellow'
                />
              )}
              <button
                onClick={clearFilters}
                className='text-slate-400 hover:text-white text-sm underline transition-colors'
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Results */}
        <div className='mb-4'>
          <p className='text-slate-400'>
            {searchLoading && currentPage === 1
              ? "Searching..."
              : `Showing ${allResults.length} of ${searchResults.total} results`}
            {filters.query && ` for "${filters.query}"`}
          </p>
        </div>

        {/* Error State */}
        {searchError && <ErrorMessage message={searchError} onRetry={refetchResults} />}

        {/* Manga Grid/List */}
        {!searchError && (
          <>
            <div
              className={`grid gap-4 mb-8 ${
                viewMode === "grid"
                  ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
                  : "grid-cols-1 max-w-4xl"
              }`}
            >
              {allResults.map((manga) => (
                <MangaCard key={manga.id} manga={manga} onClick={() => handleMangaClick(manga)} />
              ))}

              {/* Loading cards for pagination */}
              {searchLoading &&
                currentPage > 1 &&
                Array.from({ length: 6 }).map((_, i) => <LoadingCard key={`loading-${i}`} />)}
            </div>

            {/* Load More / No Results */}
            {allResults.length === 0 && !searchLoading ? (
              <div className='text-center py-12'>
                <SearchIcon className='w-16 h-16 text-slate-600 mx-auto mb-4' />
                <p className='text-slate-400 text-lg mb-4'>No manga found matching your criteria.</p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            ) : searchResults.hasMore && !searchLoading ? (
              <div className='text-center'>
                <Button onClick={loadMore} className='px-8'>
                  Load More
                </Button>
              </div>
            ) : searchLoading && currentPage === 1 ? (
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4'>
                {Array.from({ length: 12 }).map((_, i) => (
                  <LoadingCard key={i} />
                ))}
              </div>
            ) : null}
          </>
        )}

        {/* Advanced Filters Modal */}
        <Modal isOpen={showFilters} onClose={() => setShowFilters(false)} title='Advanced Filters'>
          <div className='space-y-6 max-h-[70vh] overflow-y-auto'>
            {/* Genres */}
            <div>
              <h3 className='text-white font-medium mb-3 flex items-center space-x-2'>
                <Grid className='w-4 h-4' />
                <span>Genres</span>
              </h3>
              <div className='grid grid-cols-2 gap-2 max-h-40 overflow-y-auto'>
                {availableGenres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => handleGenreToggle(genre)}
                    className={`text-left px-3 py-2 rounded-lg text-sm transition-colors min-h-[44px] ${
                      filters.genres.includes(genre)
                        ? "bg-purple-600 text-white"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className='text-white font-medium mb-3 flex items-center space-x-2'>
                <Tag className='w-4 h-4' />
                <span>Tags</span>
              </h3>
              <div className='grid grid-cols-2 gap-2 max-h-40 overflow-y-auto'>
                {availableTags.slice(0, 20).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={`text-left px-3 py-2 rounded-lg text-sm transition-colors min-h-[44px] ${
                      filters.tags.includes(tag)
                        ? "bg-blue-600 text-white"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Status */}
            <div>
              <h3 className='text-white font-medium mb-3'>Status</h3>
              <div className='grid grid-cols-1 gap-2'>
                {["ongoing", "completed", "hiatus"].map((status) => (
                  <button
                    key={status}
                    onClick={() => updateFilter("status", filters.status === status ? "" : status)}
                    className={`text-left px-3 py-2 rounded-lg text-sm transition-colors capitalize min-h-[44px] ${
                      filters.status === status
                        ? "bg-green-600 text-white"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Language */}
            <div>
              <h3 className='text-white font-medium mb-3 flex items-center space-x-2'>
                <Globe className='w-4 h-4' />
                <span>Language</span>
              </h3>
              <div className='grid grid-cols-1 gap-2'>
                {availableLanguages.map((language) => (
                  <button
                    key={language}
                    onClick={() => updateFilter("language", filters.language === language ? "" : language)}
                    className={`text-left px-3 py-2 rounded-lg text-sm transition-colors capitalize min-h-[44px] ${
                      filters.language === language
                        ? "bg-yellow-600 text-white"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                  >
                    {language}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div>
              <h3 className='text-white font-medium mb-3'>Minimum Rating</h3>
              <div className='grid grid-cols-5 gap-2'>
                {[0, 3, 4, 4.5, 4.8].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => updateFilter("minRating", rating)}
                    className={`px-3 py-2 rounded-lg text-sm transition-colors min-h-[44px] ${
                      filters.minRating === rating
                        ? "bg-yellow-600 text-white"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                  >
                    {rating === 0 ? "Any" : `${rating}+`}
                  </button>
                ))}
              </div>
            </div>

            {/* Page Count */}
            <div>
              <h3 className='text-white font-medium mb-3'>Page Count</h3>
              <div className='space-y-3'>
                <div>
                  <label className='text-slate-300 text-sm mb-1 block'>Minimum Pages</label>
                  <input
                    type='number'
                    value={filters.minPages || ""}
                    onChange={(e) => updateFilter("minPages", parseInt(e.target.value) || 0)}
                    placeholder='0'
                    className='w-full bg-slate-700 border border-slate-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[44px]'
                  />
                </div>
                <div>
                  <label className='text-slate-300 text-sm mb-1 block'>Maximum Pages</label>
                  <input
                    type='number'
                    value={filters.maxPages || ""}
                    onChange={(e) => updateFilter("maxPages", parseInt(e.target.value) || 0)}
                    placeholder='No limit'
                    className='w-full bg-slate-700 border border-slate-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[44px]'
                  />
                </div>
              </div>
            </div>

            <div className='flex gap-2 pt-4 border-t border-slate-700'>
              <Button onClick={() => setShowFilters(false)} className='flex-1'>
                Apply Filters
              </Button>
              <Button variant='ghost' onClick={clearFilters}>
                Clear All
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
