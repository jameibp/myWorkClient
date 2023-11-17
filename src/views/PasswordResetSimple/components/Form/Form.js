/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ButtonComponent from 'components/Button';
import useApp from 'hooks/useApp';

const validationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email is required.'),
});

const Form = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [done, setDone] = useState(false);

  const { apiUrl } = useApp();

  const resetPassword = async (email) => {
    setLoading(true);
    const res = await fetch(`${apiUrl}/user/request-reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    });
    const data = await res.json();
    if (data.error) {
      setError(true);
      setLoading(false);
    } else {
      setDone(true);
      setLoading(false);
    }
  };

  const initialValues = {
    email: '',
  };

  const onSubmit = async (values) => {
    await resetPassword(values.email);
    return values;
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  if (done) {
    return <DoneComp />;
  }

  if (error) {
    return <ErrorComp />;
  }

  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
          }}
        >
          Forgot your password?
        </Typography>
        <Typography color="text.secondary">
          Enter your email address below and we'll get you back on track.
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
              Enter your email
            </Typography>
            <TextField
              label="Email *"
              variant="outlined"
              name={'email'}
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
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
              <Box marginBottom={{ xs: 1, sm: 0 }}>
                <Button
                  size={'large'}
                  variant={'outlined'}
                  onClick={() => {
                    window.location.href = '/';
                  }}
                  fullWidth
                >
                  Back to login
                </Button>
              </Box>
              <ButtonComponent
                loading={loading}
                size={'large'}
                variant={'contained'}
                type={'submit'}
                onClick={formik.handleSubmit}
              >
                Send reset link
              </ButtonComponent>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

const DoneComp = () => {
  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
          }}
        >
          Done!
        </Typography>
        <Typography color="text.secondary">
          Please check your inbox and follow the instructions to get back on
          track.
        </Typography>
      </Box>
    </Box>
  );
};

const ErrorComp = () => {
  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
          }}
        >
          OOPS!
        </Typography>
        <Typography color="text.secondary">
          Something went wrong! please try again after a few moments.
        </Typography>
      </Box>
    </Box>
  );
};

export default Form;
