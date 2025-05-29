'use client';

import React, { useState, useCallback } from 'react';
import { Upload, Users, MessageCircle, Trophy, FileText, BarChart3 } from 'lucide-react';

interface MessageCount {
  name: string;
  count: number;
}

interface RankingData {
  totalMessages: number;
  ranking: MessageCount[];
}

export default function WhatsAppRanking() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [rankingData, setRankingData] = useState<RankingData | null>(null);
  const [error, setError] = useState<string>('');

  const processWhatsAppFile = useCallback(async (fileContent: string): Promise<RankingData> => {
    const lines = fileContent.split('\n');
    const messageCounts: Record<string, number> = {};
    let validMessages = 0;

    lines.forEach(line => {
      // Regex para capturar mensagens com formato: data - Nome: mensagem
      const match = line.match(/^\d{1,2}\/\d{1,2}\/\d{4} \d{2}:\d{2} - (.*?): /);
      if (match && match[1]) {
        const name = match[1].trim();
        validMessages++;
        messageCounts[name] = (messageCounts[name] || 0) + 1;
      }
    });

    const ranking = Object.entries(messageCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    return {
      totalMessages: validMessages,
      ranking
    };
  }, []);

  const processFile = useCallback(async (uploadedFile: File) => {
    if (!uploadedFile.name.endsWith('.txt')) {
      setError('Por favor, selecione um arquivo .txt');
      return;
    }

    setFile(uploadedFile);
    setError('');
    setIsProcessing(true);

    try {
      const fileContent = await uploadedFile.text();
      const result = await processWhatsAppFile(fileContent);
      setRankingData(result);
    } catch (err) {
      setError('Erro ao processar o arquivo. Verifique se é um arquivo de chat do WhatsApp válido.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  }, [processWhatsAppFile]);

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (!uploadedFile) return;

    await processFile(uploadedFile);
  }, [processFile]);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
  }, []);

  const handleDrop = useCallback(async (event: React.DragEvent) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && droppedFile.name.endsWith('.txt')) {
      await processFile(droppedFile);
    }
  }, [processFile]);

  const getTrophyColor = (position: number): string => {
    switch (position) {
      case 1: return 'text-yellow-500';
      case 2: return 'text-gray-400';
      case 3: return 'text-amber-600';
      default: return 'text-blue-500';
    }
  };

  const getTrophyIcon = (position: number) => {
    if (position <= 3) {
      return <Trophy className={`w-5 h-5 ${getTrophyColor(position)}`} />;
    }
    return <span className="w-5 h-5 flex items-center justify-center text-gray-600 font-bold text-sm">{position}</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MessageCircle className="w-10 h-10 text-green-600" />
            <h1 className="text-4xl font-bold text-gray-800">WhatsApp Ranking</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Faça upload do seu arquivo de chat do WhatsApp para ver quem mais envia mensagens
          </p>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
              isProcessing 
                ? 'border-blue-300 bg-blue-50' 
                : 'border-gray-300 hover:border-green-400 hover:bg-green-50 cursor-pointer'
            }`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="file-upload"
              accept=".txt"
              onChange={handleFileUpload}
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

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 font-medium">{error}</p>
            </div>
          )}
        </div>

        {/* Results */}
        {rankingData && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Stats Header */}
            <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8" />
                  <div>
                    <h2 className="text-2xl font-bold">Ranking de Mensagens</h2>
                    <p className="text-green-100">Análise completa do chat</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{rankingData.totalMessages}</div>
                  <div className="text-green-100">Mensagens totais</div>
                </div>
              </div>
            </div>

            {/* Ranking List */}
            <div className="p-6">
              <div className="space-y-3">
                {rankingData.ranking.map((person, index) => {
                  const percentage = (person.count / rankingData.totalMessages) * 100;
                  const position = index + 1;
                  
                  return (
                    <div 
                      key={person.name}
                      className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-200 hover:shadow-md ${
                        position <= 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200' : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center justify-center w-10 h-10">
                        {getTrophyIcon(position)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-800 truncate">{person.name}</h3>
                          <div className="text-right">
                            <span className="font-bold text-lg text-gray-800">{person.count}</span>
                            <span className="text-gray-500 ml-1">mensagens</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-1000 ${
                                position === 1 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                                position === 2 ? 'bg-gradient-to-r from-gray-400 to-gray-600' :
                                position === 3 ? 'bg-gradient-to-r from-amber-400 to-amber-600' :
                                'bg-gradient-to-r from-blue-400 to-blue-600'
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-600 min-w-fit">
                            {percentage.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {rankingData.ranking.length === 0 && (
                <div className="text-center py-8">
                  <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Nenhuma mensagem válida encontrada no arquivo.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Como exportar seu chat do WhatsApp:
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-700">
            <li>Abra o chat no WhatsApp</li>
            <li>Toque nos três pontos no canto superior direito</li>
            <li>Selecione {'"'}Mais{'"'} e depois {'"'}Exportar conversa{'"'}</li>
            <li>Escolha {'"'}Sem mídia{'"'}</li>
            <li>Salve o arquivo e faça upload aqui</li>
          </ol>
        </div>
      </div>
    </div>
  );
}