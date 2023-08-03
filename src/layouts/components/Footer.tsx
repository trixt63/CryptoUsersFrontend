import { Box, BoxProps, Container, Link, Typography } from '@mui/material';
// import LogoWhiteImg from 'public/images/logos/centic_light_horizontal.png';
import LogoWhiteImg from 'public/images/logos/bitcoin-representative.png';

export default function Footer(props: BoxProps) {
  return (
    <Box {...props} component="footer" sx={{ pt: 6, pb: 4, bgcolor: '#051119', ...props.sx }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', xsm: 'row' },
            alignItems: { xs: 'center' },
            rowGap: 3,
          }}
        >
          <Box>
            <Link href={'/'}>
              <img src={LogoWhiteImg.src} width={180} alt="centic logo" />
            </Link>
          </Box>
          <Box>
            {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Link href={''} color="text.primary" variant="small" fontWeight={500}>
                Cookies Policy
              </Link>
              <Link href={''} color="text.primary" variant="small" fontWeight={500}>
                Privacy Policy
              </Link>
              <Link href={''} color="text.primary" variant="small" fontWeight={500}>
                Terms of Service
              </Link>
            </Box> */}
            <Typography color="text.secondary">Copyright 2021-{new Date().getFullYear()}.</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
