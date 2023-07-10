import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { NextPageWithLayout } from 'pages/_app';
import FullLayout from 'src/layouts/FullLayout';
import { ProjectContextProvider, ProjectData } from 'src/contexts/project';
import NFTProject from 'src/modules/ranking/project-detail/nfts/NFTProject';
import { fetchProject } from 'src/services/_old/project-api';
import { Meta } from 'src/components/Meta';
import { ApiProjectNFTStats } from 'src/services/_old/project-api/data-types';
import { compactNumber, formatNumber } from '@travalendingpool/utils';

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<ProjectData>> {
  const projectId = context.query.projectId as string;
  const chain = context.query.chain as string | undefined;
  try {
    const res = await fetchProject({
      type: 'nft',
      projectId,
      chain,
    });
    return {
      props: {
        id: projectId,
        chain: chain ?? 'all',
        type: 'nft',
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
  const stats = props.stats as ApiProjectNFTStats;

  return (
    <>
      <Meta
        title={`${props.overview.name}${
          props.overview.tokens[0] ? ` (${props.overview.tokens[0].symbol.toUpperCase()})` : ''
        } insights, price, ranking, volume, items, owners`}
        description={`${props.overview.name} ranks at #${
          props.overview.rank
        } in NFT projects with 24-hour trading volume of $${compactNumber(
          stats.volume as number
        )} and a floor price of ${formatNumber(stats.price, { fractionDigits: 2, prefix: '$' })}.`}
        keywords={[
          props.overview.name,
          ...props.overview.tokens.map((t) => t.symbol.toUpperCase()),
          ...props.overview.tags,
          'NFT Ranking',
        ].join(', ')}
      />
      <ProjectContextProvider value={props}>
        <NFTProject />
      </ProjectContextProvider>
    </>
  );
};

export default ProjectDetailPage;

ProjectDetailPage.getLayout = (page) => {
  return <FullLayout>{page}</FullLayout>;
};
