/* eslint-disable react/prop-types */
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next';
import { NextPageWithLayout } from 'pages/_app';
import { Meta } from 'src/components/Meta';
import { DashboardContextProvider, DashboardWalletTransactionsData } from 'src/contexts/dashboard';
import FullLayout from 'src/layouts/FullLayout';
import WalletTransactions from 'src/modules/dashboard/wallet/WalletTransactions.tsx';
import { fetchDashboardWalletTransactions } from 'src/services/_old/dashboard-api';
import { fetchIntroductionWallet } from 'src/services/_old/visualize-api';

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<DashboardWalletTransactionsData>> {
  const id = ctx.query.id as string;
  // const page = (ctx.query.page ?? '1') as string;
  const pageSize = '25';
  const chain = ctx.query.chain as string | undefined;
  const [introduction, txs] = await Promise.all([
    fetchIntroductionWallet(id),
    fetchDashboardWalletTransactions(id, { page: '1', pageSize, chain }),
  ]);
  return {
    props: {
      data: txs,
      wallet: {
        address: introduction.address,
        chains: introduction.chains,
        explorerUrls: introduction.explorerUrls,
      },
    },
  };
}

const WalletTransactionsPage: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  return (
    <>
      <Meta
        title={`Transactions | Wallet ${props.wallet.address}`}
        description={'Wallet overview, transactions, money flow, credit score and relationship are detailed on Centic.'}
      />
      <DashboardContextProvider value={props}>
        <WalletTransactions />
      </DashboardContextProvider>
    </>
  );
};

export default WalletTransactionsPage;

WalletTransactionsPage.getLayout = (page) => {
  return <FullLayout>{page}</FullLayout>;
};
