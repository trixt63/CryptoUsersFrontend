/* eslint-disable react/prop-types */
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next';
import { NextPageWithLayout } from 'pages/_app';
import { Meta } from 'src/components/Meta';
import { DashboardContextProvider, DashboardWalletCreditScoreData } from 'src/contexts/dashboard';
import FullLayout from 'src/layouts/FullLayout';
import WalletCreditScore from 'src/modules/dashboard/wallet/WalletCreditScore';
import { fetchDashboardWalletCreditScore } from 'src/services/dashboard-api';
import { fetchIntroductionWallet } from 'src/services/visualize-api';

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<DashboardWalletCreditScoreData>> {
  const id = ctx.query.id as string;
  const [introduction, data] = await Promise.all([fetchIntroductionWallet(id), fetchDashboardWalletCreditScore(id)]);
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

const WalletCreditScorePage: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  return (
    <>
      <Meta
        title={`Credit Score | Wallet ${props.wallet.address}`}
        description={'Wallet overview, transactions, money flow, credit score and relationship are detailed on Centic.'}
      />
      <DashboardContextProvider value={props}>
        <WalletCreditScore />
      </DashboardContextProvider>
    </>
  );
};

export default WalletCreditScorePage;

WalletCreditScorePage.getLayout = (page) => {
  return <FullLayout>{page}</FullLayout>;
};
