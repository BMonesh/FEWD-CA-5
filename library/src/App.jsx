import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/NavBar';
import Books from './Components/Books';
import Register from './Components/Register';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

const MainPage = () => (
  <div>
    <Navbar />
    <Books />
  </div>
);

const RegisterPage = () => (
  <div>
    <Register />
  </div>
);

export default App;
