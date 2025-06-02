// src/hooks/useFileProcessor.ts (Enhanced)
import { useState, useCallback } from 'react';
import { RankingData, DateFilter } from '@/types';
import { processWhatsAppFile } from '@/utils/whatsappParser';
import JSZip from 'jszip';

export interface ProcessingProgress {
  stage: 'reading' | 'extracting' | 'parsing' | 'complete';
  progress: number; // 0-100
  message: string;
}

export const useFileProcessor = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>('');
  const [progress, setProgress] = useState<ProcessingProgress>({
    stage: 'reading',
    progress: 0,
    message: ''
  });

  const updateProgress = useCallback((stage: ProcessingProgress['stage'], progress: number, message: string) => {
    setProgress({ stage, progress, message });
  }, []);

  const extractTextFromZip = async (file: File): Promise<string> => {
    try {
      updateProgress('reading', 10, 'Lendo arquivo ZIP...');
      await new Promise(resolve => setTimeout(resolve, 100)); // Small delay for UX

      const zip = new JSZip();
      updateProgress('extracting', 30, 'Extraindo conteúdo...');
      
      const zipContent = await zip.loadAsync(file);
      updateProgress('extracting', 50, 'Localizando arquivo de chat...');
      
      // Procura por arquivos .txt no ZIP
      const txtFiles = Object.keys(zipContent.files).filter(
        fileName => fileName.endsWith('.txt') && !zipContent.files[fileName].dir
      );
      
      if (txtFiles.length === 0) {
        throw new Error('Nenhum arquivo .txt encontrado no ZIP. Verifique se é um export válido do WhatsApp.');
      }
      
      updateProgress('extracting', 70, 'Processando arquivo encontrado...');
      
      // Se há múltiplos arquivos .txt, pega o primeiro ou o que parece ser do WhatsApp
      let targetFile = txtFiles[0];
      
      // Tenta encontrar um arquivo que pareça ser do WhatsApp
      const whatsappFile = txtFiles.find(name => 
        name.toLowerCase().includes('chat') || 
        name.toLowerCase().includes('conversa') ||
        name.toLowerCase().includes('whatsapp')
      );
      
      if (whatsappFile) {
        targetFile = whatsappFile;
      }
      
      updateProgress('extracting', 90, 'Extraindo conteúdo do chat...');
      
      // Extrai o conteúdo do arquivo
      const fileContent = await zipContent.files[targetFile].async('string');
      
      if (!fileContent.trim()) {
        throw new Error('O arquivo de chat está vazio.');
      }
      
      updateProgress('extracting', 100, 'Extração concluída!');
      return fileContent;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(`Erro ao extrair arquivo ZIP: ${err.message}`);
      }
      throw new Error('Erro desconhecido ao processar arquivo ZIP');
    }
  };

  const processFile = useCallback(async (
    uploadedFile: File, 
    filter: DateFilter,
    onSuccess: (result: RankingData, content: string) => void
  ) => {
    const isZipFile = uploadedFile.name.toLowerCase().endsWith('.zip');
    const isTxtFile = uploadedFile.name.toLowerCase().endsWith('.txt');
    
    if (!isZipFile && !isTxtFile) {
      setError('Por favor, selecione um arquivo .txt ou .zip do WhatsApp');
      return;
    }

    setError('');
    setIsProcessing(true);
    setProgress({ stage: 'reading', progress: 0, message: 'Iniciando processamento...' });

    try {
      let fileContent: string;
      
      if (isZipFile) {
        // Processa arquivo ZIP com progresso
        fileContent = await extractTextFromZip(uploadedFile);
      } else {
        // Processa arquivo TXT diretamente
        updateProgress('reading', 20, 'Lendo arquivo TXT...');
        await new Promise(resolve => setTimeout(resolve, 200)); // UX delay
        
        fileContent = await uploadedFile.text();
        updateProgress('reading', 60, 'Arquivo carregado com sucesso!');
      }
      
      // Valida se o conteúdo parece ser de um chat do WhatsApp
      updateProgress('parsing', 70, 'Validando formato do arquivo...');
      await new Promise(resolve => setTimeout(resolve, 150)); // UX delay
      
      if (!fileContent.includes(' - ') || !fileContent.match(/\d{1,2}\/\d{1,2}\/\d{4}/)) {
        throw new Error('O arquivo não parece ser um export válido do WhatsApp. Verifique se exportou corretamente.');
      }
      
      updateProgress('parsing', 85, 'Processando mensagens...');
      await new Promise(resolve => setTimeout(resolve, 200)); // UX delay
      
      const result = await processWhatsAppFile(fileContent, filter);
      
      if (result.totalMessages === 0) {
        throw new Error('Nenhuma mensagem válida encontrada no arquivo. Verifique se é um export do WhatsApp em português.');
      }
      
      updateProgress('complete', 100, 'Processamento concluído!');
      
      // Small delay to show completion state
      setTimeout(() => {
        onSuccess(result, fileContent);
      }, 500);
      
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro inesperado ao processar o arquivo. Verifique se é um arquivo de chat do WhatsApp válido.');
      }
      console.error('Erro ao processar arquivo:', err);
    } finally {
      setTimeout(() => {
        setIsProcessing(false);
        setProgress({ stage: 'reading', progress: 0, message: '' });
      }, 1000);
    }
  }, [updateProgress]);

  const clearError = useCallback(() => {
    setError('');
  }, []);

  const resetProgress = useCallback(() => {
    setProgress({ stage: 'reading', progress: 0, message: '' });
  }, []);

  return {
    isProcessing,
    error,
    progress,
    processFile,
    clearError,
    resetProgress
  };
};