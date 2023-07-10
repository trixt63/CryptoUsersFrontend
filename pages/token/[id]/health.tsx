/* eslint-disable react/prop-types */
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next';
import { NextPageWithLayout } from 'pages/_app';
import { Meta } from 'src/components/Meta';
import { DashboardContextProvider, DashboardTokenHealth } from 'src/contexts/dashboard';
import FullLayout from 'src/layouts/FullLayout';
import TokenHealth from 'src/modules/dashboard/token/TokenHealth';
import { fetchDashboardTokenIntro } from 'src/services/_old/dashboard-api';
import { fetchTokens } from 'src/services/token-health-api';
import { Token } from 'src/services/token-health-api/data-types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<DashboardTokenHealth>> {
  const id = ctx.query.id as string;
  const chain = ctx.query.chain as string;
  const [token, allTokenHealthData] = await Promise.all([
    fetchDashboardTokenIntro(id, { chain: chain }),
    fetchTokens(),
  ]);
  const tokensHealthData = allTokenHealthData.find((item: Token) => item.token_id == id);
  if (!tokensHealthData) {
    return { notFound: true };
  }
  return {
    props: {
      token: token,
      tokenHealth: tokensHealthData,
    },
  };
}

const TokenOverviewPage: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  return (
    <>
      <Meta
        title={`Token Health | ${props.token.name} Token (${props.token.symbol.toUpperCase()})`}
        description={`${
          props.token.name
        } (${props.token.symbol.toUpperCase()}) Token overview, transfers, holders, exchanges and health are detailed on Centic.`}
      />
      <DashboardContextProvider value={props}>
        <TokenHealth />
      </DashboardContextProvider>
    </>
  );
};

export default TokenOverviewPage;

TokenOverviewPage.getLayout = (page) => {
  return <FullLayout>{page}</FullLayout>;
};
