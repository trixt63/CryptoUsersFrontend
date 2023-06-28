import { SearchOutlined } from '@mui/icons-material';
import { alpha, Box, styled } from '@mui/material';
import { useRef, useState } from 'react';

const InputWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  borderRadius: 8,
  backgroundColor: alpha('#151C22', 0.7),
  transition: '250ms background-color ease',
  '&.focused': {
    backgroundColor: '#151C22',
    '.input': {
      textIndent: 8,
    },
    '.input-icon': {
      color: theme.palette.text.primary,
    },
  },
  '.input': {
    fontSize: theme.typography.body2.fontSize,
    width: '100%',
    outline: 'none',
    border: 'none',
    backgroundColor: 'transparent',
    color: theme.palette.text.primary,
    padding: theme.spacing(1, 2, 1, 0),
    display: 'block',
    height: 40,
    flexGrow: 1,
    transition: '250ms all ease',
    '&::placeholder': {
      color: theme.palette.text.secondary,
      opacity: 1,
    },
  },
  '.input-icon': {
    marginLeft: 16,
    marginRight: 4,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.text.secondary,
    transition: '250ms all ease',
  },
}));

export default function Search() {
  const searchInpRef = useRef<HTMLInputElement | null>(null);
  const [focused, setFocused] = useState(false);

  return (
    <form action="/search">
      <InputWrapper className={focused ? 'focused' : ''}>
        <Box className="input-icon">
          <SearchOutlined />
        </Box>
        <input
          ref={searchInpRef}
          // defaultValue={params.q ?? ''}
          name="q"
          className="input"
          type="text"
          autoComplete="off"
          placeholder="Search by Address / Txn Hash / Block / Token"
          aria-label="Search by Address / Txn Hash / Block / Token"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </InputWrapper>
    </form>
  );
}
