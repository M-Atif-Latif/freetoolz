import { useState, useEffect } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    const stored = localStorage.getItem('favoriteTools') || '[]';
    setFavorites(new Set(JSON.parse(stored)));
  }, []);

  const toggleFavorite = (toolId: string) => {
    const updated = new Set(favorites);
    if (updated.has(toolId)) {
      updated.delete(toolId);
    } else {
      updated.add(toolId);
    }
    setFavorites(updated);
    localStorage.setItem('favoriteTools', JSON.stringify(Array.from(updated)));
  };

  return { favorites, toggleFavorite, isFavorited: (id: string) => favorites.has(id) };
}
