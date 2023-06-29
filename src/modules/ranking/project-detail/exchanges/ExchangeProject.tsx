import { Box, Container } from '@mui/material';
import Breadcrumbs from 'src/components/BreakCrumbs/BreadCrumbs';
import { useProjectContext } from 'src/contexts/project';
import ProjectActions from '../components/ProjectActions';
import { ProjectContent, ProjectSideContent, ProjectTabsWrapper, ProjectWrapper } from '../components/ProjectLayout';
import ProjectOverview from '../components/ProjectOverview';
// import ProjectTokens from '../components/ProjectTokens';
import ExchangeStats from './ExchangeStats';
// import ExchangeTabs from './ExchangeTabs';

export default function ExchangeProject() {
  const data = useProjectContext();

  return (
    <Box py={3}>
      <Container maxWidth="xl">
        <Breadcrumbs
          links={[
            { title: 'Ranking', link: '/ranking' },
            { title: 'Exchanges', link: '/ranking/spots' },
          ]}
          destination={data.overview.name}
        />
        <ProjectWrapper>
          <ProjectContent>
            <ProjectOverview />
            {/*<ProjectTabsWrapper>*/}
            {/*<ExchangeTabs />*/}
            <ExchangeStats />
            {/*</ProjectTabsWrapper>*/}
          </ProjectContent>
          {/*<ProjectSideContent>*/}
          {/*  <ProjectActions />*/}
          {/*  <ProjectTokens />*/}
          {/*</ProjectSideContent>*/}
        </ProjectWrapper>
      </Container>
    </Box>
  );
}
