// src/types/index.ts (Enhanced for Multiple Files)
export interface MessageCount {
  name: string;
  count: number;
}

export interface RankingData {
  totalMessages: number;
  ranking: MessageCount[];
  filteredMessages: number;
  dateRange: {
    start: string;
    end: string;
  };
}

export interface DateFilter {
  startDate: string;
  endDate: string;
}

// New types for multiple files support
export interface FileDataset {
  id: string;
  fileName: string;
  fileSize: number;
  fileContent: string;
  rankingData: RankingData;
  uploadedAt: number;
  isActive: boolean;
}

export interface MultiFileRankingData {
  individual: FileDataset[];
  merged?: RankingData;
  comparisonMode: 'individual' | 'merged' | 'comparison';
  totalFiles: number;
}

export interface GroupComparison {
  groupName: string;
  fileName: string;
  totalMessages: number;
  topParticipant: MessageCount;
  averageMessages: number;
  uniqueParticipants: number;
}

export interface MergeOptions {
  mergeParticipants: boolean; // Se deve mesclar participantes com nomes similares
  includeFilePrefix: boolean; // Se deve prefixar nomes com nome do arquivo
  dateRange: DateFilter; // Filtro de data aplicado ao merge
}

export interface CachedData {
  fileName: string;
  fileSize: number;
  fileContent: string;
  rankingData: RankingData;
  dateFilter: DateFilter;
  visibleItems: number;
  timestamp: number;
}

// Enhanced cache for multiple files
export interface MultiFileCachedData {
  datasets: FileDataset[];
  mergedData?: RankingData;
  mergeOptions: MergeOptions;
  dateFilter: DateFilter;
  timestamp: number;
  version: string; // For cache compatibility
}