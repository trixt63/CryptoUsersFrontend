import { Box, Container, Paper, Typography } from "@mui/material";
import Breadcrumbs from 'src/components/BreakCrumbs/BreadCrumbs';
import { useProjectContext } from 'src/contexts/project';
import ProjectActions from '../components/ProjectActions';
import { ProjectContent, ProjectSideContent, ProjectTabsWrapper, ProjectWrapper } from '../components/ProjectLayout';
import ProjectOverview from '../components/ProjectOverview';
import ExchangeStats from './ExchangeStats';
import WhalesTable from 'src/modules/ranking/project-detail/exchanges/WhalesTable';

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
            <ExchangeStats />
            <Paper variant="border" sx={{ p: 3, mt: 3 }}>
              <Typography>{`Top 25 holders in total ${1000} holders`}</Typography>
              <Box mx={-3}>
                <WhalesTable />
              </Box>
            </Paper>
          </ProjectContent>
        </ProjectWrapper>
      </Container>
    </Box>
  );
}
