import { Box } from '@mui/material';
import ScorePaper from '../components/ScorePaper';
import { useTokenHealthContext } from '../context';
import DetailScoreChart from './DetailScoreChart';

const detailChartConfig = [
  {
    id: 0,
    title: 'Price Score',
    types: ['price_over_highest_score_history', 'price_history'],
  },
  {
    id: 1,
    title: 'Price Stability Score',
    types: ['price_stability_score_history', 'price_stability_history'],
  },
  {
    id: 2,
    title: 'Number Of Transactions Score',
    types: ['number_of_transaction_score_history', 'daily_transaction_history'],
  },
  {
    id: 3,
    title: 'Market Cap Score',
    types: ['market_cap_score_history', 'market_cap_history'],
  },
  {
    id: 4,
    title: 'Trading Volume Score',
    types: ['trading_score_history', 'trading_volume_24h_history'],
  },
  {
    id: 5,
    title: 'Holders Score',
    types: ['holders_score_history', 'holder_history'],
  },
  {
    id: 6,
    title: 'Holder Distribution Score',
    types: ['holder_distribution_score_history', 'holder_distribution_history'],
  },
] as Array<{ id: number; title: string; types: Array<string> }>;

export const tokenHistoryTitles: { [key: string]: string } = {
  credit_score_history: 'Health Score',
  market_cap_score_history: 'Market Cap Score',
  market_cap_history: 'Market Cap($)',
  price_over_highest_score_history: 'Price Score',
  price_history: 'Price($)',
  number_of_transaction_score_history: 'Number Of Transactions Score',
  daily_transaction_history: 'Number Of Transactions',
  trading_score_history: 'Trading Volume Score',
  trading_volume_24h_history: 'Trading Volume($)',
  holder_distribution_score_history: 'Holder Distribution Score',
  holder_distribution_history: 'Holder Distribution',
  holders_score_history: 'Holders Score',
  holder_history: 'Number Of Holders',
  price_stability_score_history: 'Price Stability Score',
  price_stability_history: 'Price Stability',
};

export default function DetailScore() {
  const { tokenHistory } = useTokenHealthContext();
  return (
    <Box sx={{ mt: 4 }}>
      {detailChartConfig.map((item) => (
        <Box key={item.id} sx={{ my: 4 }}>
          <ScorePaper title={item.title}>
            <DetailScoreChart
              chartData={[
                { name: tokenHistoryTitles[item.types[0]], data: tokenHistory[item.types[0]] },
                { name: tokenHistoryTitles[item.types[1]], data: tokenHistory[item.types[1]] },
              ]}
            />
          </ScorePaper>
        </Box>
      ))}
    </Box>
  );
}
