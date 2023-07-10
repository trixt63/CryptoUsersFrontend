/* eslint-disable react/prop-types */
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next';
import { NextPageWithLayout } from 'pages/_app';
import { Meta } from 'src/components/Meta';
import { DashboardContextProvider, DashboardTokenExchangesData } from 'src/contexts/dashboard';
import FullLayout from 'src/layouts/FullLayout';
import TokenExchanges from 'src/modules/dashboard/token/TokenExchanges';
import { fetchDashboardTokenExchanges, fetchDashboardTokenIntro } from 'src/services/_old/dashboard-api';

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<DashboardTokenExchangesData>> {
  const id = ctx.query.id as string;
  const chain = ctx.query.chain as string;
  const [data, token] = await Promise.all([
    fetchDashboardTokenExchanges(id),
    fetchDashboardTokenIntro(id, { chain: chain }),
  ]);

  return {
    props: {
      data,
      token,
    },
  };
}

const TokenOverviewPage: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  return (
    <>
      <Meta
        title={`Exchanges | ${props.token.name} Token (${props.token.symbol.toUpperCase()})`}
        description={`${
          props.token.name
        } (${props.token.symbol.toUpperCase()}) Token overview, transfers, holders, exchanges and health are detailed on Centic.`}
      />
      <DashboardContextProvider value={props}>
        <TokenExchanges />
      </DashboardContextProvider>
    </>
  );
};

export default TokenOverviewPage;

TokenOverviewPage.getLayout = (page) => {
  return <FullLayout>{page}</FullLayout>;
};
