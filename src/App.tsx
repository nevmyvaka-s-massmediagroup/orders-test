import React from 'react';
import './App.css';
import { OrderListContainer } from './components/Table/OrderListContainer';
import EnhancedTable from './components/Table/OrderTable';

function App() {
  return (
    <div className="App">
      <OrderListContainer />
    </div>
  );
}

export default App;
