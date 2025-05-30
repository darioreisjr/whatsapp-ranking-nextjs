import React from 'react';
import { FileText, Save, Download, Archive, Smartphone } from 'lucide-react';

export const Instructions: React.FC = () => {
  return (
    <div className="mt-8 space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
          <Smartphone className="w-5 h-5" />
          Como exportar seu chat do WhatsApp:
        </h3>
        <ol className="list-decimal list-inside space-y-2 text-blue-700">
          <li>Abra o chat no WhatsApp</li>
          <li>Toque nos três pontos no canto superior direito</li>
          <li>Selecione {'"'}Mais{'"'} e depois {'"'}Exportar conversa{'"'}</li>
          <li>Escolha {'"'}Sem mídia{'"'}</li>
          <li><strong>Faça upload diretamente do arquivo baixado (ZIP ou TXT)</strong></li>
        </ol>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
        <h3 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
          <Archive className="w-5 h-5" />
          Novidade: Suporte a arquivos ZIP!
        </h3>
        <div className="space-y-3 text-purple-700">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">1</div>
            <div>
              <strong>Arquivo ZIP (Recomendado):</strong>
              <ul className="list-disc list-inside mt-1 ml-4 space-y-1">
                <li>Use diretamente o arquivo que o WhatsApp baixa (não precisa descompactar)</li>
                <li>Mais prático e rápido</li>
                <li>Evita erros de manipulação manual</li>
              </ul>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</div>
            <div>
              <strong>Arquivo TXT (Funciona como antes):</strong>
              <ul className="list-disc list-inside mt-1 ml-4 space-y-1">
                <li>Se você já descompactou o ZIP manualmente</li>
                <li>Funciona exatamente como na versão anterior</li>
                <li>Mesma segurança e privacidade</li>
              </ul>
            </div>
          </div>
        </div>
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
          <li>Funciona com arquivos ZIP e TXT</li>
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
          <li>Funciona independente do formato de arquivo original (ZIP ou TXT)</li>
        </ul>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Solução de Problemas:
        </h3>
        <ul className="list-disc list-inside space-y-2 text-yellow-700">
          <li><strong>ZIP não funciona:</strong> Verifique se é o arquivo original do WhatsApp</li>
          <li><strong>Arquivo vazio:</strong> Certifique-se de que exportou {'"'}Sem mídia{'"'}</li>
          <li><strong>Nenhuma mensagem encontrada:</strong> Verifique se o chat tem mensagens de texto</li>
          <li><strong>Erro de formato:</strong> O WhatsApp deve estar em português brasileiro</li>
          <li><strong>Arquivo muito grande:</strong> Tente filtrar por data para reduzir o processamento</li>
        </ul>
      </div>
    </div>
  );
};