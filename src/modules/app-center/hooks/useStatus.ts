import { FetchStatus } from 'src/constants';
import { useAppSelector } from 'src/redux/hook';

export function useStatus() {
  const status = useAppSelector((state) => state.appCenterSlice.status);

  const isLoading = status === FetchStatus.FETCHING || status === FetchStatus.IDLE;
  const isReady = status === FetchStatus.SUCCESS || status === FetchStatus.UPDATING;
  const isError = status === FetchStatus.FAILED;

  return {
    status,
    isLoading,
    isReady,
    isError,
  };
}
