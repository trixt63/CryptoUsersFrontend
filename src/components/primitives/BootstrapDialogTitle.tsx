import CloseIcon from '@mui/icons-material/Close';
import { Box, DialogTitle, DialogTitleProps } from '@mui/material';

interface BootstrapDialogTitleProps extends DialogTitleProps {
  onClose?: (_ev: React.SyntheticEvent) => void;
}

export default function BootstrapDialogTitle(props: BootstrapDialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle {...other}>
      {children}
      {onClose ? (
        <Box
          component="span"
          sx={{
            position: 'absolute',
            cursor: 'pointer',
            right: 16,
            top: 16,
            color: 'text.secondary',
            transition: '250ms color ease',
            '&:hover': {
              color: 'secondary.main',
            },
          }}
          onClick={onClose}
        >
          <CloseIcon fontSize="large" />
        </Box>
      ) : null}
    </DialogTitle>
  );
}
