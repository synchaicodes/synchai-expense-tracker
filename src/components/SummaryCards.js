import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const SummaryCards = ({ currentLimit, periodTotal, savings, savingsPercentage, viewPeriod, onLimitClick }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div 
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-pink-200 cursor-pointer hover:shadow-xl transition-all" 
          onClick={onLimitClick}
        >
          <div className="flex items-center gap-2 text-purple-600 mb-2">
            <TrendingUp size={20} />
            <span className="text-sm font-medium">Limit</span>
          </div>
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            ₹{currentLimit.toFixed(2)}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {viewPeriod === 'week' ? 'Weekly' : viewPeriod === 'month' ? 'Monthly' : 'Yearly'} limit
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-orange-200">
          <div className="flex items-center gap-2 text-orange-600 mb-2">
            <TrendingDown size={20} />
            <span className="text-sm font-medium">Expenses</span>
          </div>
          <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            ₹{periodTotal.toFixed(2)}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            This {viewPeriod}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-emerald-400 to-teal-400 rounded-3xl p-6 shadow-lg mb-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm opacity-90">💰 Savings</p>
            <p className="text-3xl font-bold">₹{savings.toFixed(2)}</p>
            <p className="text-xs opacity-80 mt-1">
              {savingsPercentage}% saved this {viewPeriod}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs opacity-90">Keep it up!</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SummaryCards;