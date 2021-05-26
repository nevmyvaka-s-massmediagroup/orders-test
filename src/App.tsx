import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import EnhancedTable from './components/Table/OrderTable';

function App() {
  return (
    <div className="App">
      <EnhancedTable />
    </div>
  );
}

export default App;
