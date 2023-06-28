import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import { formatNumber } from '@travalendingpool/utils';
import { useState } from 'react';
import { Token } from 'src/redux/portfolio/dapps-slice';
import formatNumberAfterComma, { getEntityUrl } from 'src/utils';
import DappsRowDetails from './DappsRowDetails';
import { Link } from 'src/components/primitives/Link';

interface TokenRowsProps {
  width: string;
  token: Token;
  dAppId: string;
}
export default function DappsRow(props: TokenRowsProps) {
  const { width, token, dAppId } = props;
  const [expanded, setExpanded] = useState<string | false>(false);

  const minWidth = '160px';

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Box sx={{ display: { xs: 'flex', lg: 'block' } }}>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
        TransitionProps={{ unmountOnExit: true }}
        sx={{
          backgroundColor: expanded === 'panel1' ? '#0E1D27' : 'background.paper',
        }}
      >
        <AccordionSummary
          id="panel1bh-header"
          sx={{
            '&:hover': { backgroundColor: 'background.secondary' },
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <Link href={getEntityUrl(token)}>
              <Box
                sx={{
                  width: width,
                  minWidth: minWidth,
                  position: 'sticky',
                  left: 0,
                  bgcolor: { xs: expanded === 'panel1' ? '#0E1D27' : '#0D1921', lg: 'transparent' },
                  '&:hover': { backgroundColor: 'background.secondary' },
                }}
              >
                <Typography sx={{ display: 'flex', alignItems: 'center', color: 'text.primary', fontWeight: 500 }}>
                  <img src={token.imgUrl} width={20} alt={'imgToken'} style={{ paddingRight: '6px' }} />
                  {token.name}
                </Typography>
                <Typography variant="body2" sx={{ ml: '20px', textTransform: 'capitalize' }}>
                  {token.action}
                </Typography>
              </Box>
            </Link>
            <Box sx={{ width: width, minWidth: minWidth }}>
              <Typography sx={{ color: 'text.primary', fontWeight: 600 }}>{token.tokenHealth}</Typography>
              <Box sx={{ height: '6px', background: '#1a232f', maxWidth: '120px', borderRadius: '6px' }}>
                <Box
                  sx={{
                    height: '6px',
                    background: '#15c381',
                    width: `${(token.tokenHealth / 1000) * 100}%`,
                    borderRadius: '6px',
                  }}
                />
              </Box>
            </Box>
            <Box sx={{ width: width, minWidth: minWidth }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ color: 'text.primary' }}>
                  {formatNumber(token.amount, { fractionDigits: 2 })}
                </Typography>
                {/* <Typography>&nbsp;{token.symbol}</Typography> */}
              </Box>
              <Typography variant="small" sx={{ color: 'text.secondary' }}>
                {formatNumber(token.valueInUSD, { fractionDigits: 2, prefix: '$' })}
              </Typography>
            </Box>
            <Box sx={{ width: width, minWidth: minWidth }}>
              <Typography sx={{ color: 'text.primary' }}>${formatNumberAfterComma(token.price)}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="small" sx={{ color: '#15c784' }}>
                  {formatNumber(token.priceChangeRate * 100, { fractionDigits: 2, suffix: '%' })}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }} variant="small">
                  {' '}
                  / 24h
                </Typography>
              </Box>
            </Box>
            <Box sx={{ width: width, minWidth: minWidth }}>
              <Typography>{formatNumberAfterComma(token.apy)}%</Typography>
            </Box>
            <Box sx={{ width: width, minWidth: minWidth }}>
              <Typography>{formatNumberAfterComma(token.apr)}%</Typography>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <DappsRowDetails dAppId={dAppId} tokenId={token.id} action={token.action} />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
