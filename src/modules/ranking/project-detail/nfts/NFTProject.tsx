import { Box, Container } from '@mui/material';
import Breadcrumbs from 'src/components/BreakCrumbs/BreadCrumbs';
import { useProjectContext } from 'src/contexts/project';
import ProjectActions from '../components/ProjectActions';
import { ProjectContent, ProjectSideContent, ProjectTabsWrapper, ProjectWrapper } from '../components/ProjectLayout';
import ProjectOverview from '../components/ProjectOverview';
import ProjectTokens from '../components/ProjectTokens';
import NFTTabs from './NFTTabs';

export default function NFTProject() {
  const data = useProjectContext();

  return (
    <Box py={3}>
      <Container maxWidth="xl">
        <Breadcrumbs
          links={[
            { title: 'Ranking', link: '/ranking' },
            { title: 'NFTs', link: '/ranking/nfts' },
          ]}
          destination={data.overview.name}
        />
        <ProjectWrapper>
          <ProjectContent>
            <ProjectOverview />
            <ProjectTabsWrapper>
              <NFTTabs />
            </ProjectTabsWrapper>
          </ProjectContent>
          <ProjectSideContent>
            <ProjectActions />
            <ProjectTokens />
          </ProjectSideContent>
        </ProjectWrapper>
      </Container>
    </Box>
  );
}
