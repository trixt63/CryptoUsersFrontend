import { Button, ButtonProps } from '@mui/material';
import { Fragment, useState } from 'react';
import ChooseWalletModal from './ChooseWalletModal';

export default function ConnectButton(props: ButtonProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Fragment>
      <Button
        variant="contained"
        color="primary"
        {...props}
        sx={{ fontWeight: 600, ...props.sx }}
        onClick={() => setIsOpen(!isOpen)}
      >
        Connect wallet
      </Button>
      <ChooseWalletModal open={isOpen} onOpen={() => setIsOpen(true)} onClose={() => setIsOpen(false)} />
    </Fragment>
  );
}
