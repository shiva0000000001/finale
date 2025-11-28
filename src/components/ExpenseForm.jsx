import React, { useState } from 'react';

function ExpenseForm({ onAddExpense, users }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState(users[0] || '');
  const [splitWith, setSplitWith] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalAmount = parseFloat(amount);
    
    // Basic validation
    if (!description || finalAmount <= 0 || splitWith.length === 0) {
      alert('Please enter a description, a valid amount, and select at least one person to split with.');
      return;
    }

    const newExpense = {
      description,
      amount: finalAmount,
      paidBy,
      // Ensure the payer is not duplicated in the splitWith array
      splitWith: splitWith.filter(user => user !== paidBy), 
    };

    onAddExpense(newExpense);
    
    // Reset form state
    setDescription('');
    setAmount('');
    setPaidBy(users[0] || '');
    setSplitWith([]);
  };

  const handleSplitChange = (user) => {
    setSplitWith(prev => 
      prev.includes(user)
        ? prev.filter(u => u !== user) // Remove if already present
        : [...prev, user]             // Add if not present
    );
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form card">
      <h2>Add New Expense</h2>
      
      <input
        type="text"
        placeholder="Description (e.g., Lunch, Taxi)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        min="0.01"
        step="0.01"
        required
      />
      
      <label>Paid By:</label>
      <select value={paidBy} onChange={(e) => setPaidBy(e.target.value)}>
        {users.map(user => (
          <option key={user} value={user}>{user}</option>
        ))}
      </select>

      <label>Split With (Check others):</label>
      <div className="checkbox-group">
        {users.map(user => (
          <label key={user} className={paidBy === user ? 'disabled-split' : ''}>
            <input
              type="checkbox"
              checked={splitWith.includes(user)}
              onChange={() => handleSplitChange(user)}
              disabled={paidBy === user}
            />
            {user}
          </label>
        ))}
      </div>

      <button type="submit">Add Expense</button>
    </form>
  );
}

export default ExpenseForm;