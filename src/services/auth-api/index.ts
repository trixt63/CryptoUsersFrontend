import fetchJson from 'src/utils/FetchJson';
import { getApi } from '..';

export type LoginParams = {
  address: string;
  nonce: number;
  signature: string;
};
export type ApiLoginResponse = {
  jwt: string;
  role: string;
  success: boolean;
};
export async function login({ address, nonce, signature }: LoginParams) {
  return await fetchJson<ApiLoginResponse>(getApi('/auth/login'), {
    body: JSON.stringify({
      address,
      nonce,
      signature,
    }),
    method: 'POST',
  });
}

export type ApiCheckUserResponse = {
  address: string;
  exp: number;
  role: string;
};
export async function checkUser({ jwt }: { jwt: string }) {
  return await fetchJson<ApiCheckUserResponse>(getApi('/auth/check-user', { jwt }));
}
