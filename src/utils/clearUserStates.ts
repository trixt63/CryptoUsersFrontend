/* eslint-disable @typescript-eslint/no-explicit-any */
import { logout as logoutAction } from 'src/redux/auth';

export function clearUserStates(dispatch: React.Dispatch<any>) {
  dispatch(logoutAction(undefined));
}
