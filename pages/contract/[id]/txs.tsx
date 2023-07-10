/* eslint-disable react/prop-types */
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next';
import { NextPageWithLayout } from 'pages/_app';
import { Meta } from 'src/components/Meta';
import { DashboardContextProvider, DashboardContractTransactionsData } from 'src/contexts/dashboard';
import FullLayout from 'src/layouts/FullLayout';
import ContractTransactions from 'src/modules/dashboard/contract/ContractTransactions';
import { fetchDashboardContractTransactions } from 'src/services/_old/dashboard-api';
import { fetchIntroductionContract } from 'src/services/_old/visualize-api';

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<DashboardContractTransactionsData>> {
  const id = ctx.query.id as string;
  const page = Number(ctx.query.page ?? 1);
  const pageSize = Number(ctx.query.pageSize ?? 25);
  const [introduction, data] = await Promise.all([
    fetchIntroductionContract(id),
    fetchDashboardContractTransactions(id, { page, pageSize }),
  ]);
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

const ContractTransactionsPage: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (
  props
) => {
  return (
    <>
      <Meta
        title={`${props.overview.name} | Contract ${props.overview.address}`}
        description={'Contract overview, transactions and users are detailed on Centic.'}
      />
      <DashboardContextProvider value={props}>
        <ContractTransactions />
      </DashboardContextProvider>
    </>
  );
};

export default ContractTransactionsPage;

ContractTransactionsPage.getLayout = (page) => {
  return <FullLayout>{page}</FullLayout>;
};
