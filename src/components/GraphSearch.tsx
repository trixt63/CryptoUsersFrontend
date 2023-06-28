import { SearchOutlined } from '@mui/icons-material';
import { Box, Button, lighten, styled } from '@mui/material';
import React, { useRef } from 'react';
import useGraphSearchParams from 'src/hooks/useGraphSearchParams';

const Input = styled('input')(({ theme }) => ({
  ...theme.typography.body2,
  outline: 'none',
  borderTopLeftRadius: 8,
  borderBottomLeftRadius: 8,
  borderWidth: '1px 0px 1px 1px',
  borderStyle: 'solid',
  borderColor: theme.palette.secondary.dark,
  // backgroundColor: theme.palette.background.dialog,
  backgroundColor: 'transparent',
  color: theme.palette.text.primary,
  padding: theme.spacing(1, 2),
  display: 'block',
  height: 40,
  transition: 'all 250ms ease',
  '&:focus': {
    borderColor: theme.palette.primary.dark,
    // borderColor: theme.palette.grey[800],
  },
  '&:hover:not(:focus)': {
    borderColor: lighten(theme.palette.secondary.dark, 0.1),
    // borderColor: theme.palette.grey[800],
  },
  '&::placeholder': {
    color: '#424E67',
    opacity: 1,
  },
}));

interface GraphSearchProps {
  onSearch?: (input: string) => void;
}

export default function GraphSearch(props: GraphSearchProps) {
  const { onSearch } = props;
  const { params } = useGraphSearchParams();

  const searchInpRef = useRef<HTMLInputElement | null>(null);

  const handleSearch = (ev: React.SyntheticEvent) => {
    ev.preventDefault();
    const searchInp = searchInpRef.current?.value ?? '';
    onSearch && onSearch(searchInp);
  };

  return (
    <form onSubmit={handleSearch} noValidate>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Input
          type="text"
          ref={searchInpRef}
          sx={{ flexGrow: 1 }}
          name="search-input"
          placeholder="Search by Address / Txn Hash / Block / Token"
          autoComplete="off"
          aria-label="Search by Address / Txn Hash / Block / Token"
          defaultValue={params.q ?? ''}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{
            bgcolor: 'primary.dark',
            // bgcolor: 'secondary.dark',
            height: 40,
            px: 1,
            minWidth: 50,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
            '&:hover': {
              bgcolor: 'primary.main',
            },
          }}
        >
          <SearchOutlined fontSize="small" sx={{ color: 'white' }} />
        </Button>
      </Box>
    </form>
  );
}
