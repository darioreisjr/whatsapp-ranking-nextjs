'use client';

import React from 'react';
import Link from 'next/link';
import { Upload, ArrowRight, MessageCircle, Github, Heart } from 'lucide-react';

export const CallToAction: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-green-600 via-blue-600 to-purple-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <MessageCircle className="w-12 h-12 text-white" />
            <h2 className="text-3xl lg:text-5xl font-bold text-white">
              Pronto para Começar?
            </h2>
          </div>
          
          <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
            Descubra insights incríveis sobre suas conversas do WhatsApp!
            <br className="hidden lg:block" />
            Análise gratuita, segura e instantânea.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link 
              href="/ranking"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 font-bold text-lg rounded-lg hover:bg-gray-50 transition-colors shadow-xl group min-w-fit"
            >
              <Upload className="w-6 h-6 mr-3" />
              Começar Análise Agora
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Gratuito • Sem cadastro • 100% privado</span>
            </div>
          </div>
          
          {/* Benefits Highlight */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">🚀</div>
              <div className="text-white font-semibold">Instantâneo</div>
              <div className="text-white/80 text-sm">Resultados em segundos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">🔒</div>
              <div className="text-white font-semibold">Seguro</div>
              <div className="text-white/80 text-sm">Dados nunca saem do seu dispositivo</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">📊</div>
              <div className="text-white font-semibold">Completo</div>
              <div className="text-white/80 text-sm">Análises detalhadas e exportação</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="relative mt-16 pt-8 border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <span>Feito com</span>
              <Heart className="w-4 h-4 text-red-400" />
              <span>usando Next.js, TypeScript e Tailwind CSS</span>
            </div>
            
            <div className="flex items-center gap-6">
              <a 
                href="https://github.com/darioreisjr/whatsapp-ranking-nextjs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm"
              >
                <Github className="w-4 h-4" />
                <span>Ver no GitHub</span>
              </a>
              
              <div className="text-white/60 text-sm">
                © 2025 WhatsApp Ranking
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};