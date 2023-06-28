import { Box, Button, Hidden, SelectChangeEvent, Stack, Typography } from '@mui/material';
import ChainSelect from 'src/components/ChainSelect';
import Copy from 'src/components/CopyButton/Copy';
import { Link } from 'src/components/primitives/Link';
import ViewOnExplorer from 'src/components/ViewOnExplorer';
import useSearchParams from 'src/hooks/useSearchParams';
import { useAppDispatch } from 'src/redux/hook';
import { fetchVisualizeData } from 'src/redux/visualization/graph-slice';
import ColorDescription from './components/ColorDescription';

interface VisualizationHeaderProps {
  id: string;
  name: string;
  type: string;
  explorerUrls: Array<string>;
  chains: Array<string>;
  projectType?: string;
  copyValue?: string;
}

export default function VisualizationHeader(props: VisualizationHeaderProps) {
  const { name, type, id, explorerUrls, chains, projectType, copyValue } = props;
  const dispatch = useAppDispatch();
  const { set, get } = useSearchParams();

  const handleChainChange = (ev: SelectChangeEvent) => {
    set('chain', ev.target.value);
    dispatch(fetchVisualizeData(id, type, projectType, ev.target.value));
  };
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: { xs: 'flex-start', lg: 'center' },
        justifyContent: 'space-between',
        flexDirection: { xs: 'column', md: 'row' },
        zIndex: '100',
        top: 60,
        position: 'absolute',
        bgcolor: 'background.default',
        width: '100%',
        py: 1,
        px: 2,
      }}
    >
      <>
        <Stack direction="row" spacing={2}>
          <Stack direction="row">
            <Stack spacing={2} direction="row" alignItems="center" sx={{ flexGrow: 1 }}>
              <Typography
                variant="h4"
                className="text-truncate"
                component="h1"
                sx={{ textTransform: 'capitalize', maxWidth: 200 }}
              >
                {type}{' '}
                <Typography component="span" display="inline" sx={{ font: 'inherit', color: 'primary.main' }}>
                  {name}
                </Typography>
              </Typography>
              <Stack direction="row" spacing={1}>
                {copyValue && (
                  <Copy text={copyValue} IconProps={{ fontSize: 'small', sx: { color: 'text.secondary' } }} />
                )}
                <ViewOnExplorer href={explorerUrls[0]} />
              </Stack>
            </Stack>
            <Hidden smDown mdUp implementation="css">
              <ChainSelect
                chains={chains}
                value={get('chain') ?? 'all'}
                onChange={handleChainChange}
                sx={{
                  '.MuiSelect-select': { pl: 0, py: 0, display: 'flex', alignItems: 'center' },
                  '.MuiAvatar-root': { width: 20, height: 20 },
                  fontSize: '0.875rem',
                  ml: 4,
                }}
              />
            </Hidden>
          </Stack>

          <Hidden mdDown implementation="css">
            <Button
              LinkComponent={Link}
              href={`/${type}/${id}`}
              variant="contained"
              color="primary"
              sx={{ padding: '10px', minWidth: 120, fontWeight: 500 }}
            >
              Overview
            </Button>
          </Hidden>
        </Stack>
        <Hidden smUp implementation="css">
          <Stack direction="row" sx={{ my: 2 }} justifyContent="space-between">
            <Button
              LinkComponent={Link}
              href={`/${type}/${id}`}
              variant="contained"
              color="primary"
              sx={{ padding: '10px', minWidth: 120, fontWeight: 500 }}
            >
              Overview
            </Button>
            <ChainSelect
              chains={chains}
              value={get('chain') ?? 'all'}
              onChange={handleChainChange}
              sx={{
                '.MuiSelect-select': { pl: 0, py: 0, display: 'flex', alignItems: 'center' },
                '.MuiAvatar-root': { width: 20, height: 20 },
                fontSize: '0.875rem',
                ml: 4,
              }}
            />
          </Stack>
        </Hidden>
        <Stack
          direction="row"
          sx={{
            width: { xs: '100%', lg: '30%' },
            alignItems: 'center',
            mt: 2,
            justifyContent: { md: 'flex-end', xs: 'space-between' },
          }}
        >
          <Hidden smDown mdUp implementation="css">
            <Button
              LinkComponent={Link}
              href={`/${type}/${id}`}
              variant="contained"
              color="primary"
              sx={{ padding: '10px', minWidth: 120, fontWeight: 500 }}
            >
              Overview
            </Button>
          </Hidden>
          <ColorDescription />
          <Hidden mdDown implementation="css">
            <ChainSelect
              chains={chains}
              value={get('chain') ?? 'all'}
              onChange={handleChainChange}
              sx={{
                '.MuiSelect-select': { pl: 0, py: 0, display: 'flex', alignItems: 'center' },
                '.MuiAvatar-root': { width: 20, height: 20 },
                fontSize: '0.875rem',
                ml: 4,
              }}
            />
          </Hidden>
        </Stack>
      </>
    </Box>
  );
}
