/* eslint-disable react/prop-types */
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next';
import { NextPageWithLayout } from 'pages/_app';
import { Meta } from 'src/components/Meta';
import { DashboardContextProvider, DashboardTokenTransfersData } from 'src/contexts/dashboard';
import FullLayout from 'src/layouts/FullLayout';
import TokenTransfers from 'src/modules/dashboard/token/TokenTransfers';
import { fetchDashboardTokenIntro, fetchDashboardTokenTransactions } from 'src/services/dashboard-api';

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<DashboardTokenTransfersData>> {
  const id = ctx.query.id as string;
  const chain = ctx.query.chain as string;
  const page = (ctx.query.page || 1) as number;
  const [data, token] = await Promise.all([
    fetchDashboardTokenTransactions(id, { page: page, pageSize: 25 }),
    fetchDashboardTokenIntro(id, { chain: chain }),
  ]);
  return {
    props: {
      data,
      token,
      page: page,
    },
  };
}

const TokenTransactionsPage: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  return (
    <>
      <Meta
        title={`Transfers | ${props.token.name} Token (${props.token.symbol.toUpperCase()})`}
        description={`${
          props.token.name
        } (${props.token.symbol.toUpperCase()}) Token overview, transfers, holders, exchanges and health are detailed on Centic.`}
      />
      <DashboardContextProvider value={props}>
        <TokenTransfers />
      </DashboardContextProvider>
    </>
  );
};

export default TokenTransactionsPage;

TokenTransactionsPage.getLayout = (page) => {
  return <FullLayout>{page}</FullLayout>;
};
