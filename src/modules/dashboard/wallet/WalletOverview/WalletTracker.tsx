import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { ApiDashboardAsset } from 'src/services/_old/dashboard-api/data-types';
import { CapitalizeFirstLetter } from '../../utils';

export default function WalletTracker({ data }: { data?: ApiDashboardAsset | undefined }) {
  if (!data) {
    return (
      <Typography variant="body2" fontWeight={700} color="secondary.main">
        N/A
      </Typography>
    );
  } else {
    return (
      <Link href={`/${data.type}/${data.id}`}>
        <Box
          sx={{
            cursor: 'pointer',
          }}
        >
          <Typography variant="body2" fontWeight={700} color="secondary.main">
            {CapitalizeFirstLetter(data.type)} {data.name} {data.symbol ? data.symbol.toUpperCase() : ''}
          </Typography>
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            Tracker
          </Typography>
        </Box>
      </Link>
    );
  }
}
