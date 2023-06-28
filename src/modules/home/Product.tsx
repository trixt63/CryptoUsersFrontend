import Feature1Img from 'public/images/feature_1.png';
import Feature2Img from 'public/images/feature_2.png';
import Feature3Img from 'public/images/feature_3.png';
import Feature4Img from 'public/images/feature_4.png';
//
import { Box, Button, Container, Grid, Theme, Typography, useMediaQuery } from '@mui/material';
import Image, { StaticImageData } from 'next/image';
import { Link } from 'src/components/primitives/Link';

interface ProductItemProps {
  href: string;
  Img: StaticImageData;
  name: string;
  description: string;
}

const ProductItem: React.FC<ProductItemProps> = (props: ProductItemProps) => {
  return (
    <Box
      sx={{
        position: 'relative',
        background: 'linear-gradient(to right, #FFFFFF 20%, #073681)',
        width: '100%',
        maxWidth: 270,
        borderRadius: '16px',
        padding: '1px',

        // '&::after': {
        //   content: '""',
        //   position: 'absolute',
        //   inset: 0,
        //   background: 'linear-gradient(135deg, #FFFFFF 0%, #073681)',
        //   opacity: 0,
        //   transition: 'opacity 500ms ease-in-out',
        //   borderRadius: '16px',
        // },
        '.product-img': {
          position: 'relative',
          transition: 'all 300ms ease',
          top: 0,
        },
        '.MuiTypography-subtitle1': {
          transition: 'all 300ms ease',
        },
        ':hover': {
          // '&::after': {
          //   opacity: 1,
          // },
          '.MuiTypography-subtitle1': {
            color: 'primary.main',
          },
          '.product-img': {
            top: -10,
          },
        },
      }}
    >
      <Link href={props.href} target="_blank" rel="nofollow noopener" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ bgcolor: '#FFFFFF', borderRadius: '15px', pb: 2, px: 2, height: '100%' }}>
          <Box className="product-img" mb={3}>
            <Image src={props.Img} alt={props.name} width={80} height={80} objectFit="contain" />
          </Box>
          <Box>
            <Typography variant="subtitle1" mb={1} color="text.primary">
              {props.name}
            </Typography>
            <Box>
              <Typography variant="body2" color="text.primary" maxWidth={200} fontWeight={300}>
                {props.description}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Link>
    </Box>
  );
};

const LaunchAppButton = () => {
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{ width: 160 }}
      size="large"
      href={'/visualization'}
      LinkComponent={Link}
    >
      Launch App
    </Button>
  );
};

export default function Product() {
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return (
    <Box pt={13} pb={10}>
      <Container>
        <Grid
          container
          spacing={mdDown ? 6 : 2}
          sx={{
            '.MuiGrid-item': {
              display: 'flex',
              justifyContent: 'center',
            },
          }}
        >
          <Grid item xs={12} xsm={6} md={3}>
            <ProductItem
              href={'https://trava.finance'}
              Img={Feature1Img}
              name={'Data Visualization'}
              description={'Assesses the creditworthiness of crypto wallets in DeFi'}
            />
          </Grid>
          <Grid item xs={12} xsm={6} md={3}>
            <ProductItem
              href={'https://trava.finance'}
              Img={Feature2Img}
              name={'Recommendation'}
              description={'Evaluates the reputation of a holder among the community of a token'}
            />
          </Grid>
          <Grid item xs={12} xsm={6} md={3}>
            <ProductItem
              href={'https://trava.finance'}
              Img={Feature3Img}
              name={'Scoring System'}
              description={'Analyzes and monitors the creditworthiness and stability of over 7000 tokens'}
            />
          </Grid>
          <Grid item xs={12} xsm={6} md={3}>
            <ProductItem
              href={'https://trava.finance'}
              Img={Feature4Img}
              name={'DApp analysis & report'}
              description={'Analyzes transactions of a DApp and presents insights in charts'}
            />
          </Grid>
        </Grid>
        <Box textAlign={'center'} mt={8}>
          <LaunchAppButton />
        </Box>
      </Container>
    </Box>
  );
}
