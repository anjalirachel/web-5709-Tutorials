import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import ProfileList from './components/profileList';
import ProfileDetail from './components/profileDetail';
import './App.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/profiles" element={<ProfileList />} />
                <Route path="/profile/:id" element={<ProfileDetail />} />
            </Routes>
        </Router>
    );
};

export default App;
