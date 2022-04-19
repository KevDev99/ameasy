import React from 'react';

// Components
import Header from './components/Header.jsx';

// Pages
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import { Routes, Route, } from "react-router-dom";

function App() {
  return (
    <>
      <Header  />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </main>
    </>
  );
}

export default App;