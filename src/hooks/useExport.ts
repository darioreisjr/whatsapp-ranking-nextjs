import { useState, useCallback } from 'react';
import { RankingData, DateFilter } from '@/types';
import { generatePDFContent, generateJSONData } from '@/utils/exportUtils';

export const useExport = () => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const generatePDF = useCallback(async (
    rankingData: RankingData,
    file: File | null,
    dateFilter: DateFilter,
    onError: (message: string) => void
  ) => {
    setIsGeneratingPDF(true);
    
    try {
      const pdfContent = generatePDFContent(rankingData, file, dateFilter);

      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        onError('Bloqueador de pop-up ativo. Permita pop-ups para baixar o PDF.');
        return;
      }

      printWindow.document.write(pdfContent);
      printWindow.document.close();
      
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.focus();
          printWindow.print();
          
          setTimeout(() => {
            printWindow.close();
          }, 1000);
        }, 500);
      };

    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      onError('Erro ao gerar PDF. Tente novamente.');
    } finally {
      setTimeout(() => {
        setIsGeneratingPDF(false);
      }, 2000);
    }
  }, []);

  const downloadAsJSON = useCallback((
    rankingData: RankingData,
    file: File | null,
    dateFilter: DateFilter
  ) => {
    const data = generateJSONData(rankingData, file, dateFilter);

    const blob = new Blob([JSON.stringify(data, null, 2)], { 
      type: 'application/json' 
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `whatsapp-ranking-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  return {
    isGeneratingPDF,
    generatePDF,
    downloadAsJSON
  };
};
