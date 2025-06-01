'use client';

import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Detecta iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Detecta se já está em modo standalone
    const standalone = window.matchMedia('(display-mode: standalone)').matches;
    setIsStandalone(standalone);

    // Listener para o evento beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Verifica se o usuário já rejeitou antes
      const dismissed = localStorage.getItem('pwa-install-dismissed');
      const lastDismissed = dismissed ? parseInt(dismissed) : 0;
      const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
      
      if (lastDismissed < oneDayAgo) {
        setShowInstallPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Para iOS, mostra prompt manual se não estiver em standalone
    if (iOS && !standalone) {
      const dismissed = localStorage.getItem('ios-install-dismissed');
      const lastDismissed = dismissed ? parseInt(dismissed) : 0;
      const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
      
      if (lastDismissed < oneDayAgo) {
        setTimeout(() => setShowInstallPrompt(true), 3000);
      }
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'dismissed') {
      localStorage.setItem('pwa-install-dismissed', Date.now().toString());
    }
    
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    
    if (isIOS) {
      localStorage.setItem('ios-install-dismissed', Date.now().toString());
    } else {
      localStorage.setItem('pwa-install-dismissed', Date.now().toString());
    }
  };

  // Não mostra se já está em modo standalone
  if (isStandalone || !showInstallPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm">
      <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 relative">
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          aria-label="Fechar"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Smartphone className="w-6 h-6 text-green-600" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-sm mb-1">
              Instalar WhatsApp Ranking
            </h3>
            
            {isIOS ? (
              <div>
                <p className="text-gray-600 text-xs mb-3">
                  Adicione à tela inicial para acesso rápido e uso offline
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                  <p className="text-blue-800 text-xs font-medium mb-2">Como instalar no iOS:</p>
                  <ol className="text-blue-700 text-xs space-y-1">
                    <li>1. Toque no ícone de compartilhar (□↗)</li>
                    <li>2. Role para baixo e toque em "Adicionar à Tela Inicial"</li>
                    <li>3. Toque em "Adicionar"</li>
                  </ol>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-gray-600 text-xs mb-3">
                  Acesse offline e tenha a melhor experiência mobile
                </p>
                <button
                  onClick={handleInstallClick}
                  className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-green-700 transition-colors w-full justify-center"
                >
                  <Download className="w-4 h-4" />
                  Instalar App
                </button>
              </div>
            )}
            
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                📱 Acesso rápido
              </span>
              <span className="flex items-center gap-1">
                🔒 100% offline
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};