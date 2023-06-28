import { Box, BoxProps, Chip, Hidden, Paper, Theme, Typography, TypographyProps, useMediaQuery } from '@mui/material';
import { useMemo } from 'react';
import ChainSelect from 'src/components/ChainSelect';
import StyledImage from 'src/components/primitives/Image';
// import { SUPPORTED_CHAINS } from 'src/configs/api';
// import useSearchParams from 'src/hooks/useSearchParams';
import { useProjectOverview, useProjectParams } from 'src/contexts/project';
import { MobileTabletProjectActions } from './ProjectActions';

function MetaLabel(props: TypographyProps) {
  return <Typography {...props} color="text.secondary" sx={{ ...props.sx, minWidth: 80 }} />;
}

function Tags(props: BoxProps) {
  return (
    <Box
      {...props}
      sx={{
        ...props.sx,
        '>*:not(:last-of-type)': {
          mr: 1,
        },
      }}
    />
  );
}

export default function ProjectOverview() {
  const data = useProjectOverview();
  const projectParams = useProjectParams();
  // const { set, remove } = useSearchParams();
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const xsmDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('xsm'));

  const type = useMemo(() => {
    if (data.projectType === 'defi') return 'DeFi';
    if (data.projectType === 'exchange') return 'Exchanges';
    if (data.projectType === 'nft') return 'NFTs';
    return 'N/A';
  }, [data.projectType]);

  /**
   * This function handles a change in the selected chain and updates the state accordingly.
   * @param {SelectChangeEvent} ev - ev is an event object of type SelectChangeEvent. It is triggered when the value of a
   * select element is changed.
   */
  // const handleChainChange = (ev: SelectChangeEvent) => {
  //   if (ev.target.value !== projectParams.chain) {
  //     if (SUPPORTED_CHAINS.includes(ev.target.value)) {
  //       set('chain', ev.target.value);
  //     } else {
  //       remove('chain');
  //     }
  //   }
  // };

  return (
    <Paper variant="border" sx={{ p: 3 }}>
      <Box sx={{ display: 'flex' }}>
        {/* use both css and js implementation to prevent layout shift on client */}
        {!xsmDown && (
          <Hidden implementation="css" xsmDown>
            <Box sx={{ mr: 3, textAlign: 'center' }}>
              <StyledImage
                src={data.imgUrl}
                alt={data.name}
                sx={{
                  objectFit: 'contain',
                  borderRadius: '50%',
                  width: { xs: 70, sm: 100 },
                  height: { xs: 70, sm: 100 },
                }}
              />
            </Box>
          </Hidden>
        )}
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', alignItems: { xs: 'center', xsm: 'baseline' }, mb: 1 }}>
            {xsmDown && (
              <Hidden implementation="css" xsmUp>
                <Box sx={{ mr: 2, textAlign: 'center' }}>
                  <StyledImage
                    src={data.imgUrl}
                    alt={data.name}
                    sx={{ objectFit: 'contain', borderRadius: '50%', width: 46, height: 46, display: 'block' }}
                  />
                </Box>
              </Hidden>
            )}
            <Typography variant="h2" component="h1" sx={{ flexGrow: 1, mr: 2, fontWeight: 700 }}>
              {data.name}
            </Typography>
            {!xsmDown && (
              <Hidden implementation="css" xsmDown>
                <ChainSelect
                  chains={data.chains}
                  value={projectParams.chain}
                  // onChange={handleChainChange}
                />
              </Hidden>
            )}
          </Box>
          {/* <Typography sx={{ mb: 1, mr: { xs: '0px', sm: '100px', lg: '180px' } }}>{data.description}</Typography> */}
          {xsmDown && (
            <Hidden implementation="css" xsmUp>
              <ChainSelect
                chains={data.chains}
                value={projectParams.chain}
                // onChange={handleChainChange}
              />
            </Hidden>
          )}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mt: 2 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 1.5 }}>
                <MetaLabel>Rank</MetaLabel>
                <Tags>
                  <Chip label={`#${data.rank} in ${type}`} variant="outlined" color="secondary" />
                </Tags>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 1.5 }}>
                <MetaLabel>Tags</MetaLabel>
                <Tags>
                  {data.tags.map((tag) => (
                    <Chip key={tag} label={tag} variant="outlined" color="secondary" />
                  ))}
                </Tags>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                <MetaLabel>Social</MetaLabel>
                <Tags>
                  {Object.entries(data.socialNetworks).map(([name, link]) => (
                    <Chip
                      key={name}
                      label={name}
                      color="secondary"
                      clickable
                      component={'a'}
                      href={link}
                      target={'_blank'}
                      rel="noopener noreferrer"
                      sx={{ textTransform: 'capitalize' }}
                    />
                  ))}
                </Tags>
              </Box>
            </Box>
            {mdDown && (
              <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'flex-end', mt: 2 }}>
                <MobileTabletProjectActions />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
