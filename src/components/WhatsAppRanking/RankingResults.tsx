import React from 'react';
import { StatsHeader } from './StatsHeader';
import { ExportSection } from './ExportSection';
import { RankingList } from './RankingList';
import { RankingData, DateFilter } from '@/types';

interface RankingResultsProps {
  rankingData: RankingData;
  dateFilter: DateFilter;
  hasCache: boolean;
  isGeneratingPDF: boolean;
  onGeneratePDF: () => void;
  onDownloadJSON: () => void;
}

export const RankingResults: React.FC<RankingResultsProps> = ({
  rankingData,
  dateFilter,
  hasCache,
  isGeneratingPDF,
  onGeneratePDF,
  onDownloadJSON
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <StatsHeader rankingData={rankingData} hasCache={hasCache} />
      
      <ExportSection
        isGeneratingPDF={isGeneratingPDF}
        onGeneratePDF={onGeneratePDF}
        onDownloadJSON={onDownloadJSON}
      />
      
      <RankingList rankingData={rankingData} dateFilter={dateFilter} />
    </div>
  );
};