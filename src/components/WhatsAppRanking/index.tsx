import React, { useState, useCallback } from 'react';
import { FileUpload } from './FileUpload';
import { DateFilter } from './DateFilter';
import { CacheSection } from './CacheSection';
import { RankingResults } from './RankingResults';
import { Instructions } from './Instructions';
import { useCache } from '@/hooks/useCache';
import { useFileProcessor } from '@/hooks/useFileProcessor';
import { useExport } from '@/hooks/useExport';
import { processWhatsAppFile } from '@/utils/whatsappParser';
import { formatCacheTime } from '@/utils/dateUtils';
import { RankingData, DateFilter as DateFilterType } from '@/types';

export const WhatsAppRanking: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [rankingData, setRankingData] = useState<RankingData | null>(null);
  const [dateFilter, setDateFilter] = useState<DateFilterType>({
    startDate: '',
    endDate: ''
  });
  const [isLoadingCache, setIsLoadingCache] = useState(false);

  const { hasCache, saveToCache, loadFromCache, clearCache } = useCache();
  const { isProcessing, error, processFile, clearError } = useFileProcessor();
  const { isGeneratingPDF, generatePDF, downloadAsJSON } = useExport();

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (!uploadedFile) return;

    await processFile(uploadedFile, dateFilter, (result, content) => {
      setFile(uploadedFile);
      setRankingData(result);
      saveToCache(uploadedFile, content, result, dateFilter, 10);
    });
  }, [processFile, dateFilter, saveToCache]);

  const handleDrop = useCallback(async (event: React.DragEvent) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && droppedFile.name.endsWith('.txt')) {
      await processFile(droppedFile, dateFilter, (result, content) => {
        setFile(droppedFile);
        setRankingData(result);
        saveToCache(droppedFile, content, result, dateFilter, 10);
      });
    }
  }, [processFile, dateFilter, saveToCache]);

  const handleDateChange = useCallback((field: 'startDate' | 'endDate', value: string) => {
    const today = new Date().toISOString().split('T')[0];
    
    if (value > today) {
      return;
    }

    const newFilter = { ...dateFilter, [field]: value };
    
    if (newFilter.startDate && newFilter.endDate && newFilter.startDate > newFilter.endDate) {
      return;
    }

    clearError();
    setDateFilter(newFilter);
  }, [dateFilter, clearError]);

  const handleApplyFilter = useCallback(async () => {
    if (!file) return;
    
    const cached = loadFromCache();
    if (cached) {
      try {
        const result = await processWhatsAppFile(cached.fileContent, dateFilter);
        setRankingData(result);
        
        const blob = new Blob([cached.fileContent], { type: 'text/plain' });
        const cachedFile = new File([blob], cached.fileName, { type: 'text/plain' });
        saveToCache(cachedFile, cached.fileContent, result, dateFilter, 10);
      } catch (error) {
        console.error('Erro ao aplicar filtro:', error);
        await processFile(file, dateFilter, (result, content) => {
          setRankingData(result);
          saveToCache(file, content, result, dateFilter, 10);
        });
      }
    } else {
      await processFile(file, dateFilter, (result, content) => {
        setRankingData(result);
        saveToCache(file, content, result, dateFilter, 10);
      });
    }
  }, [file, processFile, dateFilter, loadFromCache, saveToCache]);

  const handleClearFilter = useCallback(async () => {
    const clearedFilter = { startDate: '', endDate: '' };
    setDateFilter(clearedFilter);
    if (file) {
      await processFile(file, clearedFilter, (result, content) => {
        setRankingData(result);
        saveToCache(file, content, result, clearedFilter, 10);
      });
    }
  }, [file, processFile, saveToCache]);

  const restoreFromCache = useCallback(async () => {
    setIsLoadingCache(true);
    try {
      const cached = loadFromCache();
      if (!cached) {
        return;
      }

      const blob = new Blob([cached.fileContent], { type: 'text/plain' });
      const cachedFile = new File([blob], cached.fileName, { type: 'text/plain' });

      setFile(cachedFile);
      setRankingData(cached.rankingData);
      setDateFilter(cached.dateFilter);

      setTimeout(() => {
        setIsLoadingCache(false);
      }, 800);
    } catch (error) {
      console.error('Erro ao restaurar cache:', error);
      setIsLoadingCache(false);
      clearCache();
    }
  }, [loadFromCache, clearCache]);

  const handleClearCache = useCallback(() => {
    clearCache();
    setFile(null);
    setRankingData(null);
    setDateFilter({ startDate: '', endDate: '' });
  }, [clearCache]);

  const getCacheTime = useCallback((): string => {
    const cached = loadFromCache();
    if (!cached) return '';
    return formatCacheTime(cached.timestamp);
  }, [loadFromCache]);

  const handleGeneratePDF = useCallback(async () => {
    if (!rankingData) return;
    await generatePDF(rankingData, file, dateFilter, clearError);
  }, [rankingData, file, dateFilter, generatePDF, clearError]);

  const handleDownloadJSON = useCallback(() => {
    if (!rankingData) return;
    downloadAsJSON(rankingData, file, dateFilter);
  }, [rankingData, file, dateFilter, downloadAsJSON]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Análise de Mensagens WhatsApp
          </h1>
          <p className="text-gray-600 text-lg">
            Faça upload do seu arquivo de chat do WhatsApp para ver estatísticas detalhadas
          </p>
        </div>

        {/* File Upload */}
        <FileUpload
          file={file}
          isProcessing={isProcessing}
          error={error}
          onFileUpload={handleFileUpload}
          onDrop={handleDrop}
        />

        {/* Cache Section */}
        <CacheSection
          hasCache={hasCache}
          rankingData={rankingData}
          isLoadingCache={isLoadingCache}
          getCacheTime={getCacheTime}
          onRestoreCache={restoreFromCache}
          onClearCache={handleClearCache}
        />

        {/* Date Filter */}
        <DateFilter
          file={file}
          dateFilter={dateFilter}
          isProcessing={isProcessing}
          onDateChange={handleDateChange}
          onApplyFilter={handleApplyFilter}
          onClearFilter={handleClearFilter}
        />

        {/* Results */}
        {rankingData && (
          <RankingResults
            rankingData={rankingData}
            dateFilter={dateFilter}
            hasCache={hasCache}
            isGeneratingPDF={isGeneratingPDF}
            onGeneratePDF={handleGeneratePDF}
            onDownloadJSON={handleDownloadJSON}
          />
        )}

        {/* Instructions */}
        <Instructions />
      </div>
    </div>
  );
};