import { Box, Tab, Tabs as MuiTabs, Theme } from '@mui/material';
import React, { useState } from 'react';
import { Range } from 'src/global';
import { TopDeFiTable, TopDerivativesTable, TopNFTsTable, TopSpotTable, TopTokensTable } from './TopTable';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`ranking-tabpanel-${index}`}
      aria-labelledby={`ranking-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `ranking-tab-${index}`,
    'aria-controls': `ranking-tabpanel-${index}`,
  };
}

export default function RankingTabs() {
  const [activeTab, setActiveTab] = useState<Range<0, 4>>(0);

  const handleTabChange = (_: unknown, tab: Range<0, 4>) => {
    setActiveTab(tab);
  };

  return (
    <>
      <MuiTabs
        variant="scrollable"
        scrollButtons="auto"
        value={activeTab}
        onChange={handleTabChange}
        aria-label="Ranking tabs DeFi, NFTs, Tokens, Spots, Derivatives"
        sx={{
          '.MuiTab-root': (theme: Theme) => ({
            fontSize: theme.typography.subtitle1.fontSize,
            fontWeight: 500,
            py: 1.5,
            color: theme.palette.secondary.main,
            '&.Mui-selected': {
              fontWeight: 700,
              color: theme.palette.primary.main,
            },
          }),
          '.MuiTabs-indicator': {
            background: 'linear-gradient(to right, #EDF8FF, #469DD6)',
            height: 4,
            borderRadius: '16px',
          },
        }}
      >
        <Tab label="DeFi" {...a11yProps(0)} />
        <Tab label="NFTs" {...a11yProps(1)} />
        <Tab label="Tokens" {...a11yProps(2)} />
        <Tab label="Spots" {...a11yProps(3)} />
        <Tab label="Derivatives" {...a11yProps(4)} />
      </MuiTabs>
      <TabPanel index={0} value={activeTab}>
        <TopDeFiTable />
      </TabPanel>
      <TabPanel index={1} value={activeTab}>
        <TopNFTsTable />
      </TabPanel>
      <TabPanel index={2} value={activeTab}>
        <TopTokensTable />
      </TabPanel>
      <TabPanel index={3} value={activeTab}>
        <TopSpotTable />
      </TabPanel>
      <TabPanel index={4} value={activeTab}>
        <TopDerivativesTable />
      </TabPanel>
    </>
  );
}
