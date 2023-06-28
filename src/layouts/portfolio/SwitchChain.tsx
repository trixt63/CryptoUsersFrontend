import { SelectChangeEvent } from '@mui/material';
import ChainSelect from 'src/components/ChainSelect';
import { SUPPORTED_CHAINS } from 'src/configs/api';
import { useAppDispatch, useAppSelector } from 'src/redux/hook';
import { updateChain } from 'src/redux/portfolio/config-slice';

export default function SwitchChain() {
  const chain = useAppSelector((state) => state.portfolio.configSlice.chainId);
  const dispatch = useAppDispatch();

  const handleSelect = (ev: SelectChangeEvent) => {
    dispatch(updateChain({ chain: ev.target.value }));
  };

  return <ChainSelect chains={SUPPORTED_CHAINS} onChange={handleSelect} value={chain} />;
}
