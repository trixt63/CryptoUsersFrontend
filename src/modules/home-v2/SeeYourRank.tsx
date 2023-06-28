import { Box, Button, Container, Grid, Typography } from '@mui/material';
import BgSkyImg from 'public/images/sky.png';
import DeFiNFTTokenImg from 'public/images/defi_nft_token.png';
import Image from 'next/image';
import { Link } from 'src/components/primitives/Link';

export default function SeeYourRank() {
  return (
    <Box component="section" sx={{ py: 10, overflow: 'hidden' }}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={5}>
            <Typography variant="h1" component="h2" color="secondary.main" mb={2}>
              SEE YOUR RANK
            </Typography>
            <Typography mb={3}>
              Effectively manage your digital assets. Swap, buy, and sell tokens from within your Portfolio.
            </Typography>
            <Button variant="contained" color="primary" LinkComponent={Link} href="/portfolio/assets">
              Manage your portfolio
            </Button>
          </Grid>
          <Grid item xs={12} sm={7} sx={{ position: 'relative' }}>
            <Box
              sx={{
                position: 'absolute',
                inset: -40,
                backgroundImage: `url(${BgSkyImg.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                zIndex: -1,
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Image src={DeFiNFTTokenImg} alt={'DeFi, NFTs, Tokens'} width={557} height={400} objectFit="contain" />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
