import { Box } from '@mui/material';

export const NoData = () => {
  return (
    <Box sx={{ display: 'inline-flex', px: 0.5, bgcolor: 'background.primary', borderRadius: 1 }}>
      <span style={{ letterSpacing: 1.1 }}>--</span>
    </Box>
  );
};
