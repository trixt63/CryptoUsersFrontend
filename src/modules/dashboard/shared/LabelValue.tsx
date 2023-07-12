import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

export default function LabelValue({ label, value }: { label: string | ReactNode; value: ReactNode }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'baseline', py: 1, '&:not(:last-of-type)': { mb: 0 } }}>
      <Box sx={{ width: { xs: '40%', sm: '30%' } }}>
        <Typography className="text-truncate" sx={{ fontWeight: 500 }} color="text.secondary">
          {label}
        </Typography>
      </Box>
      <Typography component="div" sx={{ fontWeight: 500, display: 'flex' }}>
        {value}
      </Typography>
    </Box>
  );
}
