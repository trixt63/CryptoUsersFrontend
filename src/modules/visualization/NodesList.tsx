import { Lens, Menu, RadioButtonUnchecked, RemoveRedEye, VisibilityOff } from '@mui/icons-material';
import Close from '@mui/icons-material/Close';
import { Box, Divider, Drawer, Hidden, Stack, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import Loading from 'src/components/Loading';
import { FetchStatus } from 'src/constants';
import { useAppDispatch, useAppSelector } from 'src/redux/hook';
import { setNodeAppearancesStatus, setSelectedNodeId } from 'src/redux/visualization/graph-slice';
import { fetchDashboardIntroductionData } from 'src/redux/visualization/information-nodes-slice';
import { Node } from 'src/services/_old/visualize-api/data-types';
import { getTypeColorNode } from './utils';

interface NodesListProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setOpenSelectedNodeInformation: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NodesList(props: NodesListProps) {
  const { setOpenSelectedNodeInformation } = props;
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState<boolean>(false);

  const status = useAppSelector((state) => state.visualization.graphSlice.status);
  const data = useAppSelector((state) => state.visualization.graphSlice.data);

  const handleChangeNodeAppearancesStatus = (node: Node) => (ev: React.SyntheticEvent) => {
    ev.stopPropagation();
    dispatch(setNodeAppearancesStatus(node.id));
  };

  const handleNodeClick = (node: Node) => {
    if (!node.isHide) {
      dispatch(setSelectedNodeId(node.id));
      dispatch(
        fetchDashboardIntroductionData({
          id: node.key,
          type: node.type,
          projectType: node.metadata ? node.metadata.projectType : undefined,
        })
      );
      setOpenSelectedNodeInformation(true);
    }
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Stack
        direction="row"
        sx={{
          position: 'absolute',
          right: 10,
          mt: { xs: '40%', sm: '20%', lg: '10%' },
          cursor: 'pointer',
          zIndex: '100',
          p: '8px 20px 8px 20px',
          borderRadius: '10px',
          backgroundColor: theme.palette.background.paper,
        }}
        onClick={() => setOpen(!open)}
      >
        <Hidden smDown implementation="css">
          <Typography sx={{ fontWeight: 550, mr: 2 }}>Nodes list</Typography>
        </Hidden>
        <Menu sx={{ color: '#3c637f' }} />
      </Stack>
      <Drawer
        className="custom-scrollbar"
        sx={{
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            mt: { xs: '40%', sm: '20%', lg: '10%' },
            overflowY: 'scroll',
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
        PaperProps={{
          sx: { borderRadius: '10px 0px 0px 0px', borderColor: 'background.paper', p: 2, minWidth: 230 },
          className: 'custom-scrollbar',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            Nodes list
          </Typography>
          <Close sx={{ color: 'text.secondary', cursor: 'pointer' }} onClick={() => setOpen(false)} />
        </Box>
        <Divider sx={{ mx: -2, my: 1 }} />
        {status == FetchStatus.SUCCESS &&
          data.nodes &&
          Object.entries(data.nodes).map((item, index) => {
            return (
              <Stack
                direction="row"
                key={item[0]}
                justifyContent="space-between"
                onClick={() => handleNodeClick(item[1])}
                sx={{ cursor: 'pointer', mt: 1 }}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ mr: 4, color: item[1].isHide ? 'text.secondary' : 'text.primary' }}
                >
                  <Typography variant="body2" sx={{ minWidth: '30px', fontWeight: 600 }}>
                    #{index + 1}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    {item[1].isHide ? (
                      <RadioButtonUnchecked sx={{ fontSize: '12px', color: getTypeColorNode(item[1].type) }} />
                    ) : (
                      <Lens sx={{ fontSize: '12px', color: getTypeColorNode(item[1].type) }} />
                    )}
                    <Typography
                      variant="body2"
                      className="text-truncate"
                      sx={{ width: 100, color: item[1].isHide ? '#566671' : '#5185AA' }}
                    >
                      {item[1].name}
                    </Typography>
                  </Stack>
                </Stack>
                {!item[1].isHide ? (
                  <RemoveRedEye
                    sx={{ color: 'text.primary', cursor: 'pointer', fontSize: '12px' }}
                    onClick={handleChangeNodeAppearancesStatus(item[1])}
                  />
                ) : (
                  <VisibilityOff
                    fontSize="small"
                    sx={{ color: 'text.secondary', cursor: 'pointer', fontSize: '12px' }}
                    onClick={handleChangeNodeAppearancesStatus(item[1])}
                  />
                )}
              </Stack>
            );
          })}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          {status == FetchStatus.FETCHING && <Loading size={40} />}
        </Box>
      </Drawer>
    </Box>
  );
}
