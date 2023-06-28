import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { Link } from 'src/components/primitives/Link';

const portfolioRoutes = [
  {
    id: 0,
    link: '/portfolio/assets',
    title: 'Assets',
  },
  {
    id: 1,
    link: '/portfolio/dapps',
    title: 'DApps',
  },
  {
    id: 2,
    link: '/portfolio/alerts',
    title: 'Alerts',
  },
];

export default function SideBar() {
  const router = useRouter();

  return (
    <Box>
      {portfolioRoutes.map((item) => (
        <Box key={item.id} sx={{ mt: 1 }}>
          <Link
            href={item.link}
            sx={{
              backgroundColor: router.asPath == item.link ? 'primary.main' : 'background.paper',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
              cursor: 'pointer',
              p: '12px',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: router.asPath == item.link ? 'text.primary' : 'text.secondary',
                fontWeight: router.asPath == item.link ? 600 : 500,
              }}
            >
              {item.title}
            </Typography>
          </Link>
        </Box>
      ))}
    </Box>
  );
}
