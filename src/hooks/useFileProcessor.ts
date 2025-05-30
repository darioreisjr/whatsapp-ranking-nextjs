import { useState, useCallback } from 'react';
import { RankingData, DateFilter } from '@/types';
import { processWhatsAppFile } from '@/utils/whatsappParser';

export const useFileProcessor = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>('');

  const processFile = useCallback(async (
    uploadedFile: File, 
    filter: DateFilter,
    onSuccess: (result: RankingData, content: string) => void
  ) => {
    if (!uploadedFile.name.endsWith('.txt')) {
      setError('Por favor, selecione um arquivo .txt');
      return;
    }

    setError('');
    setIsProcessing(true);

    try {
      const fileContent = await uploadedFile.text();
      const result = await processWhatsAppFile(fileContent, filter);
      onSuccess(result, fileContent);
    } catch (err) {
      setError('Erro ao processar o arquivo. Verifique se é um arquivo de chat do WhatsApp válido.');
      console.error(err);
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
