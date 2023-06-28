import { createContext, useContext } from 'react';
import { Description, TokenHistory, Token } from 'src/services/token-health-api/data-types';

export type TokenHealthData = {
  description: Description;
  tokenHistory: TokenHistory;
  totalTokens: number;
  token: Token;
};

export const TokenHealthContext = createContext({} as TokenHealthData);
export const TokenHealthProvider = TokenHealthContext.Provider;

export function useTokenHealthContext() {
  return useContext(TokenHealthContext);
}
