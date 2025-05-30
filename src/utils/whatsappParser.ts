import { RankingData, DateFilter } from '@/types';

export const parseWhatsAppDate = (dateStr: string): Date | null => {
  const match = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (!match) return null;
  
  const [, day, month, year] = match;
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
};

export const isDateInRange = (messageDate: Date, startDate: string, endDate: string): boolean => {
  if (!startDate && !endDate) return true;
  
  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;
  
  if (start && messageDate < start) return false;
  if (end && messageDate > end) return false;
  
  return true;
};

export const processWhatsAppFile = async (fileContent: string, filter: DateFilter): Promise<RankingData> => {
  const lines = fileContent.split('\n');
  const messageCounts: Record<string, number> = {};
  let validMessages = 0;
  let filteredMessages = 0;

  lines.forEach(line => {
    const match = line.match(/^(\d{1,2}\/\d{1,2}\/\d{4}) \d{2}:\d{2} - (.*?): /);
    if (match && match[1] && match[2]) {
      const dateStr = match[1];
      const name = match[2].trim();
      validMessages++;

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
};
