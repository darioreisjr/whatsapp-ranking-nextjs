import React from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { DateFilter as DateFilterType } from '@/types';
import { getTodayDate, formatDate } from '@/utils/dateUtils';

interface DateFilterProps {
  file: File | null;
  dateFilter: DateFilterType;
  isProcessing: boolean;
  onDateChange: (field: 'startDate' | 'endDate', value: string) => void;
  onApplyFilter: () => void;
  onClearFilter: () => void;
}

export const DateFilter: React.FC<DateFilterProps> = ({
  file,
  dateFilter,
  isProcessing,
  onDateChange,
  onApplyFilter,
  onClearFilter
}) => {
  const today = getTodayDate();

  if (!file) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-800">Filtrar por Data</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        <div>
          <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">
            Data de Início
          </label>
          <input
            type="date"
            id="start-date"
            value={dateFilter.startDate}
            max={today}
            onChange={(e) => onDateChange('startDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
          />
        </div>
        
        <div>
          <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">
            Data de Fim
          </label>
          <input
            type="date"
            id="end-date"
            value={dateFilter.endDate}
            max={today}
            onChange={(e) => onDateChange('endDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
          />
        </div>
        
        <Button
          onClick={onApplyFilter}
          disabled={isProcessing}
          variant="primary"
        >
          Aplicar Filtro
        </Button>
        
        <Button
          onClick={onClearFilter}
          disabled={isProcessing}
          variant="secondary"
        >
          Limpar Filtro
        </Button>
      </div>

      {(dateFilter.startDate || dateFilter.endDate) && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 text-sm">
            <strong>Filtro ativo:</strong> {' '}
            {dateFilter.startDate ? formatDate(dateFilter.startDate) : 'Início'} até {' '}
            {dateFilter.endDate ? formatDate(dateFilter.endDate) : 'Fim'}
          </p>
        </div>
      )}
    </div>
  );
};
