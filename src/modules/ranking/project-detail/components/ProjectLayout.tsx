import { styled, Theme, useMediaQuery } from '@mui/material';

export const ProjectWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(3, 0),
  display: 'flex',
}));

export const ProjectContent = styled('div')(({ theme }) => ({
  width: '70%',
  paddingRight: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    paddingRight: theme.spacing(0),
    width: '100%',
  },
}));

const ProjectSideContentWrapper = styled('div')(({ theme }) => ({
  alignSelf: 'flex-start',
  position: 'sticky',
  top: 100,
  width: '30%',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

export const ProjectTabsWrapper = styled('div')({
  paddingTop: '16px',
  paddingBottom: '16px',
});

export function ProjectSideContent({ children }: { children: React.ReactNode }) {
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  if (mdDown) return null;
  return <ProjectSideContentWrapper>{children}</ProjectSideContentWrapper>;
}
