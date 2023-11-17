import React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import NavItem from './components/NavItem';
import useApp from 'hooks/useApp';
import { Typography } from '@mui/material';
import logo from 'svg/illustrations/logo.png';
import logoDark from 'svg/illustrations/LogoDark.png';

const SidebarNav = () => {
  const theme = useTheme();
  const { mode } = theme.palette;

  const { user } = useApp();

  return (
    <Box>
      <Box width={1} paddingX={2} paddingY={1}>
        <Box display={'flex'} title="myWork">
          <Box
            component={'img'}
            src={mode === 'light' ? logo : logoDark}
            height={1}
            width={1}
          />
        </Box>
      </Box>
      <Box paddingX={2} paddingY={2}>
        <Box mb={2}>
          <Typography variant="outlined" fullWidth>
            {user.name}
          </Typography>
        </Box>
        <Box marginTop={1}>
          <NavItem title={'Log Out'} colorInvert={false} />
        </Box>
      </Box>
    </Box>
  );
};

export default SidebarNav;
