import { TOKEN_HEALTH_ROOT } from 'src/configs/api';
import { Description, TokenHistory } from './data-types';

export async function fetchTokenHealthDescription(tokenId: string) {
  const res = await fetch(`${TOKEN_HEALTH_ROOT}/v1/description/${tokenId}`);
  try {
    return (await res.json()) as Description;
  } catch (error) {
    return undefined;
  }
}

export async function fetchTokenHealthHistory(tokenId: string) {
  const res = await fetch(`${TOKEN_HEALTH_ROOT}/v1/tokens/${tokenId}/history`);
  try {
    return (await res.json()) as TokenHistory;
  } catch (error) {
    return undefined;
  }
}

export async function fetchTokens() {
  const res = await fetch(`${TOKEN_HEALTH_ROOT}/v1/tokens/overview`);
  return await res.json();
}
