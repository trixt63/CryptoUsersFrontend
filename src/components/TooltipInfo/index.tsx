import { Info, InfoOutlined } from '@mui/icons-material';
import { Box, BoxProps, SvgIconProps, Tooltip, TooltipProps } from '@mui/material';

interface TooltipInfoProps extends Omit<TooltipProps, 'children'> {
  iconProps?: SvgIconProps;
  boxProps?: BoxProps;
  variant: 'outlined' | 'filled';
}

export default function TooltipInfo(props: TooltipInfoProps) {
  const { iconProps, variant, boxProps, ...other } = props;
  const IconTag = variant === 'outlined' ? InfoOutlined : Info;

  return (
    <Tooltip {...other} leaveDelay={500}>
      <Box
        {...boxProps}
        sx={{ display: 'inline-flex', alignItems: 'center', verticalAlign: 'middle', ...boxProps?.sx }}
      >
        <IconTag {...iconProps} />
      </Box>
    </Tooltip>
  );
}

TooltipInfo.defaultProps = {
  arrow: true,
  variant: 'outlined',
};
