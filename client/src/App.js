import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cover from './Pages/Cover';
import CreateAccount from './Pages/CreateAccount';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Cover />} />
          <Route path="/createAccount" element={<CreateAccount />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
