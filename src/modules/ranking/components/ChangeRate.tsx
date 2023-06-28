import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Box } from '@mui/material';
import { formatNumber } from '@travalendingpool/utils';
import { NoData } from './common';

interface ChangeRateProps {
  rate: number;
}

export default function ChangeRate({ rate }: ChangeRateProps) {
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        color: rate > 0 ? 'success.main' : rate < 0 ? 'error.main' : 'inherit',
      }}
    >
      {rate > 0 && <ArrowDropUpIcon />}
      {rate < 0 && <ArrowDropDownIcon />}
      {rate == 0 ? <NoData /> : formatNumber(Math.abs(rate), { fractionDigits: 2, suffix: '%', fallback: <NoData /> })}
    </Box>
  );
}
