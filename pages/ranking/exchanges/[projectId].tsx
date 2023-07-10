import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { NextPageWithLayout } from 'pages/_app';
import FullLayout from 'src/layouts/FullLayout';
import { ProjectContextProvider, ProjectData } from 'src/contexts/project';
import ExchangeProject from 'src/modules/ranking/project-detail/exchanges/ExchangeProject';
import { fetchProject } from 'src/services/_old/project-api';
import { Meta } from 'src/components/Meta';
import { fetchDashboardTokenHolders } from 'src/services/_old/dashboard-api';

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<ProjectData>> {
  const projectId = context.query.projectId as string;
  const chain = context.query.chain as string | undefined;
  // call random coin holders

  try {
    const res = await fetchProject({
      type: 'exchange',
      projectId,
      chain,
    });
    return {
      props: {
        id: projectId,
        chain: chain ?? 'all',
        type: 'exchange',
        ...res
      },
    };
  } catch (error) {
    console.error('[Exchanges project]', error);
    return {
      notFound: true,
    };
  }
}

const ProjectDetailPage: NextPageWithLayout<ProjectData> = (props: ProjectData) => {
  return (
    <>
      <Meta
        title={`${props.overview.name} insights, chart, ranking, trading volume today`}
        description={`Get updated on ${props.overview.name}'s ranking, markets, trading volume, charts, etc from our all-in-one platform.`}
        keywords={[
          props.overview.name,
          ...props.overview.tags,
          'Crypto Exchange, Trading Volume, Exchange Ranking',
        ].join(', ')}
      />
      <ProjectContextProvider value={props}>
        <ExchangeProject />
      </ProjectContextProvider>
    </>
  );
};

export default ProjectDetailPage;

ProjectDetailPage.getLayout = (page) => {
  return <FullLayout>{page}</FullLayout>;
};
