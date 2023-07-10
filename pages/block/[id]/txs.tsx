/* eslint-disable react/prop-types */
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next';
import { NextPageWithLayout } from 'pages/_app';
import { Meta } from 'src/components/Meta';
import { DashboardBlockTransactionsData, DashboardContextProvider } from 'src/contexts/dashboard';
import FullLayout from 'src/layouts/FullLayout';
import BlockTransactions from 'src/modules/dashboard/block/BlockTransactions';
import { fetchDashboardBlockTransactions } from 'src/services/_old/dashboard-api';
import { fetchIntroductionBlock } from 'src/services/_old/visualize-api';

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<DashboardBlockTransactionsData>> {
  const id = ctx.query.id as string;
  const [data, block] = await Promise.all([fetchDashboardBlockTransactions(id), fetchIntroductionBlock(id)]);
  return {
    props: {
      data,
      block: {
        number: block.number,
        explorerUrls: block.explorerUrls,
        hash: block.hash,
        chains: block.chains,
      },
    },
  };
}

const BlockTransactionsPage: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  return (
    <>
      <Meta
        title={`Blocks #${props.block.number}`}
        description={`Block Height ${props.block.number}. Block overview, transactions, relationship are detailed on Centic.`}
      />
      <DashboardContextProvider value={props}>
        <BlockTransactions />
      </DashboardContextProvider>
    </>
  );
};

export default BlockTransactionsPage;

BlockTransactionsPage.getLayout = (page) => {
  return <FullLayout>{page}</FullLayout>;
};
