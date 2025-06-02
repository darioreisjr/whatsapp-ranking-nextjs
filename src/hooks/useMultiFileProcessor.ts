// src/hooks/useMultiFileProcessor.ts
import { useState, useCallback } from 'react';
import { FileDataset, MultiFileRankingData, RankingData, DateFilter, MergeOptions, MessageCount } from '@/types';
import { processWhatsAppFile } from '@/utils/whatsappParser';
import JSZip from 'jszip';

export interface MultiFileProcessingProgress {
  currentFile: number;
  totalFiles: number;
  fileName: string;
  stage: 'reading' | 'extracting' | 'parsing' | 'merging' | 'complete';
  progress: number; // 0-100
  message: string;
}

export const useMultiFileProcessor = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>('');
  const [progress, setProgress] = useState<MultiFileProcessingProgress>({
    currentFile: 0,
    totalFiles: 0,
    fileName: '',
    stage: 'reading',
    progress: 0,
    message: ''
  });

  const updateProgress = useCallback((
    currentFile: number,
    totalFiles: number,
    fileName: string,
    stage: MultiFileProcessingProgress['stage'],
    progress: number,
    message: string
  ) => {
    setProgress({ currentFile, totalFiles, fileName, stage, progress, message });
  }, []);

  const extractTextFromZip = async (file: File): Promise<string> => {
    const zip = new JSZip();
    const zipContent = await zip.loadAsync(file);
    
    const txtFiles = Object.keys(zipContent.files).filter(
      fileName => fileName.endsWith('.txt') && !zipContent.files[fileName].dir
    );
    
    if (txtFiles.length === 0) {
      throw new Error(`Nenhum arquivo .txt encontrado no ZIP: ${file.name}`);
    }
    
    let targetFile = txtFiles[0];
    const whatsappFile = txtFiles.find(name => 
      name.toLowerCase().includes('chat') || 
      name.toLowerCase().includes('conversa') ||
      name.toLowerCase().includes('whatsapp')
    );
    
    if (whatsappFile) {
      targetFile = whatsappFile;
    }
    
    const fileContent = await zipContent.files[targetFile].async('string');
    
    if (!fileContent.trim()) {
      throw new Error(`O arquivo de chat está vazio: ${file.name}`);
    }
    
    return fileContent;
  };

  const processMultipleFiles = useCallback(async (
    files: FileList | File[],
    filter: DateFilter,
    onSuccess: (result: MultiFileRankingData) => void
  ) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => 
      file.name.toLowerCase().endsWith('.txt') || 
      file.name.toLowerCase().endsWith('.zip')
    );

    if (validFiles.length === 0) {
      setError('Nenhum arquivo válido (.txt ou .zip) encontrado');
      return;
    }

    if (validFiles.length > 10) {
      setError('Máximo de 10 arquivos por vez. Selecione menos arquivos.');
      return;
    }

    setError('');
    setIsProcessing(true);

    try {
      const datasets: FileDataset[] = [];
      
      for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i];
        const isZipFile = file.name.toLowerCase().endsWith('.zip');
        
        updateProgress(i + 1, validFiles.length, file.name, 'reading', 
          (i / validFiles.length) * 100, `Processando ${file.name}...`);

        let fileContent: string;

        if (isZipFile) {
          updateProgress(i + 1, validFiles.length, file.name, 'extracting', 
            (i / validFiles.length) * 100, `Extraindo ${file.name}...`);
          fileContent = await extractTextFromZip(file);
        } else {
          fileContent = await file.text();
        }

        // Valida formato
        if (!fileContent.includes(' - ') || !fileContent.match(/\d{1,2}\/\d{1,2}\/\d{4}/)) {
          console.warn(`Arquivo ${file.name} não parece ser um export válido do WhatsApp`);
          continue;
        }

        updateProgress(i + 1, validFiles.length, file.name, 'parsing', 
          ((i + 0.5) / validFiles.length) * 100, `Analisando mensagens de ${file.name}...`);

        const rankingData = await processWhatsAppFile(fileContent, filter);

        if (rankingData.totalMessages === 0) {
          console.warn(`Nenhuma mensagem encontrada em ${file.name}`);
          continue;
        }

        const dataset: FileDataset = {
          id: `file_${Date.now()}_${i}`,
          fileName: file.name,
          fileSize: file.size,
          fileContent,
          rankingData,
          uploadedAt: Date.now(),
          isActive: true
        };

        datasets.push(dataset);
      }

      if (datasets.length === 0) {
        throw new Error('Nenhum arquivo válido foi processado com sucesso');
      }

      updateProgress(validFiles.length, validFiles.length, '', 'complete', 100, 
        `${datasets.length} arquivo(s) processado(s) com sucesso!`);

      const result: MultiFileRankingData = {
        individual: datasets,
        comparisonMode: datasets.length > 1 ? 'individual' : 'individual',
        totalFiles: datasets.length
      };

      setTimeout(() => {
        onSuccess(result);
      }, 500);

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro inesperado ao processar os arquivos');
      }
      console.error('Erro no processamento múltiplo:', err);
    } finally {
      setTimeout(() => {
        setIsProcessing(false);
        setProgress({
          currentFile: 0,
          totalFiles: 0,
          fileName: '',
          stage: 'reading',
          progress: 0,
          message: ''
        });
      }, 1000);
    }
  }, [updateProgress]);

  const mergeDatasets = useCallback((
    datasets: FileDataset[],
    options: MergeOptions,
    filter: DateFilter
  ): RankingData => {
    const mergedCounts: Record<string, number> = {};
    let totalMessages = 0;
    let filteredMessages = 0;

    datasets.forEach(dataset => {
      const { rankingData, fileName } = dataset;
      
      totalMessages += rankingData.totalMessages;
      filteredMessages += rankingData.filteredMessages;

      rankingData.ranking.forEach(person => {
        let participantName = person.name;

        // Se incluir prefixo do arquivo
        if (options.includeFilePrefix) {
          const filePrefix = fileName.replace(/\.(txt|zip)$/i, '');
          participantName = `${filePrefix}: ${person.name}`;
        }

        // TODO: Implementar lógica de merge de participantes similares
        // if (options.mergeParticipants) {
        //   participantName = mergeSimilarNames(participantName, mergedCounts);
        // }

        mergedCounts[participantName] = (mergedCounts[participantName] || 0) + person.count;
      });
    });

    const ranking: MessageCount[] = Object.entries(mergedCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    return {
      totalMessages,
      filteredMessages,
      ranking,
      dateRange: {
        start: filter.startDate || 'Início',
        end: filter.endDate || 'Fim'
      }
    };
  }, []);

  const clearError = useCallback(() => {
    setError('');
  }, []);

  return {
    isProcessing,
    error,
    progress,
    processMultipleFiles,
    mergeDatasets,
    clearError
  };
};