import React from 'react';
import Box from '@mui/material/Box';

import { Button, Typography } from '@mui/material';

const NavItem = ({ title }) => {
  if (title === 'Log Out') {
    return (
      <Box display={'flex'} alignItems={'center'} sx={{ cursor: 'pointer' }}>
        <Button
          onClick={() => {
            localStorage.setItem('accessToken', '');
            window.location.href = '/';
          }}
          variant="contained"
        >
          {title}
        </Button>
      </Box>
    );
  }
  return (
    <Box display={'flex'} alignItems={'center'} sx={{ cursor: 'grabbing' }}>
      <Typography color={'black'}>{title}</Typography>
    </Box>
  );
};

export default NavItem;
