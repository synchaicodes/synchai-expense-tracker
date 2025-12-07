import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const Header = ({ onAddClick, onClearDatabase }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
        Expense Tracker ✨
      </h1>
      <div className="flex gap-2">
        <button
          onClick={onClearDatabase}
          className="bg-gradient-to-r from-red-400 to-pink-400 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
          title="Clear Database"
        >
          <Trash2 size={20} />
        </button>
        <button
          onClick={onAddClick}
          className="bg-gradient-to-r from-pink-400 to-purple-400 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
        >
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
};

export default Header;