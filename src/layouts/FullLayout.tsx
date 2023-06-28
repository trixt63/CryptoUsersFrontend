import { Box } from '@mui/material';
import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';

export default function FullLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', pt: '64px' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
