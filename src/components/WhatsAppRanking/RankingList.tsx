import React, { useRef, useEffect, useCallback, useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { RankingItem } from './RankingItem';
import { LoadingIndicator } from '@/components/ui/LoadingIndicator';
import { RankingData, DateFilter } from '@/types';

interface RankingListProps {
  rankingData: RankingData;
  dateFilter: DateFilter;
}

export const RankingList: React.FC<RankingListProps> = ({ rankingData, dateFilter }) => {
  const [visibleItems, setVisibleItems] = useState(10);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const loadMoreItems = useCallback(() => {
    if (!rankingData || isLoadingMore) return;
    
    const remainingItems = rankingData.ranking.length - visibleItems;
    if (remainingItems <= 0) return;

    setIsLoadingMore(true);
    
    setTimeout(() => {
      setVisibleItems(prev => prev + 10);
      setIsLoadingMore(false);
    }, 500);
  }, [rankingData, visibleItems, isLoadingMore]);

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

  useEffect(() => {
    setVisibleItems(10);
  }, [rankingData]);

  if (rankingData.ranking.length === 0) {
    return (
      <div className="text-center py-8">
        <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">
          {(dateFilter.startDate || dateFilter.endDate) 
            ? 'Nenhuma mensagem encontrada no período selecionado.'
            : 'Nenhuma mensagem válida encontrada no arquivo.'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="space-y-3">
        {rankingData.ranking.slice(0, visibleItems).map((person, index) => (
          <RankingItem
            key={`${person.name}-${index}`}
            person={person}
            index={index}
            totalMessages={rankingData.filteredMessages}
          />
        ))}
      </div>

      {rankingData.ranking.length > visibleItems && (
        <div ref={loadMoreRef} className="mt-6">
          {isLoadingMore ? (
            <LoadingIndicator message="Carregando mais..." />
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

      {rankingData.ranking.length > 10 && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Mostrando {Math.min(visibleItems, rankingData.ranking.length)} de {rankingData.ranking.length} participantes
          </p>
        </div>
      )}
    </div>
  );
};
