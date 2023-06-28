import { GetServerSidePropsContext } from 'next';
import { NextPageWithLayout } from 'pages/_app';
import { NFTsRankingData, RankingContextProvider } from 'src/modules/ranking/context';
import NFTs from 'src/modules/ranking/nfts/NFTs';
import RankingLayout from 'src/layouts/RankingLayout';
import { fetchNFTsRanking } from 'src/services/ranking-api';
import { getPagination } from 'src/services';
import FullLayout from 'src/layouts/FullLayout';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { t } = context.query;
  const pagination = getPagination(context.query, 'volume');
  const data = await fetchNFTsRanking({
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

const NFTsPage: NextPageWithLayout<NFTsRankingData> = (props: NFTsRankingData) => {
  return (
    <RankingContextProvider value={props}>
      <NFTs />
    </RankingContextProvider>
  );
};

export default NFTsPage;

NFTsPage.getLayout = (page) => {
  return (
    <FullLayout>
      <RankingLayout
        title="Top NFTs"
        description="Check for the leading NFTs according to their volumes, prices, owners, etc."
        tab="nfts"
      >
        {page}
      </RankingLayout>
    </FullLayout>
  );
};
