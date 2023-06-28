/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  alpha,
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableContainerProps,
  TableHead,
  TableProps,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import React from 'react';
import useSearchParams from 'src/hooks/useSearchParams';
import { useRankingPaginationContext } from 'src/modules/ranking/context';

export type Order = 'asc' | 'desc';
export type Row = Record<string, any>;
export type RankingTableColumn<K, D> = {
  title: string;
  name: K;
  sortable?: boolean;
  comparator?: (a: D, b: D, order: Order) => number;
  cellProps?: TableCellProps;
  headProps?: TableCellProps;
  sticky?: boolean;
  render?: (row: D, key: keyof D) => React.ReactNode;
};

export interface RankingTableProps<D = Row> {
  columns: RankingTableColumn<keyof D, D>[];
  rows: Array<D>;
  tableProps?: TableProps;
  tableContainerProps?: TableContainerProps;
  orderByKeyMap?: Partial<Record<keyof D, string>>;
}

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  '.MuiTableCell-head': {
    backgroundColor: '#0E1D27',
    // padding: theme.spacing(1.5, 2),
    color: theme.palette.text.secondary,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:not(:first-of-type)': {
    borderTop: '1px solid',
    borderColor: alpha(theme.palette.common.border, 0.8),
  },
  '&:hover': {
    td: {
      backgroundColor: '#19252d',
    },
  },
  td: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  fontWeight: 500,

  '&.sticky': {
    position: 'sticky',
    left: 0,
    zIndex: 1,
  },
}));

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator<T>(order: Order, orderBy: keyof T): (a: T, b: T) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
export function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function RankingTable<D>(props: RankingTableProps<D>) {
  const { columns, rows, orderByKeyMap } = props;
  // use server-side pagination and sorting
  const { order, orderBy } = useRankingPaginationContext();
  const { set } = useSearchParams();

  // client-side pagination and sorting
  // const [order, setOrder] = useState<Order>('desc');
  // const [orderBy, setOrderBy] = useState<keyof D | null>(() => {
  //   const sortableColumnConfig = columns.find((c) => c.sortable);
  //   return sortableColumnConfig?.name ?? null;
  // });

  const createSortHandler = (property: keyof D) => () => {
    const isDesc = (orderBy === property || orderBy === orderByKeyMap?.[property]) && order === 'desc';
    set('order', isDesc ? 'asc' : 'desc');
    const _orderBy = (orderByKeyMap ? orderByKeyMap[property] : undefined) ?? String(property);
    set('orderBy', _orderBy);
  };

  // const data = useMemo(() => {
  //   const c = columns.find((c) => c.name === orderBy);
  //   if (!orderBy || !c) return rows;
  //   return stableSort(rows, c.comparator ? (a, b) => c.comparator?.(a, b, order) ?? 0 : getComparator(order, orderBy));
  // }, [columns, order, orderBy, rows]);

  return (
    <TableContainer>
      <Table>
        <StyledTableHead>
          <TableRow>
            {columns.map((c) => {
              const isSortActive = orderBy === c.name || orderBy === orderByKeyMap?.[c.name];
              return (
                <StyledTableCell
                  key={String(c.name)}
                  className={c.sticky ? 'sticky' : ''}
                  {...{ ...c.cellProps, ...c.headProps }}
                  sortDirection={isSortActive ? order : false}
                >
                  {c.sortable ? (
                    <>
                      <TableSortLabel
                        active={isSortActive}
                        direction={isSortActive ? order : 'desc'}
                        onClick={createSortHandler(c.name)}
                      >
                        {c.title}
                        {isSortActive ? (
                          <Box component="span" sx={visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                          </Box>
                        ) : null}
                      </TableSortLabel>
                    </>
                  ) : (
                    c.title
                  )}
                </StyledTableCell>
              );
            })}
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={JSON.stringify(row)}>
              {columns.map((c) => (
                <StyledTableCell key={String(c.name)} {...c.cellProps} className={c.sticky ? 'sticky' : ''}>
                  {typeof c.render === 'function' ? c.render(row, c.name) : <>{row[c.name]}</>}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
