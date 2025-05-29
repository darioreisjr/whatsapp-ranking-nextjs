'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Upload, Users, MessageCircle, Trophy, FileText, BarChart3, Calendar, AlertCircle, ChevronDown } from 'lucide-react';

interface MessageCount {
  name: string;
  count: number;
}

interface RankingData {
  totalMessages: number;
  ranking: MessageCount[];
  filteredMessages: number;
  dateRange: {
    start: string;
    end: string;
  };
}

interface DateFilter {
  startDate: string;
  endDate: string;
}

export default function WhatsAppRanking() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [rankingData, setRankingData] = useState<RankingData | null>(null);
  const [error, setError] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<DateFilter>({
    startDate: '',
    endDate: ''
  });
  const [visibleItems, setVisibleItems] = useState(10);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Função para carregar mais itens
  const loadMoreItems = useCallback(() => {
    if (!rankingData || isLoadingMore) return;
    
    const remainingItems = rankingData.ranking.length - visibleItems;
    if (remainingItems <= 0) return;

    setIsLoadingMore(true);
    
    // Simular delay de carregamento para efeito visual
    setTimeout(() => {
      setVisibleItems(prev => prev + 10);
      setIsLoadingMore(false);
    }, 500);
  }, [rankingData, visibleItems, isLoadingMore]);

  // Intersection Observer para detectar quando chegar no final
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !isLoadingMore) {
          loadMoreItems();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [loadMoreItems, isLoadingMore]);

  // Reset visible items quando os dados mudarem
  useEffect(() => {
    setVisibleItems(10);
  }, [rankingData]);

  // Função para converter data do WhatsApp (dd/mm/yyyy) para Date
  const parseWhatsAppDate = (dateStr: string): Date | null => {
    const match = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    if (!match) return null;
    
    const [, day, month, year] = match;
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  };

  // Função para validar se a data está no range
  const isDateInRange = (messageDate: Date, startDate: string, endDate: string): boolean => {
    if (!startDate && !endDate) return true;
    
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    
    if (start && messageDate < start) return false;
    if (end && messageDate > end) return false;
    
    return true;
  };

  const processWhatsAppFile = useCallback(async (fileContent: string, filter: DateFilter): Promise<RankingData> => {
    const lines = fileContent.split('\n');
    const messageCounts: Record<string, number> = {};
    let validMessages = 0;
    let filteredMessages = 0;

    lines.forEach(line => {
      // Regex para capturar mensagens com formato: data - Nome: mensagem
      const match = line.match(/^(\d{1,2}\/\d{1,2}\/\d{4}) \d{2}:\d{2} - (.*?): /);
      if (match && match[1] && match[2]) {
        const dateStr = match[1];
        const name = match[2].trim();
        validMessages++;

        // Verificar se a data está no filtro
        const messageDate = parseWhatsAppDate(dateStr);
        if (messageDate && isDateInRange(messageDate, filter.startDate, filter.endDate)) {
          filteredMessages++;
          messageCounts[name] = (messageCounts[name] || 0) + 1;
        }
      }
    });

    const ranking = Object.entries(messageCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    return {
      totalMessages: validMessages,
      filteredMessages,
      ranking,
      dateRange: {
        start: filter.startDate || 'Início',
        end: filter.endDate || 'Fim'
      }
    };
  }, []);

  const processFile = useCallback(async (uploadedFile: File, filter: DateFilter = dateFilter) => {
    if (!uploadedFile.name.endsWith('.txt')) {
      setError('Por favor, selecione um arquivo .txt');
      return;
    }

    setFile(uploadedFile);
    setError('');
    setIsProcessing(true);

    try {
      const fileContent = await uploadedFile.text();
      const result = await processWhatsAppFile(fileContent, filter);
      setRankingData(result);
    } catch (err) {
      setError('Erro ao processar o arquivo. Verifique se é um arquivo de chat do WhatsApp válido.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  }, [processWhatsAppFile, dateFilter]);

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

  const handleDateChange = useCallback((field: 'startDate' | 'endDate', value: string) => {
    const today = new Date().toISOString().split('T')[0];
    
    // Validar se a data não é futura
    if (value > today) {
      setError('A data não pode ser maior que hoje');
      return;
    }

    const newFilter = { ...dateFilter, [field]: value };
    
    // Validar se data início não é maior que data fim
    if (newFilter.startDate && newFilter.endDate && newFilter.startDate > newFilter.endDate) {
      setError('A data de início não pode ser maior que a data de fim');
      return;
    }

    setError('');
    setDateFilter(newFilter);
  }, [dateFilter]);

  const handleApplyFilter = useCallback(async () => {
    if (!file) return;
    await processFile(file, dateFilter);
  }, [file, processFile, dateFilter]);

  const handleClearFilter = useCallback(async () => {
    const clearedFilter = { startDate: '', endDate: '' };
    setDateFilter(clearedFilter);
    if (file) {
      await processFile(file, clearedFilter);
    }
  }, [file, processFile]);

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

  const formatDate = (dateStr: string): string => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR');
  };

  const today = new Date().toISOString().split('T')[0];

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
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-600 font-medium">{error}</p>
            </div>
          )}
        </div>

        {/* Date Filter */}
        {file && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800">Filtrar por Data</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div>
                <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">
                  Data de Início
                </label>
                <input
                  type="date"
                  id="start-date"
                  value={dateFilter.startDate}
                  max={today}
                  onChange={(e) => handleDateChange('startDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
              </div>
              
              <div>
                <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">
                  Data de Fim
                </label>
                <input
                  type="date"
                  id="end-date"
                  value={dateFilter.endDate}
                  max={today}
                  onChange={(e) => handleDateChange('endDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
              </div>
              
              <button
                onClick={handleApplyFilter}
                disabled={isProcessing}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Aplicar Filtro
              </button>
              
              <button
                onClick={handleClearFilter}
                disabled={isProcessing}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Limpar Filtro
              </button>
            </div>

            {(dateFilter.startDate || dateFilter.endDate) && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>Filtro ativo:</strong> {' '}
                  {dateFilter.startDate ? formatDate(dateFilter.startDate) : 'Início'} até {' '}
                  {dateFilter.endDate ? formatDate(dateFilter.endDate) : 'Fim'}
                </p>
              </div>
            )}
          </div>
        )}

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
                    <p className="text-green-100">
                      {rankingData.filteredMessages !== rankingData.totalMessages 
                        ? `${rankingData.filteredMessages} mensagens filtradas de ${rankingData.totalMessages} totais`
                        : 'Análise completa do chat'
                      }
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{rankingData.filteredMessages}</div>
                  <div className="text-green-100">Mensagens no período</div>
                  {rankingData.filteredMessages !== rankingData.totalMessages && (
                    <div className="text-sm text-green-200 mt-1">
                      Total: {rankingData.totalMessages}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Ranking List */}
            <div className="p-6">
              <div className="space-y-3">
                {rankingData.ranking.slice(0, visibleItems).map((person, index) => {
                  const percentage = (person.count / rankingData.filteredMessages) * 100;
                  const position = index + 1;
                  
                  return (
                    <div 
                      key={`${person.name}-${index}`}
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

              {/* Loading More Indicator */}
              {rankingData.ranking.length > visibleItems && (
                <div ref={loadMoreRef} className="mt-6">
                  {isLoadingMore ? (
                    <div className="flex items-center justify-center py-4">
                      <BarChart3 className="w-6 h-6 text-blue-500 animate-pulse mr-2" />
                      <span className="text-gray-600">Carregando mais...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center py-4">
                      <button
                        onClick={loadMoreItems}
                        className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <ChevronDown className="w-4 h-4" />
                        <span>Carregar mais ({rankingData.ranking.length - visibleItems} restantes)</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Info about total items */}
              {rankingData.ranking.length > 10 && (
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">
                    Mostrando {Math.min(visibleItems, rankingData.ranking.length)} de {rankingData.ranking.length} participantes
                  </p>
                </div>
              )}

              {rankingData.ranking.length === 0 && (
                <div className="text-center py-8">
                  <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    {(dateFilter.startDate || dateFilter.endDate) 
                      ? 'Nenhuma mensagem encontrada no período selecionado.'
                      : 'Nenhuma mensagem válida encontrada no arquivo.'
                    }
                  </p>
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