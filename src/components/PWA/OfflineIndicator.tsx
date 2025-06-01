'use client';

import React from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { useOfflineStatus } from '@/hooks/useOfflineStatus';

export const OfflineIndicator: React.FC = () => {
  const { isOnline, wasOffline } = useOfflineStatus();

  if (isOnline && !wasOffline) {
    return null;
  }

  return (
    <div className={`fixed top-20 left-4 right-4 z-40 transition-all duration-300 ${
      isOnline ? 'translate-y-0 opacity-100' : 'translate-y-0 opacity-100'
    }`}>
      <div className={`rounded-lg p-3 shadow-lg border flex items-center gap-3 ${
        isOnline 
          ? 'bg-green-50 border-green-200 text-green-800' 
          : 'bg-orange-50 border-orange-200 text-orange-800'
      }`}>
        {isOnline ? (
          <Wifi className="w-5 h-5 text-green-600" />
        ) : (
          <WifiOff className="w-5 h-5 text-orange-600" />
        )}
        
        <div className="flex-1">
          <p className="font-medium text-sm">
            {isOnline ? 'Conexão restaurada!' : 'Modo Offline'}
          </p>
          <p className="text-xs opacity-80">
            {isOnline 
              ? 'Você está online novamente' 
              : 'O app funciona normalmente offline'
            }
          </p>
        </div>
        
        {!isOnline && (
          <div className="text-xs bg-orange-100 px-2 py-1 rounded">
            📱 PWA
          </div>
        )}
      </div>
    </div>
  );
};