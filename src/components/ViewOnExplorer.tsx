import { SvgIconProps, Tooltip } from '@mui/material';
import { Link, LinkProps } from 'src/components/primitives/Link';
import { ExternalLinkIcon } from 'src/icons';

export default function ViewOnExplorer({ iconProps, ...props }: LinkProps & { iconProps?: SvgIconProps }) {
  return (
    <Tooltip title="View on block explorer" placement="top">
      <Link rel="nofollow noopener" target="_blank" sx={{ color: 'text.secondary', display: 'inline-flex' }} {...props}>
        <ExternalLinkIcon fontSize="small" {...iconProps} />
      </Link>
    </Tooltip>
  );
}
