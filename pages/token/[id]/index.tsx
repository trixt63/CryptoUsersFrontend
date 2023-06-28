/* eslint-disable react/prop-types */
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next';
import { NextPageWithLayout } from 'pages/_app';
import { Meta } from 'src/components/Meta';
import { DashboardContextProvider, DashboardTokenOverview } from 'src/contexts/dashboard';
import FullLayout from 'src/layouts/FullLayout';
import TokenOverview from 'src/modules/dashboard/token/TokenOverview';
import { fetchDashboardToken, fetchDashboardTokenIntro } from 'src/services/dashboard-api';
import formatNumberAfterComma from 'src/utils';

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<DashboardTokenOverview>> {
  const id = ctx.query.id as string;
  const chain = ctx.query.chain as string;
  const [data, token] = await Promise.all([
    fetchDashboardToken(id, { chain: chain }),
    fetchDashboardTokenIntro(id, { chain: chain }),
  ]);
  return {
    props: {
      data: data,
      token: token,
    },
  };
}

const TokenOverviewPage: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  return (
    <>
      <Meta
        title={`$${formatNumberAfterComma(props.data.price)} | ${
          props.token.name
        } Token (${props.token.symbol.toUpperCase()})`}
        description={`${
          props.token.name
        } (${props.token.symbol.toUpperCase()}) Token overview, transfers, holders, exchanges and health are detailed on Centic.`}
      />
      <DashboardContextProvider value={props}>
        <TokenOverview />
      </DashboardContextProvider>
    </>
  );
};

export default TokenOverviewPage;

TokenOverviewPage.getLayout = (page) => {
  return <FullLayout>{page}</FullLayout>;
};
