import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import { useState } from 'react';
import { Link } from 'src/components/primitives/Link';
import { UserAsset } from 'src/redux/portfolio/assets-slice';
import formatNumberAfterComma from 'src/utils';
import PriceInTheLast7Days from './PriceInTheLast7Days';
import TokensDetails from './TokensDetails';

interface TokenRowsProps {
  data: UserAsset;
  width: string;
}

export default function TokensRow(props: TokenRowsProps) {
  const { data, width } = props;
  const [expanded, setExpanded] = useState<string | false>(false);
  const minWidth = 190;

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClickToken = (e: React.SyntheticEvent) => {
    e.stopPropagation();
  };
  return (
    <Box sx={{ display: { xs: 'flex', lg: 'block' } }}>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
        sx={{ backgroundColor: expanded === 'panel1' ? '#0E1D27' : 'background.paper', height: '100%' }}
        TransitionProps={{ unmountOnExit: true }}
      >
        <AccordionSummary
          id="panel1bh-header"
          sx={{
            '&:hover': { backgroundColor: 'background.secondary' },
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <Box
              sx={{
                width: width,
                minWidth: minWidth,
                position: 'sticky',
                left: 0,
                bgcolor: { xs: expanded === 'panel1' ? '#0E1D27' : '#0D1921', lg: 'transparent' },
                '&:hover': { backgroundColor: 'background.secondary' },
                zIndex: 1,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <img src={data.imgUrl} width={24} alt={'imgToken'} style={{ paddingRight: '6px' }} />
              <Link
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'text.primary',
                  fontWeight: 500,
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
                onClick={handleClickToken}
                href={`/token/${data.id}`}
              >
                {data.name}
              </Link>
            </Box>
            <Box sx={{ width: width, minWidth: minWidth }}>
              <Box>
                <Typography sx={{ color: 'text.primary', mb: 1, fontWeight: 500 }}>{data.tokenHealth}</Typography>
                <Box
                  sx={{
                    height: '6px',
                    background: '#171f2a',
                    maxWidth: '120px',
                    borderRadius: '6px',
                    width: '100%',
                  }}
                >
                  <Box
                    sx={{
                      height: '6px',
                      background: '#15c381',
                      maxWidth: '120px',
                      borderRadius: '6px',
                      width: `${(data.tokenHealth / 1000) * 100}%`,
                    }}
                  />
                </Box>
              </Box>
            </Box>
            <Box sx={{ width: width, minWidth: minWidth }}>
              <Box>
                <Box sx={{ display: 'flex' }}>
                  <Typography sx={{ color: 'text.primary' }}>{formatNumberAfterComma(data.amount)} </Typography>
                  {/* <Typography sx={{ textTransform: 'capitalize' }}>&nbsp;{data.symbol}</Typography> */}
                </Box>
                <Typography variant="small" sx={{ color: 'text.secondary' }}>
                  ${formatNumberAfterComma(data.valueInUSD)}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ width: width, minWidth: minWidth }}>
              <Box>
                <Typography sx={{ color: 'text.primary' }}>${formatNumberAfterComma(data.price)}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="small" sx={{ color: data.priceChangeRate >= 0 ? '#15c784' : '#ce214e' }}>
                    {formatNumberAfterComma(data.priceChangeRate)}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }} variant="small">
                    &nbsp;/ 24h
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ width: width, minWidth: minWidth, zIndex: 0 }}>
              <PriceInTheLast7Days data={data.priceLast7Days} />
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <TokensDetails tokenId={data.id} />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
