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

export interface CachedData {
  fileName: string;
  fileSize: number;
  fileContent: string;
  rankingData: RankingData;
  dateFilter: DateFilter;
  visibleItems: number;
  timestamp: number;
}
