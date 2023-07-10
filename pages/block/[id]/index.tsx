import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next';
import { NextPageWithLayout } from 'pages/_app';
import { Meta } from 'src/components/Meta';
import { DashboardContextProvider } from 'src/contexts/dashboard';
import FullLayout from 'src/layouts/FullLayout';
import BlockOverview from 'src/modules/dashboard/block/BlockOverview';
import { fetchDashboardBlock } from 'src/services/_old/dashboard-api';
import { ApiDashboardBlock } from 'src/services/_old/dashboard-api/data-types';

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<ApiDashboardBlock>> {
  const id = ctx.query.id as string;
  const res = await fetchDashboardBlock(id);
  return {
    props: res,
  };
}

const BlockOverviewPage: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  return (
    <>
      <Meta
        title={`Blocks #${props.number}`}
        description={`Block Height ${props.number}. Block overview, transactions and relationship are detailed on Centic.`}
      />
      <DashboardContextProvider value={props}>
        <BlockOverview />
      </DashboardContextProvider>
    </>
  );
};

export default BlockOverviewPage;

BlockOverviewPage.getLayout = (page) => {
  return <FullLayout>{page}</FullLayout>;
};
