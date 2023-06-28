import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Divider,
  Grid,
  Stack,
  SwipeableDrawer,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useCallback, useMemo } from 'react';
import { isMobile } from 'react-device-detect';
import { createWallets, LinkOfDevice, WalletConfig } from 'src/configs/wallet';
import useWalletAuth from 'src/hooks/useWalletAuth';
import StyledImage from '../primitives/Image';
import { useSelectedWallet, useWalletConnectionError } from './hooks';

const getDesktopLink = (linkDevice: LinkOfDevice) =>
  typeof linkDevice === 'string'
    ? linkDevice
    : typeof linkDevice.desktop === 'string'
    ? linkDevice.desktop
    : linkDevice.desktop?.url;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getMobileLink = (linkDevice: LinkOfDevice) =>
  typeof linkDevice === 'string'
    ? linkDevice
    : typeof linkDevice.desktop === 'string'
    ? linkDevice.desktop
    : linkDevice.desktop?.url;

const getDesktopText = (linkDevice: LinkOfDevice, fallback: string) =>
  typeof linkDevice === 'string'
    ? fallback
    : typeof linkDevice.desktop === 'string'
    ? fallback
    : linkDevice.desktop?.text ?? fallback;

function WalletIntro() {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
      }}
    >
      Introduction
    </Box>
  );
}

function NotInstalled({ wallet }: { wallet: WalletConfig }) {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
      }}
    >
      <StyledImage src={wallet.icon} alt={wallet.title} sx={{ width: 70, height: 70 }} />
      <Typography variant="subtitle2" mt={2} align="center">
        {wallet.title} is not installed
      </Typography>
      <Typography variant="body2" color="text.secondary" mt={2} align="center">
        Please install the {wallet.title} browser extension.
      </Typography>
      <Box
        sx={{
          mt: 3,
          '>:not(:last-of-type)': {
            mr: 2,
          },
        }}
      >
        {wallet.guide && (
          <Button
            variant="outlined"
            color="primary"
            LinkComponent={'a'}
            href={getDesktopLink(wallet.guide) ?? '#'}
            target="_blank"
            rel="noreferrer noopener"
          >
            {getDesktopText(wallet.guide, 'Setup Guide')}
          </Button>
        )}
        {wallet.downloadLink && (
          <Button
            variant="contained"
            color="primary"
            LinkComponent={'a'}
            href={getDesktopLink(wallet.downloadLink) ?? '#'}
            target="_blank"
            rel="noreferrer noopener"
            sx={{ width: 120 }}
          >
            {getDesktopText(wallet.downloadLink, 'Install')}
          </Button>
        )}
      </Box>
    </Box>
  );
}

function WalletConnecting({ wallet }: { wallet: WalletConfig }) {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
      }}
    >
      <StyledImage src={wallet.icon} alt={wallet.title} sx={{ width: 70, height: 70 }} />
      <CircularProgress size={24} sx={{ mt: 2 }} />
      <Typography align="center" mt={2} fontWeight={500}>
        Connecting to {wallet.title}
      </Typography>
    </Box>
  );
}

function WalletError({
  wallet,
  message,
  onRetry,
}: {
  wallet: WalletConfig;
  message: string;
  onRetry?: () => void | Promise<void>;
}) {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
      }}
    >
      <StyledImage src={wallet.icon} alt={wallet.title} sx={{ width: 70, height: 70 }} />
      <CloseIcon color="error" fontSize="large" sx={{ mt: 2 }} />
      <Typography variant="body2" align="center" mt={2} fontWeight={500}>
        {message}
      </Typography>
      {onRetry && (
        <Button variant="contained" color="primary" onClick={onRetry} sx={{ mt: 2 }}>
          Retry
        </Button>
      )}
    </Box>
  );
}

function WalletItem({
  wallet,
  isSelected,
  connect,
}: {
  wallet: WalletConfig;
  isSelected?: boolean;
  connect: (wallet: WalletConfig) => Promise<void>;
}) {
  return (
    <Box
      sx={{
        p: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        transition: '250ms opacity ease',
        opacity: isSelected ? 0.7 : 1,
        '&:hover': {
          opacity: 0.7,
        },
      }}
      onClick={() => connect(wallet)}
    >
      <StyledImage
        src={wallet.icon}
        alt={wallet.title}
        sx={{ width: 50, height: 50, display: 'block', borderRadius: '10px' }}
      />
      <Typography
        variant="small"
        color={isSelected ? 'primary.main' : 'secondary.main'}
        sx={{ mt: 1, fontWeight: 500, whiteSpace: 'nowrap' }}
      >
        {wallet.title}
      </Typography>
    </Box>
  );
}

interface ModalProps {
  wallets: WalletConfig[];
  open: boolean;
  onOpen?: () => void;
  onClose: () => void;
  connectWallet: (wallet: WalletConfig) => Promise<void>;
}

function MobileWalletModal({ wallets, open, onOpen, onClose, connectWallet }: ModalProps) {
  const walletsToShow = useMemo(() => {
    if (isMobile) {
      // on mobile device
      const installedWallets = wallets.filter((w) => w.installed);
      return wallets.filter((w) => {
        if (installedWallets.length) {
          return w.installed;
        }
        return w.installed !== false || w.deepLink;
      });
    }

    // on desktop device
    return wallets.filter((w) => {
      return w.installed !== false || (!w.installed && (w.guide || w.downloadLink || w.qrCode));
    });
  }, [wallets]);

  const [selected, setSelected] = useSelectedWallet();
  const [errorMsg, setErrorMsg] = useWalletConnectionError();

  const handleClose = () => {
    setSelected(undefined);
    setErrorMsg('');
    onClose();
  };

  const handleConnect = async (wallet: WalletConfig) => {
    setErrorMsg('');
    if (wallet.installed !== false) {
      try {
        await connectWallet(wallet);
      } catch (error) {
        setErrorMsg((error as Error).message);
      }
    } else if (isMobile && wallet.deepLink) {
      window.open(wallet.deepLink);
    }
  };

  return (
    <SwipeableDrawer
      onOpen={() => {
        onOpen?.();
      }}
      anchor="bottom"
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          paddingTop: '18px',
        },
      }}
      swipeAreaWidth={50}
    >
      <Box
        sx={{
          width: 50,
          height: 5,
          bgcolor: 'background.primary',
          borderRadius: 2,
          position: 'absolute',
          top: 12,
          left: 'calc(50% - 25px)',
        }}
      />
      <Box sx={{ px: 3, py: 2 }}>
        <Typography variant="h3">Connect Wallet</Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Start by connecting with one of the wallets below. Be sure to store your private keys or seed phrase securely.
          Never share them with anyone.
        </Typography>
        <Box sx={{ py: 2, maxHeight: 240, overflowY: 'auto', mt: 2 }} className="custom-scrollbar">
          <Grid container spacing={2}>
            {walletsToShow.map((wallet) => (
              <Grid item key={wallet.id} xs={4}>
                <WalletItem wallet={wallet} isSelected={selected?.id === wallet.id} connect={handleConnect} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
      <Box sx={{ px: 3, py: 2 }}>
        {!selected && <Typography variant="body2">Introduction</Typography>}
        {selected && selected.installed !== false && (
          <>
            {errorMsg ? (
              <Typography color={'error'} variant="body2" align="center">
                {errorMsg}
              </Typography>
            ) : (
              <Stack direction="row" alignItems={'center'} justifyContent="center" spacing={1}>
                <CircularProgress size={20} sx={{ color: 'primary.main' }} />
                <Typography variant="body2" align="center" color="primary.main">
                  Connecting to {selected.title}
                </Typography>
              </Stack>
            )}
          </>
        )}
      </Box>
    </SwipeableDrawer>
  );
}

function DesktopWalletModal({ wallets: wallets_, open, onClose, connectWallet }: ModalProps) {
  const wallets = useMemo(() => {
    return wallets_.filter((w) => {
      return w.installed !== false || (!w.installed && (w.guide || w.downloadLink || w.qrCode));
    });
  }, [wallets_]);

  const [selected, setSelected] = useSelectedWallet();
  const [errorMsg, setErrorMsg] = useWalletConnectionError();

  const handleClose = () => {
    setSelected(undefined);
    setErrorMsg('');
    onClose();
  };

  const handleConnect = async (wallet: WalletConfig) => {
    setErrorMsg('');
    try {
      await connectWallet(wallet);
    } catch (error) {
      setErrorMsg((error as Error).message);
    }
  };

  return (
    <Dialog open={open} maxWidth="sm" fullWidth PaperProps={{ variant: 'border' }}>
      <Box sx={{ display: 'flex', position: 'relative' }}>
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
          onClick={handleClose}
        >
          <CloseIcon fontSize="large" />
        </Box>
        <Box sx={{ px: 3, py: 2, maxWidth: 400, bgcolor: 'background.primary' }}>
          <Typography variant="h3">Connect Wallet</Typography>
          <Typography variant="body2" sx={{ mt: 3 }}>
            Start by connecting with one of the wallets below. Be sure to store your private keys or seed phrase
            securely. Never share them with anyone.
          </Typography>
          <Box sx={{ py: 2, height: 240, overflowY: 'auto', mt: 3 }} className="custom-scrollbar">
            <Grid container spacing={2}>
              {wallets.map((wallet) => (
                <Grid item key={wallet.id} xs={4}>
                  <WalletItem wallet={wallet} isSelected={selected?.id === wallet.id} connect={handleConnect} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
        <Box sx={{ px: 3, py: 2, flex: 1 }}>
          {!selected && <WalletIntro />}
          {selected && selected.installed !== false && (
            <>
              {errorMsg ? (
                <WalletError
                  message={errorMsg}
                  wallet={selected}
                  onRetry={() => {
                    handleConnect(selected);
                  }}
                />
              ) : (
                <WalletConnecting wallet={selected} />
              )}
            </>
          )}
          {selected && selected.installed === false && <NotInstalled wallet={selected} />}
        </Box>
      </Box>
    </Dialog>
  );
}

export default function ChooseWalletModal({
  open,
  onOpen,
  onClose,
}: {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const wallets = useMemo(() => createWallets(), []);
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const [_, setSelected] = useSelectedWallet();
  const { login } = useWalletAuth();

  const connectWallet = useCallback(
    async (wallet: WalletConfig) => {
      setSelected(wallet);
      if (wallet.installed !== false) {
        await login(wallet.connectorId);
      } else {
        throw new Error('Wallet not found');
      }
    },
    [login, setSelected]
  );

  return smDown ? (
    <MobileWalletModal connectWallet={connectWallet} wallets={wallets} open={open} onOpen={onOpen} onClose={onClose} />
  ) : (
    <DesktopWalletModal connectWallet={connectWallet} wallets={wallets} open={open} onClose={onClose} />
  );
}
