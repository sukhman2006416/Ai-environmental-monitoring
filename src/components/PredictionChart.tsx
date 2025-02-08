import React from 'react';
import { ChartData } from '../types';
import { LineChart, TrendingUp as TrendUp } from 'lucide-react';

interface PredictionChartProps {
  data: ChartData;
  title: string;
}

export const PredictionChart: React.FC<PredictionChartProps> = ({ data, title }) => {
  const maxValue = Math.max(...data.values);
  const minValue = Math.min(...data.values);
  const range = maxValue - minValue;
  
  const normalizeValue = (value: number) => {
    return ((value - minValue) / range) * 100;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-4">
        <TrendUp className="w-6 h-6 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      
      <div className="relative h-64">
        <div className="absolute bottom-0 left-0 right-0 h-[calc(100%-24px)]">
          {data.values.map((value, index) => (
            <div
              key={index}
              className="absolute bottom-0 bg-blue-500 rounded-t-sm transition-all duration-300"
              style={{
                left: `${(index / (data.values.length - 1)) * 100}%`,
                height: `${normalizeValue(value)}%`,
                width: '8px',
                transform: 'translateX(-4px)',
              }}
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600">
                {value}
              </div>
            </div>
          ))}
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
          {data.labels.map((label, index) => (
            <span key={index} className="transform -translate-x-1/2">{label}</span>
          ))}
        </div>
      </div>
    </div>
  );
};