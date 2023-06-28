import IntroImg from 'public/images/circle.png';
//
import { Box, Button, Container, Grid, Link, Typography } from '@mui/material';
import Image from 'next/image';
import Typewriter from 'typewriter-effect';
// import { Link } from 'src/components/primitives/Link';

interface ProductParameterItemProps {
  label: string;
  value: string;
}
const ProductParameterItem: React.FC<ProductParameterItemProps> = (props: ProductParameterItemProps) => {
  return (
    <Box mb={2}>
      <Typography variant="h3" component="p" align="center" mb={1} fontWeight={700}>
        {props.value}
      </Typography>
      <Typography className="roboto-mono" align="center">
        {props.label}
      </Typography>
    </Box>
  );
};

export default function Introduction() {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        py: 5,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          width: '100%',
          height: { xs: '65vh', md: '70vh' },
        }}
      >
        <Image
          src={IntroImg}
          alt={'globe chains'}
          layout="fill"
          objectFit="contain"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </Box>
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          maxWidth: 900,
          height: { xs: '60vh', md: '66vh' },
          mx: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          mb: 3,
        }}
      >
        <Typography variant="h1" className="babapro" color="text.secondary" mb={4}>
          TRAVA CENTER
        </Typography>
        <Box sx={{ minHeight: 128 }}>
          <Typography variant="h2" className="roboto-mono">
            <Typewriter
              onInit={(tw) => {
                // tw.typeString('A platform for blockchain data analysis').start();
                tw.typeString('Our Data, Your Value').start();
              }}
              options={{
                loop: false,
                cursor: '',
              }}
            />
          </Typography>
        </Box>
      </Box>
      <Box textAlign={'center'} mb={4}>
        <Button variant="outlined" color="primary" sx={{ width: 160 }} size="large" href={'/app'} LinkComponent={Link}>
          Launch App
        </Button>
      </Box>
      <Container maxWidth="lg" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <ProductParameterItem label={'Chain Fully Tracking'} value={'4'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ProductParameterItem label={'Projects Following'} value={'2000+'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ProductParameterItem label={'Wallets Tracking'} value={'100M+'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ProductParameterItem label={'Transactions Per Day'} value={'10M+'} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
