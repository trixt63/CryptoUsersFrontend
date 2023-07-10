import { Box } from '@mui/material';
import { formatNumber } from '@travalendingpool/utils';
import { ApiIntroductionContract } from 'src/services/_old/visualize-api/data-types/introduction';
import { InformationDetail, NodeName } from '../components/InformationDetail';

interface ContractNodeInformationProps {
  data: ApiIntroductionContract & { type: string };
}

export default function ContractNodeInformation(props: ContractNodeInformationProps) {
  const { data } = props;

  return (
    <Box sx={{ mt: 2 }}>
      <NodeName name={data.name} type={data.type} />
      <InformationDetail label="Transactions:" value={`${data.transactions24h}`} />
      <InformationDetail label="Users 24h:" value={`${data.users24h} addresses`} />
      <InformationDetail label="TVL:" value={formatNumber(data.tvl, { fractionDigits: 2, prefix: '$' })} />
    </Box>
  );
}
