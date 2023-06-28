import { GetServerSidePropsContext } from 'next';
import { NextPageWithLayout } from 'pages/_app';
import FullLayout from 'src/layouts/FullLayout';
import RankingLayout from 'src/layouts/RankingLayout';
import { RankingContextProvider, TokensRankingData } from 'src/modules/ranking/context';
import Tokens from 'src/modules/ranking/tokens/Tokens';
import { getPagination } from 'src/services';
import { fetchTokensRanking } from 'src/services/ranking-api';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { t } = context.query;
  const pagination = getPagination(context.query, 'tokenHealth');
  const data = await fetchTokensRanking({
    duration: Number.isNaN(Number(t)) ? undefined : Number(t),
    ...pagination,
  });

  return {
    props: {
      ...context.query,
      pagination: {
        ...pagination,
        total: data.numberOfDocs,
      },
      data,
    },
  };
}

const TokensPage: NextPageWithLayout<TokensRankingData> = (props: TokensRankingData) => {
  return (
    <RankingContextProvider value={props}>
      <Tokens />
    </RankingContextProvider>
  );
};

export default TokensPage;

TokensPage.getLayout = (page) => {
  return (
    <FullLayout>
      <RankingLayout
        tab="tokens"
        title="Top Cryptocurrencies"
        description="Check for the leading Cryptocurrencies according to their prices, market cap, volumes, etc."
      >
        {page}
      </RankingLayout>
    </FullLayout>
  );
};
