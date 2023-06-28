import { StandardTextFieldProps, TextField } from '@mui/material';

const Input: React.FC<StandardTextFieldProps> = (props: StandardTextFieldProps) => {
  return (
    <TextField
      variant="standard"
      {...props}
      sx={{
        bgcolor: 'background.secondary',
        borderRadius: '10px',
        py: 1.5,
        px: 3,
        '.MuiInput-root': {
          '&::before, &::after': {
            display: 'none',
          },
          '.MuiInput-input': {
            padding: 0,
          },
        },
        ...props?.sx,
      }}
    />
  );
};

export default Input;
