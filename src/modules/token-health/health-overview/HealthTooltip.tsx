import { Box, Typography } from '@mui/material';

const Item = ({ title, text }: { title: string; text: string }) => (
  <Box sx={{ mb: '4px' }}>
    <Typography variant="body2" sx={{ fontWeight: 500 }}>
      {title} <span style={{ fontSize: '14px', fontWeight: 400 }}>{text}</span>
    </Typography>
  </Box>
);

export const HealthTooltip = () => {
  return (
    <Box sx={{ maxWidth: { xs: '900px', sm: '1500' } }}>
      <Item title="1. Market Cap:" text="the standardized value of the total dollar market value of the token." />
      <Item
        title="2. Number of transactions:"
        text="the standardized value of the total number of transactions related to the token in the last 24h, 7 days, and 100 days."
      />
      <Item
        title="3. Trading volume:"
        text="the standardized value of the total value of all transactions related to the token in the last 24h, 7 days, and 100 days."
      />
      <Item title="4. Number of holders:" text="the standardized value of the total number of token holders." />
      <Item
        title="5. Holder distribution:"
        text="the standardized value that evaluates the equal distribution of the token among holders."
      />
      <Item
        title="6. Price:"
        text="the quotient of the current token price and the highest token price in the last 24h, 7 days, 30 days, 100 days, and all-time."
      />
      <Item
        title="7. Price stability:"
        text="the standardized value that evaluates the stability of the token price in the last 24h, 7 days, and 100 days."
      />
    </Box>
  );
};
