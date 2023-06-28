import { Box, BoxProps, SvgIconProps, Typography, TypographyProps } from '@mui/material';
import { EmptyBoxIcon } from 'src/icons';

interface EmptyProps extends BoxProps {
  title: string;
  titleProps?: TypographyProps;
  iconProps?: SvgIconProps;
}
export default function Empty(props: EmptyProps) {
  const { title, iconProps, titleProps, ...other } = props;

  return (
    <Box display="inline-flex" flexDirection="column" alignItems="center" py={2} {...other}>
      <EmptyBoxIcon color="inherit" {...iconProps} />
      {title && (
        <Typography color="inherit" display="inline" sx={{ mt: 1 }} {...titleProps}>
          {title}
        </Typography>
      )}
    </Box>
  );
}

Empty.defaultProps = {
  iconProps: {
    sx: { fontSize: 40 },
  },
  title: 'No Items',
};
