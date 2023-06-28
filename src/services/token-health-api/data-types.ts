export type Description = {
  token_id: string;
  analysis: Array<string>;
  suggestions: Array<string>;
};

export type TokenHistory = {
  [key: string]: Array<Array<number>>;
  // daily_transaction_history: Array<Array<number>>;
  // number_of_transaction_score_history: Array<Array<number>>;
  // holder_history: Array<Array<number>>;
  // holders_score_history: Array<Array<number>>;
  // holder_distribution_history: Array<Array<number>>;
  // holder_distribution_score_history: Array<Array<number>>;
  // price_history: Array<Array<number>>;
  // price_over_highest_score_history: Array<Array<number>>;
  // trading_score_history: Array<Array<number>>;
  // market_cap_history: Array<Array<number>>;
  // market_cap_score_history: Array<Array<number>>;
  // price_stability_history: Array<Array<number>>;
  // price_stability_score_history: Array<Array<number>>;
  // credit_score_history: Array<Array<number>>;
};

export type Token = {
  token_id: string;
  name: string;
  address?: string;
  symbol: string;
  credit_score: number;
  categories: Array<string>;
  price: number;
  highest_price: number;
  price_stability: number;
  price_7d_stability: number;
  price_100d_stability: number;
  holder: number;
  holder_distribution: number;
  market_cap: number;
  trading_volume_24h: number;
  trading_volume_7d: number;
  trading_volume_100d: number;
  daily_transaction: number;
  rank_market_cap: number;
  rank_holders: number;
  rank_daily_transactions: number;
  rank_stable: number;
  rank_credit_score: number;
  rank_trading_volume_24h: number;
  rank_trading_volume_7d: number;
  rank_trading_volume_100d: number;
  market_cap_score: number;
  price_over_highest_score: number;
  number_of_transaction_score: number;
  trading_over_cap_score: number;
  holders_score: number;
  holder_distribution_score: number;
  price_stability_score: number;
  img_url: string;
  n_tokens: number;
};

export type ApiTokenHealth = {
  description: Description;
  tokenHistory: TokenHistory;
  tokens: Array<Token>;
};
