import { GetServerSidePropsContext } from 'next';
import { NextPageWithLayout } from 'pages/_app';
import FullLayout from 'src/layouts/FullLayout';
import RankingLayout from 'src/layouts/RankingLayout';
import { RankingContextProvider, SpotsRankingData } from 'src/modules/ranking/context';
import Spots from 'src/modules/ranking/spots/Spots';
import { getPagination } from 'src/services';
import { fetchSpotExchangesRanking } from 'src/services/_old/ranking-api';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { t } = context.query;
  const pagination = getPagination(context.query, 'volume');
  const data = await fetchSpotExchangesRanking({
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

const SpotsPage: NextPageWithLayout<SpotsRankingData> = (props: SpotsRankingData) => {
  return (
    <RankingContextProvider value={props}>
      <Spots />
    </RankingContextProvider>
  );
};

export default SpotsPage;

SpotsPage.getLayout = (page) => {
  return (
    <FullLayout>
      <RankingLayout
        tab="spots"
        title="Top Cryptocurrency Spot Exchanges"
        description="Check for the leading Cryptocurrencies Spot Exchanges according to their trading volume, liquidity, market, fiat supported, etc."
      >
        {page}
      </RankingLayout>
    </FullLayout>
  );
};
