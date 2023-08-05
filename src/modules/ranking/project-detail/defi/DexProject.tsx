import { Box, Container, Paper, Typography } from "@mui/material";
import Breadcrumbs from 'src/components/BreakCrumbs/BreadCrumbs';
import { useProjectContext } from 'src/contexts/project';
import { ProjectContent, ProjectSideContent, ProjectTabsWrapper, ProjectWrapper } from '../components/ProjectLayout';
import DexStats from './DexStats';
import DexIntro from './DexIntro';
import TopWallets from './TopWallets';

export default function DexProject() {
  const data = useProjectContext();

  return (
    <Box py={3}>
      <Container maxWidth="xl">
        <Breadcrumbs
          links={[
            { title: 'Ranking', link: '/ranking' },
            { title: 'Exchanges', link: '/ranking/spots' },
          ]}
          destination={data.intro.name}
        />
        <ProjectWrapper>
          <ProjectContent>
            <DexIntro />
            <DexStats />

            {/*<Paper variant="border" sx={{ p: 3, mt: 3 }}>*/}
            {/*  <Typography>{`Top 25 holders in total ${1000} holders`}</Typography>*/}
            {/*  <Box mx={-3}>*/}
                <TopWallets />
            {/*  </Box>*/}
            {/*</Paper>*/}
          </ProjectContent>
        </ProjectWrapper>
      </Container>
    </Box>
  );
}
