import { Lens } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { getTypeColorNode } from '../utils';

interface InformationDetailProps {
  label: string;
  value: React.ReactNode;
}

export const InformationDetail = (props: InformationDetailProps) => {
  const { label, value } = props;
  return (
    <Stack direction="row" spacing={2} sx={{ mt: 0.5 }}>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {label}&nbsp;
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        {value}
      </Typography>
    </Stack>
  );
};

export const NodeName = ({ name, type }: { name: string; type: string }) => {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Lens sx={{ fontSize: '12px', color: getTypeColorNode(type) }} />
      <Typography variant="body2" sx={{ color: 'primary.main' }}>
        {name}
      </Typography>
    </Stack>
  );
};
