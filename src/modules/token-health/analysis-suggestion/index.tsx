import {
  Done,
  FiberManualRecord,
  KeyboardArrowDown,
  KeyboardArrowUp,
  ReportProblemOutlined,
} from '@mui/icons-material';
import { Box, Collapse, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import { useTokenHealthContext } from '../context';

export default function AnalysisSuggestion() {
  const { description } = useTokenHealthContext();
  const [openAnalysis, setOpenAnalysis] = useState<boolean>(false);
  return (
    <Box
      sx={{ mt: 4, cursor: 'pointer' }}
      onClick={() => {
        setOpenAnalysis(!openAnalysis);
      }}
    >
      <Paper sx={{ p: 2 }}>
        <Box sx={{ py: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
            Analysis
          </Typography>
          {!openAnalysis ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
        </Box>
        <Collapse
          in={openAnalysis}
          sx={{
            backgroundColor: '#1a2c38',
            py: openAnalysis ? 1 : 0,
            mb: -2,
            mx: -2,
            px: 1,
            mt: 2,
            borderRadius: '0px 0px 14px 14px',
          }}
        >
          <Box>
            {description.analysis.map((item, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'baseLine', mt: 1 }}>
                <FiberManualRecord fontSize="small" sx={{ color: '#C9E1F8' }} />
                <Typography variant="body2" sx={{ ml: 1, color: '#C9E1F8' }}>
                  {item}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 700, color: 'text.primary' }}>
              Suggestions
            </Typography>
            {description.suggestions.map((item, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'baseLine', mt: 1 }}>
                <Done fontSize="small" />
                <Typography variant="body2" sx={{ ml: 1, color: '#C9E1F8' }}>
                  {item}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <ReportProblemOutlined style={{ color: '#5185AA', marginRight: '0.5rem' }} />
            <Typography sx={{ color: '#5185AA', fontSize: '12px' }}>
              We perform blockchain data analysis to evaluate the health of a token with our various indexes. Based on
              that, we extract the token insights and recommend trading actions to you. The final decision is up to you
              and we cannot be responsible if any problem arise!
            </Typography>
          </Box>
        </Collapse>
      </Paper>
    </Box>
  );
}
