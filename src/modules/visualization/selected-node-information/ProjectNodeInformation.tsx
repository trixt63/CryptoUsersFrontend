import { Box } from '@mui/material';
import { compactNumber } from '@travalendingpool/utils';
import { ApiIntroductionProject } from 'src/services/visualize-api/data-types/introduction';
import { InformationDetail, NodeName } from '../components/InformationDetail';

interface ProjectNodeInformationProps {
  data: ApiIntroductionProject & { type: string };
}

export default function ProjectNodeInformation(props: ProjectNodeInformationProps) {
  const { data } = props;
  return (
    <Box sx={{ mt: 2 }}>
      <NodeName name={data.name} type={data.type} />
      {data.tvl && <InformationDetail label="TVL:" value={`$${compactNumber(data.tvl)}`} />}
      {data.volume && <InformationDetail label="Volume:" value={`$${compactNumber(data.volume)}`} />}
      <InformationDetail label="Rank:" value={`#${data.rank}`} />
      <InformationDetail label="Category:" value={data.projectType} />
    </Box>
  );
}
