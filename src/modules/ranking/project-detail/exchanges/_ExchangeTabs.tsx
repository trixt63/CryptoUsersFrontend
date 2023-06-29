import { Box, Tab, Theme, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { StyledRankingTab } from '../../TabCategory';
import ProjectTokens from '../components/ProjectTokens';
import ExchangeStats from './ExchangeStats';

export default function ExchangeTabs() {
  const [activeTab, setActiveTab] = useState<string>('exchangesStats');
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const handleTabChange = (_: unknown, tab: string) => {
    setActiveTab(tab);
  };
  return (
    <Box sx={{ mt: 2 }}>
      {/*<StyledRankingTab value={activeTab} variant="scrollable" scrollButtons="auto" onChange={handleTabChange}>*/}
      {/*  <Tab value="exchangesStats" label={'Exchanges Stats'} />*/}
      {/*  <Tab value="about" label={'About'} />*/}
      {/*  {smDown && <Tab value="tokens" label={'Tokens'} />}*/}
      {/*</StyledRankingTab>*/}
      <Box>
        <ExchangeStats />
        {/*{activeTab === 'exchangesStats' && <ExchangeStats />}*/}
        {/*{activeTab === 'about' && <Box sx={{ mt: 2, color: 'text.secondary' }}>Coming soon...</Box>}*/}
        {/*{smDown && activeTab === 'tokens' && <ProjectTokens />}*/}
      </Box>
    </Box>
  );
}
