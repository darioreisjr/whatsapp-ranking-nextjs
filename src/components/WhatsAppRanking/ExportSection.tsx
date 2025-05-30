import React from 'react';
import { Download, FileText, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ExportSectionProps {
  isGeneratingPDF: boolean;
  onGeneratePDF: () => void;
  onDownloadJSON: () => void;
}

export const ExportSection: React.FC<ExportSectionProps> = ({
  isGeneratingPDF,
  onGeneratePDF,
  onDownloadJSON
}) => {
  return (
    <div className="bg-gray-50 border-b border-gray-200 p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <Download className="w-5 h-5 text-gray-600" />
          <span className="font-medium text-gray-700">Exportar Ranking:</span>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Button
            onClick={onGeneratePDF}
            disabled={isGeneratingPDF}
            loading={isGeneratingPDF}
            variant="danger"
            icon={FileText}
            loadingIcon={BarChart3}
          >
            {isGeneratingPDF ? 'Gerando PDF...' : 'Baixar PDF'}
          </Button>
          <Button
            onClick={onDownloadJSON}
            variant="primary"
            icon={Download}
          >
            Baixar JSON
          </Button>
        </div>
      </div>
    </div>
  );
};
