import React from 'react';
import { FileText, Save, Download } from 'lucide-react';

export const Instructions: React.FC = () => {
  return (
    <div className="mt-8 space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Como exportar seu chat do WhatsApp:
        </h3>
        <ol className="list-decimal list-inside space-y-2 text-blue-700">
          <li>Abra o chat no WhatsApp</li>
          <li>Toque nos três pontos no canto superior direito</li>
          <li>Selecione {'"'}Mais{'"'} e depois {'"'}Exportar conversa{'"'}</li>
          <li>Escolha {'"'}Sem mídia{'"'}</li>
          <li>Salve o arquivo e faça upload aqui</li>
        </ol>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
          <Save className="w-5 h-5" />
          Sistema de Cache Automático:
        </h3>
        <ul className="list-disc list-inside space-y-2 text-green-700">
          <li>Seus dados são salvos automaticamente no navegador</li>
          <li>Na próxima visita, você pode carregar a última análise</li>
          <li>Cache válido por 7 dias</li>
          <li>Dados ficam apenas no seu dispositivo (seguro e privado)</li>
          <li>Use {'"'}Limpar Cache{'"'} para começar uma nova análise</li>
        </ul>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
          <Download className="w-5 h-5" />
          Exportação de Relatórios:
        </h3>
        <ul className="list-disc list-inside space-y-2 text-red-700">
          <li><strong>PDF:</strong> Relatório visual completo com gráficos e formatação profissional</li>
          <li><strong>JSON:</strong> Dados estruturados para análise técnica ou importação</li>
          <li>Inclui informações de filtros aplicados e estatísticas</li>
          <li>Data e hora de geração para controle de versões</li>
          <li>Para PDF: use {'"'}Salvar como PDF{'"'} na janela de impressão</li>
        </ul>
      </div>
    </div>
  );
};