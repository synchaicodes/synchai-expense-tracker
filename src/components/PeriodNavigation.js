import React from 'react';
import { Calendar } from 'lucide-react';

const PeriodNavigation = ({ viewPeriod, setViewPeriod, selectedDate, setSelectedDate, dateRangeText, onCalendarClick }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg mb-4 border border-purple-200">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <button
            onClick={onCalendarClick}
            className="flex-1 flex items-center justify-center gap-2 p-2 hover:bg-purple-50 rounded-xl transition-all"
          >
            <Calendar size={20} className="text-purple-600" />
            <span className="text-lg font-bold text-gray-800">{dateRangeText}</span>
          </button>
        </div>
        
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => { setViewPeriod('week'); setSelectedDate(new Date()); }}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              viewPeriod === 'week' 
                ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => { setViewPeriod('month'); setSelectedDate(new Date()); }}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              viewPeriod === 'month' 
                ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => { setViewPeriod('year'); setSelectedDate(new Date()); }}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              viewPeriod === 'year' 
                ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Year
          </button>
        </div>
      </div>
    </div>
  );
};

export default PeriodNavigation;