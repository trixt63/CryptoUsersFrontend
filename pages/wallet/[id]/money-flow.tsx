/* eslint-disable react/prop-types */
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next';
import { NextPageWithLayout } from 'pages/_app';
import { Meta } from 'src/components/Meta';
import { DashboardContextProvider, DashboardWalletMoneyFlowData } from 'src/contexts/dashboard';
import FullLayout from 'src/layouts/FullLayout';
import WalletMoneyFlow from 'src/modules/dashboard/wallet/WalletMoneyFlow';
import { fetchDashboardWalletMoneyFlow } from 'src/services/dashboard-api';
import { fetchIntroductionWallet } from 'src/services/visualize-api';

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<DashboardWalletMoneyFlowData>> {
  const id = ctx.query.id as string;
  const [introduction, data] = await Promise.all([fetchIntroductionWallet(id), fetchDashboardWalletMoneyFlow(id)]);
  return {
    props: {
      data,
      wallet: {
        address: introduction.address,
        chains: introduction.chains,
        explorerUrls: introduction.explorerUrls,
      },
    },
  };
}

const WalletMoneyFlowPage: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  return (
    <>
      <Meta
        title={`Money Flow | Wallet ${props.wallet.address}`}
        description={'Wallet overview, transactions, money flow, credit score and relationship are detailed on Centic.'}
      />
      <DashboardContextProvider value={props}>
        <WalletMoneyFlow />
      </DashboardContextProvider>
    </>
  );
};

export default WalletMoneyFlowPage;

WalletMoneyFlowPage.getLayout = (page) => {
  return <FullLayout>{page}</FullLayout>;
};
