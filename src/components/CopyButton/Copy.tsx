import { Box, SvgIconProps, Tooltip } from '@mui/material';
import { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { CopyIcon } from 'src/icons';

interface CopyProps {
  text: string;
  IconProps?: SvgIconProps;
  tooltipTitle?: string;
  tooltipCopiedTitle?: string;
}

export default function Copy(props: CopyProps) {
  const { text, IconProps, tooltipTitle = 'Copy', tooltipCopiedTitle = 'Copied' } = props;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
  };

  return (
    <CopyToClipboard text={text} onCopy={handleCopy}>
      <Tooltip title={copied ? tooltipCopiedTitle : tooltipTitle} placement="top">
        <Box
          component="span"
          sx={{ display: 'inline-flex', cursor: 'pointer', alignItems: 'center' }}
          onMouseLeave={() => setTimeout(() => setCopied(false), 500)}
        >
          <CopyIcon color="inherit" fontSize="small" {...IconProps} />
        </Box>
      </Tooltip>
    </CopyToClipboard>
  );
}
