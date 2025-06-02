// src/components/WhatsAppRanking/index.tsx (Fixed Export)
import React, { useState, useCallback } from 'react';
import { ToggleLeft, ToggleRight, Users, FileText } from 'lucide-react';
import { FileUpload } from './FileUpload';
import { MultiFileUpload } from './MultiFileUpload';
import { DateFilter } from './DateFilter';
import { CacheSection } from './CacheSection';
import { RankingResults } from './RankingResults';
import { MultiFileResults } from './MultiFileResults';
import { Instructions } from './Instructions';
import { useCache } from '@/hooks/useCache';
import { useFileProcessor } from '@/hooks/useFileProcessor';
import { useMultiFileProcessor } from '@/hooks/useMultiFileProcessor';
import { useExport } from '@/hooks/useExport';
import { processWhatsAppFile } from '@/utils/whatsappParser';
import { formatCacheTime } from '@/utils/dateUtils';
import { RankingData, DateFilter as DateFilterType, MultiFileRankingData, FileDataset, MergeOptions } from '@/types';

const WhatsAppRanking: React.FC = () => {
  // Mode selection
  const [mode, setMode] = useState<'single' | 'multiple'>('single');

  // Single file state
  const [file, setFile] = useState<File | null>(null);
  const [rankingData, setRankingData] = useState<RankingData | null>(null);

  // Multiple files state
  const [files, setFiles] = useState<File[]>([]);
  const [multiData, setMultiData] = useState<MultiFileRankingData | null>(null);

  // Common state
  const [dateFilter, setDateFilter] = useState<DateFilterType>({
    startDate: '',
    endDate: ''
  });
  const [isLoadingCache, setIsLoadingCache] = useState(false);

  // Hooks
  const { hasCache, saveToCache, loadFromCache, clearCache } = useCache();
  const { isProcessing: singleProcessing, error: singleError, processFile, clearError } = useFileProcessor();
  const { 
    isProcessing: multiProcessing, 
    error: multiError, 
    progress: multiProgress,
    processMultipleFiles, 
    mergeDatasets,
    clearError: clearMultiError 
  } = useMultiFileProcessor();
  const { isGeneratingPDF, generatePDF, downloadAsJSON } = useExport();

  const isProcessing = singleProcessing || multiProcessing;
  const error = singleError || multiError;

  // Mode switching
  const handleModeSwitch = useCallback(() => {
    const newMode = mode === 'single' ? 'multiple' : 'single';
    setMode(newMode);
    
    // Clear state when switching modes
    setFile(null);
    setFiles([]);
    setRankingData(null);
    setMultiData(null);
    clearError();
    clearMultiError();
  }, [mode, clearError, clearMultiError]);

  // Single file handlers
  const handleSingleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (!uploadedFile) return;

    await processFile(uploadedFile, dateFilter, (result, content) => {
      setFile(uploadedFile);
      setRankingData(result);
      saveToCache(uploadedFile, content, result, dateFilter, 10);
    });
  }, [processFile, dateFilter, saveToCache]);

  const handleSingleDrop = useCallback(async (event: React.DragEvent) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && (droppedFile.name.endsWith('.txt') || droppedFile.name.endsWith('.zip'))) {
      await processFile(droppedFile, dateFilter, (result, content) => {
        setFile(droppedFile);
        setRankingData(result);
        saveToCache(droppedFile, content, result, dateFilter, 10);
      });
    }
  }, [processFile, dateFilter, saveToCache]);

  // Multiple files handlers
  const handleMultiFileUpload = useCallback(async (uploadedFiles: FileList | File[]) => {
    const newFiles = Array.from(uploadedFiles);
    const validFiles = newFiles.filter(f => 
      f.name.toLowerCase().endsWith('.txt') || f.name.toLowerCase().endsWith('.zip')
    );

    if (validFiles.length === 0) return;

    const totalFiles = [...files, ...validFiles];
    if (totalFiles.length > 10) {
      clearMultiError();
      return;
    }

    setFiles(totalFiles);

    await processMultipleFiles(totalFiles, dateFilter, (result) => {
      setMultiData(result);
    });
  }, [files, processMultipleFiles, dateFilter, clearMultiError]);

  const handleMultiDrop = useCallback(async (event: React.DragEvent) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    await handleMultiFileUpload(droppedFiles);
  }, [handleMultiFileUpload]);

  const handleFileRemove = useCallback((index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    
    if (newFiles.length === 0) {
      setMultiData(null);
    } else {
      // Reprocessar arquivos restantes
      processMultipleFiles(newFiles, dateFilter, (result) => {
        setMultiData(result);
      });
    }
  }, [files, processMultipleFiles, dateFilter]);

  const handleClearAllFiles = useCallback(() => {
    setFiles([]);
    setMultiData(null);
    clearMultiError();
  }, [clearMultiError]);

  // Common handlers
  const handleDateChange = useCallback((field: 'startDate' | 'endDate', value: string) => {
    const today = new Date().toISOString().split('T')[0];
    
    if (value > today) return;

    const newFilter = { ...dateFilter, [field]: value };
    
    if (newFilter.startDate && newFilter.endDate && newFilter.startDate > newFilter.endDate) {
      return;
    }

    clearError();
    clearMultiError();
    setDateFilter(newFilter);
  }, [dateFilter, clearError, clearMultiError]);

  const handleApplyFilter = useCallback(async () => {
    if (mode === 'single' && file) {
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
    } else if (mode === 'multiple' && files.length > 0) {
      await processMultipleFiles(files, dateFilter, (result) => {
        setMultiData(result);
      });
    }
  }, [mode, file, files, processFile, processMultipleFiles, dateFilter, loadFromCache, saveToCache]);

  const handleClearFilter = useCallback(async () => {
    const clearedFilter = { startDate: '', endDate: '' };
    setDateFilter(clearedFilter);
    
    if (mode === 'single' && file) {
      await processFile(file, clearedFilter, (result, content) => {
        setRankingData(result);
        saveToCache(file, content, result, clearedFilter, 10);
      });
    } else if (mode === 'multiple' && files.length > 0) {
      await processMultipleFiles(files, clearedFilter, (result) => {
        setMultiData(result);
      });
    }
  }, [mode, file, files, processFile, processMultipleFiles, saveToCache]);

  // Multi-file specific handlers
  const handleMergeDatasets = useCallback((options: MergeOptions) => {
    if (!multiData) return;
    
    const mergedData = mergeDatasets(multiData.individual, options, dateFilter);
    setMultiData(prev => prev ? { ...prev, merged: mergedData } : null);
  }, [multiData, mergeDatasets, dateFilter]);

  // Cache handlers
  const restoreFromCache = useCallback(async () => {
    setIsLoadingCache(true);
    try {
      const cached = loadFromCache();
      if (!cached) return;

      const blob = new Blob([cached.fileContent], { type: 'text/plain' });
      const cachedFile = new File([blob], cached.fileName, { type: 'text/plain' });

      setFile(cachedFile);
      setRankingData(cached.rankingData);
      setDateFilter(cached.dateFilter);
      setMode('single'); // Cache is always single file for now

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
    setFiles([]);
    setRankingData(null);
    setMultiData(null);
    setDateFilter({ startDate: '', endDate: '' });
  }, [clearCache]);

  const getCacheTime = useCallback((): string => {
    const cached = loadFromCache();
    if (!cached) return '';
    return formatCacheTime(cached.timestamp);
  }, [loadFromCache]);

  // Export handlers
  const handleGeneratePDF = useCallback(async () => {
    if (mode === 'single' && rankingData) {
      await generatePDF(rankingData, file, dateFilter, clearError);
    }
  }, [mode, rankingData, file, dateFilter, generatePDF, clearError]);

  const handleDownloadJSON = useCallback(() => {
    if (mode === 'single' && rankingData) {
      downloadAsJSON(rankingData, file, dateFilter);
    }
  }, [mode, rankingData, file, dateFilter, downloadAsJSON]);

  const handleExportIndividual = useCallback((dataset: FileDataset) => {
    // TODO: Implement individual export for multi-file
    console.log('Export individual:', dataset);
  }, []);

  const handleExportMerged = useCallback(() => {
    // TODO: Implement merged export
    console.log('Export merged');
  }, []);

  const handleExportComparison = useCallback(() => {
    // TODO: Implement comparison export
    console.log('Export comparison');
  }, []);

  const shouldShowDateFilter = (mode === 'single' && file) || (mode === 'multiple' && files.length > 0);
  const shouldShowResults = (mode === 'single' && rankingData) || (mode === 'multiple' && multiData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Análise de Mensagens WhatsApp
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Faça upload dos seus arquivos de chat do WhatsApp para ver estatísticas detalhadas
          </p>

          {/* Mode Toggle */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-3 bg-white rounded-lg p-2 shadow-lg border border-gray-200">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                mode === 'single' ? 'bg-blue-100 text-blue-700' : 'text-gray-600'
              }`}>
                <FileText className="w-4 h-4" />
                <span className="font-medium">Arquivo Único</span>
              </div>
              
              <button
                onClick={handleModeSwitch}
                className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                title={`Alternar para ${mode === 'single' ? 'múltiplos arquivos' : 'arquivo único'}`}
              >
                {mode === 'single' ? (
                  <ToggleLeft className="w-6 h-6 text-gray-400" />
                ) : (
                  <ToggleRight className="w-6 h-6 text-blue-600" />
                )}
              </button>
              
              <div className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                mode === 'multiple' ? 'bg-blue-100 text-blue-700' : 'text-gray-600'
              }`}>
                <Users className="w-4 h-4" />
                <span className="font-medium">Múltiplos Grupos</span>
              </div>
            </div>
          </div>
        </div>

        {/* File Upload */}
        {mode === 'single' ? (
          <FileUpload
            file={file}
            isProcessing={singleProcessing}
            error={singleError}
            onFileUpload={handleSingleFileUpload}
            onDrop={handleSingleDrop}
          />
        ) : (
          <MultiFileUpload
            files={files}
            isProcessing={multiProcessing}
            error={multiError}
            progress={multiProgress}
            onFilesUpload={handleMultiFileUpload}
            onFileRemove={handleFileRemove}
            onDrop={handleMultiDrop}
            onClearAll={handleClearAllFiles}
          />
        )}

        {/* Cache Section (only for single mode) */}
        {mode === 'single' && (
          <CacheSection
            hasCache={hasCache}
            rankingData={rankingData}
            isLoadingCache={isLoadingCache}
            getCacheTime={getCacheTime}
            onRestoreCache={restoreFromCache}
            onClearCache={handleClearCache}
          />
        )}

        {/* Date Filter */}
        {shouldShowDateFilter && (
          <DateFilter
            file={mode === 'single' ? file : (files.length > 0 ? files[0] : null)}
            dateFilter={dateFilter}
            isProcessing={isProcessing}
            onDateChange={handleDateChange}
            onApplyFilter={handleApplyFilter}
            onClearFilter={handleClearFilter}
          />
        )}

        {/* Results */}
        {shouldShowResults && (
          <>
            {mode === 'single' && rankingData ? (
              <RankingResults
                rankingData={rankingData}
                dateFilter={dateFilter}
                hasCache={hasCache}
                isGeneratingPDF={isGeneratingPDF}
                onGeneratePDF={handleGeneratePDF}
                onDownloadJSON={handleDownloadJSON}
              />
            ) : mode === 'multiple' && multiData ? (
              <MultiFileResults
                multiData={multiData}
                dateFilter={dateFilter}
                onMergeDatasets={handleMergeDatasets}
                onExportIndividual={handleExportIndividual}
                onExportMerged={handleExportMerged}
                onExportComparison={handleExportComparison}
              />
            ) : null}
          </>
        )}

        {/* Instructions */}
        <Instructions />
      </div>
    </div>
  );
};

// Export explícito
export { WhatsAppRanking };

// Export default também
export default WhatsAppRanking;