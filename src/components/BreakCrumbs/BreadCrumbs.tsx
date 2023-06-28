import { Breadcrumbs as MuiBreadcrumbs, Typography } from '@mui/material';
import { Link } from 'src/components/primitives/Link';

interface BreadcrumbsProps {
  destination: string;
  links: Array<{ title: string; link: string }>;
}

export default function Breadcrumbs(props: BreadcrumbsProps) {
  const { destination, links } = props;
  return (
    <MuiBreadcrumbs aria-label="breadcrumbs">
      {links.map((item, index) => (
        <Link key={index} underline="hover" color="inherit" href={item.link}>
          {item.title}
        </Link>
      ))}
      <Typography color="text.secondary" sx={{ fontWeight: 600 }}>
        {destination}
      </Typography>
    </MuiBreadcrumbs>
  );
}
