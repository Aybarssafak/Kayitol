import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from '../src/page/signup/signup.js'

function App() {
  return (
    <Router>
      <Routes>
        <Route 
          path="/"
          element={<Signup/>}
        />
      </Routes>
    </Router>
  );
}

export default App;
