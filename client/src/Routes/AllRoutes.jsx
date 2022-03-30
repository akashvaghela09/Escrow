import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './Home';
import { Dashboard } from './Dashboard';
import { ContactMe } from './ContactMe';
import { Header } from "../Component/Header";

const AllRoutes = () => {
    return (
        <div style={{width: "100%", height: "100%"}}>
            <Header />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route exact path="/contact-me" element={<ContactMe />} />
                <Route path="*" element={<h1>Page Not found</h1>} />
            </Routes>
        </div>
    )
}

export { AllRoutes }