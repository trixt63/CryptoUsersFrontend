import { Paper, Typography } from '@mui/material';

export default function ScorePaper({ title, children, ...props }: { title: string; children: React.ReactNode }) {
  return (
    <Paper {...props} sx={{ p: 3, position: 'relative' }}>
      <Typography sx={{ fontWeight: 600, position: 'absolute', mt: 1 }}>{title}</Typography>
      {children}
    </Paper>
  );
}
