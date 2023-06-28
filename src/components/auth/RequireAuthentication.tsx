import { Typography } from '@mui/material';
import { useAuthorization } from 'src/hooks/useAuthorization';
import { useWeb3React } from 'src/wagmi';

export default function RequireAuthentication({ children }: { children: React.ReactNode }) {
  const { address } = useWeb3React();
  const { auth } = useAuthorization();

  if (!address) {
    return <Typography color="text.secondary">Please connect your wallet!</Typography>;
  }

  if (auth.status === 'checking') return <></>;

  if (!auth.authenticated) {
    return (
      <>
        <Typography color="text.secondary" mb={1}>
          To protect your data from others, please generate your secure token to authenticate!
        </Typography>
      </>
    );
  }

  return <>{children}</>;
}
