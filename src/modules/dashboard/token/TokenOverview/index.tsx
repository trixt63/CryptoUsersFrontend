import { useDashboardToken } from 'src/contexts/dashboard';
import TokenLayout from '../TokenLayout';
import { Box, Chip, List, Paper, Typography } from '@mui/material';
import LabelValue from '../../shared/LabelValue';
import { formatAddress, formatNumber } from '@travalendingpool/utils';
import CircleIcon from '@mui/icons-material/Circle';
import CreditScoreImg from 'public/images/credit_score.png';
import Image from 'next/image';

export default function TokenOverview() {
  const { token, data } = useDashboardToken();

  return (
    <TokenLayout
      header={{
        name: 'Token',
        tokenName: token.name,
        logoIcon: token.imgUrl,
        symbol: token.symbol,
        value: token.address && formatAddress(token.address),
        valueCopy: String(token.address),
        externalLink: token.explorerUrls && token.explorerUrls[0], // Haven't handle switch chain
        chains: token.chains,
      }}
    >
      <Paper variant="border" sx={{ p: 3 }}>
        <LabelValue
          label="Token Health"
          value={
            <Box sx={{ flexWrap: 'wrap', justifyContent: 'start', display: 'flex' }}>
              <Typography component="div" sx={{ mr: 1, fontWeight: 500 }}>
                {data.tokenHealth}
              </Typography>
              <Image src={CreditScoreImg} alt="credit score" width={25} height={25} />
            </Box>
          }
        />
        <LabelValue label="Decimals" value={data.decimals} />
        {/* <LabelValue label="Market Information" value={data.symbol} /> */}
        <Box sx={{ display: 'flex', alignItems: 'baseline', py: 1, '&:not(:last-of-type)': { mb: 0 } }}>
          <Box sx={{ width: { xs: '40%', sm: '30%' } }}>
            <Typography className="text-truncate" sx={{ fontWeight: 500 }} color="text.secondary">
              Market Information
            </Typography>
          </Box>
        </Box>
        <List
          sx={{
            listStyleType: 'disc',

            '& .MuiListItem-root': {
              display: 'list-item',
            },
          }}
        >
          <LabelValue
            label={
              <>
                <CircleIcon sx={{ fontSize: '10px', mx: 1 }} />
                Price
              </>
            }
            value={formatNumber(data.price)}
          />
          <LabelValue
            label={
              <>
                <CircleIcon sx={{ fontSize: '10px', mx: 1 }} />
                Market Cap
              </>
            }
            value={formatNumber(data.marketCap)}
          />
          <LabelValue
            label={
              <>
                <CircleIcon sx={{ fontSize: '10px', mx: 1 }} />
                Trading Volume 24H
              </>
            }
            value={formatNumber(data.tradingVolume)}
          />
        </List>
        <LabelValue label="Total Supply" value={formatNumber(data.totalSupply)} />
        <LabelValue label="Holders" value={formatNumber(data.numberOfHolders)} />
        {data.socialNetworks && (
          <LabelValue
            label="Social Networks"
            value={
              <>
                {Object.keys(data.socialNetworks).map((item) => (
                  <Chip
                    key={item}
                    label={item}
                    color="secondary"
                    clickable
                    component={'a'}
                    href={data.socialNetworks[item]}
                    target={'_blank'}
                    rel="noopener noreferrer"
                    sx={{ textTransform: 'capitalize', mr: 1.5 }}
                  />
                ))}
              </>
            }
          />
        )}
        {data.sourceCode && (
          <LabelValue
            label="Source Code"
            value={
              <Box>
                <Chip
                  label={'Github'}
                  color="secondary"
                  clickable
                  component={'a'}
                  href={data.sourceCode}
                  target={'_blank'}
                  rel="noopener noreferrer"
                  sx={{ textTransform: 'capitalize' }}
                />
              </Box>
            }
          />
        )}
      </Paper>
    </TokenLayout>
  );
}
