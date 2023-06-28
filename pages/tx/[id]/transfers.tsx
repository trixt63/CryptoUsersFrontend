/* eslint-disable react/prop-types */
import { GetServerSidePropsContext } from 'next';
import { NextPageWithLayout } from 'pages/_app';
import { Meta } from 'src/components/Meta';
import { chainSelectConfigs } from 'src/configs/networkConfig';
import { DashboardContextProvider, DashboardTransactionTransfersData } from 'src/contexts/dashboard';
import FullLayout from 'src/layouts/FullLayout';
import TransfersTransaction from 'src/modules/dashboard/transaction/TransfersTransaction';
import { fetchDashboardTransactionTransfers } from 'src/services/dashboard-api';
import { fetchIntroductionTransaction } from 'src/services/visualize-api';

const Transfer: NextPageWithLayout<DashboardTransactionTransfersData> = (props) => {
  return (
    <>
      <Meta
        title={`Transactions Hash (Txhash) Details on ${chainSelectConfigs[props.chain].name} network`}
        description={'Transaction overview, transfers and relationship are detailed on Centic.'}
      />
      <DashboardContextProvider value={props}>
        <TransfersTransaction />
      </DashboardContextProvider>
    </>
  );
};

export default Transfer;

Transfer.getLayout = (page) => {
  return <FullLayout>{page}</FullLayout>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const [transactionTransferData, introduction] = await Promise.all([
    fetchDashboardTransactionTransfers(context.query.id as string),
    fetchIntroductionTransaction(context.query.id as string),
  ]);

  return {
    props: {
      data: transactionTransferData,
      transactionHash: introduction.hash,
      explorerUrl: introduction.explorerUrls[0],
      chain: introduction.chains[0],
    },
  };
}
