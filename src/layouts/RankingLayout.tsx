import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import { Meta } from 'src/components/Meta';
import TabCategory, { RankingCategory } from 'src/modules/ranking/TabCategory';

export default function RankingLayout({
  children,
  tab,
  title,
  description,
}: {
  children: React.ReactNode;
  tab: RankingCategory;
  title: string;
  description: string;
}) {
  return (
    <>
      <Meta title={title} description={description} />
      <Box py={2}>
        <Container>
          <Box mb={3}>
            <TabCategory active={tab} />
          </Box>
          <Box mb={5}>
            <Typography
              id="heading"
              variant="h2"
              component="h1"
              fontWeight={700}
              gutterBottom
              color="secondary.main"
              // textTransform="uppercase"
            >
              {title}
            </Typography>
            {description && <Typography maxWidth={580}>{description}</Typography>}
            {children}
          </Box>
        </Container>
      </Box>
    </>
  );
}
