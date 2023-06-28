import { FetchStatus } from 'src/constants';
import { useAppSelector } from 'src/redux/hook';
import { defaultFetchStatus } from 'src/redux/portfolio/assets-slice';

export const useAlerts = () => {
  const chain = useAppSelector((state) => state.portfolio.configSlice.chainId);
  return useAppSelector((state) => state.portfolio.alertsSlice)[chain];
};

export const useAlertsStatus = () => {
  const status = useAlerts()?.fetchStatus ?? defaultFetchStatus;

  return { status, isLoading: status === FetchStatus.FETCHING, isError: status === FetchStatus.FAILED };
};

export const useAlertsData = () => {
  return useAlerts()?.data;
};
