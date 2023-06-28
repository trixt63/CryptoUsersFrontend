/* eslint-disable react/prop-types */
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next';
import { NextPageWithLayout } from 'pages/_app';
import { Meta } from 'src/components/Meta';
import { DashboardContextProvider } from 'src/contexts/dashboard';
import FullLayout from 'src/layouts/FullLayout';
import WalletOverview from 'src/modules/dashboard/wallet/WalletOverview';
import { fetchDashboardWalletOverview } from 'src/services/dashboard-api';
import { ApiDashboardWallet } from 'src/services/dashboard-api/data-types';

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<ApiDashboardWallet>> {
  const id = ctx.query.id as string;
  const res = await fetchDashboardWalletOverview(id);
  return {
    props: res,
  };
}

const WalletOverviewPage: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  return (
    <>
      <Meta
        title={`Wallet ${props.address}`}
        description={'Wallet overview, transactions, money flow, credit score and relationship are detailed on Centic.'}
      />
      <DashboardContextProvider value={props}>
        <WalletOverview />
      </DashboardContextProvider>
    </>
  );
};

export default WalletOverviewPage;

WalletOverviewPage.getLayout = (page) => {
  return <FullLayout>{page}</FullLayout>;
};
