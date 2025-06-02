// src/hooks/useCache.ts (Enhanced for Multiple Files)
import { useState, useCallback, useEffect } from 'react';
import { CachedData, RankingData, DateFilter, MultiFileCachedData, FileDataset, MergeOptions } from '@/types';

const CACHE_KEY = 'whatsapp-ranking-cache';
const MULTI_CACHE_KEY = 'whatsapp-ranking-multi-cache';
const CACHE_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 dias
const CACHE_VERSION = '2.0'; // Para migração de cache

export const useCache = () => {
  const [hasCache, setHasCache] = useState(false);
  const [hasMultiCache, setHasMultiCache] = useState(false);

  // Single file cache (legacy compatibility)
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

  // Multi-file cache
  const saveMultiToCache = useCallback((
    datasets: FileDataset[],
    mergedData: RankingData | undefined,
    mergeOptions: MergeOptions,
    filter: DateFilter
  ) => {
    try {
      const cacheData: MultiFileCachedData = {
        datasets,
        mergedData,
        mergeOptions,
        dateFilter: filter,
        timestamp: Date.now(),
        version: CACHE_VERSION
      };
      
      localStorage.setItem(MULTI_CACHE_KEY, JSON.stringify(cacheData));
      setHasMultiCache(true);
    } catch (error) {
      console.error('Erro ao salvar cache múltiplo:', error);
      // Se der erro de espaço, tenta limpar dados antigos
      try {
        localStorage.removeItem(CACHE_KEY); // Remove cache single
        localStorage.setItem(MULTI_CACHE_KEY, JSON.stringify(cacheData));
        setHasMultiCache(true);
      } catch (secondError) {
        console.error('Erro crítico ao salvar cache:', secondError);
      }
    }
  }, []);

  const loadMultiFromCache = useCallback((): MultiFileCachedData | null => {
    try {
      const cached = localStorage.getItem(MULTI_CACHE_KEY);
      if (!cached) return null;

      const data: MultiFileCachedData = JSON.parse(cached);
      
      // Verifica versão do cache
      if (data.version !== CACHE_VERSION) {
        localStorage.removeItem(MULTI_CACHE_KEY);
        return null;
      }
      
      if (Date.now() - data.timestamp > CACHE_EXPIRY) {
        localStorage.removeItem(MULTI_CACHE_KEY);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Erro ao carregar cache múltiplo:', error);
      localStorage.removeItem(MULTI_CACHE_KEY);
      return null;
    }
  }, []);

  const clearCache = useCallback(() => {
    try {
      localStorage.removeItem(CACHE_KEY);
      localStorage.removeItem(MULTI_CACHE_KEY);
      setHasCache(false);
      setHasMultiCache(false);
    } catch (error) {
      console.error('Erro ao limpar cache:', error);
    }
  }, []);

  const clearSingleCache = useCallback(() => {
    try {
      localStorage.removeItem(CACHE_KEY);
      setHasCache(false);
    } catch (error) {
      console.error('Erro ao limpar cache único:', error);
    }
  }, []);

  const clearMultiCache = useCallback(() => {
    try {
      localStorage.removeItem(MULTI_CACHE_KEY);
      setHasMultiCache(false);
    } catch (error) {
      console.error('Erro ao limpar cache múltiplo:', error);
    }
  }, []);

  // Calcula tamanho do cache
  const getCacheSize = useCallback((): { single: number; multi: number; total: number } => {
    try {
      const singleCache = localStorage.getItem(CACHE_KEY);
      const multiCache = localStorage.getItem(MULTI_CACHE_KEY);
      
      const singleSize = singleCache ? new Blob([singleCache]).size : 0;
      const multiSize = multiCache ? new Blob([multiCache]).size : 0;
      
      return {
        single: singleSize,
        multi: multiSize,
        total: singleSize + multiSize
      };
    } catch (error) {
      return { single: 0, multi: 0, total: 0 };
    }
  }, []);

  // Formata tamanho em bytes para string legível
  const formatCacheSize = useCallback((bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }, []);

  // Migra cache antigo se necessário
  const migrateLegacyCache = useCallback(() => {
    try {
      const oldCache = loadFromCache();
      if (oldCache && !hasMultiCache) {
        // Converte cache único para formato múltiplo se necessário
        console.log('Cache único detectado, mantendo compatibilidade');
      }
    } catch (error) {
      console.error('Erro na migração de cache:', error);
    }
  }, [loadFromCache, hasMultiCache]);

  useEffect(() => {
    const singleCached = loadFromCache();
    const multiCached = loadMultiFromCache();
    
    setHasCache(!!singleCached);
    setHasMultiCache(!!multiCached);
    
    // Executa migração se necessário
    migrateLegacyCache();
  }, [loadFromCache, loadMultiFromCache, migrateLegacyCache]);

  return {
    // Single file cache (legacy)
    hasCache,
    saveToCache,
    loadFromCache,
    clearSingleCache,
    
    // Multi file cache
    hasMultiCache,
    saveMultiToCache,
    loadMultiFromCache,
    clearMultiCache,
    
    // General
    clearCache,
    getCacheSize,
    formatCacheSize
  };
};