/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from 'components/Container';
import { Main } from 'layouts';
import ButtonComponent from 'components/Button';
import { Navigate, useParams } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material';
import useApp from 'hooks/useApp';
import { useState } from 'react';
import constants from 'app-constants';

const validationSchema = yup.object({
  password: constants.yup.password,
});

const PreComp = ({ heading, text }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <Main>
      <Box
        bgcolor={theme.palette.alternate.main}
        position={'relative'}
        minHeight={'calc(100vh - 247px)'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        height={1}
        marginTop={-12}
        paddingTop={12}
      >
        <Container>
          <Grid container>
            <Grid
              item
              container
              alignItems={'center'}
              justifyContent={'center'}
              xs={12}
              md={6}
            >
              <Box>
                <Typography
                  variant="h1"
                  component={'h1'}
                  align={isMd ? 'left' : 'center'}
                  sx={{ fontWeight: 700 }}
                  mb={2}
                >
                  {heading}
                </Typography>
                <Typography
                  variant="h6"
                  component="p"
                  color="text.secondary"
                  align={isMd ? 'left' : 'center'}
                >
                  {text}
                </Typography>
              </Box>
            </Grid>
            <Grid item container justifyContent={'center'} xs={12} md={6}>
              <Box height={1} width={1} maxWidth={500}>
                <Box
                  component={'img'}
                  src={
                    'https://assets.maccarianagency.com/svg/illustrations/drawkit-illustration6.svg'
                  }
                  width={1}
                  height={1}
                  sx={{
                    filter:
                      theme.palette.mode === 'dark'
                        ? 'brightness(0.8)'
                        : 'none',
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Main>
  );
};

const ResetPasswordSimpleForm = ({
  apiUrl,
  token,
  userId,
  handleDone,
  handleError,
}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (password) => {
    setLoading(true);
    const res = await fetch(`${apiUrl}/user/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        userId,
        password,
      }),
    });
    if (res.ok) {
      handleDone();
    } else {
      handleError();
    }
  };

  const onSubmit = async (values) => {
    await handleSubmit(values.password);
    console.log(values);
    return values;
  };
  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit,
  });

  let camelCase = 'password';

  return (
    <Main>
      <Box bgcolor={'alternate.main'}>
        <Container maxWidth={600}>
          <Box marginBottom={4}>
            <Typography
              variant="h4"
              mb={1}
              sx={{
                fontWeight: 700,
              }}
            >
              Recover account
            </Typography>
            <Typography color="text.secondary">
              Enter your new password below.
            </Typography>
          </Box>
          <Card sx={{ p: { xs: 4, md: 6 } }}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                    Enter new password
                  </Typography>
                  <TextField
                    label="New Password *"
                    type="password"
                    value={formik.values[camelCase]}
                    onChange={formik.handleChange}
                    error={
                      formik.touched[camelCase] &&
                      Boolean(formik.errors[camelCase])
                    }
                    helperText={
                      formik.touched[camelCase] && formik.errors[camelCase]
                    }
                    variant="outlined"
                    name={'password'}
                    fullWidth
                  />
                </Grid>

                <Grid item container xs={12}>
                  <Box
                    display="flex"
                    flexDirection={{ xs: 'column', sm: 'row' }}
                    alignItems={{ xs: 'stretched', sm: 'center' }}
                    justifyContent={'space-between'}
                    width={1}
                    maxWidth={600}
                    margin={'0 auto'}
                  >
                    <ButtonComponent
                      loading={loading}
                      fullWidth
                      size={'large'}
                      variant={'contained'}
                      type={'submit'}
                    >
                      Reset Password
                    </ButtonComponent>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Container>
      </Box>
    </Main>
  );
};

const Loader = () => {
  return (
    <Main>
      <Box bgcolor={'alternate.main'}>
        <Container maxWidth={600}>
          <Box marginBottom={4}>
            <Typography
              variant="h4"
              mb={1}
              sx={{
                fontWeight: 700,
              }}
            >
              Please Wait...
            </Typography>
            <Typography color="text.secondary">
              We are verifying your link.
            </Typography>
          </Box>
          <Card sx={{ p: { xs: 4, md: 6 } }}>
            <Grid container spacing={4}>
              {' '}
              <Grid item xs={12}>
                {' '}
                <Skeleton width="100%" height={40} />{' '}
              </Grid>{' '}
              <Grid item xs={12}>
                {' '}
                <Skeleton width="100%" height={40} />{' '}
              </Grid>{' '}
              <Grid item container xs={12}>
                {' '}
                <Box
                  display="flex"
                  flexDirection={{ xs: 'column', sm: 'row' }}
                  alignItems={{ xs: 'stretched', sm: 'center' }}
                  justifyContent={'space-between'}
                  width={1}
                  maxWidth={600}
                  margin={'0 auto'}
                >
                  {' '}
                  <Skeleton width={180} height={50} />{' '}
                </Box>{' '}
              </Grid>{' '}
            </Grid>
          </Card>
        </Container>
      </Box>
    </Main>
  );
};

const preContent = {
  expired: {
    heading: 'oops!',
    text: (
      <>
        Oops! Looks like your link expired.
        <br />
        Please retry.
      </>
    ),
  },

  done: {
    heading: 'Done!',
    text: (
      <>
        Your password has been reset.
        <br />
        Enjoy!
      </>
    ),
  },
};

const Component = () => {
  const params = useParams();
  const { token, userId } = params;
  const { apiUrl } = useApp();

  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [done, setDone] = useState(false);

  const handleDone = () => {
    setLoading(false);
    setError(false);
    setDone(true);
  };

  const handleError = () => {
    setLoading(false);
    setError(!false);
    setDone(!true);
  };

  const verifyCreds = async () => {
    const res = await fetch(`${apiUrl}/user/verify-reset-password-link`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        userId,
      }),
    });
    if (res.status === 200) {
      setLoading(false);
      setError(false);
      setVerified(true);
    } else {
      setLoading(false);
      setVerified(false);
      setError(true);
    }
  };

  useEffect(() => {
    verifyCreds();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <PreComp
        heading={preContent.expired.heading}
        text={preContent.expired.text}
      />
    );
  }

  if (done) {
    return (
      <PreComp heading={preContent.done.heading} text={preContent.done.text} />
    );
  }

  if (verified) {
    return (
      <ResetPasswordSimpleForm
        apiUrl={apiUrl}
        handleDone={handleDone}
        token={token}
        userId={userId}
        handleError={handleError}
        key={'ResetPasswordSimpleForm_comp_'}
      />
    );
  }
};

const AuthComp = ({ user, children }) => {
  if (user) {
    return <Navigate to={'/not-found'} replace />;
  } else {
    return children;
  }
};

const ProtectedComponent = () => {
  const { user } = useApp();
  const { name } = user;
  return (
    <AuthComp key={'PasswordResetForm_protected'} user={name}>
      <Component />
    </AuthComp>
  );
};

export default ProtectedComponent;
