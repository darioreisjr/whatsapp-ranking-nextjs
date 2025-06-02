// src/components/WhatsAppRanking/MultiFileResults.tsx
import React, { useState, useMemo } from 'react';
import { 
  Users, 
  BarChart3, 
  Merge, 
  TrendingUp, 
  FileText, 
  Download,
  Settings,
  Eye,
  Shuffle
} from 'lucide-react';
import { MultiFileRankingData, FileDataset, DateFilter, GroupComparison, MergeOptions } from '@/types';
import { Button } from '@/components/ui/Button';
import { RankingList } from './RankingList';
import { StatsHeader } from './StatsHeader';

interface MultiFileResultsProps {
  multiData: MultiFileRankingData;
  dateFilter: DateFilter;
  onMergeDatasets: (options: MergeOptions) => void;
  onExportIndividual: (dataset: FileDataset) => void;
  onExportMerged: () => void;
  onExportComparison: () => void;
}

export const MultiFileResults: React.FC<MultiFileResultsProps> = ({
  multiData,
  dateFilter,
  onMergeDatasets,
  onExportIndividual,
  onExportMerged,
  onExportComparison
}) => {
  const [activeTab, setActiveTab] = useState<'individual' | 'merged' | 'comparison'>('individual');
  const [selectedDataset, setSelectedDataset] = useState<string>(multiData.individual[0]?.id || '');
  const [mergeOptions, setMergeOptions] = useState<MergeOptions>({
    mergeParticipants: false,
    includeFilePrefix: true,
    dateRange: dateFilter
  });
  const [showMergeSettings, setShowMergeSettings] = useState(false);

  // Calcula comparação entre grupos
  const groupComparison = useMemo((): GroupComparison[] => {
    return multiData.individual.map(dataset => {
      const ranking = dataset.rankingData.ranking;
      const topParticipant = ranking[0] || { name: 'N/A', count: 0 };
      const averageMessages = ranking.length > 0 
        ? Math.round(dataset.rankingData.filteredMessages / ranking.length)
        : 0;

      return {
        groupName: dataset.fileName.replace(/\.(txt|zip)$/i, ''),
        fileName: dataset.fileName,
        totalMessages: dataset.rankingData.filteredMessages,
        topParticipant,
        averageMessages,
        uniqueParticipants: ranking.length
      };
    });
  }, [multiData.individual]);

  const currentDataset = multiData.individual.find(d => d.id === selectedDataset);

  const handleMerge = () => {
    onMergeDatasets(mergeOptions);
    setActiveTab('merged');
  };

  const tabs = [
    { id: 'individual' as const, label: 'Análise Individual', icon: FileText, count: multiData.totalFiles },
    { id: 'merged' as const, label: 'Dados Combinados', icon: Merge, count: multiData.merged ? 1 : 0 },
    { id: 'comparison' as const, label: 'Comparação', icon: TrendingUp, count: multiData.totalFiles }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8" />
            <div>
              <h2 className="text-2xl font-bold">Análise Multi-Grupos</h2>
              <p className="text-green-100">
                {multiData.totalFiles} grupo{multiData.totalFiles > 1 ? 's' : ''} • {' '}
                {multiData.individual.reduce((sum, d) => sum + d.rankingData.filteredMessages, 0)} mensagens totais
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{multiData.totalFiles}</div>
            <div className="text-green-100">Grupos Analisados</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex space-x-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm border border-blue-200'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    activeTab === tab.id ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Export Actions */}
          <div className="flex items-center gap-2">
            {activeTab === 'individual' && currentDataset && (
              <Button
                onClick={() => onExportIndividual(currentDataset)}
                variant="secondary"
                size="sm"
                icon={Download}
              >
                Exportar Grupo
              </Button>
            )}
            {activeTab === 'merged' && multiData.merged && (
              <Button
                onClick={onExportMerged}
                variant="primary"
                size="sm"
                icon={Download}
              >
                Exportar Combinado
              </Button>
            )}
            {activeTab === 'comparison' && (
              <Button
                onClick={onExportComparison}
                variant="danger"
                size="sm"
                icon={Download}
              >
                Exportar Comparação
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Individual Tab */}
        {activeTab === 'individual' && (
          <div>
            {/* Dataset Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selecionar Grupo:
              </label>
              <select
                value={selectedDataset}
                onChange={(e) => setSelectedDataset(e.target.value)}
                className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {multiData.individual.map(dataset => (
                  <option key={dataset.id} value={dataset.id}>
                    {dataset.fileName} ({dataset.rankingData.filteredMessages} mensagens)
                  </option>
                ))}
              </select>
            </div>

            {/* Individual Ranking */}
            {currentDataset && (
              <div>
                <StatsHeader rankingData={currentDataset.rankingData} hasCache={false} />
                <div className="mt-4">
                  <RankingList rankingData={currentDataset.rankingData} dateFilter={dateFilter} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Merged Tab */}
        {activeTab === 'merged' && (
          <div>
            {!multiData.merged ? (
              <div className="text-center py-12">
                <Merge className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  Combine os Dados dos Grupos
                </h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Mescle os dados de todos os grupos em um ranking único para ver o panorama geral
                  da atividade de mensagens entre todos os participantes.
                </p>

                {/* Merge Settings */}
                <div className="bg-gray-50 rounded-lg p-6 mb-6 max-w-2xl mx-auto">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-800">Opções de Combinação</h4>
                    <button
                      onClick={() => setShowMergeSettings(!showMergeSettings)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Settings className="w-5 h-5" />
                    </button>
                  </div>

                  {showMergeSettings && (
                    <div className="space-y-4 text-left">
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={mergeOptions.includeFilePrefix}
                          onChange={(e) => setMergeOptions(prev => ({
                            ...prev,
                            includeFilePrefix: e.target.checked
                          }))}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">
                          Prefixar nomes com grupo de origem
                        </span>
                      </label>

                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={mergeOptions.mergeParticipants}
                          onChange={(e) => setMergeOptions(prev => ({
                            ...prev,
                            mergeParticipants: e.target.checked
                          }))}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          disabled
                        />
                        <span className="text-sm text-gray-500">
                          Mesclar participantes com nomes similares (em breve)
                        </span>
                      </label>
                    </div>
                  )}
                </div>

                <Button
                  onClick={handleMerge}
                  variant="primary"
                  icon={Shuffle}
                >
                  Combinar Dados dos Grupos
                </Button>
              </div>
            ) : (
              <div>
                <StatsHeader rankingData={multiData.merged} hasCache={false} />
                <div className="mt-4">
                  <RankingList rankingData={multiData.merged} dateFilter={dateFilter} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Comparison Tab */}
        {activeTab === 'comparison' && (
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                Comparação Entre Grupos
              </h3>
              <p className="text-gray-600">
                Compare estatísticas entre diferentes grupos para identificar padrões de atividade.
              </p>
            </div>

            <div className="space-y-4">
              {groupComparison.map((group, index) => (
                <div key={group.fileName} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{group.groupName}</h4>
                        <p className="text-sm text-gray-500">{group.fileName}</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => onExportIndividual(multiData.individual[index])}
                      variant="secondary"
                      size="sm"
                      icon={Eye}
                    >
                      Ver Detalhes
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{group.totalMessages}</div>
                      <div className="text-sm text-gray-500">Total de Mensagens</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{group.uniqueParticipants}</div>
                      <div className="text-sm text-gray-500">Participantes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{group.averageMessages}</div>
                      <div className="text-sm text-gray-500">Média por Pessoa</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-orange-600">{group.topParticipant.count}</div>
                      <div className="text-sm text-gray-500">Mais Ativo</div>
                      <div className="text-xs text-gray-400 truncate" title={group.topParticipant.name}>
                        {group.topParticipant.name}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Stats */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
              <h4 className="font-semibold text-gray-800 mb-4">Resumo Geral</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {groupComparison.reduce((sum, g) => sum + g.totalMessages, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total de Mensagens</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {groupComparison.reduce((sum, g) => sum + g.uniqueParticipants, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total de Participantes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.round(groupComparison.reduce((sum, g) => sum + g.averageMessages, 0) / groupComparison.length)}
                  </div>
                  <div className="text-sm text-gray-600">Média Geral</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {Math.max(...groupComparison.map(g => g.totalMessages))}
                  </div>
                  <div className="text-sm text-gray-600">Grupo Mais Ativo</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};