import { ButtonProps } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import { useWeb3React } from 'src/wagmi';
import ConnectButton from './ConnectButton';
import ConnectedButton from './ConnectedButton';

export default React.memo(function WalletButton(props: ButtonProps) {
  const { address } = useWeb3React();
  // fix hydration error
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return <Fragment>{address && mounted ? <ConnectedButton {...props} /> : <ConnectButton {...props} />}</Fragment>;
});
