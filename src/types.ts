export interface AirQualityData {
  location: string;
  aqi: number;
  pollutants: {
    pm25: number;
    pm10: number;
    o3: number;
    no2: number;
  };
  timestamp: string;
}

export interface Prediction {
  time: string;
  aqi: number;
}

export interface ChartData {
  labels: string[];
  values: number[];
}