import { Box, Button, Dialog, DialogContent, Divider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuthModal, useAuthorization } from 'src/hooks/useAuthorization';
import useWallet from 'src/hooks/useWallet';
import { getErrorMessage } from 'src/utils';
import { useWeb3React } from 'src/wagmi';
import BootstrapDialogTitle from '../primitives/BootstrapDialogTitle';
import StyledImage from '../primitives/Image';

export default function AuthenticationModal() {
  const wallet = useWallet();
  const { address } = useWeb3React();
  const [isOpen, setIsOpen] = useAuthModal();
  const { auth, authenticate } = useAuthorization();
  const [authenticating, setAuthenticating] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleAuth = async () => {
    setAuthenticating(true);
    try {
      await authenticate();
      handleClose();
    } catch (error) {
      console.error(error);
      toast.error(getErrorMessage(error));
    } finally {
      setAuthenticating(false);
    }
  };

  useEffect(() => {
    if (!auth.authenticated && auth.status !== 'checking' && address) {
      setIsOpen(true);
    }
  }, [auth.authenticated, address, setIsOpen, auth.status]);

  if (!wallet || auth.authenticated || auth.status !== 'ready') return null;

  return (
    <Dialog open={isOpen} fullWidth maxWidth={'xs'} PaperProps={{ variant: 'border' }}>
      <BootstrapDialogTitle onClose={handleClose} />
      <DialogContent>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <StyledImage
            src={wallet.icon}
            alt={wallet.title}
            sx={{ width: 60, height: 60, display: 'block', borderRadius: '10px' }}
          />
        </Box>
        <Typography variant="h4" align="center" mt={3}>
          Welcome to Centic
        </Typography>
        {!authenticating && (
          <Typography variant="body2" mt={3} align="center">
            Sign to log into your Centic account. This is free and will not require a transaction.
          </Typography>
        )}
        {authenticating && (
          <>
            <Typography variant="body2" mt={3} align="center">
              Check your wallet and confirm the signature request.
            </Typography>
          </>
        )}
        <Divider sx={{ my: 3 }} />
        <Button variant="contained" color="primary" fullWidth onClick={handleAuth} disabled={authenticating}>
          Sign
        </Button>
      </DialogContent>
    </Dialog>
  );
}
