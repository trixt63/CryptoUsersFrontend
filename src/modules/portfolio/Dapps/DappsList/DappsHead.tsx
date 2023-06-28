import { Box, Typography } from '@mui/material';

export default function DappsHead({ width }: { width: string }) {
  const tableHeadData = [
    {
      id: 0,
      label: 'Token',
      firstCell: true,
    },
    {
      id: 1,
      label: 'Health',
    },
    {
      id: 2,
      label: 'Value',
    },
    {
      id: 3,
      label: 'Price',
    },
    {
      id: 4,
      label: 'APY',
    },
    {
      id: 5,
      label: 'APR',
    },
  ];

  return (
    <Box sx={{ display: { xs: 'flex', lg: 'block' } }}>
      <Box sx={{ bgcolor: 'background.primary', display: 'flex', px: 2, py: 2 }}>
        {tableHeadData.map((item) => (
          <Box
            key={item.id}
            sx={{
              bgcolor: item.firstCell ? 'background.primary' : 'transparent',
              position: item.firstCell ? 'sticky' : 'static',
              width: width,
              minWidth: '160px',
              left: 0,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
              }}
            >
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
