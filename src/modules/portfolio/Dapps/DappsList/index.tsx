import { Box } from '@mui/material';
import { useDAppsData } from '../hook';
import DAppDetail from './DAppDetail';

export default function DAppsList() {
  const data = useDAppsData();
  return (
    <Box>
      {data.map((item) => (
        <DAppDetail key={item.newId} data={item} />
      ))}
    </Box>
  );
}
