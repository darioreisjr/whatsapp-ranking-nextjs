import { useState, useCallback } from 'react';
import { RankingData, DateFilter } from '@/types';
import { processWhatsAppFile } from '@/utils/whatsappParser';
import JSZip from 'jszip';

export const useFileProcessor = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>('');

  const extractTextFromZip = async (file: File): Promise<string> => {
    try {
      const zip = new JSZip();
      const zipContent = await zip.loadAsync(file);
      
      // Procura por arquivos .txt no ZIP
      const txtFiles = Object.keys(zipContent.files).filter(
        fileName => fileName.endsWith('.txt') && !zipContent.files[fileName].dir
      );
      
      if (txtFiles.length === 0) {
        throw new Error('Nenhum arquivo .txt encontrado no ZIP. Verifique se é um export válido do WhatsApp.');
      }
      
      // Se há múltiplos arquivos .txt, pega o primeiro ou o que parece ser do WhatsApp
      let targetFile = txtFiles[0];
      
      // Tenta encontrar um arquivo que pareça ser do WhatsApp (contém "Chat" ou similar)
      const whatsappFile = txtFiles.find(name => 
        name.toLowerCase().includes('chat') || 
        name.toLowerCase().includes('conversa') ||
        name.toLowerCase().includes('whatsapp')
      );
      
      if (whatsappFile) {
        targetFile = whatsappFile;
      }
      
      // Extrai o conteúdo do arquivo
      const fileContent = await zipContent.files[targetFile].async('string');
      
      if (!fileContent.trim()) {
        throw new Error('O arquivo de chat está vazio.');
      }
      
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

    try {
      let fileContent: string;
      
      if (isZipFile) {
        // Processa arquivo ZIP
        fileContent = await extractTextFromZip(uploadedFile);
      } else {
        // Processa arquivo TXT diretamente
        fileContent = await uploadedFile.text();
      }
      
      // Valida se o conteúdo parece ser de um chat do WhatsApp
      if (!fileContent.includes(' - ') || !fileContent.match(/\d{1,2}\/\d{1,2}\/\d{4}/)) {
        throw new Error('O arquivo não parece ser um export válido do WhatsApp. Verifique se exportou corretamente.');
      }
      
      const result = await processWhatsAppFile(fileContent, filter);
      
      if (result.totalMessages === 0) {
        throw new Error('Nenhuma mensagem válida encontrada no arquivo. Verifique se é um export do WhatsApp em português.');
      }
      
      onSuccess(result, fileContent);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro inesperado ao processar o arquivo. Verifique se é um arquivo de chat do WhatsApp válido.');
      }
      console.error('Erro ao processar arquivo:', err);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError('');
  }, []);

  return {
    isProcessing,
    error,
    processFile,
    clearError
  };
};