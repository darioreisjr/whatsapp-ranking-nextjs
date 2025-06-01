'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageCircle, Home, BarChart3 } from 'lucide-react';
import { OfflineIndicator } from '@/components/PWA/OfflineIndicator';

export const Navigation: React.FC = () => {
  const pathname = usePathname();

  return (
    <>
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="p-2 bg-green-600 rounded-lg group-hover:bg-green-700 transition-colors">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                WhatsApp Ranking
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-6">
              <Link 
                href="/"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  pathname === '/' 
                    ? 'bg-green-100 text-green-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Home className="w-4 h-4" />
                <span className="font-medium">Início</span>
              </Link>
              
              <Link 
                href="/ranking"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  pathname === '/ranking' 
                    ? 'bg-green-100 text-green-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span className="font-medium">Análise</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      <OfflineIndicator />
    </>
  );
};