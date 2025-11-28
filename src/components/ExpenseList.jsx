import React from 'react';

function ExpenseList({ expenses }) {
  return (
    <div className="expense-list-container card">
      <h2>Transaction History</h2>
      {expenses.length === 0 ? (
        <p className="no-expenses">No expenses added yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Paid By</th>
              <th>Split With</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(expense => (
              <tr key={expense.id}>
                <td>{expense.description}</td>
                <td>${expense.amount.toFixed(2)}</td>
                <td>**{expense.paidBy}**</td>
                <td>{expense.splitWith.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ExpenseList;