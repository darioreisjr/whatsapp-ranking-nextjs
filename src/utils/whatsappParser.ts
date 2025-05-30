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

// Função para detectar se é um número de telefone
const isPhoneNumber = (name: string): boolean => {
  // Remove espaços e caracteres especiais comuns em números
  const cleaned = name.replace(/[\s\-\(\)\+]/g, '');
  
  // Verifica se contém apenas números (pode ter + no início)
  const isNumeric = /^[\+]?\d+$/.test(cleaned);
  
  // Verifica se tem pelo menos 8 dígitos (tamanho mínimo de um telefone)
  const hasMinLength = cleaned.replace(/\+/, '').length >= 8;
  
  // Verifica se tem no máximo 15 dígitos (padrão internacional)
  const hasMaxLength = cleaned.replace(/\+/, '').length <= 15;
  
  return isNumeric && hasMinLength && hasMaxLength;
};

// Função para mascarar número de telefone
const maskPhoneNumber = (phoneNumber: string): string => {
  // Remove espaços e caracteres especiais para trabalhar apenas com números
  const cleaned = phoneNumber.replace(/[\s\-\(\)]/g, '');
  
  // Se tem + no início, preserva
  const hasCountryCode = cleaned.startsWith('+');
  const numbers = cleaned.replace(/\+/, '');
  
  if (numbers.length <= 4) {
    // Se tem 4 ou menos dígitos, mostra todos (pode não ser telefone)
    return phoneNumber;
  }
  
  // Pega os últimos 4 dígitos
  const lastFour = numbers.slice(-4);
  
  // Calcula quantos caracteres mascarar
  const maskCount = numbers.length - 4;
  const mask = '*'.repeat(maskCount);
  
  // Reconstrói o número mascarado
  const maskedNumber = (hasCountryCode ? '+' : '') + mask + lastFour;
  
  return maskedNumber;
};

// Função para processar nome garantindo privacidade
const processNameForPrivacy = (rawName: string): string => {
  const name = rawName.trim();
  
  // Se é um número de telefone, mascara
  if (isPhoneNumber(name)) {
    return maskPhoneNumber(name);
  }
  
  // Se é um nome salvo, mantém como está
  return name;
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
      const rawName = match[2].trim();
      
      // Processa o nome aplicando privacidade se necessário
      const processedName = processNameForPrivacy(rawName);
      
      validMessages++;

      const messageDate = parseWhatsAppDate(dateStr);
      if (messageDate && isDateInRange(messageDate, filter.startDate, filter.endDate)) {
        filteredMessages++;
        messageCounts[processedName] = (messageCounts[processedName] || 0) + 1;
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