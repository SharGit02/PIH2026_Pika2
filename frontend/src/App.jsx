import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { RentalProvider } from './context/RentalContext.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <RentalProvider>
          <AppRoutes />
        </RentalProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}