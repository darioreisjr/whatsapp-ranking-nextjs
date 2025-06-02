// src/components/WhatsAppRanking/MultiFileUpload.tsx
import React, { useCallback, useState } from 'react';
import { Upload, BarChart3, FileText, Archive, X, Plus, Users } from 'lucide-react';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { Button } from '@/components/ui/Button';
import { LoadingState } from '@/components/ui/LoadingState';
import { MultiFileProcessingProgress } from '@/hooks/useMultiFileProcessor';

interface MultiFileUploadProps {
  files: File[];
  isProcessing: boolean;
  error: string;
  progress: MultiFileProcessingProgress;
  onFilesUpload: (files: FileList | File[]) => void;
  onFileRemove: (index: number) => void;
  onDrop: (event: React.DragEvent) => void;
  onClearAll: () => void;
}

export const MultiFileUpload: React.FC<MultiFileUploadProps> = ({
  files,
  isProcessing,
  error,
  progress,
  onFilesUpload,
  onFileRemove,
  onDrop,
  onClearAll
}) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setDragActive(false);
  }, []);

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setDragActive(false);
    onDrop(event);
  }, [onDrop]);

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.zip')) {
      return <Archive className="w-5 h-5 text-purple-600" />;
    }
    return <FileText className="w-5 h-5 text-blue-600" />;
  };

  const getFileTypeLabel = (fileName: string) => {
    if (fileName.endsWith('.zip')) {
      return 'ZIP do WhatsApp';
    }
    return 'TXT do WhatsApp';
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
          isProcessing 
            ? 'border-blue-300 bg-blue-50 cursor-not-allowed' 
            : dragActive
              ? 'border-green-400 bg-green-50'
              : 'border-gray-300 hover:border-green-400 hover:bg-green-50 cursor-pointer'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="multi-file-upload"
          accept=".txt,.zip"
          multiple
          onChange={(e) => e.target.files && onFilesUpload(e.target.files)}
          className="hidden"
          disabled={isProcessing}
        />
        
        <label htmlFor="multi-file-upload" className={`cursor-pointer ${isProcessing ? 'cursor-not-allowed' : ''}`}>
          <div className="flex flex-col items-center gap-4">
            {isProcessing ? (
              <div className="flex flex-col items-center gap-2">
                <BarChart3 className="w-12 h-12 text-blue-500 animate-pulse" />
                <div className="text-center">
                  <div className="text-lg font-semibold text-blue-700">
                    Processando arquivo {progress.currentFile} de {progress.totalFiles}
                  </div>
                  <div className="text-sm text-blue-600">{progress.fileName}</div>
                  <div className="text-xs text-blue-500 mt-1">{progress.message}</div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <Upload className="w-8 h-8 text-gray-400" />
                  <Users className="w-8 h-8 text-green-500" />
                </div>
                <div>
                  <p className="text-xl font-semibold text-gray-700 mb-2">
                    Upload Múltiplo de Chats
                  </p>
                  <p className="text-gray-500 mb-3">
                    Selecione vários arquivos de chat do WhatsApp (.txt ou .zip)
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
                  <p className="text-xs text-gray-400 mt-3">
                    ⚡ Máximo 10 arquivos • 📊 Análise individual e combinada • 💾 Cache automático
                  </p>
                </div>
              </>
            )}
          </div>
        </label>
      </div>

      {/* Progress Bar for Multi-File Processing */}
      {isProcessing && (
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progresso geral</span>
            <span>{Math.round(progress.progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress.progress}%` }}
            />
          </div>
        </div>
      )}

      {/* File List */}
      {files.length > 0 && !isProcessing && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Users className="w-5 h-5 text-green-600" />
              Arquivos Selecionados ({files.length})
            </h4>
            <Button
              onClick={onClearAll}
              variant="secondary"
              size="sm"
              icon={X}
            >
              Limpar Todos
            </Button>
          </div>
          
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {files.map((file, index) => (
              <div key={`${file.name}-${index}`} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                {getFileIcon(file.name)}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-700 truncate">{file.name}</div>
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <span>{getFileTypeLabel(file.name)}</span>
                    <span>•</span>
                    <span>{formatFileSize(file.size)}</span>
                  </div>
                </div>
                <button
                  onClick={() => onFileRemove(index)}
                  className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                  title="Remover arquivo"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          
          {files.length >= 10 && (
            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm">
                ⚠️ Limite máximo de 10 arquivos atingido. Remova alguns arquivos para adicionar novos.
              </p>
            </div>
          )}
        </div>
      )}

      <ErrorMessage message={error} />
      
      {/* Enhanced Information Section */}
      <div className="mt-6 space-y-4">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
          <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Análise de Múltiplos Grupos
          </h4>
          <ul className="text-sm text-purple-700 space-y-1">
            <li>• <strong>Análise Individual:</strong> Veja estatísticas de cada grupo separadamente</li>
            <li>• <strong>Análise Combinada:</strong> Mescle dados de todos os grupos em um ranking único</li>
            <li>• <strong>Comparação:</strong> Compare atividade entre diferentes grupos</li>
            <li>• <strong>Export Avançado:</strong> Baixe relatórios individuais ou consolidados</li>
          </ul>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
            <Archive className="w-4 h-4" />
            Formatos Suportados:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-green-700">
            <div>
              <strong>📁 Arquivos ZIP:</strong>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Exportação direta do WhatsApp</li>
                <li>Processamento automático</li>
                <li>Mais prático e seguro</li>
              </ul>
            </div>
            <div>
              <strong>📄 Arquivos TXT:</strong>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Arquivos já descompactados</li>
                <li>Compatibilidade total</li>
                <li>Funciona como antes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};