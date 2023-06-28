import { Box, Stack, Typography } from '@mui/material';

export default function ColorDescription() {
  const colorDescription = [
    {
      id: 0,
      type: 'project',
      name: 'Project',
      color: '#FFD867',
    },
    {
      id: 1,
      type: 'contract',
      name: 'Contract',
      color: '#846AE0',
    },
    {
      id: 2,
      type: 'token',
      name: 'Token',
      color: '#3AD9DD',
    },
    {
      id: 3,
      type: 'wallet',
      name: 'Wallet',
      color: '#C5C5C5',
    },
  ];
  return (
    <Stack direction="row" spacing={2}>
      {colorDescription.map((item) => (
        <Box key={item.id} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ color: 'info.light', minWidth: '46px' }}>
            {item.name}
          </Typography>
          <Box sx={{ backgroundColor: item.color, width: 10, height: 10, borderRadius: '50%', ml: 0.5 }} />
        </Box>
      ))}
    </Stack>
  );
}
