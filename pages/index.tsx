import FullLayout from 'src/layouts/FullLayout';
import { HomeContextProvider, HomeData } from 'src/modules/home-v2/context';
import Introduction from 'src/modules/home-v2/introduction';
import OurCommunity from 'src/modules/home-v2/OurCommunity';
import Ranking from 'src/modules/home-v2/ranking';
import SeeYourRank from 'src/modules/home-v2/SeeYourRank';
import { fetchHomeIntro, fetchHomeStatistic } from 'src/services/home-api';
import {
  fetchDappsRanking,
  fetchDerivativeExchangesRanking,
  fetchNFTsRanking,
  fetchSpotExchangesRanking,
  fetchTokensRanking,
} from 'src/services/ranking-api';
import { NextPageWithLayout } from './_app';

export async function getStaticProps() {
  const [intro, statistic, defi, nfts, tokens, spots, derivatives] = await Promise.all([
    fetchHomeIntro(),
    fetchHomeStatistic(),
    fetchDappsRanking(),
    fetchNFTsRanking(),
    fetchTokensRanking(),
    fetchSpotExchangesRanking(),
    fetchDerivativeExchangesRanking(),
  ]);
  return {
    props: {
      intro,
      statistic,
      defi,
      nfts,
      tokens,
      spots,
      derivatives,
    },
    revalidate: process.env.NEXT_PUBLIC_TEST_MODE === 'true' ? undefined : 60 * 60, // 1h
  };
}

const Home: NextPageWithLayout<HomeData> = (props) => {
  return (
    <HomeContextProvider value={props}>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <clipPath id="hexagon" clipPathUnits="objectBoundingBox">
            <path d="M0.015,0.548 C0,0.518,0,0.482,0.015,0.452 L0.223,0.048 C0.238,0.018,0.266,0,0.297,0 H0.711 C0.742,0,0.77,0.018,0.785,0.048 L0.992,0.452 C1,0.482,1,0.518,0.992,0.548 L0.785,0.952 C0.77,0.982,0.742,1,0.711,1 H0.297 C0.266,1,0.238,0.982,0.223,0.952 L0.015,0.548" />
          </clipPath>
        </defs>
      </svg>
      <Introduction />
      {/*<Ranking />*/}
      {/*<SeeYourRank />*/}
      {/*<OurCommunity />*/}
    </HomeContextProvider>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <FullLayout>{page}</FullLayout>;
};
