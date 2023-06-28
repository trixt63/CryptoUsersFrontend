import { SelectChangeEvent } from '@mui/material';
import GlobalChainSelect from 'src/components/ChainSelect';
import { SUPPORTED_CHAINS } from 'src/configs/api';
import useSearchParams from 'src/hooks/useSearchParams';
import { useRankingContext } from '../context';

export default function ChainSelect() {
  const { chain } = useRankingContext();
  const { set, remove } = useSearchParams();

  const handleSelect = (ev: SelectChangeEvent) => {
    if (ev.target.value !== chain) {
      if (SUPPORTED_CHAINS.includes(ev.target.value)) {
        set('chain', ev.target.value);
      } else {
        remove('chain');
      }
    }
  };

  return (
    <GlobalChainSelect
      value={chain ?? 'all'}
      chains={SUPPORTED_CHAINS}
      onChange={handleSelect}
      sx={{ bgcolor: 'background.paper' }}
    />
  );
}
