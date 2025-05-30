export const formatDate = (dateStr: string): string => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('pt-BR');
};

export const formatCacheTime = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  
  if (days > 0) {
    return `${days} dia${days > 1 ? 's' : ''} atrás`;
  } else if (hours > 0) {
    return `${hours} hora${hours > 1 ? 's' : ''} atrás`;
  } else {
    return 'Há poucos minutos';
  }
};

export const getTodayDate = (): string => {
  return new Date().toISOString().split('T')[0];
};
