import React, { useState, useEffect } from 'react';
import db from './utils/db';
import { getDateRangeText, getWeekStart, getWeekEnd } from './utils/dateUtils';
import { getSelectedPeriodExpenses, getCurrentLimit, getSavings, getChartData } from './utils/calculations';

import Header from './components/Header';
import Alert from './components/Alert';
import PeriodNavigation from './components/PeriodNavigation';
import SummaryCards from './components/SummaryCards';
import StatisticsChart from './components/StatisticsChart';
import TransactionList from './components/TransactionList';
import AddEditModal from './components/modals/AddEditModal';
import CalendarModal from './components/modals/CalendarModal';
import DeleteConfirmModal from './components/modals/DeleteConfirmModal';
import LimitSettingsModal from './components/modals/LimitSettingsModal';

console.log('AddEditModal:', AddEditModal);
console.log('CalendarModal:', CalendarModal);
console.log('DeleteConfirmModal:', DeleteConfirmModal);
console.log('LimitSettingsModal:', LimitSettingsModal);

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [activeTab, setActiveTab] = useState('expense');
  const [viewPeriod, setViewPeriod] = useState('week');
  const [monthlyLimit, setMonthlyLimit] = useState(5000);
  const [weeklyLimit, setWeeklyLimit] = useState('');
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'need',
    type: 'expense',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    loadData();
    loadLimits();
  }, []);

  const loadData = async () => {
    const allExpenses = await db.expenses.toArray();
    const expenseItems = allExpenses.filter(item => item.type === 'expense');
    const incomeItems = allExpenses.filter(item => item.type === 'income');
    setExpenses(expenseItems);
    setIncome(incomeItems);
  };

  const loadLimits = async () => {
    const limits = await db.limits.toArray();
    const monthly = limits.find(l => l.period === 'monthly');
    const weekly = limits.find(l => l.period === 'weekly');
    if (monthly) setMonthlyLimit(monthly.amount);
    if (weekly) setWeeklyLimit(weekly.amount);
  };

  const saveLimits = async () => {
    await db.limits.clear();
    await db.limits.add({ period: 'monthly', amount: monthlyLimit });
    if (weeklyLimit) {
      await db.limits.add({ period: 'weekly', amount: parseFloat(weeklyLimit) });
    }
    setShowLimitModal(false);
  };

  const clearDatabase = async () => {
    if (window.confirm('⚠️ Are you sure? This will delete ALL your expenses, income, and limits. This action cannot be undone!')) {
      await db.expenses.clear();
      await db.limits.clear();
      setExpenses([]);
      setIncome([]);
      setMonthlyLimit(5000);
      setWeeklyLimit('');
      showAlertMessage('🗑️ Database cleared successfully!', 'success');
    }
  };

  const deleteItem = async (id) => {
    await db.expenses.delete(id);
    await loadData();
    setShowDeleteConfirm(false);
    showAlertMessage('✅ Item deleted successfully!', 'success');
  };

  const showAlertMessage = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.amount) {
      showAlertMessage('⚠️ Please fill in all fields!', 'warning');
      return;
    }

    const newEntry = {
      ...formData,
      amount: parseFloat(formData.amount),
      date: new Date(formData.date).toISOString()
    };
    
    await db.expenses.add(newEntry);
    await loadData();
    
    if (formData.type === 'expense') {
      checkSpendingLimits();
    }
    
    resetForm();
    setShowModal(false);
  };

  const handleEdit = async () => {
    if (!formData.title || !formData.amount) {
      showAlertMessage('⚠️ Please fill in all fields!', 'warning');
      return;
    }

    await db.expenses.update(editingItem.id, {
      title: formData.title,
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: new Date(formData.date).toISOString()
    });
    
    await loadData();
    setShowEditModal(false);
    setEditingItem(null);
    showAlertMessage('✅ Item updated successfully!', 'success');
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      amount: item.amount.toString(),
      category: item.category || 'need',
      type: item.type,
      date: new Date(item.date).toISOString().split('T')[0]
    });
    setShowEditModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      amount: '',
      category: 'need',
      type: 'expense',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const checkSpendingLimits = () => {
    const currentWeekSpent = getCurrentPeriodTotal('week');
    const currentMonthSpent = getCurrentPeriodTotal('month');
    
    const weeklyPercentage = weeklyLimit ? (currentWeekSpent / parseFloat(weeklyLimit)) * 100 : 0;
    const monthlyPercentage = (currentMonthSpent / monthlyLimit) * 100;
    const maxPercentage = Math.max(weeklyPercentage, monthlyPercentage);

    if (maxPercentage > 90) {
      showAlertMessage(`⚠️ Warning! You're at ${Math.round(maxPercentage)}% of your spending limit!`, 'warning');
    } else if (maxPercentage < 70 && maxPercentage > 0) {
      showAlertMessage(`🎉 Great job! You're saving ${Math.round(100 - maxPercentage)}% of your budget!`, 'success');
    }
  };

  const getCurrentPeriodTotal = (period) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    
    if (period === 'week') {
      const weekStart = getWeekStart(now);
      const weekEnd = getWeekEnd(weekStart);
      
      return expenses.filter(e => {
        const expDate = new Date(e.date);
        expDate.setHours(0, 0, 0, 0);
        return expDate >= weekStart && expDate < weekEnd;
      }).reduce((sum, item) => sum + item.amount, 0);
    } else {
      return expenses.filter(e => {
        const expDate = new Date(e.date);
        return expDate.getMonth() === now.getMonth() && 
               expDate.getFullYear() === now.getFullYear();
      }).reduce((sum, item) => sum + item.amount, 0);
    }
  };

  const handleCalendarSelect = (date) => {
    setSelectedDate(new Date(date));
    setShowCalendar(false);
  };

  const getFilteredIncome = () => {
    return income.filter(i => {
      const incDate = new Date(i.date);
      incDate.setHours(0, 0, 0, 0);
      if (viewPeriod === 'week') {
        const weekStart = getWeekStart(selectedDate);
        const weekEnd = getWeekEnd(weekStart);
        return incDate >= weekStart && incDate < weekEnd;
      } else if (viewPeriod === 'month') {
        return incDate.getMonth() === selectedDate.getMonth() && 
               incDate.getFullYear() === selectedDate.getFullYear();
      } else {
        return incDate.getFullYear() === selectedDate.getFullYear();
      }
    });
  };

  // Computed values
  const periodExpenses = getSelectedPeriodExpenses(expenses, selectedDate, viewPeriod);
  const periodTotal = periodExpenses.reduce((sum, item) => sum + item.amount, 0);
  const currentLimit = getCurrentLimit(viewPeriod, weeklyLimit, monthlyLimit);
  const savings = getSavings(expenses, selectedDate, viewPeriod, weeklyLimit, monthlyLimit);
  const savingsPercentage = Math.round((savings / currentLimit) * 100);
  const chartData = getChartData(expenses, selectedDate, viewPeriod);
  const dateRangeText = getDateRangeText(selectedDate, viewPeriod);
  const transactions = activeTab === 'expense' ? periodExpenses : getFilteredIncome();


  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-4 pb-24">
      <Alert message={alertMessage} type={alertType} show={showAlert} />

      <div className="max-w-4xl mx-auto">
        <Header 
          onAddClick={() => setShowModal(true)} 
          onClearDatabase={clearDatabase} 
        />

        <PeriodNavigation
          viewPeriod={viewPeriod}
          setViewPeriod={setViewPeriod}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          dateRangeText={dateRangeText}
          onCalendarClick={() => setShowCalendar(true)}
        />

        <SummaryCards
          currentLimit={currentLimit}
          periodTotal={periodTotal}
          savings={savings}
          savingsPercentage={savingsPercentage}
          viewPeriod={viewPeriod}
          onLimitClick={() => setShowLimitModal(true)}
        />

        <StatisticsChart chartData={chartData} />

        <TransactionList
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          transactions={transactions}
          onEdit={openEditModal}
          onDelete={(item) => {
            setEditingItem(item);
            setShowDeleteConfirm(true);
          }}
        />
      </div>

      {showCalendar && (
        <CalendarModal
          viewPeriod={viewPeriod}
          selectedDate={selectedDate}
          onSelect={handleCalendarSelect}
          onClose={() => setShowCalendar(false)}
        />
      )}

      {showModal && (
        <AddEditModal
          isEdit={false}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onClose={() => {
            setShowModal(false);
            resetForm();
          }}
        />
      )}

      {showEditModal && (
        <AddEditModal
          isEdit={true}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleEdit}
          onClose={() => {
            setShowEditModal(false);
            setEditingItem(null);
            resetForm();
          }}
        />
      )}

      {showDeleteConfirm && editingItem && (
        <DeleteConfirmModal
          item={editingItem}
          onConfirm={() => deleteItem(editingItem.id)}
          onCancel={() => {
            setShowDeleteConfirm(false);
            setEditingItem(null);
          }}
        />
      )}

      {showLimitModal && (
        <LimitSettingsModal
          monthlyLimit={monthlyLimit}
          setMonthlyLimit={setMonthlyLimit}
          weeklyLimit={weeklyLimit}
          setWeeklyLimit={setWeeklyLimit}
          onSave={saveLimits}
          onClose={() => setShowLimitModal(false)}
        />
      )}
    </div>
  );
};

export default ExpenseTracker;