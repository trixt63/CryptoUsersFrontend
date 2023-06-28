/* eslint-disable react/prop-types */
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next';
import { NextPageWithLayout } from 'pages/_app';
import { Meta } from 'src/components/Meta';
import { DashboardContextProvider, DashboardTokenHoldersData } from 'src/contexts/dashboard';
import FullLayout from 'src/layouts/FullLayout';
import TokenHolders from 'src/modules/dashboard/token/TokenHolders';
import { fetchDashboardTokenHolders, fetchDashboardTokenIntro } from 'src/services/dashboard-api';

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<DashboardTokenHoldersData>> {
  const id = ctx.query.id as string;
  const chain = ctx.query.chain as string;
  const [data, token] = await Promise.all([
    fetchDashboardTokenHolders(id),
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
        title={`Holders | ${props.token.name} Token (${props.token.symbol.toUpperCase()})`}
        description={`${
          props.token.name
        } (${props.token.symbol.toUpperCase()}) Token overview, transfers, holders, exchanges and health are detailed on Centic.`}
      />
      <DashboardContextProvider value={props}>
        <TokenHolders />
      </DashboardContextProvider>
    </>
  );
};

export default TokenOverviewPage;

TokenOverviewPage.getLayout = (page) => {
  return <FullLayout>{page}</FullLayout>;
};
