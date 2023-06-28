import { Close, LocationSearching } from '@mui/icons-material';
import { Box, Fade, Paper, Stack, Typography } from '@mui/material';
import Failed from 'src/components/Failed';
import Loading from 'src/components/Loading';
import { Link } from 'src/components/primitives/Link';
import { FetchStatus } from 'src/constants';
import { useAppSelector } from 'src/redux/hook';
import {
  ApiIntroductionContract,
  ApiIntroductionProject,
  ApiIntroductionToken,
  ApiIntroductionWallet,
} from 'src/services/visualize-api/data-types/introduction';
import ContractNodeInformation from './ContractNodeInformation';
import ProjectNodeInformation from './ProjectNodeInformation';
import TokenNodeInformation from './TokenNodeInformation';
import WalletNodeInformation from './WalletNodeInformation';

interface SelectedNodeInformationProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SelectedNodeInformation(props: SelectedNodeInformationProps) {
  const { open, setOpen } = props;

  const data = useAppSelector((state) => {
    if (state.visualization.graphSlice.selectedNode) {
      return state.visualization.informationNodesSlice.introduction[state.visualization.graphSlice.selectedNode]
        .data as { type: string; id: string; projectType?: string };
    }
  });

  const status = useAppSelector((state) => {
    if (state.visualization.graphSlice.selectedNode) {
      return state.visualization.informationNodesSlice.introduction[state.visualization.graphSlice.selectedNode]
        .status as FetchStatus;
    }
  });

  return (
    <Box sx={{ position: 'relative' }}>
      <Fade in={open}>
        <Paper
          sx={{
            p: '8px 20px 8px 20px',
            borderRadius: '10px',
            left: 10,
            mt: { xs: '40%', sm: '20%', lg: '10%' },
            zIndex: '100',
            position: 'absolute',
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography sx={{ fontWeight: 600 }}>Selected node</Typography>
            {data && data.type && data.id && (
              <Link
                href={
                  !data?.projectType
                    ? `/visualization?q=${data.id}&type=${data.type}`
                    : `/visualization?q=${data.id}&type=${data.type}&project-type=${data.projectType}`
                }
                target="_blank"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <LocationSearching sx={{ color: 'text.secondary' }} fontSize="small" />
              </Link>
            )}
            <Close onClick={() => setOpen(false)} sx={{ color: 'text.secondary' }} fontSize="small" />
          </Stack>
          {data && status == FetchStatus.SUCCESS && (
            <>
              {data.type == 'wallet' && (
                <WalletNodeInformation data={data as ApiIntroductionWallet & { type: string }} />
              )}
              {data.type == 'token' && <TokenNodeInformation data={data as ApiIntroductionToken & { type: string }} />}
              {data.type == 'contract' && (
                <ContractNodeInformation data={data as ApiIntroductionContract & { type: string }} />
              )}
              {data.type == 'project' && (
                <ProjectNodeInformation data={data as ApiIntroductionProject & { type: string }} />
              )}
            </>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {status == FetchStatus.FETCHING && (
              <Box sx={{ my: 2 }}>
                <Loading size={24} />
              </Box>
            )}
            {status == FetchStatus.FAILED && <Failed title="Failed to fetch data" sx={{ my: 2 }} />}
          </Box>
        </Paper>
      </Fade>
    </Box>
  );
}
