import React, { useState, useEffect } from "react";
import { Leaf } from "lucide-react";
import { AQICard } from "./components/AQICard";
import { PredictionChart } from "./components/PredictionChart";

// Define types
type Pollutants = {
  pm25: number;
  pm10: number;
  o3: number;
  no2: number;
};

type AirQualityData = {
  location: string;
  aqi: number;
  pollutants: Pollutants;
  timestamp: string;
};

type ChartData = {
  labels: string[];
  values: number[];
};

// Function to generate mock AQI data
const generateMockData = (): AirQualityData => ({
  location: "Central Park, NY",
  aqi: Math.floor(Math.random() * 200) + 20,
  pollutants: {
    pm25: Math.floor(Math.random() * 100) + 10,
    pm10: Math.floor(Math.random() * 150) + 20,
    o3: Math.floor(Math.random() * 50) + 5,
    no2: Math.floor(Math.random() * 40) + 5,
  },
  timestamp: new Date().toISOString(),
});

// Function to generate AQI predictions
const generatePredictions = (): ChartData => {
  const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
  const values = Array.from({ length: 24 }, () => Math.floor(Math.random() * 100) + 20);
  return { labels: hours, values };
};

const App: React.FC = () => {
  // State management
  const [currentData, setCurrentData] = useState<AirQualityData>(generateMockData());
  const [predictions, setPredictions] = useState<ChartData>(generatePredictions());

  // 🛠 Fix: Update setCurrentData every 5 seconds
  useEffect(() => {
    const dataInterval = setInterval(() => {
      setCurrentData(generateMockData()); // ✅ Now setCurrentData updates properly
    }, 5000);

    return () => clearInterval(dataInterval);
  }, []);

  // 🛠 Fix: Add useEffect to update predictions
  useEffect(() => {
    const predictionInterval = setInterval(() => {
      setPredictions(generatePredictions());
    }, 10000);

    return () => clearInterval(predictionInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center">
          <Leaf className="w-8 h-8 text-green-600 mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">AI Environmental Monitor</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* AQI Data */}
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4">Current Air Quality</h2>
              {/* ✅ Fix: Passing currentData to AQICard to read */}
              <AQICard data={currentData} />
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">24-Hour AQI Prediction</h2>
              <PredictionChart data={predictions} title="Forecasted Air Quality Index" />
            </section>
          </div>

          {/* AI Insights */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">AI Insights</h2>
            <div className="space-y-4">
              {/* 🛠 Fix: Now using currentData for insights */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">Current Analysis</h3>
                <p className="text-blue-800">
                  Based on current AQI levels and pollutant concentrations, air quality is{" "}
                  {currentData.aqi <= 100 ? "within acceptable ranges" : "above recommended levels"}.
                  Primary concerns are elevated levels of{" "}
                  {Object.entries(currentData.pollutants)
                    .sort(([, a], [, b]) => b - a)[0][0]
                    .toUpperCase()}
                  .
                </p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-900 mb-2">Recommendations</h3>
                <ul className="list-disc list-inside text-green-800 space-y-2">
                  {currentData.aqi > 100 ? (
                    <>
                      <li>Consider reducing outdoor activities</li>
                      <li>Keep windows closed during peak hours</li>
                      <li>Use air purifiers indoors</li>
                    </>
                  ) : (
                    <>
                      <li>Conditions are favorable for outdoor activities</li>
                      <li>Good time for natural ventilation</li>
                      <li>Continue monitoring for changes</li>
                    </>
                  )}
                </ul>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-medium text-purple-900 mb-2">Trend Analysis</h3>
                <p className="text-purple-800">
                  AI models predict{" "}
                  {predictions.values[predictions.values.length - 1] > predictions.values[0]
                    ? "an increasing trend in AQI over the next 24 hours"
                    : "improving air quality conditions in the coming hours"}
                  . Peak pollution levels are expected around{" "}
                  {predictions.labels[predictions.values.indexOf(Math.max(...predictions.values))]}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
