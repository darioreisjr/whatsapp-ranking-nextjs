import React from 'react';
import { Save, Trash2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { formatCacheTime } from '@/utils/dateUtils';

interface CacheSectionProps {
  hasCache: boolean;
  rankingData: any;
  isLoadingCache: boolean;
  getCacheTime: () => string;
  onRestoreCache: () => void;
  onClearCache: () => void;
}

export const CacheSection: React.FC<CacheSectionProps> = ({
  hasCache,
  rankingData,
  isLoadingCache,
  getCacheTime,
  onRestoreCache,
  onClearCache
}) => {
  if (!hasCache) return null;

  if (!rankingData) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Save className="w-6 h-6 text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold text-blue-800">Dados Salvos Encontrados</h3>
              <p className="text-blue-600 text-sm">
                Encontramos sua última análise salva {getCacheTime()}. Deseja carregá-la?
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={onRestoreCache}
              disabled={isLoadingCache}
              loading={isLoadingCache}
              variant="primary"
              icon={RefreshCw}
              loadingIcon={RefreshCw}
            >
              {isLoadingCache ? 'Carregando...' : 'Carregar Dados'}
            </Button>
            <Button
              onClick={onClearCache}
              disabled={isLoadingCache}
              variant="secondary"
              icon={Trash2}
            >
              Limpar Cache
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Save className="w-4 h-4 text-green-600" />
          <span className="text-green-800 text-sm font-medium">
            Dados carregados do cache local
          </span>
        </div>
        <button
          onClick={onClearCache}
          className="text-green-600 hover:text-green-800 text-sm underline"
        >
          Limpar e começar novo
        </button>
      </div>
    </div>
  );
};
