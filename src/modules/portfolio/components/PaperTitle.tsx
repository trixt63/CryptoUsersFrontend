import { Typography } from '@mui/material';

interface PaperTitleProps {
  title: string;
}
export default function PaperTitle(props: PaperTitleProps) {
  const { title } = props;
  return (
    <Typography variant="h4" sx={{ color: 'text.primary', mb: 2 }}>
      {title}
    </Typography>
  );
}
