import { Paper, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { useTokenHealthContext } from '../context';
import { tokenHistoryTitles } from '../detail-score';
import SelectedTypeDrawer from './SelectedTypeDrawer';
import TokenHealthHistoryChart from './TokenHealthHistoryChart';

export default function TokenHealthHistory() {
  const { tokenHistory } = useTokenHealthContext();

  const [selectedTypes, setSelectedTypes] = useState(['credit_score_history']);

  const series = useMemo(() => {
    // eslint-disable-next-line prefer-const
    let result = [];
    if (tokenHistory) {
      let index = 0;
      for (const _type of selectedTypes) {
        result.push({
          name: tokenHistoryTitles[_type],
          data: tokenHistory[_type].map((item) => [Number(item[0]) * 1000, item[1]]),
          type: 'line',
          yAxis: index,
        });
        index++;
      }
    }
    return result;
  }, [tokenHistory, selectedTypes]);
  return (
    <Paper
      sx={{
        height: 340,
        mt: 4,
        borderRadius: '10px',
        position: 'relative',
        p: 3,
      }}
    >
      <Typography sx={{ fontSize: '20px', mr: '4px', fontWeight: 600 }}>Token Health History</Typography>
      <SelectedTypeDrawer selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} />
      <TokenHealthHistoryChart series={series} />
    </Paper>
  );
}
