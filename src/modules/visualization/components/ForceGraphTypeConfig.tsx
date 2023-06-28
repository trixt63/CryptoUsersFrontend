import { Settings } from '@mui/icons-material';
import { Box, Button, Dialog, DialogContent, Typography } from '@mui/material';
import { useState } from 'react';
import BootstrapDialogTitle from 'src/components/primitives/BootstrapDialogTitle';
import { fetchingConfig } from 'src/redux/config/configSlice';
import { useAppDispatch } from 'src/redux/hook';

interface ForceGraphTypeConfigProps {
  type?: string;
}

export default function ForceGraphTypeConfig(props: ForceGraphTypeConfigProps) {
  const { type } = props;
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const configs = [
    {
      id: 0,
      type: '2D',
    },
    {
      id: 1,
      type: '3D',
    },
  ];

  const handleChangeType = (type: string) => {
    localStorage.setItem('forceGraphType', type);
    dispatch(fetchingConfig());
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
      <Button size="medium" variant="outlined" onClick={() => setIsOpen(!isOpen)} sx={{ color: 'info.light' }}>
        <Settings sx={{ width: '20px' }} />
      </Button>
      <Dialog open={isOpen} PaperProps={{ elevation: 0, sx: { maxWidth: 350 } }} fullWidth>
        <BootstrapDialogTitle onClose={() => setIsOpen(false)}>
          <Typography variant="subtitle1" color="secondary.light">
            Settings
          </Typography>
        </BootstrapDialogTitle>
        <DialogContent>
          <Box>
            <Typography variant="subtitle1" sx={{ color: 'primary.light' }}>
              GLOBAL
            </Typography>
            <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography sx={{ color: 'secondary.light' }}>Force Graph type</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {configs.map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      ml: 1,
                      bgcolor: type == item.type ? '#3498db' : '',
                      borderRadius: '6px',
                      p: '2px 10px 2px 10px',
                      cursor: 'pointer',
                    }}
                  >
                    <Typography sx={{ color: 'secondary.light' }} onClick={() => handleChangeType(item.type)}>
                      {item.type}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
