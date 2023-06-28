import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import { formatNumber } from '@travalendingpool/utils';
import { useState } from 'react';
import SafetyLevel from 'src/components/SafetyLevel';
import { DApps } from 'src/redux/portfolio/dapps-slice';
import DappsHead from './DappsHead';
import DappsRow from './DAppsRow';

interface DAppDetailProps {
  data: DApps;
}

export default function DAppDetail(props: DAppDetailProps) {
  const { data } = props;

  const [expanded, setExpanded] = useState<boolean | false>(false);

  const handleChange = () => {
    setExpanded((prev) => !prev);
  };

  const width = '10%';
  const minWidthGeneralData = 150;
  return (
    <Paper variant="border" sx={{ mb: 2.5, mt: -1, p: '14px', borderRadius: '14px' }}>
      <Accordion expanded={expanded} onChange={handleChange} TransitionProps={{ unmountOnExit: true }}>
        <AccordionSummary sx={{ display: 'flex' }} id="panel1a-header">
          <Box>
            <Box sx={{ flexWrap: 'wrap', display: 'flex', mb: 1 }}>
              <Avatar sx={{ mb: 'auto', mt: 'auto' }}>
                <img src={data.imgUrl} width={32} alt={'imgToken'} />
              </Avatar>
              <Box sx={{ flexWrap: 'wrap', display: 'flex' }}>
                <Typography sx={{ mt: 'auto', mb: 'auto', ml: 1, mr: 1 }}>Trava Lending Pool</Typography>
                <IconButton size="small">
                  <ExpandMoreIcon
                    sx={{
                      fontSize: '40px',
                      color: '#2992F5',
                      transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: '0.5s',
                    }}
                  />
                </IconButton>
              </Box>
            </Box>
            <Box sx={{ display: 'block' }}>
              <Box sx={{ flexWrap: 'wrap', display: 'flex' }}>
                <Box sx={{ minWidth: minWidthGeneralData, py: { xs: 2, md: 0 } }}>
                  <Typography sx={{ color: 'text.secondary' }}>Safety Index</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'baseLine', mt: 1 }}>
                    <Typography sx={{ fontSize: '24px', mr: 1 }}>{data.safetyIndex}</Typography>
                    <SafetyLevel level={2} size="small" />
                  </Box>
                </Box>
                <Box sx={{ minWidth: minWidthGeneralData, py: { xs: 2, md: 0 } }}>
                  <Typography sx={{ color: 'text.secondary' }}>TVL</Typography>
                  <Typography sx={{ fontSize: '24px', mt: 1 }}>
                    {formatNumber(data.tvl, { fractionDigits: 2, prefix: '$' })}
                  </Typography>
                </Box>
                <Box sx={{ minWidth: minWidthGeneralData, py: { xs: 2, md: 0 } }}>
                  <Typography sx={{ color: 'text.secondary' }}>Claimable</Typography>
                  <Typography sx={{ fontSize: '24px', mt: 1 }}>
                    {formatNumber(data.claimable, { fractionDigits: 2, prefix: '$' })}
                  </Typography>
                </Box>
                <Box sx={{ minWidth: minWidthGeneralData, py: { xs: 2, md: 0 } }}>
                  <Typography sx={{ color: 'text.secondary' }}>Avg APR</Typography>
                  <Typography sx={{ fontSize: '24px', mt: 1 }}>
                    {formatNumber(data.avgAPR, { fractionDigits: 2, suffix: '%' })}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ overflowX: { xs: 'auto', lg: 'hidden' }, mx: '-30px' }} className="custom-scrollbar">
            <Box sx={{ width: '100%' }}>
              <DappsHead width={width} />
            </Box>
            <Box sx={{ width: '100%' }}>
              {data.tokens.map((item, index) => (
                <DappsRow width={width} key={index} token={item} dAppId={data.id} />
              ))}
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
}
