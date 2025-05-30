import React from 'react';
import { Code, Database, Lock, Cpu, Globe, Smartphone } from 'lucide-react';

export const TechSpecs: React.FC = () => {
  const specs = [
    {
      icon: Lock,
      title: 'Segurança',
      items: ['Processamento local no navegador', 'Nenhum dado enviado para servidores', 'Cache criptografado localmente', 'Sem rastreamento ou cookies']
    },
    {
      icon: Cpu,
      title: 'Performance',
      items: ['Algoritmos otimizados', 'Processamento em tempo real', 'Suporte a arquivos grandes', 'Interface responsiva']
    },
    {
      icon: Database,
      title: 'Compatibilidade',
      items: ['Todos os formatos do WhatsApp', 'Chrome, Firefox, Safari, Edge', 'Mobile e Desktop', 'Sistema de cache inteligente']
    },
    {
      icon: Globe,
      title: 'Recursos',
      items: ['Filtros por data avançados', 'Exportação PDF/JSON', 'Gráficos interativos', 'Cache automático por 7 dias']
    }
  ];

  const technologies = [
    { name: 'Next.js 15', description: 'Framework React moderno', color: 'bg-gray-900' },
    { name: 'TypeScript', description: 'Tipagem estática', color: 'bg-blue-600' },
    { name: 'Tailwind CSS', description: 'Estilização utilitária', color: 'bg-cyan-500' },
    { name: 'Lucide React', description: 'Ícones otimizados', color: 'bg-orange-500' }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Especificações Técnicas
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Desenvolvido com as melhores tecnologias e práticas de segurança 
            para garantir máxima performance e proteção dos seus dados.
          </p>
        </div>
        
        {/* Specifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {specs.map((spec, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <spec.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {spec.title}
              </h3>
              
              <ul className="space-y-2">
                {spec.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Technologies Used */}
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <Code className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Tecnologias Utilizadas
            </h3>
            <p className="text-gray-600">
              Stack moderno e confiável para melhor experiência
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((tech, index) => (
              <div key={index} className="flex items-center gap-3 p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                <div className={`w-10 h-10 ${tech.color} rounded-lg flex items-center justify-center`}>
                  <span className="text-white font-bold text-sm">
                    {tech.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">
                    {tech.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {tech.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Browser Support */}
        <div className="mt-12 text-center">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Compatibilidade de Navegadores
          </h4>
          <div className="flex items-center justify-center gap-8 text-gray-600">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              <span className="text-sm">Chrome 90+</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              <span className="text-sm">Firefox 88+</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              <span className="text-sm">Safari 14+</span>
            </div>
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5" />
              <span className="text-sm">Mobile</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};