import React from 'react';

const LimitSettingsModal = ({ 
  monthlyLimit, 
  setMonthlyLimit, 
  weeklyLimit, 
  setWeeklyLimit, 
  onSave, 
  onClose 
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          Set Spending Limits 💰
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Limit (₹) - Required
            </label>
            <input
              type="number"
              value={monthlyLimit}
              onChange={(e) => setMonthlyLimit(parseFloat(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-400 outline-none"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weekly Limit (₹) - Optional
            </label>
            <input
              type="number"
              value={weeklyLimit}
              onChange={(e) => setWeeklyLimit(e.target.value)}
              placeholder="Leave empty to skip"
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-400 outline-none"
              step="0.01"
            />
            <p className="text-xs text-gray-500 mt-1">Leave empty if you don't want a weekly limit</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-gray-200 text-gray-700 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-pink-400 to-purple-400 text-white font-medium shadow-lg"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LimitSettingsModal;