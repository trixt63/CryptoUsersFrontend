/* eslint-disable react/prop-types */
import { GetServerSidePropsContext } from 'next';
import { NextPageWithLayout } from 'pages/_app';
import { Meta } from 'src/components/Meta';
import { chainSelectConfigs } from 'src/configs/networkConfig';
import { DashboardContextProvider } from 'src/contexts/dashboard';
import FullLayout from 'src/layouts/FullLayout';
import OverviewTransaction from 'src/modules/dashboard/transaction/OverviewTransaction';
import { fetchDashboardTransaction } from 'src/services/dashboard-api';
import { ApiDashboardTransaction } from 'src/services/dashboard-api/data-types';

const Overview: NextPageWithLayout<ApiDashboardTransaction> = (props) => {
  return (
    <>
      <Meta
        title={`Transactions Hash (Txhash) Details on ${chainSelectConfigs[props.chain].name} network`}
        description={'Transaction overview, transfers and relationship are detailed on Centic.'}
      />
      <DashboardContextProvider value={props}>
        <OverviewTransaction />
      </DashboardContextProvider>
    </>
  );
};

export default Overview;

Overview.getLayout = (page) => {
  return <FullLayout>{page}</FullLayout>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const data = await fetchDashboardTransaction(context.query.id as string);
  return {
    props: data,
  };
}
