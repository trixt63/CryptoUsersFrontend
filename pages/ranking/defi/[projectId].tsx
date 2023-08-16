import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { NextPageWithLayout } from 'pages/_app';
import FullLayout from 'src/layouts/FullLayout';
import { ProjectContextProvider, ProjectData } from 'src/contexts/project';
import DexProject from 'src/modules/ranking/project-detail/defi/DexProject';
import {fetchDexProject} from 'src/services/project-api/dex'
import { Meta } from 'src/components/Meta';
import { fetchDashboardTokenHolders } from 'src/services/_old/dashboard-api';

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<ProjectData>> {
  const projectId = context.query.projectId as string;
  const chain = context.query.chain as string | undefined;
  // call random coin holders

  try {
    const res = await fetchDexProject({
      // type: 'exchange',
      projectId,
      chain,
    });
    return {
      props: {
        id: projectId,
        chain: chain ?? 'all',
        // type: 'exchange',
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
      <ProjectContextProvider value={props}>
        <DexProject />
      </ProjectContextProvider>
    </>
  );
};

export default ProjectDetailPage;

ProjectDetailPage.getLayout = (page) => {
  return <FullLayout>{page}</FullLayout>;
};
