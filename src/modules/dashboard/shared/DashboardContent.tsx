import { Box, Button, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { Link } from 'src/components/primitives/Link';

export function DashboardContentWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        rowGap: 2,
        columnGap: 3,
        '.dashboard-content': {
          flexGrow: 1,
          order: { xs: 2, md: 1 },
          width: { xs: '100%', md: '75%' },
        },
        '.dashboard-nav': {
          order: { xs: 1, md: 2 },
          width: { xs: '100%', md: '25%' },
        },
      }}
    >
      {children}
    </Box>
  );
}
export function DashboardContent({ children }: { children: React.ReactNode }) {
  return (
    <Box className="dashboard-content">
      <Box maxWidth={1000}>{children}</Box>
    </Box>
  );
}

export function DashboardNav({ children }: { children: React.ReactNode }) {
  return (
    <Stack
      className="dashboard-nav hide-scrollbar"
      // direction={{ xs: 'row', md: 'column' }}
      spacing={1}
      sx={{
        maxWidth: { md: '230px' },
        ml: 'auto',
        display: 'flex',
        flexDirection: { xs: 'row', md: 'column' },
        flexWrap: 'wrap',
      }}
    >
      {children}
    </Stack>
  );
}

export function DashboardNavItem({
  title,
  link,
  active = (asPath, link) => asPath === link,
}: {
  title: string;
  link: string;
  active?: (asPath: string, link: string) => boolean;
}) {
  const router = useRouter();
  const isActive = active(router.asPath, link);

  return (
    <Button
      className="dashboard-nav-item"
      fullWidth
      LinkComponent={Link}
      href={link}
      variant="contained"
      color={isActive ? 'primary' : 'secondary'}
      sx={{ padding: '12px', minWidth: 120, fontWeight: isActive ? 600 : 500 }}
    >
      {title}
    </Button>
  );
}
