import { alpha, Box, Theme, useTheme } from '@mui/material';
import { useMemo } from 'react';

interface SafetyLevelProps {
  level: number;
  size: 'small' | 'medium' | 'large';
}
const maxLevel = 5;

export default function SafetyLevel(props: SafetyLevelProps) {
  const { level, size } = props;
  const theme = useTheme();

  const config = useMemo(() => {
    if (size === 'small')
      return {
        w: 4,
        h: 6,
        oh: 4,
        br: '1px',
      };

    if (size === 'large')
      return {
        w: 5,
        h: 14,
        oh: 5,
        br: 1,
      };

    return {
      w: 5,
      h: 12,
      oh: 4,
      br: '1px',
    };
  }, [size]);

  const [color] = useMemo<[string]>(() => {
    let c = theme.palette.warning.main;

    if (level > 1) {
      c = theme.palette.success.main;
    }

    return [c];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'flex-end',
        '> *': {
          bgcolor: (theme: Theme) =>
            alpha(theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark, 0.5),
          display: 'block',
          width: config.w,
          borderRadius: config.br,
        },
        '> *:not(:last-of-type)': {
          mr: '3px',
        },
      }}
    >
      {new Array(maxLevel).fill(0).map((_, idx) => (
        <Box
          key={idx}
          component="span"
          style={{
            height: config.h + idx * config.oh,
            backgroundColor: idx + 1 <= level ? color : alpha('#FFFFFF', 0.7),
          }}
        />
      ))}
    </Box>
  );
}

SafetyLevel.defaultProps = {
  baseY: 12,
  size: 'medium',
};
