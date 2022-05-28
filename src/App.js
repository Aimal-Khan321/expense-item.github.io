import React, { useEffect, useState } from 'react';
import Expenses from './components/Expenses/Expenses';
import NewExpense from './components/NewExpenses/NewExpense';
import './index.css'

let DUMMY_EXPENSE = [];

function App() {

  const [expenses, setExpenses] = useState(DUMMY_EXPENSE);

  function fetchData() {
    fetch('http://localhost/sample-api/api/read.php')
      .then(response => {
        return response.json();
      })
      .then(data => {
        // console.log(data);
        setExpenses(data);
      })
  }

  useEffect(() => {
    fetchData();
  }, [])

  const addExpenseData = (expense) => {
    fetch('localhost/sample-api/api/create.php', {
      method: 'POST',
      body: JSON.stringify(expense),
      headers: {
        'content-Type': 'application/json'
      }.then(
        response => {
          fetchData();
        })
    });
  }

  return (
    <div className="App">
      <NewExpense onAddExpense={addExpenseData} />
      <Expenses item={expenses} />

    </div>
  );
}

export default App;
