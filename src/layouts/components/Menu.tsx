import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Box, Collapse, IconButton, SwipeableDrawer } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Link, LinkProps } from 'src/components/primitives/Link';

const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

interface SubMenuProps extends Omit<LinkProps, 'href' | 'title'> {
  title: React.ReactNode;
  active: boolean;
}

function SubMenu({ children, title, active, ...props }: SubMenuProps) {
  const [isOpen, setIsOpen] = useState<boolean>(active);

  const toggleSubMenu = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <>
      <Link
        {...props}
        className={'nav-item has-submenu' + (active ? ' active' : '')}
        sx={{
          '&.active': {
            bgcolor: 'rgba(0, 0, 0, 0.2)',
          },
          position: 'relative',
        }}
        href={'#'}
        onClick={(ev) => {
          ev.preventDefault();
          toggleSubMenu();
        }}
      >
        {title}
        <ArrowDropDownIcon
          sx={{
            position: 'absolute',
            right: 12,
            top: '50%',
            transition: 'transform 250ms ease-in-out',
            color: 'inherit',
          }}
          style={{ transform: isOpen ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%)' }}
        />
      </Link>
      <Collapse in={isOpen}>
        <Box sx={{ ml: 2 }}>{children}</Box>
      </Collapse>
    </>
  );
}

export default function Menu() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuOpen = () => {
    setIsOpen(true);
  };

  const handleMenuClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <IconButton
        sx={{
          ml: -1,
          mt: -1,
          mb: -1,
          mr: 1,
          '&:hover': {
            bgcolor: 'action.hover',
          },
        }}
        onClick={handleMenuOpen}
      >
        <MenuIcon sx={{ color: 'secondary.main' }} fontSize="large" />
      </IconButton>
      <SwipeableDrawer
        anchor="left"
        open={isOpen}
        onOpen={handleMenuOpen}
        onClose={handleMenuClose}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        PaperProps={{
          sx: {
            borderRadius: '0px 16px 16px 0px',
            py: 1,
            px: 1,
            width: 250,
            '.MuiLink-root': {
              display: 'block',
            },
          },
        }}
      >
        <Box
          component="nav"
          sx={{
            py: 1,
            '&:not(:last-of-type)': {
              mb: 1,
            },
            '.nav-item': {
              px: 3,
              py: 1.5,
              color: 'text.primary',
              fontWeight: 500,
              borderRadius: '8px',
              WebkitTapHighlightColor: 'transparent',
              '&:hover:not(.active)': {
                bgcolor: 'rgba(0, 0, 0, 0.1)',
              },
              '&.active': {
                '&:not(.has-submenu)': {
                  bgcolor: 'primary.main',
                },
              },
            },
          }}
        >
          <Box sx={{ pl: 1.5, mb: 1 }}>
            <IconButton onClick={handleMenuClose}>
              <MenuOpenIcon sx={{ color: 'text.primary' }} fontSize="large" />
            </IconButton>
          </Box>
          <Link
            className={'nav-item' + (router.pathname.startsWith('/ranking') ? ' active' : '')}
            href={'/ranking/defi'}
            variant="body2"
            onClick={handleMenuClose}
          >
            Ranking
          </Link>
          <SubMenu active={router.pathname.startsWith('/portfolio')} title={'Portfolio'} variant="body2">
            <Link
              href={'/portfolio/assets'}
              className={'nav-item' + (router.pathname.startsWith('/portfolio/assets') ? ' active' : '')}
              variant="body2"
              onClick={handleMenuClose}
            >
              Assets
            </Link>
            <Link
              href={'/portfolio/dapps'}
              className={'nav-item' + (router.pathname.startsWith('/portfolio/dapps') ? ' active' : '')}
              variant="body2"
              onClick={handleMenuClose}
            >
              DApps
            </Link>
            <Link
              href={'/portfolio/alerts'}
              className={'nav-item' + (router.pathname.startsWith('/portfolio/alerts') ? ' active' : '')}
              variant="body2"
              onClick={handleMenuClose}
            >
              Alerts
            </Link>
          </SubMenu>
          <Link
            className={'nav-item'}
            href={'https://medium.com/@centicio'}
            rel="nofollow"
            variant="body2"
            onClick={handleMenuClose}
          >
            Blog
          </Link>
        </Box>
      </SwipeableDrawer>
    </>
  );
}
