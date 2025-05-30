import { RankingData, DateFilter } from '@/types';

export const generatePDFContent = (
  rankingData: RankingData, 
  file: File | null, 
  dateFilter: DateFilter
): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>WhatsApp Ranking - ${file?.name || 'Análise'}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
          background: white;
          padding: 20px;
        }
        
        .header {
          text-align: center;
          margin-bottom: 30px;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 20px;
        }
        
        .header h1 {
          font-size: 28px;
          color: #059669;
          margin-bottom: 10px;
        }
        
        .header .subtitle {
          font-size: 16px;
          color: #6b7280;
        }
        
        .stats {
          display: flex;
          justify-content: space-around;
          margin-bottom: 30px;
          background: #f9fafb;
          padding: 20px;
          border-radius: 8px;
        }
        
        .stat-item {
          text-align: center;
        }
        
        .stat-number {
          font-size: 24px;
          font-weight: bold;
          color: #059669;
        }
        
        .stat-label {
          font-size: 12px;
          color: #6b7280;
          margin-top: 5px;
        }
        
        .ranking-item {
          display: flex;
          align-items: center;
          padding: 12px;
          margin-bottom: 8px;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          background: white;
        }
        
        .ranking-item.top-3 {
          background: linear-gradient(to right, #fef3c7, #fed7aa);
          border-color: #fbbf24;
        }
        
        .position {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          margin-right: 15px;
          border-radius: 50%;
          background: #e5e7eb;
          color: #374151;
        }
        
        .position.gold { background: #fbbf24; color: white; }
        .position.silver { background: #9ca3af; color: white; }
        .position.bronze { background: #d97706; color: white; }
        
        .person-info {
          flex: 1;
        }
        
        .person-name {
          font-weight: 600;
          font-size: 16px;
          margin-bottom: 5px;
        }
        
        .message-count {
          font-size: 18px;
          font-weight: bold;
          color: #059669;
          margin-right: 10px;
        }
        
        .percentage {
          font-size: 14px;
          color: #6b7280;
        }
        
        .progress-bar {
          width: 100%;
          height: 6px;
          background: #e5e7eb;
          border-radius: 3px;
          margin-top: 5px;
          overflow: hidden;
        }
        
        .progress-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 0.3s ease;
        }
        
        .progress-1 { background: linear-gradient(to right, #fbbf24, #f59e0b); }
        .progress-2 { background: linear-gradient(to right, #9ca3af, #6b7280); }
        .progress-3 { background: linear-gradient(to right, #d97706, #b45309); }
        .progress-default { background: linear-gradient(to right, #3b82f6, #1d4ed8); }
        
        .footer {
          margin-top: 40px;
          text-align: center;
          font-size: 12px;
          color: #9ca3af;
          border-top: 1px solid #e5e7eb;
          padding-top: 20px;
        }
        
        .date-filter {
          background: #eff6ff;
          padding: 15px;
          border-radius: 6px;
          margin-bottom: 20px;
          border-left: 4px solid #3b82f6;
        }
        
        .date-filter strong {
          color: #1d4ed8;
        }
        
        @media print {
          body { padding: 10px; }
          .header h1 { font-size: 24px; }
          .ranking-item { margin-bottom: 4px; padding: 8px; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>📊 WhatsApp Ranking</h1>
        <div class="subtitle">Análise de Mensagens do Chat</div>
        ${file ? `<div style="margin-top: 10px; font-size: 14px; color: #6b7280;">Arquivo: ${file.name}</div>` : ''}
      </div>
      
      <div class="stats">
        <div class="stat-item">
          <div class="stat-number">${rankingData.filteredMessages}</div>
          <div class="stat-label">Mensagens Analisadas</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">${rankingData.ranking.length}</div>
          <div class="stat-label">Participantes</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">${rankingData.ranking[0]?.count || 0}</div>
          <div class="stat-label">Líder em Mensagens</div>
        </div>
      </div>
      
      ${(dateFilter.startDate || dateFilter.endDate) ? `
        <div class="date-filter">
          <strong>Período Filtrado:</strong> 
          ${dateFilter.startDate ? new Date(dateFilter.startDate).toLocaleDateString('pt-BR') : 'Início'} até 
          ${dateFilter.endDate ? new Date(dateFilter.endDate).toLocaleDateString('pt-BR') : 'Fim'}
        </div>
      ` : ''}
      
      <div class="ranking">
        ${rankingData.ranking.map((person, index) => {
          const percentage = (person.count / rankingData.filteredMessages) * 100;
          const position = index + 1;
          const isTop3 = position <= 3;
          const positionClass = 
            position === 1 ? 'gold' : 
            position === 2 ? 'silver' : 
            position === 3 ? 'bronze' : '';
          const progressClass = 
            position === 1 ? 'progress-1' : 
            position === 2 ? 'progress-2' : 
            position === 3 ? 'progress-3' : 'progress-default';
          
          return `
            <div class="ranking-item ${isTop3 ? 'top-3' : ''}">
              <div class="position ${positionClass}">
                ${position <= 3 ? '🏆' : position}
              </div>
              <div class="person-info">
                <div class="person-name">${person.name}</div>
                <div style="display: flex; align-items: center; justify-content: space-between;">
                  <span class="message-count">${person.count} mensagens</span>
                  <span class="percentage">${percentage.toFixed(1)}%</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill ${progressClass}" style="width: ${percentage}%"></div>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
      
      <div class="footer">
        <div>Gerado em ${new Date().toLocaleString('pt-BR')}</div>
        <div style="margin-top: 5px;">WhatsApp Ranking - Análise de Conversas</div>
      </div>
    </body>
    </html>
  `;
};

export const generateJSONData = (
  rankingData: RankingData,
  file: File | null,
  dateFilter: DateFilter
) => {
  return {
    fileName: file?.name || 'WhatsApp Chat',
    generatedAt: new Date().toISOString(),
    dateFilter: {
      startDate: dateFilter.startDate || null,
      endDate: dateFilter.endDate || null,
    },
    stats: {
      totalMessages: rankingData.totalMessages,
      filteredMessages: rankingData.filteredMessages,
      participants: rankingData.ranking.length,
    },
    ranking: rankingData.ranking.map((person, index) => ({
      position: index + 1,
      name: person.name,
      messageCount: person.count,
      percentage: ((person.count / rankingData.filteredMessages) * 100).toFixed(2),
    })),
  };
};
