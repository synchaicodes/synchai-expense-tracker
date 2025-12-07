import Dexie from 'dexie';

// Initialize IndexedDB
const db = new Dexie('ExpenseTrackerDB');
db.version(1).stores({
  expenses: '++id, title, amount, category, type, date',
  limits: '++id, period, amount'
});

export default db;