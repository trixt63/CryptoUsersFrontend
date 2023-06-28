import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton, IconButtonProps as MuiIconButtonProps, SvgIconProps, Tooltip } from '@mui/material';
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface CopyButtonProps {
  text: string;
  IconButtonProps?: MuiIconButtonProps;
  IconProps?: SvgIconProps;
  tooltipTitle: string;
  tooltipCopiedTitle: string;
}

export default function CopyButton(props: CopyButtonProps) {
  const { text, IconButtonProps, IconProps, tooltipTitle, tooltipCopiedTitle } = props;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
  };

  return (
    <CopyToClipboard text={text} onCopy={handleCopy}>
      <Tooltip title={copied ? tooltipCopiedTitle : tooltipTitle} placement="top">
        <IconButton onMouseLeave={() => setTimeout(() => setCopied(false), 500)} color="inherit" {...IconButtonProps}>
          <ContentCopyIcon {...IconProps} />
        </IconButton>
      </Tooltip>
    </CopyToClipboard>
  );
}

CopyButton.defaultProps = {
  IconProps: {
    fontSize: 'small',
  },
  tooltipTitle: 'Copy',
  tooltipCopiedTitle: 'Copied',
};
