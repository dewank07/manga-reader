import { Manga, Chapter } from '../types/manga';

export const mockMangas: Manga[] = [
  {
    id: '1',
    title: 'Shadow Chronicles',
    author: 'Akira Tanaka',
    description: 'A thrilling tale of a young ninja discovering ancient powers in modern Tokyo. When darkness threatens the world, only those who walk in shadows can bring light.',
    coverImage: 'https://images.pexels.com/photos/159533/book-reading-read-literature-159533.jpeg?auto=compress&cs=tinysrgb&w=400',
    genres: ['Action', 'Supernatural', 'Drama'],
    status: 'ongoing',
    rating: 4.8,
    year: 2023,
    totalChapters: 45,
    lastUpdated: '2024-01-15',
    popularity: 9500
  },
  {
    id: '2',
    title: 'Neon Dreams',
    author: 'Yuki Sato',
    description: 'In a cyberpunk future, a hacker discovers a conspiracy that goes to the very heart of the digital world. Reality and virtual blur as the truth unfolds.',
    coverImage: 'https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?auto=compress&cs=tinysrgb&w=400',
    genres: ['Sci-Fi', 'Thriller', 'Romance'],
    status: 'ongoing',
    rating: 4.6,
    year: 2022,
    totalChapters: 67,
    lastUpdated: '2024-01-12',
    popularity: 8200
  },
  {
    id: '3',
    title: 'Cherry Blossom Academy',
    author: 'Mei Yoshida',
    description: 'A heartwarming slice-of-life story about friendship, love, and growing up in a prestigious academy surrounded by cherry blossoms.',
    coverImage: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
    genres: ['Romance', 'Slice of Life', 'School'],
    status: 'completed',
    rating: 4.9,
    year: 2021,
    totalChapters: 120,
    lastUpdated: '2023-12-20',
    popularity: 12000
  },
  {
    id: '4',
    title: 'Dragon\'s Legacy',
    author: 'Hiroshi Nakamura',
    description: 'An epic fantasy adventure following a young dragon rider as they uncover ancient secrets and battle against the forces of darkness.',
    coverImage: 'https://images.pexels.com/photos/1370298/pexels-photo-1370298.jpeg?auto=compress&cs=tinysrgb&w=400',
    genres: ['Fantasy', 'Adventure', 'Action'],
    status: 'ongoing',
    rating: 4.7,
    year: 2023,
    totalChapters: 89,
    lastUpdated: '2024-01-10',
    popularity: 7800
  },
  {
    id: '5',
    title: 'Mystery Café',
    author: 'Kana Watanabe',
    description: 'A cozy mystery series set in a small café where every customer brings a new puzzle to solve. Join the barista detective on their adventures.',
    coverImage: 'https://images.pexels.com/photos/1600727/pexels-photo-1600727.jpeg?auto=compress&cs=tinysrgb&w=400',
    genres: ['Mystery', 'Slice of Life', 'Comedy'],
    status: 'ongoing',
    rating: 4.5,
    year: 2022,
    totalChapters: 34,
    lastUpdated: '2024-01-08',
    popularity: 6500
  },
  {
    id: '6',
    title: 'Space Pirates',
    author: 'Takeshi Mori',
    description: 'Join Captain Luna and her crew as they navigate the galaxy, fighting space pirates and uncovering cosmic mysteries in this action-packed adventure.',
    coverImage: 'https://images.pexels.com/photos/998641/pexels-photo-998641.jpeg?auto=compress&cs=tinysrgb&w=400',
    genres: ['Sci-Fi', 'Action', 'Adventure'],
    status: 'ongoing',
    rating: 4.4,
    year: 2023,
    totalChapters: 56,
    lastUpdated: '2024-01-05',
    popularity: 5900
  }
];

export const mockChapters: Record<string, Chapter[]> = {
  '1': [
    {
      id: 'ch1-1',
      number: 1,
      title: 'The Awakening',
      pages: [
        'https://images.pexels.com/photos/159533/book-reading-read-literature-159533.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      releaseDate: '2023-01-15'
    },
    {
      id: 'ch1-2',
      number: 2,
      title: 'First Steps',
      pages: [
        'https://images.pexels.com/photos/1370298/pexels-photo-1370298.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1600727/pexels-photo-1600727.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/998641/pexels-photo-998641.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      releaseDate: '2023-01-22'
    }
  ]
};

export const genres = [
  'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror',
  'Mystery', 'Romance', 'Sci-Fi', 'Slice of Life', 'Sports', 'Supernatural',
  'Thriller', 'School', 'Historical', 'Psychological'
];
