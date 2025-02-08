import React from 'react';
import { AirQualityData } from '../types';
import { Wind } from 'lucide-react';

interface AQICardProps {
  data: AirQualityData;
}

const getAQIColor = (aqi: number): string => {
  if (aqi <= 50) return 'bg-green-100 text-green-800';
  if (aqi <= 100) return 'bg-yellow-100 text-yellow-800';
  if (aqi <= 150) return 'bg-orange-100 text-orange-800';
  if (aqi <= 200) return 'bg-red-100 text-red-800';
  return 'bg-purple-100 text-purple-800';
};

const getAQIStatus = (aqi: number): string => {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
  if (aqi <= 200) return 'Unhealthy';
  return 'Very Unhealthy';
};

export const AQICard: React.FC<AQICardProps> = ({ data }) => {
  const aqiColorClass = getAQIColor(data.aqi);
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Wind className="w-6 h-6 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold">{data.location}</h3>
        </div>
        <span className="text-sm text-gray-500">{new Date(data.timestamp).toLocaleTimeString()}</span>
      </div>
      
      <div className={`inline-block px-4 py-2 rounded-full ${aqiColorClass} font-medium mb-4`}>
        AQI: {data.aqi} - {getAQIStatus(data.aqi)}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">PM2.5</p>
          <p className="text-lg font-semibold">{data.pollutants.pm25} µg/m³</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">PM10</p>
          <p className="text-lg font-semibold">{data.pollutants.pm10} µg/m³</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">O₃</p>
          <p className="text-lg font-semibold">{data.pollutants.o3} ppb</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">NO₂</p>
          <p className="text-lg font-semibold">{data.pollutants.no2} ppb</p>
        </div>
      </div>
    </div>
  );
};