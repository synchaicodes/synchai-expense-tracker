import { getWeekStart, getWeekEnd } from './dateUtils';

export const getSelectedPeriodExpenses = (expenses, selectedDate, viewPeriod) => {
  if (viewPeriod === 'week') {
    const weekStart = getWeekStart(selectedDate);
    const weekEnd = getWeekEnd(weekStart);
    
    return expenses.filter(e => {
      const expDate = new Date(e.date);
      expDate.setHours(0, 0, 0, 0);
      return expDate >= weekStart && expDate < weekEnd;
    });
  } else if (viewPeriod === 'month') {
    return expenses.filter(e => {
      const expDate = new Date(e.date);
      return expDate.getMonth() === selectedDate.getMonth() && 
             expDate.getFullYear() === selectedDate.getFullYear();
    });
  } else {
    return expenses.filter(e => {
      const expDate = new Date(e.date);
      return expDate.getFullYear() === selectedDate.getFullYear();
    });
  }
};

export const getCurrentLimit = (viewPeriod, weeklyLimit, monthlyLimit) => {
  if (viewPeriod === 'week' && weeklyLimit) {
    return parseFloat(weeklyLimit);
  } else if (viewPeriod === 'month') {
    return monthlyLimit;
  } else if (viewPeriod === 'year') {
    return monthlyLimit * 12;
  }
  return monthlyLimit;
};

export const getSavings = (expenses, selectedDate, viewPeriod, weeklyLimit, monthlyLimit) => {
  const periodExpenses = getSelectedPeriodExpenses(expenses, selectedDate, viewPeriod);
  const spent = periodExpenses.reduce((sum, item) => sum + item.amount, 0);
  const limit = getCurrentLimit(viewPeriod, weeklyLimit, monthlyLimit);
  return Math.max(0, limit - spent);
};

export const getChartData = (expenses, selectedDate, viewPeriod) => {
  const periodExpenses = getSelectedPeriodExpenses(expenses, selectedDate, viewPeriod);
  let data = [];

  if (viewPeriod === 'week') {
    const weekStart = getWeekStart(selectedDate);
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(date.getDate() + i);
      date.setHours(0, 0, 0, 0);
      
      const dayExpenses = periodExpenses.filter(e => {
        const expDate = new Date(e.date);
        expDate.setHours(0, 0, 0, 0);
        return expDate.getTime() === date.getTime();
      });
      
      data.push({
        name: date.toLocaleDateString('en-US', { weekday: 'short' }),
        amount: dayExpenses.reduce((sum, e) => sum + e.amount, 0)
      });
    }
  } else if (viewPeriod === 'month') {
    const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
    const weeksInMonth = Math.ceil(daysInMonth / 7);
    
    for (let i = 0; i < weeksInMonth; i++) {
      const weekStart = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i * 7 + 1);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 7);
      
      const weekExpenses = periodExpenses.filter(e => {
        const expDate = new Date(e.date);
        return expDate >= weekStart && expDate < weekEnd;
      });
      
      data.push({
        name: `Week ${i + 1}`,
        amount: weekExpenses.reduce((sum, e) => sum + e.amount, 0)
      });
    }
  } else {
    for (let i = 0; i < 12; i++) {
      const monthExpenses = periodExpenses.filter(e => {
        const expDate = new Date(e.date);
        return expDate.getMonth() === i && expDate.getFullYear() === selectedDate.getFullYear();
      });
      const monthName = new Date(selectedDate.getFullYear(), i, 1).toLocaleDateString('en-US', { month: 'short' });
      data.push({
        name: monthName,
        amount: monthExpenses.reduce((sum, e) => sum + e.amount, 0)
      });
    }
  }
  return data;
};