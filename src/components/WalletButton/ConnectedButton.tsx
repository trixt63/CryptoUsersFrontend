/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Button, ButtonProps, Typography } from '@mui/material';
import { formatAddress } from '@travalendingpool/utils';
import { Fragment, useState } from 'react';
import { FilledWalletIcon } from 'src/icons';
import { useWeb3React } from 'src/wagmi';
import AuthenticationModal from '../auth/AuthenticationModal';
import WalletMenu from './WalletMenu';

export default function ConnectedButton(props: ButtonProps) {
  const { address } = useWeb3React();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Fragment>
      <Button
        variant="outlined"
        color="primary"
        {...props}
        sx={{ fontWeight: 600, ...props.sx }}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        startIcon={<FilledWalletIcon />}
      >
        <Typography component="span" variant="body2" fontWeight={600}>
          {formatAddress(address!)}
        </Typography>
      </Button>
      <AuthenticationModal />
      <WalletMenu anchor="right" open={isMenuOpen} handleClose={() => setIsMenuOpen(false)} sx={{ zIndex: 999 }} />
    </Fragment>
  );
}
