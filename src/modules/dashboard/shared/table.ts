import { styled, TableRow } from '@mui/material';

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  th: {
    padding: theme.spacing(2, 1.5),
    backgroundColor: theme.palette.background.primary,
    color: theme.palette.text.secondary,
  },
  td: {
    padding: theme.spacing(2, 1.5),
    fontSize: '1rem',
  },
  'th, td': {
    '&:first-of-type': {
      paddingLeft: theme.spacing(5),
    },
    '&:last-of-type': {
      paddingRight: theme.spacing(5),
    },
  },
  '&:hover': {
    td: {
      backgroundColor: theme.palette.background.secondary,
    },
  },
}));
