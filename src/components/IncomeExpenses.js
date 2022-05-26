import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

//Money formatter function
function moneyFormatter(num) {
  let p = num.toFixed(2).split('.');
  return (
    '$ ' +
    p[0]
      .split('')
      .reverse()
      .reduce(function (acc, num, i, orig) {
        return num === '-' ? acc : num + (i && !(i % 3) ? ',' : '') + acc;
      }, '') +
    '.' +
    p[1]
  );
}

export const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map(transaction => transaction.amount);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  );

  return (
    <div className="inc-exp-container">
        <div>
          <h4><svg xmlns="http://www.w3.org/2000/svg" width="30" height="25" fill="currentColor" class="bi bi-arrow-right" viewBox="1 2 16 16">
  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
</svg>Income</h4>
  <p className="money plus">{moneyFormatter(income)}</p>
        </div>
        <div>
          <h4><svg xmlns="http://www.w3.org/2000/svg" width="30" height="25" fill="currentColor" class="bi bi-arrow-left" viewBox="1 2 16 16">
  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
</svg>Expense</h4>
  <p className="money minus">{moneyFormatter(expense)}</p>
        </div>
      </div>
  )
}
