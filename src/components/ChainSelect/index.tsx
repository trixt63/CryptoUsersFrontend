import { Avatar, MenuItem, SelectProps } from '@mui/material';
import Select from 'src/components/primitives/Select';
import { chainSelectConfigs } from 'src/configs/networkConfig';

export interface ChainSelectProps<T = unknown> extends SelectProps<T> {
  chains: string[];
  disableAll?: boolean;
}
export default function ChainSelect<T>({ chains, disableAll, ...props }: ChainSelectProps<T>) {
  return (
    <Select
      {...props}
      sx={{
        color: 'secondary.main',
        minWidth: 'fit-content',
        '.MuiSelect-select': {
          display: 'flex',
          alignItems: 'center',
        },
        '.MuiSvgIcon-root': {
          color: 'inherit',
        },
        ...props.sx,
      }}
      MenuProps={{
        PaperProps: {
          sx: { borderRadius: '6px 6px', minWidth: 180 },
        },
        ...props.MenuProps,
      }}
    >
      {!disableAll && (
        <MenuItem value={'all'}>
          <em>All Networks</em>
        </MenuItem>
      )}
      {chains.map((chainId) => {
        const chain = chainSelectConfigs[chainId];

        return (
          <MenuItem key={chain.chainId} value={chain.chainId}>
            <Avatar sx={{ width: 24, height: 24, mr: 1.5 }} src={chain.img} alt={chain.name} />
            <span>{chain.name}</span>
          </MenuItem>
        );
      })}
    </Select>
  );
}
