import React, { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import BalanceSummary from './components/BalanceSummary';

const INITIAL_EXPENSES = [
  { id: 1, description: 'Dinner', amount: 30, paidBy: 'Alice', splitWith: ['Bob', 'Charlie'] },
  { id: 2, description: 'Groceries', amount: 50, paidBy: 'Bob', splitWith: ['Alice'] },
];

function App() {
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);
  const [balances, setBalances] = useState({});

  // Define the fixed list of users
  const users = ['Alice', 'Bob', 'Charlie', 'David'];

  // Effect to calculate balances whenever expenses change
  useEffect(() => {
    const calculateBalances = (expList, userList) => {
      // Initialize balances for all users to 0
      const newBalances = userList.reduce((acc, user) => ({ ...acc, [user]: 0 }), {});

      expList.forEach(expense => {
        const { amount, paidBy, splitWith } = expense;
        // Total people sharing the cost (Payer + SplitWith list)
        const totalPeople = splitWith.length + 1; 
        const share = amount / totalPeople;

        // 1. The person who paid is owed the amount minus their own share
        newBalances[paidBy] += (amount - share);

        // 2. Each person in the splitWith list owes their share
        splitWith.forEach(person => {
          newBalances[person] -= share;
        });
      });
      return newBalances;
    };
    
    setBalances(calculateBalances(expenses, users));
  }, [expenses]);

  // Function to add a new expense
  const addExpense = (newExpense) => {
    setExpenses(prevExpenses => [
      ...prevExpenses,
      { ...newExpense, id: Date.now() }
    ]);
  };

  return (
    <div className="app-container">
      <h1>💰 Expense Splitter</h1>
      
      <div className="content-grid">
        {/* Pass down the users list for dropdowns */}
        <ExpenseForm onAddExpense={addExpense} users={users} />
        {/* Pass down the calculated balances */}
        <BalanceSummary balances={balances} />
      </div>
      
      {/* Display the transaction history */}
      <ExpenseList expenses={expenses} />
    </div>
  );
}

export default App;