import React, { useState } from 'react';
import { X } from 'lucide-react';
import { getWeekStart } from '../../utils/dateUtils';

const CalendarModal = ({ 
  viewPeriod, 
  selectedDate, 
  onSelect, 
  onClose 
}) => {
  const [calendarDate, setCalendarDate] = useState(new Date());

  const renderYearCalendar = () => {
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let y = currentYear - 5; y <= currentYear + 5; y++) {
      years.push(y);
    }
    
    return (
      <div className="grid grid-cols-3 gap-2">
        {years.map(y => (
          <button
            key={y}
            onClick={() => onSelect(new Date(y, 0, 1))}
            className={`p-3 rounded-xl font-medium transition-all ${
              y === selectedDate.getFullYear()
                ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {y}
          </button>
        ))}
      </div>
    );
  };

  const renderMonthCalendar = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setCalendarDate(new Date(calendarDate.getFullYear() - 1, 0, 1))}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            ←
          </button>
          <span className="font-bold text-gray-800">{calendarDate.getFullYear()}</span>
          <button
            onClick={() => setCalendarDate(new Date(calendarDate.getFullYear() + 1, 0, 1))}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            →
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {months.map((m, idx) => (
            <button
              key={idx}
              onClick={() => onSelect(new Date(calendarDate.getFullYear(), idx, 1))}
              className={`p-3 rounded-xl font-medium transition-all ${
                idx === selectedDate.getMonth() && calendarDate.getFullYear() === selectedDate.getFullYear()
                  ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderWeekCalendar = () => {
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1))}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            ←
          </button>
          <span className="font-bold text-gray-800">
            {calendarDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </span>
          <button
            onClick={() => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1))}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            →
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-xs font-bold text-gray-600 p-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, idx) => {
            if (!day) return <div key={idx} />;
            
            const date = new Date(year, month, day);
            const weekStart = getWeekStart(date);
            const selectedWeekStart = getWeekStart(selectedDate);
            const isSelectedWeek = weekStart.getTime() === selectedWeekStart.getTime();
            
            return (
              <button
                key={idx}
                onClick={() => onSelect(date)}
                className={`p-2 rounded-lg text-sm font-medium transition-all ${
                  isSelectedWeek
                    ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Select {viewPeriod === 'week' ? 'Week' : viewPeriod === 'month' ? 'Month' : 'Year'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>
        {viewPeriod === 'year' && renderYearCalendar()}
        {viewPeriod === 'month' && renderMonthCalendar()}
        {viewPeriod === 'week' && renderWeekCalendar()}
      </div>
    </div>
  );
};

export default CalendarModal;