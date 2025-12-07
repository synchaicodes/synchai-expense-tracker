import React from 'react';

const DeleteConfirmModal = ({ item, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Delete Transaction?</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <strong>"{item.title}"</strong>? This action cannot be undone.
        </p>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl bg-gray-200 text-gray-700 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-red-400 to-pink-400 text-white font-medium shadow-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;