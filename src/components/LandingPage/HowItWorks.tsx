import React from 'react';
import { Smartphone, Upload, BarChart3, Download } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: 1,
      icon: Smartphone,
      title: 'Exporte o Chat',
      description: 'No WhatsApp, vá em configurações do grupo → Exportar conversa → Sem mídia',
      details: ['Abra o chat desejado', 'Toque nos 3 pontos (⋮)', 'Selecione "Mais" → "Exportar conversa"', 'Escolha "Sem mídia"']
    },
    {
      number: 2,
      icon: Upload,
      title: 'Faça o Upload',
      description: 'Arraste ou selecione o arquivo .txt baixado do WhatsApp na nossa plataforma',
      details: ['Clique em "Escolher arquivo"', 'Ou arraste o arquivo para área', 'Arquivo será processado localmente', 'Nenhum dado é enviado para servidores']
    },
    {
      number: 3,
      icon: BarChart3,
      title: 'Veja o Ranking',
      description: 'Analise estatísticas detalhadas e descubra quem mais participa das conversas',
      details: ['Ranking completo de participantes', 'Percentual de participação', 'Filtros por data', 'Gráficos interativos']
    },
    {
      number: 4,
      icon: Download,
      title: 'Exporte Resultados',
      description: 'Baixe relatórios profissionais em PDF ou dados estruturados em JSON',
      details: ['PDF com design profissional', 'JSON para análise técnica', 'Inclui filtros aplicados', 'Data e hora de geração']
    }
  ];

  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Como Funciona?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Em apenas 4 passos simples, você terá acesso a análises completas 
            das suas conversas do WhatsApp de forma totalmente segura.
          </p>
        </div>
        
        <div className="space-y-12 lg:space-y-0">
          {steps.map((step, index) => (
            <div key={index} className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {step.number}
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
                    {step.title}
                  </h3>
                </div>
                
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {step.description}
                </p>
                
                <ul className="space-y-2 text-gray-500">
                  {step.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center justify-center lg:justify-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Visual */}
              <div className="flex-1 flex justify-center">
                <div className={`w-64 h-64 rounded-2xl flex items-center justify-center shadow-2xl ${
                  index % 4 === 0 ? 'bg-gradient-to-br from-green-400 to-green-600' :
                  index % 4 === 1 ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
                  index % 4 === 2 ? 'bg-gradient-to-br from-purple-400 to-purple-600' :
                  'bg-gradient-to-br from-red-400 to-red-600'
                } transform hover:scale-105 transition-transform duration-300`}>
                  <step.icon className="w-24 h-24 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Connection Lines */}
        <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0">
          <div className="w-px bg-gradient-to-b from-green-200 via-blue-200 via-purple-200 to-red-200 h-full"></div>
        </div>
      </div>
    </section>
  );
};