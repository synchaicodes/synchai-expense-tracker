import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

const TransactionList = ({ activeTab, setActiveTab, transactions, onEdit, onDelete }) => {
  return (
    <>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('income')}
          className={`flex-1 py-3 rounded-2xl font-medium transition-all ${
            activeTab === 'income'
              ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-lg'
              : 'bg-white/60 text-gray-600'
          }`}
        >
          Income
        </button>
        <button
          onClick={() => setActiveTab('expense')}
          className={`flex-1 py-3 rounded-2xl font-medium transition-all ${
            activeTab === 'expense'
              ? 'bg-gradient-to-r from-orange-400 to-red-400 text-white shadow-lg'
              : 'bg-white/60 text-gray-600'
          }`}
        >
          Expenses
        </button>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {transactions.map((item) => (
          <div
            key={item.id}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-md border border-purple-100 hover:shadow-lg transition-all"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-bold text-gray-800">{item.title}</h3>
                <div className="flex gap-2 mt-1 flex-wrap">
                  {item.category && (
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      item.category === 'need' 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-pink-100 text-pink-600'
                    }`}>
                      {item.category}
                    </span>
                  )}
                  <span className="text-xs text-gray-500">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <div className={`text-xl font-bold ${
                  item.type === 'expense' ? 'text-red-500' : 'text-green-500'
                }`}>
                  {item.type === 'expense' ? '-' : '+'}₹{item.amount.toFixed(2)}
                </div>
                <button
                  onClick={() => onEdit(item)}
                  className="p-2 hover:bg-blue-50 rounded-full transition-all"
                >
                  <Edit2 size={16} className="text-blue-500" />
                </button>
                <button
                  onClick={() => onDelete(item)}
                  className="p-2 hover:bg-red-50 rounded-full transition-all"
                >
                  <Trash2 size={16} className="text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {transactions.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No {activeTab === 'expense' ? 'expenses' : 'income'} for this period
          </div>
        )}
      </div>
    </>
  );
};

export default TransactionList;