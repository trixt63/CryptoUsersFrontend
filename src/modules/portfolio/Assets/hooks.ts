/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from 'react';
import { WS_API_ROOT } from 'src/configs/api';
import { FetchStatus } from 'src/constants';
import { useAuthorization } from 'src/hooks/useAuthorization';
import { useAppDispatch, useAppSelector } from 'src/redux/hook';
import {
  addUserAssets,
  defaultFetchStatus,
  finishFetchUserAssets,
  startFetchUserAssets,
} from 'src/redux/portfolio/assets-slice';

export const useAsset = () => {
  const chain = useAppSelector((state) => state.portfolio.configSlice.chainId);
  return useAppSelector((state) => state.portfolio.assetsSlice.creditScoreAndBalance)[chain];
};

export const useAssetStatus = () => {
  const status = useAsset()?.fetchStatus ?? defaultFetchStatus;

  return { status, isLoading: status === FetchStatus.FETCHING, isError: status === FetchStatus.FAILED };
};

export const useAssetData = () => {
  return useAsset()?.data;
};

export const useUserAssets = () => {
  return useAppSelector((state) => state.portfolio.assetsSlice.assets);
};

export const useTokensStatus = () => {
  const statusTokens = useAppSelector((state) => state.portfolio.assetsSlice.assets.status);
  const status = statusTokens ?? defaultFetchStatus;

  return { status, isLoading: status === FetchStatus.FETCHING, isError: status === FetchStatus.FAILED };
};

export const useTokensData = () => {
  return useAppSelector((state) => state.portfolio.assetsSlice.assets.data);
};

export const useTokenBalanceStatus = (tokenId: string) => {
  const statusTokenBalance = useAppSelector((state) => state.portfolio.assetsSlice.tokenBalance[tokenId]?.status);
  const status = statusTokenBalance ?? defaultFetchStatus;

  return { status, isLoading: status === FetchStatus.FETCHING, isError: status === FetchStatus.FAILED };
};

export const useTokenBalanceData = (tokenId: string) => {
  return useAppSelector((state) => state.portfolio.assetsSlice.tokenBalance[tokenId]?.data);
};

// streaming data via websocket
// and save to redux
export const useFetchUserAssets = () => {
  const dispatch = useAppDispatch();
  const { auth } = useAuthorization();

  useEffect(() => {
    if (!auth.authenticated) {
      return;
    }

    const socket = new WebSocket(`${WS_API_ROOT}/portfolio/${auth.owner}/tokens`);
    // const socket = new WebSocket(`${WS_API_ROOT}/portfolio/0xe2fc31F816A9b94326492132018C3aEcC4a93aE1/tokens`);
    socket.onopen = () => {
      console.debug('Opened ws connection');
      socket.send(auth.token); // authorize
      // socket.send(
      //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMHgiLCJleHAiOjE2ODE4ODkxNDcsInJvbGUiOiJhZG1pbiJ9.yJ47WLgOncse911fHEZS9aEP2kuebhHqKQYMa9FJZ8g'
      // );
      dispatch(startFetchUserAssets(undefined));
    };
    socket.onerror = (ev) => {
      console.error('WS error', ev);
      dispatch(finishFetchUserAssets({ status: FetchStatus.FAILED }));
      socket.close();
    };
    socket.onclose = () => {
      console.debug('Closed ws connection');
      dispatch(finishFetchUserAssets({ status: FetchStatus.SUCCESS }));
    };
    socket.onmessage = (ev) => {
      dispatch(addUserAssets({ assets: JSON.parse(ev.data).tokens }));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.authenticated, auth.token]);
};

export type Order = 'asc' | 'desc';

export default function useSortData({
  sortData,
  defaultSortType,
  defaultSortKey,
}: {
  sortData: any;
  defaultSortType: string;
  defaultSortKey: string;
}) {
  const [sortType, setSortType] = useState(defaultSortType);
  const [sortKey, setSortKey] = useState(defaultSortKey);

  function update(key: any) {
    if (key === sortKey) {
      if (sortType === 'desc') setSortType('asc');
      else setSortType('desc');
    } else {
      setSortKey(key);
      setSortType('desc');
    }
  }

  const realData = useMemo(() => {
    if (sortType === 'asc') {
      const data = sortData.slice().sort((x: any, y: any) => x[sortKey] - y[sortKey]);
      return data;
    } else {
      const data = sortData.slice().sort((x: any, y: any) => y[sortKey] - x[sortKey]);
      return data;
    }
  }, [sortData, sortType, sortKey]);

  return { update, realData, sortType, sortKey };
}
