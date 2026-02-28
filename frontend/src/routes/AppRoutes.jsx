import React from 'react';
<<<<<<< HEAD
import { Routes, Route, Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
=======
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
>>>>>>> SharvariFrontend
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import Home from '../pages/Home.jsx';
import Browse from '../pages/Browse.jsx';
import ItemDetails from '../pages/ItemDetails.jsx';
import MyBookings from '../pages/MyBookings.jsx';
import MyListings from '../pages/MyListings.jsx';
import AddListing from '../pages/AddListing.jsx';
import Login from '../pages/Login.jsx';
<<<<<<< HEAD
import SignUpPage from '../pages/SignUpPage.jsx';

/** Pages that should NOT have the shared Navbar/Footer (full-screen layouts) */
const BARE_ROUTES = ['/login', '/sign-up'];
=======
import Wishlist from '../pages/Wishlist.jsx';
import Messages from '../pages/Messages.jsx';
import Profile from '../pages/Profile.jsx';
import Notifications from '../pages/Notifications.jsx';
import Earnings from '../pages/Earnings.jsx';
import MapView from '../pages/MapView.jsx';
import NotFound from '../pages/NotFound.jsx';

/** Pages that should NOT have the shared Navbar/Footer (full-screen or modular layouts) */
const BARE_ROUTES = ['/login', '/map'];
>>>>>>> SharvariFrontend

function AppLayout({ children }) {
  const { pathname } = useLocation();
  const isBare = BARE_ROUTES.some((r) => pathname.startsWith(r));

  if (isBare) return <div className="min-h-screen">{children}</div>;
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">{children}</main>
      <Footer />
    </div>
  );
}

export default function AppRoutes() {
<<<<<<< HEAD
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/item/:id" element={<ItemDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Clerk auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUpPage />} />

        {/* Catch-all → home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
=======
    const location = useLocation();

    return (
        <AppLayout pathname={location.pathname}>
            <Routes>
                {/* Core Flows */}
                <Route path="/" element={<Home />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/item/:id" element={<ItemDetails />} />
                <Route path="/map" element={<MapView />} />

                {/* Account & Community */}
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/notifications" element={<Notifications />} />

                {/* Role-Specific Journeys */}
                <Route path="/my-bookings" element={<MyBookings />} />
                <Route path="/my-listings" element={<MyListings />} />
                <Route path="/list-item" element={<AddListing />} />
                <Route path="/earnings" element={<Earnings />} />

                {/* Auth */}
                <Route path="/login" element={<Login />} />

                {/* Legacy / Dashboard redirect */}
                <Route path="/dashboard" element={<Navigate to="/my-bookings" replace />} />

                {/* 404 & Catch-all */}
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
        </AppLayout>
    );
>>>>>>> SharvariFrontend
}
