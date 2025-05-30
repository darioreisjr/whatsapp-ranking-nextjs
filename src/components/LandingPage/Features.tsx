import React from 'react';
import { Shield, Zap, Download, Filter, BarChart3, Save } from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Totalmente Privado',
      description: 'Seus dados nunca saem do seu dispositivo. Processamento 100% local no navegador.',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Zap,
      title: 'Processamento Rápido',
      description: 'Análise instantânea de milhares de mensagens com algoritmos otimizados.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Filter,
      title: 'Filtros Avançados',
      description: 'Filtre mensagens por período específico e veja estatísticas detalhadas.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Download,
      title: 'Exportação Completa',
      description: 'Baixe relatórios em PDF profissional ou dados estruturados em JSON.',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      icon: Save,
      title: 'Cache Inteligente',
      description: 'Sistema automático salva suas análises por 7 dias para acesso rápido.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      icon: BarChart3,
      title: 'Visualização Rica',
      description: 'Gráficos interativos e rankings visuais para melhor compreensão dos dados.',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Por que escolher o WhatsApp Ranking?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Uma ferramenta completa e segura para analisar suas conversas do WhatsApp 
            com recursos profissionais e interface intuitiva.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group hover:-translate-y-1 duration-300"
            >
              <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
            <div className="text-gray-600">Privacidade Garantida</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">&lt;1s</div>
            <div className="text-gray-600">Tempo de Processamento</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">∞</div>
            <div className="text-gray-600">Tamanho de Arquivo</div>
          </div>
        </div>
      </div>
    </section>
  );
};