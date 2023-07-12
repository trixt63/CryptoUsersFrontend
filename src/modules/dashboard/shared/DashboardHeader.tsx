import { Avatar, Box, Stack, SxProps, Typography } from '@mui/material';
import ChainSelect, { ChainSelectProps } from 'src/components/ChainSelect';
import Copy from 'src/components/CopyButton/Copy';
import ViewOnExplorer from '../../../components/ViewOnExplorer';

export interface DashboardHeaderProps {
  name: 'Block' | 'Wallet' | 'Transaction' | 'Token' | React.ReactNode;
  logoIcon?: string;
  tokenName?: string;
  symbol?: string;
  value?: string;
  valueCopy?: string;
  externalLink?: string;
  chains?: string[];
  chainSelectProps?: Omit<ChainSelectProps, 'chains'>;
  sx?: SxProps;
}

export default function DashboardHeader(props: DashboardHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: { xs: 'flex-start', sm: 'center' },
        justifyContent: 'space-between',
        flexDirection: { xs: 'column', sm: 'row' },
        '> *': {
          mb: 1,
        },
        mb: 2,
        ...props.sx,
      }}
    >
      <Stack spacing={2} direction="row" alignItems="center" sx={{ flexGrow: 1 }}>
        <Typography variant="h4" component="h1" color="secondary.main">
          {props.name}
          {props.logoIcon && (
            <Avatar
              sx={{
                width: 26,
                height: 26,
                ml: 1,
                p: 0.2,
                display: 'inline-block',
                transform: 'translateY(6px)', // align icon
              }}
              src={props.logoIcon}
              alt=""
            />
          )}
          {props.tokenName && (
            <Typography
              className="header-name"
              component="span"
              display="inline"
              sx={{ font: 'inherit', color: 'primary.main' }}
            >
              {' '}
              {props.tokenName.toLocaleUpperCase()}
            </Typography>
          )}
          {props.symbol && (
            <Typography
              className="header-symbol"
              component="span"
              display="inline"
              sx={{ font: 'inherit', color: 'primary.main' }}
            >
              {' '}
              ({props.symbol.toUpperCase()})
            </Typography>
          )}
          {props.value && (
            <Typography
              className="header-value"
              component="span"
              display="inline"
              sx={{ font: 'inherit', color: 'primary.main' }}
            >
              {props.value}
            </Typography>
          )}
        </Typography>
        <Stack direction="row" spacing={1}>
          {props.valueCopy && (
            <Copy text={props.valueCopy} IconProps={{ fontSize: 'small', sx: { color: 'text.secondary' } }} />
          )}
          {props.externalLink && <ViewOnExplorer href={props.externalLink} />}
        </Stack>
      </Stack>
      {props.chains && (
        <ChainSelect
          disableAll
          chains={props.chains}
          value={props.chains[0]}
          sx={{
            '.MuiSelect-select': { pl: 0, py: 0, display: 'flex', alignItems: 'center' },
            '.MuiAvatar-root': { width: 20, height: 20 },
            fontSize: '0.875rem',
          }}
          {...props.chainSelectProps}
        />
      )}
    </Box>
  );
}
