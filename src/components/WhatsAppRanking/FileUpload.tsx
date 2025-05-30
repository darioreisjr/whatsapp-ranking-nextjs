
import React, { useCallback } from 'react';
import { Upload, BarChart3, FileText } from 'lucide-react';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

interface FileUploadProps {
  file: File | null;
  isProcessing: boolean;
  error: string;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDrop: (event: React.DragEvent) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  file,
  isProcessing,
  error,
  onFileUpload,
  onDrop
}) => {
  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          isProcessing 
            ? 'border-blue-300 bg-blue-50' 
            : 'border-gray-300 hover:border-green-400 hover:bg-green-50 cursor-pointer'
        }`}
        onDragOver={handleDragOver}
        onDrop={onDrop}
      >
        <input
          type="file"
          id="file-upload"
          accept=".txt"
          onChange={onFileUpload}
          className="hidden"
          disabled={isProcessing}
        />
        <label htmlFor="file-upload" className={`cursor-pointer ${isProcessing ? 'cursor-not-allowed' : ''}`}>
          <div className="flex flex-col items-center gap-4">
            {isProcessing ? (
              <BarChart3 className="w-12 h-12 text-blue-500 animate-pulse" />
            ) : (
              <Upload className="w-12 h-12 text-gray-400" />
            )}
            <div>
              <p className="text-xl font-semibold text-gray-700 mb-2">
                {isProcessing ? 'Processando arquivo...' : 'Clique aqui ou arraste seu arquivo'}
              </p>
              <p className="text-gray-500">
                Arquivo de chat do WhatsApp (.txt)
              </p>
              <p className="text-xs text-gray-400 mt-1">
                💾 Seus dados serão salvos automaticamente para próxima visita
              </p>
            </div>
          </div>
        </label>
      </div>

      {file && !isProcessing && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg flex items-center gap-3">
          <FileText className="w-5 h-5 text-gray-600" />
          <span className="text-gray-700 font-medium">{file.name}</span>
          <span className="text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
        </div>
      )}

      <ErrorMessage message={error} />
    </div>
  );
};