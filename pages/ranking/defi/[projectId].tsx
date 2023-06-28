import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { NextPageWithLayout } from 'pages/_app';
import FullLayout from 'src/layouts/FullLayout';
import { ProjectContextProvider, ProjectData } from 'src/contexts/project';
import DeFiProject from 'src/modules/ranking/project-detail/defi/DeFiProject';
import { fetchProject } from 'src/services/project-api';
import { Meta } from 'src/components/Meta';
import { compactNumber } from '@travalendingpool/utils';
import { ApiProjectDeFiStats } from 'src/services/project-api/data-types';

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<ProjectData>> {
  const projectId = context.query.projectId as string;
  const chain = context.query.chain as string | undefined;
  try {
    const res = await fetchProject({
      type: 'defi',
      projectId,
      chain,
    });
    return {
      props: {
        id: projectId,
        chain: chain ?? 'all',
        type: 'defi',
        ...res,
      },
    };
  } catch (error) {
    console.error('[DeFi project]', error);
    return {
      notFound: true,
    };
  }
}

const ProjectDetailPage: NextPageWithLayout<ProjectData> = (props: ProjectData) => {
  const stats = props.stats as ApiProjectDeFiStats;

  return (
    <>
      <Meta
        title={`${props.overview.name}${
          props.overview.tokens[0] ? ` (${props.overview.tokens[0].symbol.toUpperCase()})` : ''
        } insights, price, ranking, tvl, txs`}
        description={`${props.overview.name} ranks at #${props.overview.rank} in DeFi projects with ${compactNumber(
          stats.tvl as number,
          2
        )} TVL. ${compactNumber(stats.numberOfTransactions as number)} transactions are executed by ${compactNumber(
          stats.numberOfActiveWallets as number
        )} users in 24 hours.`}
        keywords={[
          props.overview.name,
          ...props.overview.tokens.map((t) => t.symbol.toUpperCase()),
          ...props.overview.tags,
          'TVL, Active Wallets, Transactions, DeFi Ranking',
        ].join(', ')}
      />
      <ProjectContextProvider value={props}>
        <DeFiProject />
      </ProjectContextProvider>
    </>
  );
};

export default ProjectDetailPage;

ProjectDetailPage.getLayout = (page) => {
  return <FullLayout>{page}</FullLayout>;
};
