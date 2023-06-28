import { Box, TableSortLabel, Typography } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

interface TokenSHeadProps {
  width: string;
  sortUpdate: (key: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sortType: any;
  sortKey: string;
}

const tableHeadConfig = [
  {
    title: 'Token',
    name: 'name',
    firstCell: true,
  },
  {
    title: 'Health',
    name: 'tokenHealth',
  },
  {
    title: 'Balance',
    name: 'amount',
    sort: 'valueInUSD',
    isSort: true,
  },
  {
    title: 'Price',
    name: 'price',
  },
  {
    title: 'Price in the last 7 days',
    name: 'priceLast7Days',
  },
];

export default function TokensHead(props: TokenSHeadProps) {
  const { width, sortUpdate, sortType, sortKey } = props;
  const minWidth = 190;

  const onCellClick = (key?: string) => {
    if (key) sortUpdate(key);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ bgcolor: 'background.primary', display: 'flex', px: 2, width: { lg: '100%' } }}>
        {tableHeadConfig.map((item, index) => {
          const isSortActive = sortKey === item.name;
          return (
            <TableSortLabel
              key={index}
              sx={{
                py: 2,
                width: width,
                minWidth: minWidth,
                position: item.firstCell ? 'sticky' : 'static',
                left: 0,
                bgcolor: 'background.primary',
                display: 'flex',
                alignItems: 'center',
                cursor: item.sort && 'pointer',
              }}
              onClick={() => onCellClick(item.sort)}
              active={item.isSort}
              direction={sortType}
            >
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {item.title}
              </Typography>
              {isSortActive && (
                <Box component="span" sx={visuallyHidden}>
                  {sortType === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              )}
            </TableSortLabel>
          );
        })}
      </Box>
    </Box>
  );
}
