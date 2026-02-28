import React, { createContext, useContext, useState, useCallback } from 'react';

const RentalContext = createContext(null);

export function RentalProvider({ children }) {
    // Active borrow requests the logged-in user has made
    const [activeRequests, setActiveRequests] = useState([]);
    // Items the user has listed
    const [myListings, setMyListings] = useState([]);

    const addRequest = useCallback((item, dates) => {
        const req = {
            id: `req-${Date.now()}`,
            itemId: item.id,
            itemTitle: item.title,
            itemImage: item.image,
            pricePerDay: item.pricePerDay,
            ownerName: item.ownerName,
            startDate: dates.startDate,
            endDate: dates.endDate,
            status: 'Pending',
            createdAt: new Date().toISOString(),
        };
        setActiveRequests(prev => [req, ...prev]);
        return req;
    }, []);

    const updateRequestStatus = useCallback((reqId, status) => {
        setActiveRequests(prev =>
            prev.map(r => r.id === reqId ? { ...r, status } : r)
        );
    }, []);

    const addListing = useCallback((item) => {
        setMyListings(prev => [{ ...item, id: `listing-${Date.now()}` }, ...prev]);
    }, []);

    return (
        <RentalContext.Provider value={{
            activeRequests,
            myListings,
            addRequest,
            updateRequestStatus,
            addListing,
        }}>
            {children}
        </RentalContext.Provider>
    );
}

export function useRental() {
    const ctx = useContext(RentalContext);
    if (!ctx) throw new Error('useRental must be used within RentalProvider');
    return ctx;
}
