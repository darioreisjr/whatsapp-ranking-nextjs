// src/components/WhatsAppRanking/Instructions.tsx (Enhanced)
import React from 'react';
import { FileText, Save, Download, Archive, Smartphone, Users, Merge, TrendingUp } from 'lucide-react';

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

      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-6">
        <h3 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
          <Users className="w-5 h-5" />
          🆕 Novidade: Análise de Múltiplos Grupos!
        </h3>
        <div className="space-y-4 text-purple-700">
          <div className="bg-white/50 rounded-lg p-4">
            <h4 className="font-semibold mb-2">📂 Funcionalidades Multi-Arquivo:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><strong>Upload Múltiplo:</strong> Até 10 grupos simultâneos</li>
              <li><strong>Análise Individual:</strong> Veja estatísticas de cada grupo separadamente</li>
              <li><strong>Dados Combinados:</strong> Mescle rankings de todos os grupos</li>
              <li><strong>Comparação:</strong> Compare atividade entre diferentes grupos</li>
              <li><strong>Export Avançado:</strong> Relatórios individuais ou consolidados</li>
            </ul>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <strong className="text-sm">Individual</strong>
              </div>
              <p className="text-xs">Analise cada grupo separadamente com ranking próprio</p>
            </div>
            
            <div className="bg-white/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Merge className="w-4 h-4 text-green-600" />
                <strong className="text-sm">Combinado</strong>
              </div>
              <p className="text-xs">Mescle dados para ver ranking geral entre todos</p>
            </div>
            
            <div className="bg-white/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-orange-600" />
                <strong className="text-sm">Comparação</strong>
              </div>
              <p className="text-xs">Compare estatísticas entre grupos diferentes</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
        <h3 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
          <Archive className="w-5 h-5" />
          Formatos Suportados:
        </h3>
        <div className="space-y-3 text-purple-700">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">1</div>
            <div>
              <strong>Arquivo ZIP (Recomendado):</strong>
              <ul className="list-disc list-inside mt-1 ml-4 space-y-1">
                <li>Use diretamente o arquivo que o WhatsApp baixa</li>
                <li>Funciona tanto para análise única quanto múltipla</li>
                <li>Mais prático e rápido</li>
                <li>Evita erros de manipulação manual</li>
              </ul>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</div>
            <div>
              <strong>Arquivo TXT (Compatibilidade):</strong>
              <ul className="list-disc list-inside mt-1 ml-4 space-y-1">
                <li>Se você já descompactou o ZIP manualmente</li>
                <li>Funciona exatamente como na versão anterior</li>
                <li>Suporte completo para análise múltipla</li>
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
          <li><strong>Novo:</strong> Cache inteligente para análises múltiplas</li>
          <li>Use {'"'}Limpar Cache{'"'} para começar uma nova análise</li>
        </ul>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
          <Download className="w-5 h-5" />
          Exportação de Relatórios Avançada:
        </h3>
        <div className="space-y-4 text-red-700">
          <div>
            <h4 className="font-semibold mb-2">📄 Análise Individual:</h4>
            <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
              <li><strong>PDF:</strong> Relatório visual completo com gráficos</li>
              <li><strong>JSON:</strong> Dados estruturados para análise técnica</li>
              <li>Inclui informações de filtros aplicados</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">👥 Análise Múltipla:</h4>
            <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
              <li><strong>Relatório por Grupo:</strong> PDF individual de cada grupo</li>
              <li><strong>Relatório Combinado:</strong> PDF com dados mesclados</li>
              <li><strong>Relatório Comparativo:</strong> PDF com comparação entre grupos</li>
              <li><strong>JSON Consolidado:</strong> Todos os dados em formato estruturado</li>
            </ul>
          </div>
          
          <div className="bg-white/50 rounded-lg p-3">
            <p className="text-sm">
              <strong>💡 Dica:</strong> Para PDF, use {'"'}Salvar como PDF{'"'} na janela de impressão.
              Funciona independente do formato de arquivo original (ZIP ou TXT).
            </p>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Solução de Problemas:
        </h3>
        <div className="space-y-4 text-yellow-700">
          <div>
            <h4 className="font-semibold mb-2">🔧 Problemas Gerais:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><strong>ZIP não funciona:</strong> Verifique se é o arquivo original do WhatsApp</li>
              <li><strong>Arquivo vazio:</strong> Certifique-se de que exportou {'"'}Sem mídia{'"'}</li>
              <li><strong>Nenhuma mensagem encontrada:</strong> Verifique se o chat tem mensagens de texto</li>
              <li><strong>Erro de formato:</strong> O WhatsApp deve estar em português brasileiro</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">👥 Problemas com Múltiplos Arquivos:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><strong>Limite de arquivos:</strong> Máximo 10 grupos por vez</li>
              <li><strong>Arquivo muito grande:</strong> Use filtros de data para reduzir processamento</li>
              <li><strong>Merge não funciona:</strong> Verifique se todos os arquivos foram processados corretamente</li>
              <li><strong>Performance lenta:</strong> Processe grupos menores ou aplique filtros de data</li>
            </ul>
          </div>
          
          <div className="bg-white/50 rounded-lg p-3">
            <p className="text-sm">
              <strong>🆘 Ajuda Adicional:</strong> Se problemas persistirem, experimente alternar entre 
              modo {'"'}Arquivo Único{'"'} e {'"'}Múltiplos Grupos{'"'} ou limpe o cache do navegador.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};