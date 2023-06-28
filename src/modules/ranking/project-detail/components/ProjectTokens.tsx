import { Avatar, Box, Button, LinearProgress, List, Paper, Typography } from '@mui/material';
import { Link } from 'src/components/primitives/Link';
import { useProjectOverview } from 'src/contexts/project';
import formatNumberAfterComma, { getEntityUrl } from 'src/utils';
import ChangeRate from '../../components/ChangeRate';

const getProgressColor = (score: number) => {
  if (score < 200) {
    return 'error';
  }
  if (score < 500) {
    return 'warning';
  }
  return 'success';
};

export default function ProjectTokens() {
  const data = useProjectOverview();

  if (data.tokens.length === 0) return null;

  return (
    <Paper variant="border" sx={{ mt: 2 }}>
      <Box sx={{ py: 2, px: 2, borderBottom: '1px solid', borderColor: 'common.border' }}>
        <Typography variant="h4">Tokens</Typography>
      </Box>
      <Box className="hide-scrollbar" sx={{ overflow: 'auto' }}>
        <List component="div">
          {data.tokens.map((token) => (
            <Button
              key={token.id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                columnGap: 2,
                color: 'inherit',
                textTransform: 'none',
                borderRadius: 0,
                minWidth: 300,
                '&:hover': {
                  bgcolor: 'background.secondary',
                },
              }}
              LinkComponent={Link}
              href={getEntityUrl(token)}
            >
              <Box
                sx={{ display: 'flex', alignItems: 'center', flexBasis: '35%', maxWidth: { xs: 'none', md: '130px' } }}
              >
                <Avatar src={token.imgUrl} alt={token.name} sx={{ width: 30, height: 30, mr: 1 }} />
                <Typography fontWeight={500} sx={{ textTransform: 'uppercase' }} className="text-truncate">
                  {token.symbol}
                </Typography>
              </Box>
              <Box>
                <Typography align="center" fontWeight={500} gutterBottom>
                  {token.tokenHealth}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(token.tokenHealth / 1000) * 100}
                  sx={{ width: 50, borderRadius: 4, bgcolor: '#1B232F' }}
                  color={getProgressColor(token.tokenHealth)}
                />
              </Box>
              <Box sx={{ flexBasis: '30%', minWidth: 'fit-content' }}>
                <Typography align="right">${formatNumberAfterComma(token.price)}</Typography>
                <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <ChangeRate rate={token.priceChangeRate} />
                  &nbsp;
                  <Typography component="span" color="text.secondary" variant="body2">
                    / 24h
                  </Typography>
                </Typography>
              </Box>
            </Button>
          ))}
        </List>
      </Box>
    </Paper>
  );
}
