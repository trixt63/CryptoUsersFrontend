import { Box } from '@mui/material';
import React from 'react';
import Header from './components/Header';

export const VisualizationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <Box component="main" sx={{ flexGrow: 1, minHeight: '100vh' }}>
        {children}
      </Box>
    </>
  );
};
