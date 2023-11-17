import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import Container from 'components/Container';
import AdminAuth from 'components/AdminAuth';
import useApp from 'hooks/useApp';

const Page = ({ children }) => {
  const { user } = useApp();
  return (
    <AdminAuth
      isLoggedIn={user.name}
      userType={user.userType}
      isVerified={user.isVerified}
    >
      <Box>
        <Box bgcolor={'primary.main'} pb={4}>
          <Container>
            <Typography
              variant="h4"
              fontWeight={700}
              gutterBottom
              sx={{ color: 'common.white' }}
            >
              Admin Account
            </Typography>
          </Container>
        </Box>
        <Container paddingTop={'0 !important'} marginTop={-8}>
          <Card sx={{ boxShadow: 3, padding: 4 }}>{children}</Card>
        </Container>
      </Box>
    </AdminAuth>
  );
};

Page.propTypes = {
  children: PropTypes.node,
};

export default Page;
