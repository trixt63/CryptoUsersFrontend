import { Box, Container, Hidden } from '@mui/material';
import { useRouter } from 'next/router';
// import LogoImg from 'public/images/logos/centic_light_horizontal.png';
import LogoImg from 'public/images/logos/bitcoin-representative.png';
import LogoIconImg from 'public/images/logos/bitcoin-representative.png';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'src/components/primitives/Link';
import WalletButton from 'src/components/WalletButton';
import Menu from './Menu';
import Search from './Search';

// const DynamicWalletButton = dynamic(() => import('src/components/WalletButton'), { ssr: false });

const DesktopNav = () => {
  const router = useRouter();

  return (
    <Box
      component="nav"
      sx={{
        display: 'flex',
        '.nav-item': {
          fontWeight: 600,
          color: 'secondary.main',
          transition: '250ms color ease',
          '&:not(:last-of-type)': {
            mr: 3,
          },
          '&:hover:not(.active)': {
            color: 'text.primary',
          },
          '&.active': {
            color: 'primary.main',
          },
        },
      }}
    >
      {/*<Link*/}
      {/*  className={'nav-item' + (router.pathname.startsWith('/ranking') ? ' active' : '')}*/}
      {/*  href={'/ranking/defi'}*/}
      {/*  variant="body2"*/}
      {/*>*/}
      {/*  Ranking*/}
      {/*</Link>*/}
      {/*<Link*/}
      {/*  className={'nav-item' + (router.pathname.startsWith('/portfolio') ? ' active' : '')}*/}
      {/*  href={'/portfolio/assets'}*/}
      {/*  variant="body2"*/}
      {/*>*/}
      {/*  Portfolio*/}
      {/*</Link>*/}
      {/*<Link className={'nav-item'} rel="nofollow" href={'https://medium.com/@centicio'} variant="body2">*/}
      {/*  Blog*/}
      {/*</Link>*/}
    </Box>
  );
};

export default function Header() {
  const [hide, setHide] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const scrollYRef = useRef<number>(typeof window !== 'undefined' ? window.scrollY : 0);

  useEffect(() => {
    const scrollHandler = () => {
      if (headerRef.current) {
        const isScrollDown = Boolean(window.scrollY - scrollYRef.current > 0);
        scrollYRef.current = window.scrollY;
        if (isScrollDown && window.scrollY > headerRef.current.clientHeight) {
          setHide(true);
        } else {
          setHide(false);
        }
      }
    };
    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return (
    <Box
      ref={headerRef}
      component="header"
      sx={{
        position: 'fixed',
        bgcolor: 'background.default',
        top: 0,
        left: 0,
        right: 0,
        zIndex: '1000',
        transition: 'top 250ms ease-in-out',
        '&.up': {
          top: -70,
        },
      }}
      className={hide ? 'up' : undefined}
    >
      <Container maxWidth="xl">
        <Box sx={{ height: 64, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', width: { xsm: 250 } }}>
            <Hidden mdUp implementation="css">
              <Menu />
            </Hidden>
            <Link href={'/'} sx={{ display: 'block' }}>
              <Hidden xsmDown implementation="css">
                <img src={LogoImg.src} alt={'centic logo'} height={40} />
              </Hidden>
              <Hidden xsmUp implementation="css">
                <img src={LogoIconImg.src} alt={'centic logo'} height={28} />
              </Hidden>
            </Link>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: { xs: 'flex-end', md: 'space-between' },
              maxWidth: 1000,
              flexGrow: 1,
            }}
          >
            <Box sx={{ display: { xs: 'none', md: 'block' }, maxWidth: 400, flexGrow: 1, mr: 3 }}>
              <Search />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Hidden mdDown implementation="css">
                <DesktopNav />
              </Hidden>
              {/* <DynamicWalletButton sx={{ ml: 5 }} /> */}
              <Box sx={{ ml: 5 }}>
                <WalletButton />
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
