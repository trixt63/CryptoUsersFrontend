import { OpenInNew } from '@mui/icons-material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShareIcon from '@mui/icons-material/Share';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { alpha, Box, Button, Grid, Popover, Theme } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { useProjectOverview } from 'src/contexts/project';
import { handleComingSoon } from 'src/utils';

export default function ProjectActions() {
  const data = useProjectOverview();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<OpenInNew />}
          fullWidth
          sx={{ py: 1.5, fontSize: '1rem' }}
          LinkComponent={'a'}
          href={data.url}
          target="_blank"
          rel="noreferrer noopener"
        >
          Open
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button sx={{ py: 1.5 }} variant="contained" color="secondary" fullWidth onClick={handleComingSoon}>
          Share
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button sx={{ py: 1.5 }} variant="contained" color="secondary" fullWidth onClick={handleComingSoon}>
          Add to watch list
        </Button>
      </Grid>
    </Grid>
  );
}

function ActionMorePopover() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const isOpen = Boolean(anchorEl);

  const handleOpen = (ev: SyntheticEvent<HTMLElement>) => {
    setAnchorEl(ev.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        component={'span'}
        sx={{
          width: 32,
          height: 32,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.secondary',
          borderRadius: { xs: 2, sm: '50%' },
          order: { xs: 2, sm: 1 },
        }}
        onClick={handleOpen}
      >
        <MoreHorizIcon sx={{ color: isOpen ? 'primary.main' : 'text.secondary' }} />
      </Box>
      <Popover
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: { borderRadius: 2, bgcolor: 'background.secondary' },
          variant: 'border',
        }}
      >
        <Box sx={{ width: 200 }}>
          <Button
            startIcon={<ShareIcon />}
            fullWidth
            sx={{
              py: 1.5,
              borderBottom: '1px solid',
              borderBottomColor: (theme: Theme) => alpha(theme.palette.text.secondary, 0.2),
              // borderBottomColor: 'common.border',
              borderRadius: 0,
              color: 'text.secondary',
            }}
            onClick={handleComingSoon}
          >
            Share
          </Button>
          <Button
            startIcon={<StarOutlineIcon />}
            fullWidth
            sx={{
              py: 1.5,
              borderRadius: 0,
              color: 'text.secondary',
            }}
            onClick={handleComingSoon}
          >
            Add to watch list
          </Button>
        </Box>
      </Popover>
    </>
  );
}

export function MobileTabletProjectActions() {
  const data = useProjectOverview();

  return (
    <Box
      sx={{
        display: 'inline-flex',
        flexDirection: { xs: 'row', sm: 'column' },
        alignItems: { xs: 'center', sm: 'flex-end' },
        justifyContent: 'flex-end',
        gap: { xs: 2, sm: 1 },
        width: '100%',
      }}
    >
      <ActionMorePopover />
      <Button
        variant="contained"
        color="primary"
        startIcon={<OpenInNew />}
        sx={{
          py: { xs: 1, sm: 1.5 },
          fontSize: '1rem',
          flexGrow: { xs: 1, xsm: 0 },
          minWidth: 150,
          order: { xs: 1, sm: 2 },
        }}
        LinkComponent={'a'}
        href={data.url}
        target="_blank"
        rel="noreferrer noopener"
      >
        Open
      </Button>
    </Box>
  );
}
