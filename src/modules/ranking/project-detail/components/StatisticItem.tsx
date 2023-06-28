import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import TooltipInfo from 'src/components/TooltipInfo';

interface StatisticItemProps {
  title: string;
  value: string;
  subValue?: React.ReactNode;
  tooltipInfo?: React.ReactNode;
}

export default function StatisticItem(props: StatisticItemProps) {
  const { title, value, subValue, tooltipInfo } = props;
  return (
    <Paper sx={{ p: 3, height: '100%' }} variant="border">
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', mr: '4px' }}>
          {title}
        </Typography>
        {tooltipInfo && (
          <TooltipInfo title={tooltipInfo} iconProps={{ fontSize: 'small', sx: { color: 'text.secondary' } }} />
        )}
      </Box>
      <Typography variant="h3" sx={{ color: 'text.primary' }}>
        {value}
      </Typography>
      {subValue}
    </Paper>
  );
}
