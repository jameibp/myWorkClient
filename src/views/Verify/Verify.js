import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CloudHostingIllustration from 'svg/illustrations/CloudHosting';
import Container from 'components/Container';
import { Main } from 'layouts';
import ButtonComponent from 'components/Button';
import { useState } from 'react';
import useApp from 'hooks/useApp';
import { Navigate } from 'react-router-dom';

const VerifyPage = ({ apiUrl }) => {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const token = window.localStorage.getItem('accessToken');

  const handleClick = async () => {
    setLoading(true);
    const requestOptions = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'access-token': `${token}`,
      },
    };
    const resp = await fetch(
      `${apiUrl}/user/resend-verification`,
      requestOptions,
    );
    if (resp.ok) {
      setLoading(false);
      setDone(true);
    }
  };

  return (
    <Main>
      <Box
        // minHeight={'calc(100vh - 64px - 183px)'}
        height={'100%'}
        display={'flex'}
        alignItems={'center'}
      >
        <Container>
          <Grid container spacing={4}>
            <Grid item container justifyContent={'center'} xs={12}>
              <Box height={'100%'} width={'100%'} maxWidth={500}>
                <CloudHostingIllustration width={'100%'} height={'100%'} />
              </Box>
            </Grid>
            <Grid
              item
              container
              alignItems={'center'}
              justifyContent={'center'}
              xs={12}
            >
              <Box>
                <Typography
                  variant="h4"
                  component={'h4'}
                  align={'center'}
                  gutterBottom
                  sx={{ fontWeight: 700 }}
                >
                  Account unverified.
                </Typography>
                <Typography
                  component="p"
                  color="textSecondary"
                  align={'center'}
                >
                  Verify your email. Check your inbox for the verification link.
                  <br />
                  Thank You!
                </Typography>
                <Box display={'flex'} justifyContent={'center'} marginTop={2}>
                  <ButtonComponent
                    variant="contained"
                    color="primary"
                    size="large"
                    loading={loading}
                    onClick={handleClick}
                    done={done}
                  >
                    Resend Verification Email
                  </ButtonComponent>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Main>
  );
};
const AuthComp = ({ isVerified, userType, children }) => {
  if (isVerified) {
    if (userType == 1) {
      return <Navigate to={'/admin'} replace />;
    }
    return <Navigate to={'/basic-details'} replace />;
  } else {
    return children;
  }
};

const VerifyComponent = () => {
  const { user, apiUrl } = useApp();
  const { isVerified, userType } = user;
  return (
    <AuthComp isVerified={isVerified} userType={userType}>
      <VerifyPage apiUrl={apiUrl} />
    </AuthComp>
  );
};

export default VerifyComponent;
