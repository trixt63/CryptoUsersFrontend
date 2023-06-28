import { Box, Paper, Theme, Typography, useMediaQuery } from '@mui/material';
import Breadcrumb from '../../../components/BreakCrumbs/BreadCrumbs';
import { useTokenHealthContext } from '../context';

export default function OverviewTokenHealth() {
  const { token } = useTokenHealthContext();
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const links = [
    {
      title: 'Ranking',
      link: '/ranking',
    },
    {
      title: 'Tokens',
      link: '/ranking/tokens',
    },
  ];
  return (
    <Box sx={{ mt: 2 }}>
      <Breadcrumb links={links} destination={token.name} />
      <Paper sx={{ p: 3, mt: 2 }}>
        <Box sx={{ display: 'flex' }}>
          <img src={token.img_url} alt="token-img" width={smDown ? 40 : 100} height={smDown ? 40 : 100} />
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', ml: { xs: 1, sm: 2 } }}>
            <Typography variant="h2" component="h1" sx={{ color: 'text.primary' }}>
              {token.name}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'baseLine',
                mt: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  Tags
                </Typography>
                <Box sx={{ display: { xs: 'block', sm: 'flex' } }}>
                  {token.categories.map((item, index) => (
                    <Typography
                      key={index}
                      variant="small"
                      sx={{
                        p: 0.4,
                        ml: 1,
                        borderRadius: '6px',
                        borderColor: '#527492',
                        border: '1px solid ',
                        color: 'text.secondary',
                        mb: { xs: 1, sm: 0 },
                        textAlign: 'center',
                      }}
                    >
                      {item}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
