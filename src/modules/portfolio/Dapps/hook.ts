import { useEffect } from 'react';
import { WS_API_ROOT } from 'src/configs/api';
import { FetchStatus } from 'src/constants';
import { useAuthorization } from 'src/hooks/useAuthorization';
import { useAppDispatch, useAppSelector } from 'src/redux/hook';
import { defaultFetchStatus } from 'src/redux/portfolio/assets-slice';
import { addDApps, finishFetchDApps, startFetchDApps } from 'src/redux/portfolio/dapps-slice';

export const useDAppsStatus = () => {
  const statusDApps = useAppSelector((state) => state.portfolio.dAppsSlice.dApps.status);
  const status = statusDApps ?? defaultFetchStatus;
  return { status, isLoading: status === FetchStatus.FETCHING, isError: status === FetchStatus.FAILED };
};

export const useDAppsData = () => {
  return useAppSelector((state) => state.portfolio.dAppsSlice.dApps.data);
};

export const useDAppsTokenBalanceData = (dAppId: string, tokenId: string, action: string) => {
  const dAppData = useAppSelector((state) => {
    if (state.portfolio.dAppsSlice.tokenBalance[`${dAppId}-${tokenId}-${action}`])
      return state.portfolio.dAppsSlice.tokenBalance[`${dAppId}-${tokenId}-${action}`].data;
  });
  return dAppData;
};

export const useFetchDApps = () => {
  const dispatch = useAppDispatch();
  const { auth } = useAuthorization();
  useEffect(() => {
    if (!auth.authenticated) {
      return;
    }
    const socket = new WebSocket(`${WS_API_ROOT}/portfolio/${auth.owner}/dapps`);
    // const socket = new WebSocket(`${WS_API_ROOT}/portfolio/0x5f54d6056a0ea0a3bc882455e9c287d64035e0f6/dapps`);
    socket.onopen = () => {
      socket.send(auth.token); // authorize
      // socket.send(
      //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMHgiLCJleHAiOjE2ODE4ODkxNDcsInJvbGUiOiJhZG1pbiJ9.yJ47WLgOncse911fHEZS9aEP2kuebhHqKQYMa9FJZ8g'
      // );
      dispatch(startFetchDApps(undefined));
    };
    socket.onerror = (ev) => {
      console.error('WS error', ev);
      dispatch(finishFetchDApps({ status: FetchStatus.FAILED }));
      socket.close();
    };
    socket.onclose = () => {
      console.debug('Closed ws connection');
      dispatch(finishFetchDApps({ status: FetchStatus.SUCCESS }));
    };
    socket.onmessage = (ev) => {
      dispatch(addDApps({ dApps: JSON.parse(ev.data).dapps }));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.authenticated, auth.token]);
};
