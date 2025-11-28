import React from 'react';

function BalanceSummary({ balances }) {
  // Convert the balances object into an array of [user, balance] pairs
  const balanceArray = Object.entries(balances);

  return (
    <div className="balance-summary card">
      <h2>Balances Summary</h2>
      <ul>
        {balanceArray.map(([user, balance]) => (
          <li 
            key={user} 
            className={
              balance > 0 ? 'owes-you' : 
              (balance < 0 ? 'you-owe' : 'settled')
            }
          >
            **{user}** {balance > 0 && (
              <span className="positive">is owed **${balance.toFixed(2)}**</span>
            )}
            {balance < 0 && (
              <span className="negative">owes **${Math.abs(balance).toFixed(2)}**</span>
            )}
            {balance === 0 && (
              <span className="zero">is settled up</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BalanceSummary;