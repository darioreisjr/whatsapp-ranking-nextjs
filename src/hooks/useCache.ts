import { useState, useCallback, useEffect } from 'react';
import { CachedData, RankingData, DateFilter } from '@/types';

const CACHE_KEY = 'whatsapp-ranking-cache';
const CACHE_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 dias

export const useCache = () => {
  const [hasCache, setHasCache] = useState(false);

  const saveToCache = useCallback((
    fileData: File, 
    content: string, 
    ranking: RankingData, 
    filter: DateFilter,
    visibleItems: number
  ) => {
    try {
      const cacheData: CachedData = {
        fileName: fileData.name,
        fileSize: fileData.size,
        fileContent: content,
        rankingData: ranking,
        dateFilter: filter,
        visibleItems,
        timestamp: Date.now()
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
      setHasCache(true);
    } catch (error) {
      console.error('Erro ao salvar cache:', error);
    }
  }, []);

  const loadFromCache = useCallback((): CachedData | null => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;

      const data: CachedData = JSON.parse(cached);
      
      if (Date.now() - data.timestamp > CACHE_EXPIRY) {
        localStorage.removeItem(CACHE_KEY);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Erro ao carregar cache:', error);
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
  }, []);

  const clearCache = useCallback(() => {
    try {
      localStorage.removeItem(CACHE_KEY);
      setHasCache(false);
    } catch (error) {
      console.error('Erro ao limpar cache:', error);
    }
  }, []);

  useEffect(() => {
    const cached = loadFromCache();
    setHasCache(!!cached);
  }, [loadFromCache]);

  return {
    hasCache,
    saveToCache,
    loadFromCache,
    clearCache
  };
};
