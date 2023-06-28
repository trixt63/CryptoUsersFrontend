import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CancelIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircleOutline';
import EmailIcon from '@mui/icons-material/Email';
import LogoutIcon from '@mui/icons-material/Logout';
import PortraitIcon from '@mui/icons-material/Portrait';
import { Avatar, Box, Button, Divider, Drawer, DrawerProps, Paper, Typography } from '@mui/material';
import { formatAddress } from '@travalendingpool/utils';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuthorization } from 'src/hooks/useAuthorization';
import useWallet from 'src/hooks/useWallet';
import useWalletAuth from 'src/hooks/useWalletAuth';
import { getErrorMessage } from 'src/utils';
import { useWeb3React } from 'src/wagmi';
import Copy from '../CopyButton/Copy';
import { Link } from '../primitives/Link';

function LoginSection() {
  const wallet = useWallet();
  const { authenticate } = useAuthorization();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleAuth = async () => {
    setIsAuthenticating(true);
    try {
      await authenticate();
    } catch (error) {
      console.error(error);
      toast.error(getErrorMessage(error));
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <Paper sx={{ p: 2, bgcolor: 'background.secondary' }}>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {wallet && <Avatar src={wallet.icon} alt={wallet.title} sx={{ width: 24, height: 24 }} />}
          <Typography variant="subtitle2" fontWeight={600} sx={{ ml: 1.5 }}>
            Log into Centic
          </Typography>
        </Box>
        <Typography variant="body2" mt={2} color="secondary.main">
          Sign to login to your Centic account. This is free and will not require a transaction.
        </Typography>
        <Box mt={2}>
          <Button variant="contained" color="primary" fullWidth onClick={handleAuth} disabled={isAuthenticating}>
            Log in
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

function AddEmailSection() {
  return (
    <Paper sx={{ p: 2, bgcolor: 'background.secondary' }}>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <EmailIcon fontSize="large" />
          <Typography variant="subtitle2" fontWeight={600} sx={{ ml: 1.5 }}>
            Add your email
          </Typography>
        </Box>
        <Typography variant="body2" mt={2} color="secondary.main">
          Verify your email and get access to more features on Centic.
        </Typography>
        <Box mt={2}>
          <Button variant="contained" color="primary" disabled={true} fullWidth>
            {/* Verify */}
            Coming soon...
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default function WalletMenu({ handleClose, ...props }: DrawerProps & { handleClose: () => void }) {
  const wallet = useWallet();
  const { address } = useWeb3React();
  const { auth } = useAuthorization();
  const { logout } = useWalletAuth();

  if (!address) return null;

  return (
    <Drawer
      {...props}
      onClose={() => {
        handleClose();
      }}
      sx={{ zIndex: 999 }}
      PaperProps={{
        sx: {
          paddingTop: '60px',
          borderRadius: 0,
          width: 350,
          display: 'flex',
          flexDirection: 'column',
        },
        variant: 'border',
      }}
    >
      <Box sx={{ px: 3, pt: 3 }}>
        <Typography variant="body2" color="secondary.main">
          <>Connected with {wallet?.title ?? 'unknown'}</>
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 0.5 }}>
          <Typography variant="h4" fontWeight={500} color={auth.authenticated ? 'text.primary' : 'error.main'}>
            {formatAddress(address)}
          </Typography>
          <Copy text={address} />
        </Box>
        <Typography
          mt={1}
          variant="body2"
          color={auth.authenticated ? 'success.main' : 'error.main'}
          sx={{ display: 'flex', alignItems: 'center', fontWeight: 500 }}
        >
          {auth.authenticated ? (
            <>
              <CheckCircleIcon fontSize="small" />
              &nbsp; Wallet verified
            </>
          ) : (
            <>
              <CancelIcon fontSize="small" />
              &nbsp; Wallet not verified
            </>
          )}
        </Typography>
      </Box>
      <Divider sx={{ my: 3 }} />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flexGrow: 1, px: 3, pb: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {!auth.authenticated && <LoginSection />}
          <AddEmailSection />
        </Box>
        <Box sx={{ px: 3, mt: 2, py: 3 }}>
          <Button
            variant="outlined"
            color="primary"
            LinkComponent={Link}
            href="/portfolio/assets"
            startIcon={<PortraitIcon />}
            endIcon={<ArrowForwardIcon />}
            fullWidth
            onClick={() => {
              handleClose();
            }}
          >
            Portfolio
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              logout();
              handleClose();
            }}
            fullWidth
            startIcon={<LogoutIcon />}
            sx={{ mt: 2 }}
          >
            Disconnect
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
