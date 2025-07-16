import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './features/auth/Login';
import ToastWrapper from './components/ToastWrapper';
import Dashboard from './features/dashboard/Dashboard';
import Chatroom from './features/chatroom/Chatroom';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <ToastWrapper />
       <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chatroom/:id" element={<Chatroom />} />
      </Routes>
    </Router>
  );
}

export default App;
