import React from 'react';
import Cover from './Pages/Cover'
import { Routes, Route} from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Cover />} />
      </Routes>
    </div>
  );
}

export default App;