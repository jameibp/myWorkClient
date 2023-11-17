import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { alpha, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import logo from 'svg/illustrations/logo.png';
import logoDark from 'svg/illustrations/LogoDark.png';
import { NavItem } from './components';
import { useNavigate } from 'react-router-dom';
import useApp from 'hooks/useApp';

const Topbar = ({ onSidebarOpen, colorInvert = false }) => {
  const theme = useTheme();
  const { mode } = theme.palette;

  const { user } = useApp();

  const navigate = useNavigate();

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      width={1}
      paddingY={2}
    >
      <Box
        display={'flex'}
        component="a"
        onClick={() => {
          if (
            window.location.href.includes('verify-account') ||
            window.location.href.includes('verify')
          ) {
            window.location.href = '/';
          } else {
            navigate('/');
          }
        }}
        title="myWork"
        maxWidth={175}
        width={'100%'}
        height={'100%'}
      >
        <Box
          component={'img'}
          src={mode === 'light' && !colorInvert ? logo : logoDark}
          height={1}
          width={1}
        />
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'center'}>
        {user.name && (
          <>
            <Box px={2} mr={4}>
              <NavItem title={user.name} colorInvert={colorInvert} />
            </Box>
            <Box>
              <NavItem title={'Log Out'} colorInvert={colorInvert} />
            </Box>
          </>
        )}
      </Box>
      <Box sx={{ display: { xs: 'block', md: 'none' } }} alignItems={'center'}>
        <Button
          onClick={() => onSidebarOpen()}
          aria-label="Menu"
          variant={'outlined'}
          sx={{
            borderRadius: 2,
            minWidth: 'auto',
            padding: 1,
            borderColor: alpha(theme.palette.divider, 0.2),
          }}
        >
          <MenuIcon />
        </Button>
      </Box>
    </Box>
  );
};

Topbar.propTypes = {
  onSidebarOpen: PropTypes.func,
  pages: PropTypes.object,
  colorInvert: PropTypes.bool,
};

export default Topbar;
