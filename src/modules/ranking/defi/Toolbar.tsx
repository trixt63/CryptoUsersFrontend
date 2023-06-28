import { Box, MenuItem, SelectChangeEvent } from '@mui/material';
import Select from 'src/components/primitives/Select';
import useSearchParams from 'src/hooks/useSearchParams';
import ChainSelect from '../components/ChainSelect';
// import TimeSelect from '../components/TimeSelect';
import { useRankingContext } from '../context';
import { categories } from './configs';

const CategorySelect = () => {
  const { c } = useRankingContext();
  const { set, remove } = useSearchParams();

  const handleSelect = (ev: SelectChangeEvent) => {
    if (c !== ev.target.value) {
      if (ev.target.value === 'all') {
        remove('c');
      } else {
        set('c', ev.target.value);
      }
    }
  };

  return (
    <Select
      value={c ?? 'all'}
      onChange={handleSelect}
      sx={{ bgcolor: 'background.paper', color: 'secondary.main', width: 140 }}
      displayEmpty
      renderValue={(value) => {
        if (value === 'all') return 'Categories';
        return value;
      }}
      MenuProps={{
        PaperProps: {
          sx: { borderRadius: '6px 6px', minWidth: 140, maxHeight: 300 },
          className: 'hide-scrollbar',
        },
      }}
    >
      <MenuItem value="all">
        <em>All</em>
      </MenuItem>
      {categories.map((item) => (
        <MenuItem key={item.name} value={item.name}>
          {item.name}
        </MenuItem>
      ))}
    </Select>
  );
};

export default function Toolbar() {
  return (
    <Box
      className="hide-scrollbar"
      sx={{
        py: 2,
        overflow: 'auto',
        display: 'flex',
        justifyContent: { xs: 'none', sm: 'flex-end' },
        '>:not(:last-of-type)': { mr: 2 },
      }}
    >
      <ChainSelect />
      <CategorySelect />
      {/* <TimeSelect /> */}
    </Box>
  );
}
