import { useState, useEffect } from 'react';

interface ToolUsage {
  id: string;
  name: string;
  usageCount: number;
  lastUsed: number;
}

export function useTrending() {
  const [trending, setTrending] = useState<ToolUsage[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('toolUsageStats') || '[]';
    const stats: ToolUsage[] = JSON.parse(stored);
    // Sort by usage count (descending) and then by last used date
    const sorted = stats.sort((a, b) => {
      if (b.usageCount !== a.usageCount) {
        return b.usageCount - a.usageCount;
      }
      return b.lastUsed - a.lastUsed;
    });
    setTrending(sorted.slice(0, 10)); // Keep top 10
  }, []);

  const trackToolUsage = (toolId: string, toolName: string) => {
    const stored = localStorage.getItem('toolUsageStats') || '[]';
    const stats: ToolUsage[] = JSON.parse(stored);
    
    const existingIndex = stats.findIndex(t => t.id === toolId);
    if (existingIndex >= 0) {
      stats[existingIndex].usageCount += 1;
      stats[existingIndex].lastUsed = Date.now();
    } else {
      stats.push({
        id: toolId,
        name: toolName,
        usageCount: 1,
        lastUsed: Date.now(),
      });
    }
    
    // Sort and keep top 50 in storage
    stats.sort((a, b) => b.usageCount - a.usageCount);
    const toStore = stats.slice(0, 50);
    
    localStorage.setItem('toolUsageStats', JSON.stringify(toStore));
    
    // Update component state with top 10
    setTrending(toStore.slice(0, 10));
  };

  return { trending, trackToolUsage };
}
