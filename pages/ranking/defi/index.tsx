import { GetServerSidePropsContext } from 'next';
import { NextPageWithLayout } from 'pages/_app';
import FullLayout from 'src/layouts/FullLayout';
import RankingLayout from 'src/layouts/RankingLayout';
import { DeFiRankingData, RankingContextProvider } from 'src/modules/ranking/context';
import DeFi from 'src/modules/ranking/defi/DeFi';
import { getPagination } from 'src/services';
import { fetchDappsRanking } from 'src/services/ranking-api';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { chain, c, t } = context.query;
  const pagination = getPagination(context.query, 'tvl');
  const data = await fetchDappsRanking({
    chain: (chain as string) ?? undefined,
    category: c as string,
    duration: Number.isNaN(Number(t)) ? undefined : Number(t),
    ...pagination,
  });

  data.docs = data.docs.map((item) => ({ ...item, chains: item.chains.sort() }));

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

const DeFiPage: NextPageWithLayout<DeFiRankingData> = (props: DeFiRankingData) => {
  return (
    <RankingContextProvider value={props}>
      <DeFi />
    </RankingContextProvider>
  );
};

export default DeFiPage;

DeFiPage.getLayout = (page) => {
  return (
    <FullLayout>
      <RankingLayout
        tab="defi"
        title="Top Decentralized Applications"
        description="Check for the leading Decentralized Applications according to their TVL, users, TXN, etc."
      >
        {page}
      </RankingLayout>
    </FullLayout>
  );
};
