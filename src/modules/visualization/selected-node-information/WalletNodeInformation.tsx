import { Box, Stack } from '@mui/material';
import Copy from 'src/components/CopyButton/Copy';
import { ApiIntroductionWallet } from 'src/services/visualize-api/data-types/introduction';
import formatNumberAfterComma from 'src/utils';
import { InformationDetail, NodeName } from '../components/InformationDetail';

interface WalletNodeInformationProps {
  data: ApiIntroductionWallet & { type: string };
}
export default function WalletNodeInformation(props: WalletNodeInformationProps) {
  const { data } = props;

  return (
    <Box sx={{ mt: 2 }}>
      <Stack direction="row">
        <NodeName name={data.name} type={data.type} />
        <Copy
          text={data.address.toString()}
          IconProps={{ fontSize: 'small', sx: { color: 'text.secondary', ml: 1 } }}
        />
      </Stack>
      <InformationDetail label="Credit Score:" value={data.creditScore} />
      <InformationDetail label="Balance:" value={formatNumberAfterComma(data.balance)} />
    </Box>
  );
}
