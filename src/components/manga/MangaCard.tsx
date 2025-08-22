import React from "react";
import { Star, Eye, Clock, BookOpen, Globe } from "lucide-react";
import { Manga } from "../../types/manga";
import Card from "../ui/Card";

interface MangaCardProps {
  manga: Manga;
  onClick: () => void;
  showProgress?: boolean;
  progress?: number;
}

export default function MangaCard({ manga, onClick, showProgress = false, progress = 0 }: MangaCardProps) {
  return (
    <Card onClick={onClick} className='overflow-hidden group hover:scale-105 transition-all duration-300'>
      <div className='relative'>
        <img
          src={manga.coverImage}
          alt={manga.title}
          className='w-full h-48 sm:h-64 object-cover group-hover:scale-110 transition-transform duration-500'
          loading='lazy'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent' />

        {showProgress && progress > 0 && (
          <div className='absolute bottom-2 left-2 right-2'>
            <div className='bg-black/50 rounded-full h-1.5'>
              <div
                className='bg-purple-500 h-1.5 rounded-full transition-all duration-300'
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className='text-white text-xs mt-1 text-center'>{Math.round(progress)}% complete</div>
          </div>
        )}

        <div className='absolute top-2 right-2 bg-black/70 rounded-full px-2 py-1 flex items-center space-x-1'>
          <Star className='w-3 h-3 text-yellow-400 fill-current' />
          <span className='text-white text-xs font-medium'>{manga.rating}</span>
        </div>

        <div className='absolute top-2 left-2 bg-black/70 rounded-full px-2 py-1 flex items-center space-x-1'>
          <Globe className='w-3 h-3 text-blue-400' />
          <span className='text-white text-xs font-medium capitalize'>{manga.language}</span>
        </div>
      </div>

      <div className='p-4'>
        <h3 className='text-white font-semibold text-lg mb-1 line-clamp-2 group-hover:text-purple-300 transition-colors'>
          {manga.title}
        </h3>
        <p className='text-slate-400 text-sm mb-2'>{manga.author}</p>

        <div className='flex flex-wrap gap-1 mb-3'>
          {manga.genres.slice(0, 3).map((genre) => (
            <span
              key={genre}
              className='bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded-full hover:bg-purple-600 hover:text-white transition-colors'
            >
              {genre}
            </span>
          ))}
          {manga.genres.length > 3 && (
            <span className='text-slate-500 text-xs px-2 py-1'>+{manga.genres.length - 3} more</span>
          )}
        </div>

        <div className='flex items-center justify-between text-xs text-slate-400'>
          <div className='flex items-center space-x-1'>
            <Eye className='w-3 h-3' />
            <span>{manga.popularity.toLocaleString()}</span>
          </div>
          <div className='flex items-center space-x-1'>
            <BookOpen className='w-3 h-3' />
            <span>{manga.totalPages} pages</span>
          </div>
        </div>

        <div className='flex items-center justify-between text-xs text-slate-400 mt-2'>
          <div className='flex items-center space-x-1'>
            <Clock className='w-3 h-3' />
            <span>{manga.totalChapters} chapters</span>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              manga.status === "completed"
                ? "bg-green-600/20 text-green-400"
                : manga.status === "ongoing"
                ? "bg-blue-600/20 text-blue-400"
                : "bg-yellow-600/20 text-yellow-400"
            }`}
          >
            {manga.status}
          </span>
        </div>
      </div>
    </Card>
  );
}
