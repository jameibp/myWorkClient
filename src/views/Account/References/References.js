import React from 'react';
import Box from '@mui/material/Box';
import Page from '../components/Page';
import Main from 'layouts/Main';
import { Divider, Grid, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useApp from 'hooks/useApp';
import api from './api';
import { useState } from 'react';
import ButtonComponent from 'components/Button';
import ModalComp from 'components/ModalComponent';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup.object({
  firstFullName: yup
    .string()
    .trim()
    .min(3, 'Please enter a valid name')
    .max(50, 'Please enter a valid name')
    .required('Please specify name'),
  firstTitle: yup
    .string()
    .trim()
    .min(3, 'Please enter a valid title')
    .max(30, 'Please enter a valid title')
    .required('Please specify title'),
  firstPhoneNumber: yup
    .string()
    .trim()
    .matches(phoneRegExp, 'Please enter a valid Phone Number')
    .min(10, 'Please enter a valid Phone Number')
    .max(10, 'Please enter a valid Phone Number')
    .required('Please specify Phone Number'),
  firstEmailId: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email is required.'),
  firstLinkedInUrl: yup
    .string()
    .trim()
    .min(2, 'Please enter a valid LinkedIn Url')
    .max(150, 'Please enter a valid LinkedIn Url')
    .required('Please specify LinkedIn Url'),
  firstClientName: yup
    .string()
    .trim()
    .min(3, 'Please enter a company name')
    .max(50, 'Please enter a company name')
    .required('Please specify company name'),
  firstClientLocation: yup
    .string()
    .trim()
    .min(3, 'Please enter a location')
    .max(50, 'Please enter a location')
    .required('Please specify location'),
  secondFullName: yup
    .string()
    .trim()
    .min(3, 'Please enter a valid name')
    .max(50, 'Please enter a valid name')
    .required('Please specify name'),
  secondTitle: yup
    .string()
    .trim()
    .min(3, 'Please enter a valid title')
    .max(30, 'Please enter a valid title')
    .required('Please specify title'),
  secondPhoneNumber: yup
    .string()
    .trim()
    .matches(phoneRegExp, 'Please enter a valid Phone Number')
    .min(10, 'Please enter a valid Phone Number')
    .max(10, 'Please enter a valid Phone Number')
    .required('Please specify Phone Number'),
  secondEmailId: yup
    .string()
    .trim()

    .email('Please enter a valid email address')
    .required('Email is required.'),
  secondLinkedInUrl: yup
    .string()
    .trim()
    .min(2, 'Please enter a valid LinkedIn Url')
    .max(150, 'Please enter a valid LinkedIn Url')
    .required('Please specify LinkedIn Url'),
  secondClientName: yup
    .string()
    .trim()
    .min(3, 'Please enter a company name')
    .max(50, 'Please enter a company name')
    .required('Please specify company name'),
  secondClientLocation: yup
    .string()
    .trim()
    .min(3, 'Please enter a location')
    .max(50, 'Please enter a location')
    .required('Please specify location'),
});

const References = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [modalHeading, setModalHeading] = useState('');
  const [modalText, setModalText] = useState('');

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const { initialReferences } = useApp();
  const token = window.localStorage.getItem('accessToken');

  const { apiUrl, setInitialReferences, setReferences, setUser } = useApp();
  const onSubmit = async (values) => {
    await api.handleSubmit(
      token,
      values,
      apiUrl,
      setModalHeading,
      setModalText,
      setOpenModal,
      setInitialReferences,
      setReferences,
      setUser,
      setLoading,
      setDone,
    );
    console.log(values);
    return values;
  };

  const formik = useFormik({
    initialValues: initialReferences,
    validationSchema: validationSchema,
    onSubmit,
  });

  return (
    <Main>
      <ModalComp
        open={openModal}
        setOpen={setOpenModal}
        modalHeading={modalHeading}
        modalText={modalText}
      />
      <Page>
        <Box>
          <Typography pb={1} variant="h6" gutterBottom fontWeight={700}>
            First Reference
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Full name
                </Typography>
                <TextField
                  label="Full Name *"
                  variant="outlined"
                  name={'firstFullName'}
                  sx={{
                    '& .MuiInputBase-input.Mui-disabled': {
                      WebkitTextFillColor: '#000000',
                    },
                  }}
                  disabled={!initialReferences.firstFullName ? false : true}
                  value={
                    initialReferences.firstFullName
                      ? initialReferences.firstFullName
                      : formik.values.firstFullName || ''
                  }
                  onChange={formik.handleChange}
                  error={
                    formik.touched.firstFullName &&
                    Boolean(formik.errors.firstFullName)
                  }
                  helperText={
                    formik.touched.firstFullName && formik.errors.firstFullName
                  }
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Title
                </Typography>
                <TextField
                  label="Title *"
                  variant="outlined"
                  name={'firstTitle'}
                  sx={{
                    '& .MuiInputBase-input.Mui-disabled': {
                      WebkitTextFillColor: '#000000',
                    },
                  }}
                  disabled={!initialReferences.firstTitle ? false : true}
                  value={
                    initialReferences.firstTitle
                      ? initialReferences.firstTitle
                      : formik.values.firstTitle || ''
                  }
                  onChange={formik.handleChange}
                  error={
                    formik.touched.firstTitle &&
                    Boolean(formik.errors.firstTitle)
                  }
                  helperText={
                    formik.touched.firstTitle && formik.errors.firstTitle
                  }
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Phone Number
                </Typography>
                <TextField
                  label="Phone Number *"
                  variant="outlined"
                  name="firstPhoneNumber"
                  sx={{
                    '& .MuiInputBase-input.Mui-disabled': {
                      WebkitTextFillColor: '#000000',
                    },
                  }}
                  disabled={!initialReferences.firstPhoneNumber ? false : true}
                  value={
                    initialReferences.firstPhoneNumber
                      ? initialReferences.firstPhoneNumber
                      : formik.values.firstPhoneNumber || ''
                  }
                  onChange={formik.handleChange}
                  error={
                    formik.touched.firstPhoneNumber &&
                    Boolean(formik.errors.firstPhoneNumber)
                  }
                  helperText={
                    formik.touched.firstPhoneNumber &&
                    formik.errors.firstPhoneNumber
                  }
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Email ID
                </Typography>
                <TextField
                  label="Email ID *"
                  variant="outlined"
                  name={'firstEmailId'}
                  sx={{
                    '& .MuiInputBase-input.Mui-disabled': {
                      WebkitTextFillColor: '#000000',
                    },
                  }}
                  disabled={!initialReferences.firstEmailId ? false : true}
                  value={
                    initialReferences.firstEmailId
                      ? initialReferences.firstEmailId
                      : formik.values.firstEmailId || ''
                  }
                  onChange={formik.handleChange}
                  error={
                    formik.touched.firstEmailId &&
                    Boolean(formik.errors.firstEmailId)
                  }
                  helperText={
                    formik.touched.firstEmailId && formik.errors.firstEmailId
                  }
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  LinkedIn URL
                </Typography>
                <TextField
                  label="LinkedIn URL *"
                  variant="outlined"
                  name={'firstLinkedInUrl'}
                  sx={{
                    '& .MuiInputBase-input.Mui-disabled': {
                      WebkitTextFillColor: '#000000',
                    },
                  }}
                  disabled={!initialReferences.firstLinkedInUrl ? false : true}
                  value={
                    initialReferences.firstLinkedInUrl
                      ? initialReferences.firstLinkedInUrl
                      : formik.values.firstLinkedInUrl || ''
                  }
                  onChange={formik.handleChange}
                  error={
                    formik.touched.firstLinkedInUrl &&
                    Boolean(formik.errors.firstLinkedInUrl)
                  }
                  helperText={
                    formik.touched.firstLinkedInUrl &&
                    formik.errors.firstLinkedInUrl
                  }
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Client Name
                </Typography>
                <TextField
                  label="Client Name *"
                  variant="outlined"
                  name={'firstClientName'}
                  sx={{
                    '& .MuiInputBase-input.Mui-disabled': {
                      WebkitTextFillColor: '#000000',
                    },
                  }}
                  disabled={!initialReferences.firstClientName ? false : true}
                  value={
                    initialReferences.firstClientName
                      ? initialReferences.firstClientName
                      : formik.values.firstClientName || ''
                  }
                  onChange={formik.handleChange}
                  error={
                    formik.touched.firstClientName &&
                    Boolean(formik.errors.firstClientName)
                  }
                  helperText={
                    formik.touched.firstClientName &&
                    formik.errors.firstClientName
                  }
                  fullWidth
                />
              </Grid>

              <Grid mb={2} item xs={12} sm={6}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Client Location
                </Typography>
                <TextField
                  label="Client Location *"
                  variant="outlined"
                  name={'firstClientLocation'}
                  sx={{
                    '& .MuiInputBase-input.Mui-disabled': {
                      WebkitTextFillColor: '#000000',
                    },
                  }}
                  disabled={
                    !initialReferences.firstClientLocation ? false : true
                  }
                  value={
                    initialReferences.firstClientLocation
                      ? initialReferences.firstClientLocation
                      : formik.values.firstClientLocation || ''
                  }
                  onChange={formik.handleChange}
                  error={
                    formik.touched.firstClientLocation &&
                    Boolean(formik.errors.firstClientLocation)
                  }
                  helperText={
                    formik.touched.firstClientLocation &&
                    formik.errors.firstClientLocation
                  }
                  fullWidth
                />
              </Grid>

              <Grid mb={2} item xs={12} sm={12}>
                <Divider sx={{ borderBottomWidth: 5 }} />
              </Grid>

              {/* Second Reference */}
              <Grid item xs={12} sm={12}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Full name
                </Typography>
                <TextField
                  label="Full Name *"
                  variant="outlined"
                  name={'secondFullName'}
                  sx={{
                    '& .MuiInputBase-input.Mui-disabled': {
                      WebkitTextFillColor: '#000000',
                    },
                  }}
                  disabled={!initialReferences.secondFullName ? false : true}
                  value={
                    initialReferences.secondFullName
                      ? initialReferences.secondFullName
                      : formik.values.secondFullName || ''
                  }
                  onChange={formik.handleChange}
                  error={
                    formik.touched.secondFullName &&
                    Boolean(formik.errors.secondFullName)
                  }
                  helperText={
                    formik.touched.secondFullName &&
                    formik.errors.secondFullName
                  }
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Title
                </Typography>
                <TextField
                  label="Title *"
                  variant="outlined"
                  name={'secondTitle'}
                  sx={{
                    '& .MuiInputBase-input.Mui-disabled': {
                      WebkitTextFillColor: '#000000',
                    },
                  }}
                  disabled={!initialReferences.secondTitle ? false : true}
                  value={
                    initialReferences.secondTitle
                      ? initialReferences.secondTitle
                      : formik.values.secondTitle || ''
                  }
                  onChange={formik.handleChange}
                  error={
                    formik.touched.secondTitle &&
                    Boolean(formik.errors.secondTitle)
                  }
                  helperText={
                    formik.touched.secondTitle && formik.errors.secondTitle
                  }
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Phone Number
                </Typography>
                <TextField
                  label="Phone Number *"
                  variant="outlined"
                  name="secondPhoneNumber"
                  sx={{
                    '& .MuiInputBase-input.Mui-disabled': {
                      WebkitTextFillColor: '#000000',
                    },
                  }}
                  disabled={!initialReferences.secondPhoneNumber ? false : true}
                  value={
                    initialReferences.secondPhoneNumber
                      ? initialReferences.secondPhoneNumber
                      : formik.values.secondPhoneNumber || ''
                  }
                  onChange={formik.handleChange}
                  error={
                    formik.touched.secondPhoneNumber &&
                    Boolean(formik.errors.secondPhoneNumber)
                  }
                  helperText={
                    formik.touched.secondPhoneNumber &&
                    formik.errors.secondPhoneNumber
                  }
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Email ID
                </Typography>
                <TextField
                  label="Email ID *"
                  variant="outlined"
                  name={'secondEmailId'}
                  sx={{
                    '& .MuiInputBase-input.Mui-disabled': {
                      WebkitTextFillColor: '#000000',
                    },
                  }}
                  disabled={!initialReferences.secondEmailId ? false : true}
                  value={
                    initialReferences.secondEmailId
                      ? initialReferences.secondEmailId
                      : formik.values.secondEmailId || ''
                  }
                  onChange={formik.handleChange}
                  error={
                    formik.touched.secondEmailId &&
                    Boolean(formik.errors.secondEmailId)
                  }
                  helperText={
                    formik.touched.secondEmailId && formik.errors.secondEmailId
                  }
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  LinkedIn URL
                </Typography>
                <TextField
                  label="LinkedIn URL *"
                  variant="outlined"
                  name={'secondLinkedInUrl'}
                  sx={{
                    '& .MuiInputBase-input.Mui-disabled': {
                      WebkitTextFillColor: '#000000',
                    },
                  }}
                  disabled={!initialReferences.secondLinkedInUrl ? false : true}
                  value={
                    initialReferences.secondLinkedInUrl
                      ? initialReferences.secondLinkedInUrl
                      : formik.values.secondLinkedInUrl || ''
                  }
                  onChange={formik.handleChange}
                  error={
                    formik.touched.secondLinkedInUrl &&
                    Boolean(formik.errors.secondLinkedInUrl)
                  }
                  helperText={
                    formik.touched.secondLinkedInUrl &&
                    formik.errors.secondLinkedInUrl
                  }
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Client Name
                </Typography>
                <TextField
                  label="Client Name *"
                  variant="outlined"
                  name={'secondClientName'}
                  sx={{
                    '& .MuiInputBase-input.Mui-disabled': {
                      WebkitTextFillColor: '#000000',
                    },
                  }}
                  disabled={!initialReferences.secondClientName ? false : true}
                  value={
                    initialReferences.secondClientName
                      ? initialReferences.secondClientName
                      : formik.values.secondClientName || ''
                  }
                  onChange={formik.handleChange}
                  error={
                    formik.touched.secondClientName &&
                    Boolean(formik.errors.secondClientName)
                  }
                  helperText={
                    formik.touched.secondClientName &&
                    formik.errors.secondClientName
                  }
                  fullWidth
                />
              </Grid>

              <Grid mb={2} item xs={12} sm={6}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Client Location
                </Typography>
                <TextField
                  label="Client Location *"
                  variant="outlined"
                  name={'secondClientLocation'}
                  sx={{
                    '& .MuiInputBase-input.Mui-disabled': {
                      WebkitTextFillColor: '#000000',
                    },
                  }}
                  disabled={
                    !initialReferences.secondClientLocation ? false : true
                  }
                  value={
                    initialReferences.secondClientLocation
                      ? initialReferences.secondClientLocation
                      : formik.values.secondClientLocation || ''
                  }
                  onChange={formik.handleChange}
                  error={
                    formik.touched.secondClientLocation &&
                    Boolean(formik.errors.secondClientLocation)
                  }
                  helperText={
                    formik.touched.secondClientLocation &&
                    formik.errors.secondClientLocation
                  }
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
                  margin={'0 auto'}
                >
                  <ButtonComponent
                    loading={loading}
                    done={done || initialReferences.firstFullName}
                    size={'large'}
                    variant={'contained'}
                    type={'submit'}
                  >
                    Submit
                  </ButtonComponent>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Page>
    </Main>
  );
};

export default References;
