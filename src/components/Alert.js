import React from 'react';

const Alert = ({ message, type, show }) => {
  if (!show) return null;

  return (
    <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-2xl shadow-2xl animate-bounce ${
      type === 'warning' ? 'bg-gradient-to-r from-orange-400 to-pink-400' : 'bg-gradient-to-r from-green-400 to-emerald-400'
    } text-white font-bold text-center max-w-md`}>
      {message}
    </div>
  );
};

export default Alert;