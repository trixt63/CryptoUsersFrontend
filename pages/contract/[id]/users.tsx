/* eslint-disable react/prop-types */
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next';
import { NextPageWithLayout } from 'pages/_app';
import { Meta } from 'src/components/Meta';
import { DashboardContextProvider, DashboardContractUsersData } from 'src/contexts/dashboard';
import FullLayout from 'src/layouts/FullLayout';
import ContractUsers from 'src/modules/dashboard/contract/ContractUsers';
import { fetchDashboardContractUsers } from 'src/services/dashboard-api';
import { fetchIntroductionContract } from 'src/services/visualize-api';

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<DashboardContractUsersData>> {
  const id = ctx.query.id as string;
  const [introduction, data] = await Promise.all([fetchIntroductionContract(id), fetchDashboardContractUsers(id)]);
  return {
    props: {
      data,
      overview: {
        address: introduction.address,
        chains: introduction.chains,
        explorerUrls: introduction.explorerUrls,
        name: introduction.name,
        verified: introduction.verified,
      },
    },
  };
}

const ContractUsersPage: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  return (
    <>
      <Meta
        title={`${props.overview.name} | Contract ${props.overview.address}`}
        description={'Contract overview, transactions and users are detailed on Centic.'}
      />
      <DashboardContextProvider value={props}>
        <ContractUsers />
      </DashboardContextProvider>
    </>
  );
};

export default ContractUsersPage;

ContractUsersPage.getLayout = (page) => {
  return <FullLayout>{page}</FullLayout>;
};
