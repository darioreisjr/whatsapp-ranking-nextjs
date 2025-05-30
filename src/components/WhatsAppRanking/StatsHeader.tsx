import React from 'react';
import { Users } from 'lucide-react';
import { RankingData } from '@/types';

interface StatsHeaderProps {
  rankingData: RankingData;
  hasCache: boolean;
}

export const StatsHeader: React.FC<StatsHeaderProps> = ({ rankingData, hasCache }) => {
  return (
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
              {hasCache && <span className="ml-2">💾</span>}
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
  );
};
