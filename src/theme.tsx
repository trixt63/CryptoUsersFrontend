/* eslint-disable quotes */
import { createTheme, darken, lighten, ThemeOptions } from '@mui/material';
import { Link } from './components/primitives/Link';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const round = (value: number): number => Math.round(value * 1e5) / 1e5;
const pxToRem = (size: number): string => `${size / 16}rem`;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const buildVariant = (fontWeight: number, size: number, lineHeight: number, letterSpacing?: number) => ({
  fontFamily: 'inherit',
  fontWeight,
  fontSize: pxToRem(size),
  lineHeight: `${round(lineHeight / size)}`,
  ...(letterSpacing !== undefined ? { letterSpacing: `${round(letterSpacing / size)}em` } : {}),
});

export function getThemeConfig(): ThemeOptions {
  const theme = createTheme();

  return {
    breakpoints: {
      keys: ['xs', 'xsm', 'sm', 'md', 'lg', 'xl', 'xxl'],
      values: { xs: 0, xsm: 520, sm: 760, md: 960, lg: 1280, xl: 1400, xxl: 1800 },
    },
    palette: {
      mode: 'dark',
      common: {
        border: '#0E2331',
      },
      background: {
        default: '#00060D',
        paper: '#0D1921',
        primary: '#0E1D27',
        secondary: '#172731',
      },
      primary: {
        main: '#009FDB',
      },
      secondary: {
        main: '#C9EBF8',
        light: '#FFFFFF',
        dark: '#0D171F',
      },
      text: {
        primary: '#FFFFFF',
        secondary: '#5185AA',
      },
      action: {
        hoverOpacity: 0.14,
        hover: 'rgba(255, 255, 255, 0.1)',
      },
      divider: '#172C46',
    },
    typography: {
      h1: buildVariant(800, 50, 60, 0),
      h2: buildVariant(600, 30, 35, 0),
      h3: buildVariant(600, 26, 35, 0),
      h4: buildVariant(600, 20, 24, 0),
      subtitle1: buildVariant(600, 20, 24, 0),
      subtitle2: buildVariant(600, 18, 22, 0),
      body1: buildVariant(400, 16, 20, 0),
      body2: buildVariant(400, 14, 18, 0),
      small: buildVariant(400, 12, 16, 0),
      button: {
        ...buildVariant(500, 14, 18, 0),
        textTransform: 'none',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '*': {
            WebkitTapHighlightColor: 'transparent',
          },
          'input, select, textarea': {
            fontFamily: 'inherit',
          },
          // disable arrow from input number
          // Chrome, Safari, Edge, Opera
          'input::-webkit-outer-spin-button,input::-webkit-inner-spin-button': {
            WebkitAppearance: 'none',
            margin: 0,
          },
          // Firefox
          'input[type=number]': {
            MozAppearance: 'textfield',
          },
          '.hide-scrollbar::-webkit-scrollbar': {
            display: 'none',
          },
          /* Hide scrollbar for IE, Edge and Firefox */
          '.hide-scrollbar': {
            msOverflowStyle: 'none' /* IE and Edge */,
            scrollbarWidth: 'none' /* Firefox */,
          },
          '.custom-scrollbar': {
            // firefox
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(124, 124, 124, 0.6) transparent',

            '&:hover': {
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(124, 124, 124, 0.6)',
              },
            },

            // chrome, safari
            '&::-webkit-scrollbar': {
              width: 4,
              height: 4,
              backgroundColor: 'transparent',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              borderRadius: 10,
              backgroundColor: 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(124, 124, 124, 1)',
              },
            },
            '&::-webkit-scrollbar-corner': {
              display: 'none',
            },
          },
          '.text-truncate': {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          },
          '.hexagon': {
            clipPath: 'url("#hexagon")',
          },
          body: {
            overflowX: 'hidden',
            fontFamily: "'Montserrat', sans-serif",
          },
          // wallet modal
          ':root': {
            '--w3m-z-index': '9999 !important',
          },
          '.ledger-ck-modal': {
            '>:first-child, #ModalWrapper': {
              zIndex: 9999,
            },
          },
        },
      },

      // typography
      MuiTypography: {
        defaultProps: {
          variant: 'body1',
          variantMapping: {
            h1: 'h1',
            h2: 'h2',
            h3: 'h3',
            h4: 'p',
            body1: 'p',
            body2: 'p',
            subtitle1: 'p',
            subtitle2: 'p',
            small: 'p',
            button: 'p',
          },
        },
      },

      // button
      MuiButton: {
        defaultProps: {
          disableElevation: true,
          LinkComponent: Link,
        },
        styleOverrides: {
          root: {
            textTransform: 'capitalize',
            borderRadius: 8,
          },
          sizeMedium: {
            padding: theme.spacing(1, 2),
          },
          sizeSmall: {
            padding: theme.spacing(0.75, 1.5),
          },
          containedSecondary: {
            color: '#C9EBF8',
            backgroundColor: '#0E1D27',
            '&:hover': {
              backgroundColor: lighten('#0E1D27', 0.08),
            },
          },
        },
      },

      // link
      MuiLink: {
        defaultProps: {
          underline: 'hover',
        },
        styleOverrides: {
          root: {
            cursor: 'pointer',
          },
        },
      },

      // dialog
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: '#0D1921',
            backgroundImage: 'none',
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            padding: theme.spacing(2, 2.5),
            fontFamily: 'inherit',
            // backgroundColor: '#101822',
            '&.MuiDialogTitle-root+.MuiDialogContent-root': {
              paddingTop: theme.spacing(2.5),
            },
          },
        },
      },
      MuiDialogActions: {
        styleOverrides: {
          root: {
            padding: theme.spacing(2, 3),
            '>:not(:first-of-type)': {
              marginLeft: theme.spacing(2),
            },
          },
        },
      },

      // svg
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            fontSize: pxToRem(20),
          },
          fontSizeSmall: {
            fontSize: pxToRem(16),
          },
          fontSizeLarge: {
            fontSize: pxToRem(24),
          },
        },
      },

      // backdrop
      // MuiBackdrop: {
      //   styleOverrides: {
      //     root: {
      //       backgroundColor: 'rgba(0, 0, 0, 0.3)',
      //     },
      //   },
      // },

      // paper
      MuiPaper: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: ({ ownerState, theme }) => ({
            borderRadius: 14,
            ...(ownerState.variant === 'border'
              ? { border: '1px solid', borderColor: theme.palette.common.border }
              : {}),
          }),
        },
      },

      // table
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: 'none',
            whiteSpace: 'nowrap',
          },
          head: {
            padding: '8px 16px 24px',
          },
          body: {
            padding: '10px 16px',
          },
        },
      },

      // accordion
      MuiAccordion: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: {
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          },
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          expandIconWrapper: {
            color: '#002A52',
            marginLeft: 8,
            '&.Mui-expanded': {
              color: '#C9EBF8',
            },
          },
        },
      },

      // input
      MuiOutlinedInput: {
        styleOverrides: {
          // root: {
          //   backgroundColor: '#F5F7F8',
          // },
          // notchedOutline: {
          //   borderRadius: 4,
          //   borderColor: '#00569599',
          // },
        },
      },

      // skeleton
      MuiSkeleton: {
        defaultProps: {
          animation: 'wave',
        },
      },

      // container
      MuiContainer: {
        defaultProps: {
          maxWidth: 'xl',
        },
        styleOverrides: {
          root: {
            '@media (min-width: 1280px)': {
              paddingLeft: theme.spacing(4),
              paddingRight: theme.spacing(4),
            },
          },
        },
      },

      // chip
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 10,
          },
          colorSecondary: {
            borderColor: '#527492',
            color: '#477595',
          },
          filledSecondary: {
            backgroundColor: '#477595',
            color: '#C9EBF8',
            '&:hover': {
              backgroundColor: darken('#477595', 0.2),
            },
          },
        },
      },

      // breadcrumbs
      MuiBreadcrumbs: {
        defaultProps: {
          color: '#477595',
          separator: <ArrowForwardIosIcon fontSize="small" />,
        },
        styleOverrides: {
          root: {
            fontWeight: 500,
          },
        },
      },

      // tooltip
      MuiTooltip: {
        defaultProps: {
          placement: 'top',
          arrow: true,
        },
        styleOverrides: {
          tooltip: {
            fontFamily: 'inherit',
            fontSize: 14,
            // backgroundColor: '#00060D',
            // border: '1px solid',
            // borderColor: '#0E2331',
            padding: theme.spacing(0.5, 1),
          },
        },
      },
    },
  };
}
