import { alpha, Box, styled, Tooltip, tooltipClasses, TooltipProps, Typography } from '@mui/material';
import { Link } from 'src/components/primitives/Link';

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: alpha('#061526', 0.8),
    backdropFilter: 'blur(4px)',
    padding: 16,
    minWidth: 150,
    border: '1px solid',
    borderColor: alpha('#fff', 0.2),
    borderRadius: 4,
  },
}));

interface TokenItemProps<T> {
  item: T;
  link?: string;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TokenItem = <T extends Record<string, any>>({ item, link }: TokenItemProps<T>) => {
  return (
    <Box
      className="hexagon"
      {...(link
        ? {
            component: Link,
            href: link,
          }
        : {})}
      sx={{
        p: '8px',
        bgcolor: 'rgba(255, 255, 255, 0.2)',
        cursor: 'pointer',
        '&:hover': {
          '.inner': {
            transform: 'scale(1.08)',
          },
          '.more-info': {
            visibility: 'visible',
            opacity: 1,
          },
        },
      }}
    >
      <HtmlTooltip
        placement="left"
        title={
          <>
            <Typography fontWeight={500}>{item.name}</Typography>
          </>
        }
      >
        <Box
          className="hexagon inner"
          sx={{
            width: 54,
            height: 54 / 1.2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: '250ms all ease-in-out',
          }}
        >
          <img src={item.imgUrl} alt={item.name} width={'100%'} />
        </Box>
      </HtmlTooltip>
    </Box>
  );
};

interface TokenChainProps<T> {
  title: string;
  spacing?: number;
  data: T[];
  rootLink?: string;
  itemLink: (item: T) => string;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TokenChain<T extends Record<string, any>>(props: TokenChainProps<T>) {
  return (
    <Box
      sx={{
        maxHeight: { xs: '60vh', md: '600px' },
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        // '>*:not(:last-of-type)': {
        //   mb: props.spacing ?? 3,
        // },
        ':after': {
          position: 'absolute',
          content: '""',
          left: '50%',
          bottom: 20,
          top: 20,
          width: '1px',
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.4) 40%, rgba(255,255,255,0) 0%)',
          backgroundPosition: 'right',
          backgroundSize: '1px 16px',
          backgroundRepeat: 'repeat-y',
          zIndex: -1,
        },
      }}
    >
      <Box
        className="hide-scrollbar"
        sx={{
          display: 'flex',
          flexDirection: 'column-reverse',
          overflowY: 'auto',
          flexGrow: 1,
          mb: -3,
          '>*:not(:first-of-type)': {
            mb: 3,
          },
          '>:first-of-type': {
            mb: (props.spacing ?? 3) + 3,
          },
        }}
      >
        {props.data.map((item, idx) => (
          <TokenItem key={idx} item={item} link={props.itemLink(item)} />
        ))}
      </Box>
      <Box
        className="hexagon"
        {...(props.rootLink
          ? {
              component: Link,
              href: props.rootLink,
            }
          : {})}
        sx={{
          p: '5px',
          bgcolor: 'rgba(255, 255, 255, 0.2)',
          cursor: 'pointer',
          transition: '250ms background-color ease',
          '&:hover': {
            bgcolor: 'rgba(255, 255, 255, 0.5)',
          },
        }}
      >
        <Box className="hexagon" sx={{ bgcolor: '#061526', p: 1 }}>
          <Box
            sx={{
              width: 60,
              height: 60 / 1.2,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="small" color="secondary.main" fontWeight={500}>
              {props.title}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
