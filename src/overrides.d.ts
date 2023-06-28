// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type * as CSS from 'csstype';

// extend css properties
// Ref: https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors
declare module 'csstype' {
  interface Properties {
    // allow any property
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [customCssName: string]: any;
  }
}

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xsm: true;
    xxl: true;
  }

  interface TypographyVariants {
    small: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    small?: React.CSSProperties;
  }
}

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    default: string;
    paper: string;
    //
    primary: string;
    secondary: string;
  }

  interface CommonColors {
    border: string;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h1: true;
    h2: true;
    h3: true;
    h4: true;
    h5: false;
    h6: false;
    subtitle1: true;
    subtitle2: true;
    caption: false;
    body1: true;
    body2: true;
    small: true;
    button: true;
  }
}

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    border: true;
  }
}

declare module '@mui/material/Hidden' {
  interface HiddenProps {
    xsmDown?: boolean;
    xsmUp?: boolean;
  }
}
