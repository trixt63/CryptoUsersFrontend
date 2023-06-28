import { useCallback } from 'react';
import { ConnectorNames, WalletConnectorNotFoundError } from 'src/configs/wallet';
import { useAppDispatch } from 'src/redux/hook';
import { clearUserStates } from 'src/utils/clearUserStates';
import { ConnectorNotFoundError, useConnect, useDisconnect } from 'wagmi';
import { useAuthorization } from './useAuthorization';

export default function useWalletAuth() {
  const { connectAsync, connectors } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { logout: backendLogout } = useAuthorization();
  const dispatch = useAppDispatch();

  const chainId = 56;

  const login = useCallback(
    async (connectorId: ConnectorNames) => {
      const connector = connectors.find((c) => c.id === connectorId);
      try {
        const connected = await connectAsync({ connector, chainId });
        return connected;
      } catch (error) {
        if (error instanceof ConnectorNotFoundError) {
          throw new WalletConnectorNotFoundError();
        }
        throw error;
      }
    },
    [connectAsync, connectors]
  );

  const logout = useCallback(async () => {
    try {
      await disconnectAsync();
      await backendLogout();
    } catch (error) {
      console.error(error);
    } finally {
      clearUserStates(dispatch);
    }
  }, [backendLogout, disconnectAsync, dispatch]);

  return { login, logout };
}
