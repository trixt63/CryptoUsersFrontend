import { Box, BoxProps, Paper, Skeleton, styled, Typography } from '@mui/material';
import { ReactNode } from 'react';
import Loading from 'src/components/Loading';

interface WrapperProps {
  title?: string;
  children: ReactNode;
  contentSx?: BoxProps['sx'];
  sx?: BoxProps['sx'];
}

export const Wrapper = (props: WrapperProps) => {
  const { title, children, contentSx, sx } = props;
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', ...sx }}>
      {title && (
        <Box sx={{ mb: 1.5 }}>
          <Typography component="h2" variant="subtitle1">
            {title}
          </Typography>
        </Box>
      )}
      <Paper
        sx={{
          flexGrow: 1,
          px: 2,
          py: 1,
          border: '1px solid',
          borderColor: 'secondary.dark',
          overflow: 'hidden',
          ...contentSx,
        }}
      >
        {children}
      </Paper>
    </Box>
  );
};

export const ItemWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(1, 0),
  color: 'inherit',
  '.rank': {
    color: theme.palette.text.secondary,
    minWidth: 50,
    textAlign: 'center',
  },
  '>*': {
    padding: theme.spacing(0, 1),
  },
  // marginLeft: theme.spacing(-2),
}));

export const HeaderWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(1.5, 0),
  backgroundColor: theme.palette.background.primary,
  '>*': {
    padding: theme.spacing(0, 1),
  },
  '.head': {
    fontWeight: 500,
    color: theme.palette.text.secondary,
  },
}));

export const TopItemSkeleton = () => {
  return (
    <ItemWrapper>
      <Box sx={{ px: 1 }}>
        <Skeleton width={32} height={32} variant="circular" />
      </Box>
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Skeleton width={180} sx={{ mb: 0.25 }} />
        <Skeleton width={100} />
      </Box>
      <Box sx={{ minWidth: 120 }}>
        <Skeleton width={'100%'} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          minWidth: 120,
          pr: 2,
        }}
      >
        <Skeleton variant="circular" width={30} height={30} />
      </Box>
    </ItemWrapper>
  );
};

// TODO: consider make it global
export const NestedLoading = ({ size = 30, sx }: { size?: number; sx?: BoxProps['sx'] }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        ...sx,
      }}
    >
      <Loading size={size} />
    </Box>
  );
};
