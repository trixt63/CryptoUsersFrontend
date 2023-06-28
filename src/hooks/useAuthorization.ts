import { hexlify, toUtf8Bytes } from 'ethers/lib/utils.js';
import { useCallback, useEffect } from 'react';
import {
  AuthSlice,
  login as loginAction,
  logout as logoutAction,
  updateStatus as updateStatusAction,
} from 'src/redux/auth';
import { useAppDispatch, useAppSelector } from 'src/redux/hook';
import { checkUser as checkUserApi, login as loginApi } from 'src/services/auth-api';
import { useWeb3React } from 'src/wagmi';
import useSWRImmutable from 'swr/immutable';

interface UseAuthorizationData {
  auth: AuthSlice;
  authenticate: () => Promise<void>;
  logout: () => void | Promise<void>;
}

const getStoredAuthToken = (address?: string): string | null => {
  return window.localStorage.getItem(`authorization_${address}`);
};

const setStoredAuthToken = (address?: string, authToken?: string) => {
  if (authToken === undefined) {
    window.localStorage.removeItem(`authorization_${address}`);
  } else {
    window.localStorage.setItem(`authorization_${address}`, authToken);
  }
};

export function useAuthorization(): UseAuthorizationData {
  const { address, web3Provider } = useWeb3React();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  const authenticate = useCallback(async () => {
    if (address && web3Provider) {
      const nonce = Math.round(Math.random() * 1e6);
      const msg =
        `I am signing my one-time nonce: ${nonce}` +
        '\n\n' +
        'Note: Sign to log into your Centic account. This is free and will not require a transaction.';
      if (web3Provider.provider.request) {
        const signature = await web3Provider.provider.request({
          method: 'personal_sign',
          params: [hexlify(toUtf8Bytes(msg)), address.toLocaleLowerCase()],
        });
        const res = await loginApi({
          address,
          nonce,
          signature,
        });

        dispatch(
          loginAction({
            owner: address,
            token: res.jwt,
            authenticated: true,
          })
        );

        setStoredAuthToken(address, res.jwt);
      } else {
        setStoredAuthToken(address, undefined);
        throw new Error('The `request` method not found in Provider');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, web3Provider]);

  const logout = useCallback(async () => {
    if (address) {
      setStoredAuthToken(address, undefined);
    }
  }, [address]);

  return {
    auth,
    authenticate,
    logout,
  };
}

export function useCheckAuthorization() {
  const { address } = useWeb3React();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(logoutAction({}));
    const authToken = getStoredAuthToken(address ?? undefined);
    if (authToken && address) {
      dispatch(updateStatusAction({ status: 'checking' }));
      // validate authToken
      checkUserApi({ jwt: authToken })
        .then((res) => {
          // the current connected address must be same with address in `res`
          if (String(res.address).toLowerCase() === address.toLowerCase()) {
            dispatch(
              loginAction({
                owner: address,
                token: authToken,
                authenticated: true,
              })
            );
          } else {
            throw new Error('[check-user] jwt token does not match');
          }
        })
        .catch((err) => {
          console.error('[check-user]', err);
          dispatch(logoutAction({}));
          setStoredAuthToken(address);
        });
    } else {
      dispatch(updateStatusAction({ status: 'ready' }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return null;
}

export function useAuthModal() {
  const { data: isOpen, mutate } = useSWRImmutable<boolean>('auth-modal', { fallbackData: false });

  return [isOpen, mutate] as [boolean, (val: boolean) => void];
}
