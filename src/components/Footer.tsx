import { Box, Container, Grid, Tooltip, Typography } from '@mui/material';
import { DiscordIcon, MediumIcon, RedditIcon, TelegramIcon, TwitterIcon, YoutubeIcon } from 'src/icons';
import { Link } from './primitives/Link';

export default function Footer() {
  return (
    <Box sx={{ bgcolor: 'background.secondary', py: 3 }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            sm={7}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', sm: 'flex-start' },
              order: { xs: 2, sm: 1 },
            }}
          >
            <Box
              sx={{
                mb: 1,
                '> *:not(:last-of-type)': {
                  mr: { xs: 3, sm: 5 },
                },
              }}
            >
              <Link
                href="https://trava.finance/cookies-policy"
                target="_blank"
                rel="noopener"
                color="secondary.main"
                variant="body2"
                underline="hover"
                fontWeight={500}
              >
                Cookies Policy
              </Link>
              <Link
                href="https://trava.finance/cookies-policy"
                target="_blank"
                rel="noopener"
                color="secondary.main"
                variant="body2"
                underline="hover"
                fontWeight={500}
              >
                Privacy Policy
              </Link>
              <Link
                href="https://trava.finance/cookies-policy"
                target="_blank"
                rel="noopener"
                color="secondary.main"
                variant="body2"
                underline="hover"
                fontWeight={500}
              >
                Terms of Service
              </Link>
            </Box>
            <Typography variant="body2" color="#151c228c" sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
              Copyright © {new Date().getFullYear()} Datalink Foundation Pte. Ltd. All Rights Reserved
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={5}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: { xs: 'center', sm: 'flex-end' },
              order: 1,
            }}
          >
            <Box
              sx={{
                '> *:not(:last-of-type)': {
                  mr: 2.5,
                },
                '.social-link': {
                  display: 'inline-block',
                  color: 'secondary.main',
                  transition: 'color 250ms ease',
                  ':hover': {
                    color: 'primary.main',
                  },
                },
              }}
            >
              <Tooltip title="Telegram">
                <Link
                  className="social-link"
                  href={'https://t.me/tradaotravafinance'}
                  target="_blank"
                  rel="nofollow noopener"
                >
                  <TelegramIcon fontSize="large" />
                </Link>
              </Tooltip>
              <Tooltip title="Reddit">
                <Link
                  className="social-link"
                  href={'https://www.reddit.com/r/TravaFinance/'}
                  target="_blank"
                  rel="nofollow noopener"
                >
                  <RedditIcon fontSize="large" />
                </Link>
              </Tooltip>
              <Tooltip title="Discord">
                <Link
                  className="social-link"
                  href={'https://discord.gg/DJuUnr7sFU'}
                  target="_blank"
                  rel="nofollow noopener"
                >
                  <DiscordIcon fontSize="large" />
                </Link>
              </Tooltip>
              <Tooltip title="Medium">
                <Link
                  className="social-link"
                  href={'https://blog.tradao.finance/'}
                  target="_blank"
                  rel="nofollow noopener"
                >
                  <MediumIcon fontSize="large" />
                </Link>
              </Tooltip>
              <Tooltip title="Twitter">
                <Link
                  className="social-link"
                  href={'https://twitter.com/tradao_finance'}
                  target="_blank"
                  rel="nofollow noopener"
                >
                  <TwitterIcon fontSize="large" />
                </Link>
              </Tooltip>
              <Tooltip title="Youtube">
                <Link
                  className="social-link"
                  href={'https://www.youtube.com/channel/UCm7cOf7adwrFaEe8zKwdg8A'}
                  target="_blank"
                  rel="nofollow noopener"
                >
                  <YoutubeIcon fontSize="large" />
                </Link>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
