import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { InputBase, SelectProps, Select as MuiSelect, styled } from '@mui/material';

const StyledInput = styled(InputBase)(({ theme }) => ({
  borderRadius: '6px',
  '.MuiSelect-select': {
    padding: theme.spacing(1, 2),
  },
  '.MuiSvgIcon-root': {
    color: theme.palette.primary.main,
  },
}));

export default function Select<T>(props: SelectProps<T>) {
  return (
    <MuiSelect
      {...props}
      IconComponent={KeyboardArrowDownIcon}
      input={<StyledInput />}
      MenuProps={{
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        sx: {
          '.MuiMenuItem-root': {
            fontSize: '0.875rem',
          },
        },
        ...props.MenuProps,
      }}
    />
  );
}
