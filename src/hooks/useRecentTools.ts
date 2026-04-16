import { useState, useEffect } from 'react';

interface RecentTool {
  id: string;
  name: string;
  timestamp: number;
}

export function useRecentTools() {
  const [recent, setRecent] = useState<RecentTool[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('recentTools') || '[]';
    setRecent(JSON.parse(stored));
  }, []);

  const addRecent = (toolId: string, toolName: string) => {
    const updated = [
      { id: toolId, name: toolName, timestamp: Date.now() },
      ...recent.filter(t => t.id !== toolId)
    ].slice(0, 5);
    
    setRecent(updated);
    localStorage.setItem('recentTools', JSON.stringify(updated));
  };

  const clearRecent = () => {
    setRecent([]);
    localStorage.removeItem('recentTools');
  };

  return { recent, addRecent, clearRecent };
}
