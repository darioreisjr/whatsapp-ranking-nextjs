import React from 'react';
import { Trophy } from 'lucide-react';
import { MessageCount } from '@/types';

interface RankingItemProps {
  person: MessageCount;
  index: number;
  totalMessages: number;
}

export const RankingItem: React.FC<RankingItemProps> = ({ person, index, totalMessages }) => {
  const position = index + 1;
  const percentage = (person.count / totalMessages) * 100;

  const getTrophyColor = (pos: number): string => {
    switch (pos) {
      case 1: return 'text-yellow-500';
      case 2: return 'text-gray-400';
      case 3: return 'text-amber-600';
      default: return 'text-blue-500';
    }
  };

  const getTrophyIcon = (pos: number) => {
    if (pos <= 3) {
      return <Trophy className={`w-5 h-5 ${getTrophyColor(pos)}`} />;
    }
    return <span className="w-5 h-5 flex items-center justify-center text-gray-600 font-bold text-sm">{pos}</span>;
  };

  return (
    <div 
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
};
