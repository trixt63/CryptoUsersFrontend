import { MenuItem, SelectChangeEvent } from '@mui/material';
import Select from 'src/components/primitives/Select';
import useSearchParams from 'src/hooks/useSearchParams';
import { useRankingContext } from '../context';

export const times: { [k: string]: number } = {
  '24h': 86400,
  '7d': 86400,
  '1m': 86400,
  '1y': 86400,
};

const TimeSelect = () => {
  const { t } = useRankingContext();
  const { set } = useSearchParams();

  const handleSelect = (ev: SelectChangeEvent) => {
    if (ev.target.value !== t) {
      set('t', '' + ev.target.value);
    }
  };

  return (
    <Select
      value={t ?? '86400'}
      onChange={handleSelect}
      sx={{ bgcolor: 'background.paper', color: 'secondary.main', width: 100 }}
      MenuProps={{
        PaperProps: {
          sx: { borderRadius: '6px 6px', minWidth: 'fit-content' },
        },
      }}
    >
      <MenuItem value={86400}>24H</MenuItem>
      <MenuItem value={86400 * 7}>7D</MenuItem>
      <MenuItem value={86400 * 30}>1M</MenuItem>
      <MenuItem value={86400 * 365}>1Y</MenuItem>
    </Select>
  );
};

export default TimeSelect;
