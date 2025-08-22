export interface MangaImage {
  filename: string;
  url: string;
  host: string;
  page: number;
}

export interface MangaTag {
  name: string;
  category: string;
}

export interface MangaMetadata {
  title: string;
  gallery_id: string;
  language: string;
  tags: MangaTag[];
  artist: string[];
  type: string;
  pages: number;
}

export interface MangaData {
  gallery_id: string;
  images: MangaImage[];
  metadata: MangaMetadata;
  timestamp: number;
}

export interface Manga {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  genres: string[];
  tags: string[];
  status: 'ongoing' | 'completed' | 'hiatus';
  rating: number;
  year: number;
  totalChapters: number;
  totalPages: number;
  lastUpdated: string;
  popularity: number;
  language: string;
  type: string;
  galleryId: string;
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  pages: string[];
  releaseDate: string;
  mangaId: string;
}

export interface ReadingProgress {
  mangaId: string;
  currentChapter: number;
  currentPage: number;
  lastRead: string;
}

export interface ReadingSettings {
  brightness: number;
  readingDirection: 'ltr' | 'rtl';
  pageDisplay: 'single' | 'double';
  autoHideControls: boolean;
  pageTransition: 'slide' | 'fade' | 'none';
}

export interface SearchFilters {
  query: string;
  genres: string[];
  tags: string[];
  status: string;
  language: string;
  minRating: number;
  minPages: number;
  maxPages: number;
  sortBy: 'popularity' | 'rating' | 'updated' | 'title' | 'year' | 'pages';
  sortOrder: 'asc' | 'desc';
}

export interface ApiResponse<T> {
  data: T;
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}</parameter>
