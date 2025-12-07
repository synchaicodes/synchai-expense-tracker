import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StatisticsChart = ({ chartData }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg mb-6 border border-purple-200">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Statistics</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" stroke="#9333ea" />
          <YAxis stroke="#9333ea" />
          <Tooltip 
            contentStyle={{ 
              background: 'linear-gradient(to right, #ec4899, #a855f7)',
              border: 'none',
              borderRadius: '15px',
              color: 'white'
            }}
          />
          <Bar dataKey="amount" fill="url(#colorGradient)" radius={[10, 10, 0, 0]} />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatisticsChart;