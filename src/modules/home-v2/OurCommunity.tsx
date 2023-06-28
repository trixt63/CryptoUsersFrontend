import { Box, Container, styled, Typography } from '@mui/material';
import Image from 'next/image';
import GlobeImg from 'public/images/chain_globe.png';
import { DiscordIcon, TelegramIcon, TwitterIcon } from 'src/icons';

const SocialBox = styled('a')(({ theme }) => ({
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'center',
  textDecoration: 'none',
  '.social-btn': {
    fontSize: '4rem',
    fill: '#638C9B',
    cursor: 'pointer',
    transition: '250ms all ease',
    '+p': {
      marginTop: theme.spacing(2),
      visibility: 'hidden',
      fontWeight: 500,
    },
    '&:hover': {
      fill: theme.palette.primary.main,
      '+p': {
        visibility: 'visible',
      },
    },
  },
}));

export default function OurCommunity() {
  return (
    <Box component="section" sx={{ py: 10, background: 'linear-gradient(transparent, #002E40)', overflow: 'hidden' }}>
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', position: 'relative', py: 5 }}>
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              top: -60,
              bottom: -60,
              width: { xs: 500, md: 600 },
              zIndex: 0,
              opacity: { xs: 0.5, sm: 1 },
            }}
          >
            <Image src={GlobeImg} alt="chain globe" layout="fill" objectFit="contain" />
          </Box>
          <Box sx={{ maxWidth: 500, textAlign: 'right', position: 'relative', zIndex: 2 }}>
            <Typography variant="h1" component="h2" color="secondary.main" mb={2}>
              OUR COMMUNITY
            </Typography>
            <Typography mb={5}>Join our community to get updated about the new features.</Typography>
            <Box
              sx={{
                '>:not(:last-of-type)': {
                  mr: 5,
                },
              }}
            >
              <SocialBox href="#">
                <TelegramIcon className="social-btn" />
                <Typography color="primary.main">Telegram</Typography>
              </SocialBox>
              <SocialBox href="https://discord.gg/Pk7wexpsmv" rel="noopener noreferrer" target="_blank">
                <DiscordIcon className="social-btn" />
                <Typography color="primary.main">Discord</Typography>
              </SocialBox>
              <SocialBox href="https://twitter.com/centic_io" rel="noopener noreferrer" target="_blank">
                <TwitterIcon className="social-btn" />
                <Typography color="primary.main">Twitter</Typography>
              </SocialBox>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
