import { MoreVert } from '@mui/icons-material';
import { Box, Checkbox, Drawer, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { tokenHistoryTitles } from '../detail-score';

interface SelectedTypeDrawerProps {
  selectedTypes: Array<string>;
  setSelectedTypes: React.Dispatch<React.SetStateAction<Array<string>>>;
}

export default function SelectedTypeDrawer(props: SelectedTypeDrawerProps) {
  const { setSelectedTypes } = props;
  let { selectedTypes } = props;
  const [open, setOpen] = useState<boolean>(false);

  const filteredType = Object.keys(tokenHistoryTitles).slice(1);

  const toggleItem = (e: React.SyntheticEvent, type: string) => {
    e.stopPropagation();
    if (selectedTypes.includes(type)) {
      if (selectedTypes.length > 1) {
        selectedTypes = selectedTypes.filter((item) => item !== type);
      } else return;
    } else if (selectedTypes.length < 5) selectedTypes.push(type);
    else toast.warning('You only can choose less than or equal 5 items');
    setSelectedTypes([...selectedTypes]);
  };

  return (
    <>
      <Box justifyContent="flex-end" sx={{ display: 'flex', position: 'absolute', right: 20, top: 20 }}>
        <IconButton onClick={() => setOpen(true)} size="small">
          <MoreVert fontSize="small" />
        </IconButton>
      </Box>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        anchor="right"
        sx={{
          padding: '1rem',
          borderRadius: '0px',
        }}
        PaperProps={{
          sx: {
            paddingTop: { xs: 0, sm: '40px' },
            width: 300,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '10px 0px 0px 10px',
          },
          variant: 'border',
        }}
      >
        <Box sx={{ width: 250, borderRadius: '0px' }}>
          <Box mb={2}>
            <Typography variant="h4" sx={{ px: 2, pt: 2 }}>
              Select Type
            </Typography>
          </Box>

          {filteredType.map((item, index) => (
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              key={index}
              onClick={(e) => toggleItem(e, item)}
              style={{ cursor: 'pointer' }}
            >
              <Checkbox color="primary" checked={selectedTypes.includes(item)} />
              <Typography>{tokenHistoryTitles[item]}</Typography>
            </Box>
          ))}
        </Box>
      </Drawer>
    </>
  );
}
