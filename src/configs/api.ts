export const API_ROOT = process.env.NEXT_PUBLIC_API_ROOT ?? 'https://scoringapi.trava.finance/graph';

export const API_ROOT_V2 = process.env.NEXT_PUBLIC_API_ROOT_V2 ?? 'https://api.trava.center/dev';
export const WS_API_ROOT = process.env.NEXT_PUBLIC_WS_API_ROOT ?? 'wss://api.trava.center/dev';

export const TOKEN_HEALTH_ROOT =
  process.env.NEXT_PUBLIC_TOKEN_HEALTH_ROOT ?? 'https://scoringapi.trava.finance/token-health';

export const SUPPORTED_CHAINS = ['0x38', '0x1', '0xfa', '0x89'];
