/* eslint-disable react/prop-types */
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next';
import { NextPageWithLayout } from 'pages/_app';
import { Meta } from 'src/components/Meta';
import { DashboardContextProvider } from 'src/contexts/dashboard';
import FullLayout from 'src/layouts/FullLayout';
import ContractOverview from 'src/modules/dashboard/contract/ContractOverview';
import { fetchDashboardContract } from 'src/services/_old/dashboard-api';
import { ApiDashboardContractOverview } from 'src/services/_old/dashboard-api/data-types/contract';

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<ApiDashboardContractOverview>> {
  const id = ctx.query.id as string;
  const res = await fetchDashboardContract(id);
  return {
    props: res,
  };
}

const ContractOverviewPage: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  return (
    <>
      <Meta
        title={`${props.name} | Contract address ${props.address}`}
        description={'Contract overview, transactions and users are detailed on Centic.'}
      />
      <DashboardContextProvider value={props}>
        <ContractOverview />
      </DashboardContextProvider>
    </>
  );
};

export default ContractOverviewPage;

ContractOverviewPage.getLayout = (page) => {
  return <FullLayout>{page}</FullLayout>;
};
