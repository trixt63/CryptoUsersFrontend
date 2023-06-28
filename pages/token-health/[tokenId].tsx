/* eslint-disable react/prop-types */
// import { GetStaticPaths, GetStaticPropsContext } from 'next';
import { Container, Grid, Theme, useMediaQuery } from '@mui/material';
import { formatNumber } from '@travalendingpool/utils';
import { GetServerSidePropsContext } from 'next';
import { NextPageWithLayout } from 'pages/_app';
import { Meta } from 'src/components/Meta';
import FullLayout from 'src/layouts/FullLayout';
import Activity from 'src/modules/token-health/activity';
import AnalysisSuggestion from 'src/modules/token-health/analysis-suggestion';
import { TokenHealthData, TokenHealthProvider } from 'src/modules/token-health/context';
import DetailScore from 'src/modules/token-health/detail-score';
import HealthOverview from 'src/modules/token-health/health-overview';
import OverviewTokenHealth from 'src/modules/token-health/overview-token-health';
import TokenHealthHistory from 'src/modules/token-health/token-health-history';
import { fetchTokenHealthDescription, fetchTokenHealthHistory, fetchTokens } from 'src/services/token-health-api';
import { Token } from 'src/services/token-health-api/data-types';
import formatNumberAfterComma from 'src/utils';

const TokenHealth: NextPageWithLayout<TokenHealthData> = (props) => {
  const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  return (
    <TokenHealthProvider value={props}>
      <Meta
        title={`${
          props.token.name
        } (${props.token.symbol.toUpperCase()}) health today, price, marketcap, volume and charts`}
        keywords={[props.token.name, 'Health Score', ...props.token.categories].join(', ')}
        description={`${
          props.token.name
        } (${props.token.symbol.toUpperCase()}) Price today is $${formatNumberAfterComma(
          props.token.price
        )} with the health score at ${props.token.credit_score} and price stability at ${formatNumber(
          props.token.price_stability,
          { fractionDigits: 2, suffix: '%' }
        )}, marketcap ranking at ${props.token.rank_market_cap}/${props.totalTokens}.`}
      />
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={8}>
            <OverviewTokenHealth />
            {lgDown && <Activity />}
            <HealthOverview />
            <TokenHealthHistory />
            {lgDown && <AnalysisSuggestion />}
            <DetailScore />
          </Grid>
          {!lgDown && (
            <Grid item xs={12} lg={4}>
              <Activity />
              <AnalysisSuggestion />
            </Grid>
          )}
        </Grid>
      </Container>
    </TokenHealthProvider>
  );
};

export default TokenHealth;

TokenHealth.getLayout = (page) => {
  return <FullLayout>{page}</FullLayout>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const [description, tokenHistory, tokens] = await Promise.all([
    fetchTokenHealthDescription(context.query.tokenId as string),
    fetchTokenHealthHistory(context.query.tokenId as string),
    fetchTokens(),
  ]);

  const token = tokens.find((item: Token) => item.token_id == context.query.tokenId);

  if (!description || !tokenHistory || !token) {
    return {
      redirect: {
        destination: '/ranking/tokens',
        permanent: false,
      },
    };
  }

  return {
    props: {
      description: description,
      tokenHistory: tokenHistory,
      totalTokens: tokens.length,
      token: token,
    },
  };
}
