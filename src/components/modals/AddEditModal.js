import React from 'react';

const AddEditModal = ({
  isEdit,
  formData,
  setFormData,
  onSubmit,
  onClose
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">

        {/* TITLE */}
        <h2
          className={`text-2xl font-bold mb-4 bg-gradient-to-r ${
            isEdit
              ? 'from-blue-500 to-cyan-500'
              : 'from-pink-500 to-purple-500'
          } bg-clip-text text-transparent`}
        >
          {isEdit ? 'Edit Transaction ✏️' : 'Add Transaction ✨'}
        </h2>

        <div className="space-y-4">

          {/* TYPE TOGGLE (ONLY WHEN ADDING) */}
          {!isEdit && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, type: 'expense' })
                  }
                  className={`flex-1 py-2 rounded-xl font-medium transition-all ${
                    formData.type === 'expense'
                      ? 'bg-gradient-to-r from-orange-400 to-red-400 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  Expense
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, type: 'income' })
                  }
                  className={`flex-1 py-2 rounded-xl font-medium transition-all ${
                    formData.type === 'income'
                      ? 'bg-gradient-to-r from-green-400 to-emerald-400 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  Income
                </button>
              </div>
            </div>
          )}

          {/* TITLE INPUT */}
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-400 outline-none"
          />

          {/* AMOUNT INPUT */}
          <input
            type="number"
            placeholder="Amount (₹)"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
            step="0.01"
            className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-400 outline-none"
          />

          {/* CATEGORY (ONLY FOR EXPENSE) */}
          {formData.type === 'expense' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, category: 'need' })
                  }
                  className={`flex-1 py-2 rounded-xl font-medium transition-all ${
                    formData.category === 'need'
                      ? 'bg-gradient-to-r from-blue-400 to-cyan-400 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  Need
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, category: 'want' })
                  }
                  className={`flex-1 py-2 rounded-xl font-medium transition-all ${
                    formData.category === 'want'
                      ? 'bg-gradient-to-r from-pink-400 to-rose-400 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  Want
                </button>
              </div>
            </div>
          )}

          {/* DATE INPUT */}
          <input
            type="date"
            value={formData.date}
            onChange={(e) =>
              setFormData({ ...formData, date: e.target.value })
            }
            className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-400 outline-none"
          />

          {/* ACTION BUTTONS */}
          <div className="flex gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-gray-200 text-gray-700 font-medium"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onSubmit}
              className={`flex-1 py-3 rounded-xl bg-gradient-to-r ${
                isEdit
                  ? 'from-blue-400 to-cyan-400'
                  : 'from-pink-400 to-purple-400'
              } text-white font-medium shadow-lg`}
            >
              {isEdit ? 'Save' : 'Add'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddEditModal;
