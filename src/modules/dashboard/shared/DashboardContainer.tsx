import { Box, Container } from '@mui/material';
import React from 'react';

export default function DashboardContainer({ children }: { children: React.ReactNode }) {
  return (
    <Box pt={2} pb={4}>
      <Container>{children}</Container>
    </Box>
  );
}
