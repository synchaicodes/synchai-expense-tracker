export const getWeekStart = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay();
  const diff = d.getDate() - day;
  const weekStart = new Date(d.setDate(diff));
  return weekStart;
};

export const getWeekEnd = (weekStart) => {
  const end = new Date(weekStart);
  end.setDate(end.getDate() + 7);
  end.setHours(0, 0, 0, 0);
  return end;
};

export const getDateRangeText = (selectedDate, viewPeriod) => {
  if (viewPeriod === 'week') {
    const weekStart = getWeekStart(selectedDate);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    return `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  } else if (viewPeriod === 'month') {
    return selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  } else {
    return selectedDate.getFullYear().toString();
  }
};