import React, { useCallback } from 'react';
import { Upload, BarChart3, FileText, Archive } from 'lucide-react';
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

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.zip')) {
      return <Archive className="w-5 h-5 text-purple-600" />;
    }
    return <FileText className="w-5 h-5 text-gray-600" />;
  };

  const getFileTypeLabel = (fileName: string) => {
    if (fileName.endsWith('.zip')) {
      return 'Arquivo ZIP do WhatsApp';
    }
    return 'Arquivo TXT do WhatsApp';
  };

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
          accept=".txt,.zip"
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
              <p className="text-gray-500 mb-2">
                Arquivo de chat do WhatsApp (.txt ou .zip)
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Archive className="w-4 h-4 text-purple-500" />
                  <span>ZIP (exportação direta)</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-500" />
                  <span>TXT (descompactado)</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                💾 Seus dados serão salvos automaticamente para próxima visita
              </p>
            </div>
          </div>
        </label>
      </div>

      {file && !isProcessing && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg flex items-center gap-3">
          {getFileIcon(file.name)}
          <div className="flex-1">
            <div className="font-medium text-gray-700">{file.name}</div>
            <div className="text-sm text-gray-500">
              {getFileTypeLabel(file.name)} • {(file.size / 1024).toFixed(1)} KB
            </div>
          </div>
          {file.name.endsWith('.zip') && (
            <div className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded">
              ZIP detectado
            </div>
          )}
        </div>
      )}

      <ErrorMessage message={error} />
      
      {/* Informações adicionais sobre formatos */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
          <Archive className="w-4 h-4" />
          Novidade: Suporte a arquivos ZIP!
        </h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• <strong>Arquivo ZIP:</strong> Cole diretamente o arquivo baixado do WhatsApp (mais prático)</li>
          <li>• <strong>Arquivo TXT:</strong> Funciona como antes se você já descompactou</li>
          <li>• Ambos os formatos mantêm a mesma segurança e privacidade</li>
        </ul>
      </div>
    </div>
  );
};