import { MangaData, Manga, Chapter, ApiResponse, SearchFilters } from "../types/manga";

// Mock API service that simulates real API calls
class MangaApiService {
  private baseUrl = "https://api.manga-reader.com"; // Mock URL
  private mockData: MangaData[] = [];

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    // Generate mock data based on the provided JSON format
    this.mockData = [
      {
        gallery_id: "589790",
        images: Array.from({ length: 208 }, (_, i) => ({
          filename: `${String(i + 1).padStart(3, "0")}.webp`,
          url: `https://images.pexels.com/photos/${1000000 + i}/pexels-photo-${
            1000000 + i
          }.jpeg?auto=compress&cs=tinysrgb&w=800`,
          host: "pexels",
          page: i + 1,
        })),
        metadata: {
          title: "[Tachibana Omina] Shadow Chronicles Chapter 1-3",
          gallery_id: "589790",
          language: "japanese",
          tags: [
            { name: "action", category: "genre" },
            { name: "supernatural", category: "genre" },
            { name: "drama", category: "genre" },
            { name: "ninja", category: "character" },
            { name: "modern setting", category: "setting" },
          ],
          artist: ["tachibana omina"],
          type: "manga",
          pages: 208,
        },
        timestamp: 1755271857,
      },
      {
        gallery_id: "589791",
        images: Array.from({ length: 156 }, (_, i) => ({
          filename: `${String(i + 1).padStart(3, "0")}.webp`,
          url: `https://images.pexels.com/photos/${1100000 + i}/pexels-photo-${
            1100000 + i
          }.jpeg?auto=compress&cs=tinysrgb&w=800`,
          host: "pexels",
          page: i + 1,
        })),
        metadata: {
          title: "[Yuki Sato] Neon Dreams Volume 1",
          gallery_id: "589791",
          language: "english",
          tags: [
            { name: "sci-fi", category: "genre" },
            { name: "cyberpunk", category: "genre" },
            { name: "thriller", category: "genre" },
            { name: "hacker", category: "character" },
            { name: "future", category: "setting" },
          ],
          artist: ["yuki sato"],
          type: "manga",
          pages: 156,
        },
        timestamp: 1755271800,
      },
      {
        gallery_id: "589792",
        images: Array.from({ length: 180 }, (_, i) => ({
          filename: `${String(i + 1).padStart(3, "0")}.webp`,
          url: `https://images.pexels.com/photos/${1200000 + i}/pexels-photo-${
            1200000 + i
          }.jpeg?auto=compress&cs=tinysrgb&w=800`,
          host: "pexels",
          page: i + 1,
        })),
        metadata: {
          title: "[Mei Yoshida] Cherry Blossom Academy Complete Edition",
          gallery_id: "589792",
          language: "english",
          tags: [
            { name: "romance", category: "genre" },
            { name: "slice of life", category: "genre" },
            { name: "school", category: "setting" },
            { name: "friendship", category: "theme" },
            { name: "coming of age", category: "theme" },
          ],
          artist: ["mei yoshida"],
          type: "manga",
          pages: 180,
        },
        timestamp: 1755271750,
      },
      {
        gallery_id: "589793",
        images: Array.from({ length: 224 }, (_, i) => ({
          filename: `${String(i + 1).padStart(3, "0")}.webp`,
          url: `https://images.pexels.com/photos/${1300000 + i}/pexels-photo-${
            1300000 + i
          }.jpeg?auto=compress&cs=tinysrgb&w=800`,
          host: "pexels",
          page: i + 1,
        })),
        metadata: {
          title: "[Hiroshi Nakamura] Dragon's Legacy Arc 1",
          gallery_id: "589793",
          language: "japanese",
          tags: [
            { name: "fantasy", category: "genre" },
            { name: "adventure", category: "genre" },
            { name: "action", category: "genre" },
            { name: "dragon", category: "character" },
            { name: "magic", category: "theme" },
          ],
          artist: ["hiroshi nakamura"],
          type: "manga",
          pages: 224,
        },
        timestamp: 1755271700,
      },
      {
        gallery_id: "589794",
        images: Array.from({ length: 132 }, (_, i) => ({
          filename: `${String(i + 1).padStart(3, "0")}.webp`,
          url: `https://images.pexels.com/photos/${1400000 + i}/pexels-photo-${
            1400000 + i
          }.jpeg?auto=compress&cs=tinysrgb&w=800`,
          host: "pexels",
          page: i + 1,
        })),
        metadata: {
          title: "[Kana Watanabe] Mystery Café Collection",
          gallery_id: "589794",
          language: "english",
          tags: [
            { name: "mystery", category: "genre" },
            { name: "slice of life", category: "genre" },
            { name: "comedy", category: "genre" },
            { name: "detective", category: "character" },
            { name: "café", category: "setting" },
          ],
          artist: ["kana watanabe"],
          type: "manga",
          pages: 132,
        },
        timestamp: 1755271650,
      },
      {
        gallery_id: "589795",
        images: Array.from({ length: 196 }, (_, i) => ({
          filename: `${String(i + 1).padStart(3, "0")}.webp`,
          url: `https://images.pexels.com/photos/${1500000 + i}/pexels-photo-${
            1500000 + i
          }.jpeg?auto=compress&cs=tinysrgb&w=800`,
          host: "pexels",
          page: i + 1,
        })),
        metadata: {
          title: "[Takeshi Mori] Space Pirates Saga",
          gallery_id: "589795",
          language: "japanese",
          tags: [
            { name: "sci-fi", category: "genre" },
            { name: "action", category: "genre" },
            { name: "adventure", category: "genre" },
            { name: "space", category: "setting" },
            { name: "pirates", category: "character" },
          ],
          artist: ["takeshi mori"],
          type: "manga",
          pages: 196,
        },
        timestamp: 1755271600,
      },
    ];
  }

  private convertToManga(data: MangaData): Manga {
    const genres = data.metadata.tags
      .filter((tag) => tag.category === "genre")
      .map((tag) => this.capitalizeWords(tag.name));

    const tags = data.metadata.tags.map((tag) => tag.name);

    // Extract title without artist prefix
    const cleanTitle = data.metadata.title.replace(/^\[.*?\]\s*/, "");

    return {
      id: data.gallery_id,
      title: cleanTitle,
      author: data.metadata.artist.join(", "),
      description: this.generateDescription(data.metadata),
      coverImage:
        data.images[0]?.url ||
        "https://images.pexels.com/photos/159533/book-reading-read-literature-159533.jpeg?auto=compress&cs=tinysrgb&w=400",
      genres,
      tags,
      status: "completed",
      rating: this.generateRating(),
      year: new Date(data.timestamp * 1000).getFullYear(),
      totalChapters: this.extractChapterCount(data.metadata.title),
      totalPages: data.metadata.pages,
      lastUpdated: new Date(data.timestamp * 1000).toISOString().split("T")[0],
      popularity: Math.floor(Math.random() * 10000) + 1000,
      language: data.metadata.language,
      type: data.metadata.type,
      galleryId: data.gallery_id,
    };
  }

  private capitalizeWords(str: string): string {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  private generateDescription(metadata: MangaMetadata): string {
    const themes = metadata.tags.filter((tag) => tag.category === "theme").map((tag) => tag.name);

    const settings = metadata.tags.filter((tag) => tag.category === "setting").map((tag) => tag.name);

    const characters = metadata.tags.filter((tag) => tag.category === "character").map((tag) => tag.name);

    let description = `A captivating ${metadata.type} by ${metadata.artist.join(", ")}.`;

    if (settings.length > 0) {
      description += ` Set in a ${settings.join(" and ")} environment,`;
    }

    if (characters.length > 0) {
      description += ` featuring ${characters.join(", ")}.`;
    }

    if (themes.length > 0) {
      description += ` Explores themes of ${themes.join(", ")}.`;
    }

    return description;
  }

  private generateRating(): number {
    return Math.round((Math.random() * 2 + 3) * 10) / 10; // 3.0 - 5.0 range
  }

  private extractChapterCount(title: string): number {
    const chapterMatch = title.match(/Chapter\s+(\d+)-(\d+)/i);
    if (chapterMatch) {
      return parseInt(chapterMatch[2]) - parseInt(chapterMatch[1]) + 1;
    }

    const volumeMatch = title.match(/Volume\s+(\d+)/i);
    if (volumeMatch) {
      return parseInt(volumeMatch[1]) * 10; // Assume 10 chapters per volume
    }

    return Math.floor(Math.random() * 50) + 10; // Random between 10-60
  }

  // Simulate API delay
  private async delay(ms: number = 500): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async searchManga(
    filters: Partial<SearchFilters> = {},
    page: number = 1,
    limit: number = 20,
  ): Promise<ApiResponse<Manga[]>> {
    await this.delay();

    let results = this.mockData.map((data) => this.convertToManga(data));

    // Apply filters
    if (filters.query) {
      const query = filters.query.toLowerCase();
      results = results.filter(
        (manga) =>
          manga.title.toLowerCase().includes(query) ||
          manga.author.toLowerCase().includes(query) ||
          manga.tags.some((tag) => tag.toLowerCase().includes(query)),
      );
    }

    if (filters.genres && filters.genres.length > 0) {
      results = results.filter((manga) =>
        filters.genres!.every((genre) => manga.genres.some((g) => g.toLowerCase() === genre.toLowerCase())),
      );
    }

    if (filters.tags && filters.tags.length > 0) {
      results = results.filter((manga) =>
        filters.tags!.every((tag) => manga.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase()))),
      );
    }

    if (filters.status) {
      results = results.filter((manga) => manga.status === filters.status);
    }

    if (filters.language) {
      results = results.filter((manga) => manga.language === filters.language);
    }

    if (filters.minRating && filters.minRating > 0) {
      results = results.filter((manga) => manga.rating >= filters.minRating);
    }

    if (filters.minPages && filters.minPages > 0) {
      results = results.filter((manga) => manga.totalPages >= filters.minPages);
    }

    if (filters.maxPages && filters.maxPages > 0) {
      results = results.filter((manga) => manga.totalPages <= filters.maxPages);
    }

    // Apply sorting
    const sortBy = filters.sortBy || "popularity";
    const sortOrder = filters.sortOrder || "desc";

    results.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "rating":
          comparison = a.rating - b.rating;
          break;
        case "year":
          comparison = a.year - b.year;
          break;
        case "updated":
          comparison = new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime();
          break;
        case "pages":
          comparison = a.totalPages - b.totalPages;
          break;
        case "popularity":
        default:
          comparison = a.popularity - b.popularity;
          break;
      }

      return sortOrder === "desc" ? -comparison : comparison;
    });

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedResults = results.slice(startIndex, endIndex);

    return {
      data: paginatedResults,
      total: results.length,
      page,
      limit,
      hasMore: endIndex < results.length,
    };
  }

  async getMangaById(id: string): Promise<Manga | null> {
    await this.delay();

    const data = this.mockData.find((item) => item.gallery_id === id);
    return data ? this.convertToManga(data) : null;
  }

  async getMangaChapters(mangaId: string): Promise<Chapter[]> {
    await this.delay();

    const mangaData = this.mockData.find((item) => item.gallery_id === mangaId);
    if (!mangaData) return [];

    const manga = this.convertToManga(mangaData);
    const chapters: Chapter[] = [];

    // Split pages into chapters
    const pagesPerChapter = Math.ceil(mangaData.images.length / manga.totalChapters);

    for (let i = 0; i < manga.totalChapters; i++) {
      const startPage = i * pagesPerChapter;
      const endPage = Math.min(startPage + pagesPerChapter, mangaData.images.length);
      const chapterPages = mangaData.images.slice(startPage, endPage).map((img) => img.url);

      chapters.push({
        id: `${mangaId}-ch${i + 1}`,
        number: i + 1,
        title: `Chapter ${i + 1}`,
        pages: chapterPages,
        releaseDate: new Date(mangaData.timestamp * 1000 - (manga.totalChapters - i) * 86400000)
          .toISOString()
          .split("T")[0],
        mangaId,
      });
    }

    return chapters;
  }

  async getTrendingManga(limit: number = 10): Promise<Manga[]> {
    const response = await this.searchManga({ sortBy: "popularity" }, 1, limit);
    return response.data;
  }

  async getRecentlyUpdated(limit: number = 10): Promise<Manga[]> {
    const response = await this.searchManga({ sortBy: "updated" }, 1, limit);
    return response.data;
  }

  async getPopularGenres(): Promise<string[]> {
    await this.delay(200);

    const genreCounts = new Map<string, number>();

    this.mockData.forEach((data) => {
      data.metadata.tags
        .filter((tag) => tag.category === "genre")
        .forEach((tag) => {
          const genre = this.capitalizeWords(tag.name);
          genreCounts.set(genre, (genreCounts.get(genre) || 0) + 1);
        });
    });

    return Array.from(genreCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([genre]) => genre)
      .slice(0, 12);
  }

  async getAvailableTags(): Promise<string[]> {
    await this.delay(200);

    const allTags = new Set<string>();

    this.mockData.forEach((data) => {
      data.metadata.tags.forEach((tag) => {
        allTags.add(tag.name);
      });
    });

    return Array.from(allTags).sort();
  }

  async getAvailableLanguages(): Promise<string[]> {
    await this.delay(200);

    const languages = new Set<string>();
    this.mockData.forEach((data) => {
      languages.add(data.metadata.language);
    });

    return Array.from(languages).sort();
  }
}

export const mangaApi = new MangaApiService();
