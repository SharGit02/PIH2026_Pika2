import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import Home from '../pages/Home.jsx';
import Browse from '../pages/Browse.jsx';
import ItemDetails from '../pages/ItemDetails.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import Login from '../pages/Login.jsx';

/** Pages that should NOT have the shared Navbar/Footer (full-screen layouts) */
const BARE_ROUTES = ['/login'];

function AppLayout({ children, pathname }) {
    const isBare = BARE_ROUTES.includes(pathname);
    if (isBare) return <>{children}</>;
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    );
}

export default function AppRoutes() {
    return (
        <Routes>
            {/* Standard layout */}
            <Route
                path="/"
                element={
                    <AppLayout pathname="/">
                        <Home />
                    </AppLayout>
                }
            />
            <Route
                path="/browse"
                element={
                    <AppLayout pathname="/browse">
                        <Browse />
                    </AppLayout>
                }
            />
            <Route
                path="/item/:id"
                element={
                    <AppLayout pathname="/item">
                        <ItemDetails />
                    </AppLayout>
                }
            />
            <Route
                path="/dashboard"
                element={
                    <AppLayout pathname="/dashboard">
                        <Dashboard />
                    </AppLayout>
                }
            />

            {/* Bare layout (no nav/footer) */}
            <Route
                path="/login"
                element={
                    <AppLayout pathname="/login">
                        <Login />
                    </AppLayout>
                }
            />

            {/* Catch-all → home */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
