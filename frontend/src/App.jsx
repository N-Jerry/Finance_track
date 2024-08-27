import React from 'react';

import './index.css';
import AddTransaction from './components/AddTransaction';
import ViewTransactions from './components/ViewTransactions';

const App = () => {
  return (
    <div className="mx-4">
      <AddTransaction />
      <ViewTransactions />
    </div>
  );
};

export default App;
