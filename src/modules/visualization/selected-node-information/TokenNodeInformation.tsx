import { Box } from '@mui/material';
import { formatNumber } from '@travalendingpool/utils';
import { ApiIntroductionToken } from 'src/services/_old/visualize-api/data-types/introduction';
import formatNumberAfterComma from 'src/utils';
import { InformationDetail, NodeName } from '../components/InformationDetail';

interface TokenNodeInformationProps {
  data: ApiIntroductionToken & { type: string };
}

export default function TokenNodeInformation(props: TokenNodeInformationProps) {
  const { data } = props;
  return (
    <Box sx={{ mt: 2 }}>
      <NodeName name={data.name} type={data.type} />
      <InformationDetail label="Price:" value={`$${formatNumberAfterComma(data.price)}`} />
      <InformationDetail label="Market Cap:" value={formatNumber(data.marketCap, { fractionDigits: 2, prefix: '$' })} />
      <InformationDetail label="Token Health:" value={data.marketCap} />
    </Box>
  );
}
