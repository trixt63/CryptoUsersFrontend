import { GetServerSidePropsContext } from 'next';
import { NextPageWithLayout } from 'pages/_app';
import FullLayout from 'src/layouts/FullLayout';
import RankingLayout from 'src/layouts/RankingLayout';
import { DerivativesRankingData, RankingContextProvider } from 'src/modules/ranking/context';
import Derivatives from 'src/modules/ranking/derivatives/Derivatives';
import { getPagination } from 'src/services';
import { fetchDerivativeExchangesRanking } from 'src/services/_old/ranking-api';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { t } = context.query;
  const pagination = getPagination(context.query, 'volume');
  const data = await fetchDerivativeExchangesRanking({
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

const DerivativesPage: NextPageWithLayout<DerivativesRankingData> = (props: DerivativesRankingData) => {
  return (
    <RankingContextProvider value={props}>
      <Derivatives />
    </RankingContextProvider>
  );
};

export default DerivativesPage;

DerivativesPage.getLayout = (page) => {
  return (
    <FullLayout>
      <RankingLayout
        tab="derivatives"
        title="Top Cryptocurrency Derivative Exchanges"
        description="Check for the leading Cryptocurrency Derivative Exchanges according to their trading volume, marker fees, taker fees, open interest, etc."
      >
        {page}
      </RankingLayout>
    </FullLayout>
  );
};
