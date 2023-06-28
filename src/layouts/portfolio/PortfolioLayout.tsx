import { Box, Container, Hidden, Typography } from '@mui/material';
import React from 'react';
import RequireAuthentication from 'src/components/auth/RequireAuthentication';
import { Meta } from 'src/components/Meta';
import SideBar from 'src/modules/portfolio/SideBar';
import SwitchChain from './SwitchChain';

interface PortfolioTitleProps {
  title: string;
  description: string;
}

function PortfolioTitle(props: PortfolioTitleProps) {
  const { title, description } = props;
  return (
    <Box mb={3}>
      <Typography variant="h1">{title}</Typography>
      <Typography sx={{ mt: { xs: 2, sm: 0 } }}>{description}</Typography>
      <Box sx={{ mx: -2, mt: 1 }}>
        <SwitchChain />
      </Box>
    </Box>
  );
}

interface PortfolioLayoutProps extends PortfolioTitleProps {
  children: React.ReactNode;
}

export default function PortfolioLayout({ children, title, description }: PortfolioLayoutProps) {
  return (
    <>
      <Meta title={title} description={description} />
      <Box py={2}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', position: 'relative', justifyContent: 'space-between' }}>
            <Box sx={{ maxWidth: 1000, width: '100%' }}>
              <PortfolioTitle title={title} description={description} />
              <RequireAuthentication>{children}</RequireAuthentication>
            </Box>
            <Hidden mdDown implementation="css">
              <Box sx={{ width: 250, pl: 2.5 }}>
                <SideBar />
              </Box>
            </Hidden>
          </Box>
        </Container>
      </Box>
    </>
  );
}
