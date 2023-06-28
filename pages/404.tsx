import { Box, Button, Typography } from '@mui/material';
import Head from 'next/head';
import { Fragment } from 'react';

export default function NotFound() {
  return (
    <Fragment>
      <Head>
        <title>404 Page not Found</title>
      </Head>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h1" mb={1}>
          404
        </Typography>
        <Typography mb={3}>Oops, page not found.</Typography>
        <Button variant="outlined" color="info" size="small" href="/">
          Back to Home
        </Button>
      </Box>
    </Fragment>
  );
}
