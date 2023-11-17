import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Page from '../components/Page';
import { useNavigate } from 'react-router-dom';
import TextInput from '../components/TextInput/TextInput';
import DateInput from '../components/DateInput.js/DateInput';
import { Main } from 'layouts';
import useApp from 'hooks/useApp';
import ModalComp from 'components/ModalComponent';
import apis from './helperFunctions';
import { useState } from 'react';
import { setUser } from 'app/userSlice';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup.object({
  firstName: yup
    .string()
    .trim()
    .min(2, 'Please enter a valid first name')
    .max(50, 'Please enter a valid first name')
    .required('Please specify your first name'),
  lastName: yup
    .string()
    .trim()
    .min(2, 'Please enter a valid lsat name')
    .max(50, 'Please enter a valid last name')
    .required('Please specify your last name'),
  middleName: yup
    .string()
    .trim()
    .min(2, 'Please enter a valid middle name')
    .max(50, 'Please enter a valid middle name'),

  currentLocation: yup
    .string()
    .trim()
    .min(4, 'Please enter a valid location')
    .max(100, 'Please enter a valid location')
    .required('Please specify your location'),
  bachelorsUniversity: yup
    .string()
    .trim()
    .min(4, 'Please enter a valid bachelors university')
    .max(100, 'Please enter a valid bachelors university')
    .required('Please specify your bachelors university'),

  currentClientLocation: yup
    .string()
    .trim()
    .min(4, 'Please enter a valid location')
    .max(100, 'Please enter a valid location'),
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email is required.'),
  linkedInUrl: yup
    .string()
    .trim()
    .min(2, 'Please enter a valid LinkedIn Url')
    .max(150, 'Please enter a valid LinkedIn Url')
    .required('Please specify your LinkedIn Url'),
  contactNumber: yup
    .string()
    .trim()
    .matches(phoneRegExp, 'Please enter a valid Phone Number')
    .min(10, 'Please enter a valid Phone Number')
    .max(10, 'Please enter a valid Phone Number')
    .required('Please specify your Phone Number'),
  alternateContactNumber: yup
    .string()
    .trim()
    .matches(phoneRegExp, 'Please enter a valid Phone Number')
    .min(10, 'Please enter a valid Phone Number')
    .max(10, 'Please enter a valid Phone Number'),
  mastersUniversity: yup
    .string()
    .trim()
    .min(3, 'Please enter a valid University')
    .max(50, 'Please enter a valid University')
    .required('Please specify your University'),
  mastersCourse: yup
    .string()
    .trim()
    .min(2, 'Please enter a valid Course')
    .max(50, 'Please enter a valid Course')
    .required('Please specify your Course'),
  yearOfCompletion: yup
    .string()
    .trim()
    .min(10, 'Please enter a valid date')
    .max(10, 'Please enter a valid date')
    .required('Please specify your year of completion'),
  dateOfBirth: yup
    .string()
    .trim()
    .min(10, 'Please enter a valid date')
    .max(10, 'Please enter a valid date')
    .required('Please specify your DOB'),
  landedInUsa: yup
    .string()
    .trim()
    .min(10, 'Please enter a valid date')
    .max(10, 'Please enter a valid date')
    .required('Please specify the date'),
  readyToRelocate: yup
    .string()
    .oneOf(['yes', 'no'], "Please type 'yes' or 'no'")
    .required('Please specify'),
  willingToComeToTheGuestHouse: yup
    .string()
    .oneOf(['yes', 'no'], "Please type 'yes' or 'no'")
    .required('Please specify'),
  ssnLast4Digits: yup
    .string()
    .trim()
    .min(4, 'Please enter the last 4 Digits')
    .max(4, 'Please only enter the last 4 Digits')
    .required('Please enter the last 4 Digits'),
  areYouAUsCitizen: yup
    .string()
    .oneOf(['yes', 'no'], "Please type 'yes' or 'no'")
    .required('Please specify'),
});

const General = ({ apiUrl }) => {
  const token = window.localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const [submitLoading, setSubmitLoading] = useState(false); // eslint-disable-line no-unused-vars
  const [openModal, setOpenModal] = React.useState(false);
  const [modalHeading, setModalHeading] = useState('');
  const [modalText, setModalText] = useState('');

  const {
    initialBasicDetails,
    setInitialBasicDetails,
    setBasicDetails,
    setPages,
  } = useApp();

  const onSubmit = async (values) => {
    await apis.handleSubmit(
      token,
      values,
      apiUrl,
      setModalHeading,
      setModalText,
      setOpenModal,
      setPages,
      setInitialBasicDetails,
      setBasicDetails,
      setUser,
    );
    return values;
  };

  const formik = useFormik({
    initialValues: initialBasicDetails,
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
          <Typography variant="h6" gutterBottom fontWeight={700}>
            Change your private information
          </Typography>
          <Typography variant={'subtitle2'} color={'text.secondary'}>
            Please read our{' '}
            <Link color={'primary'} href={'/company-terms'} underline={'none'}>
              terms of use
            </Link>{' '}
            to be informed how we manage your private data.
          </Typography>
          <Box paddingY={4}>
            <Divider />
          </Box>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={4}>
              {[
                {
                  title: 'First Name',
                  sm: 4,
                },
                {
                  title: 'Middle Name',
                  sm: 4,
                },
                {
                  title: 'Last Name',
                  sm: 4,
                },
              ].map((x, i) => {
                return (
                  <TextInput
                    formik={formik}
                    title={x.title}
                    sm={x.sm}
                    key={x.title + i}
                    basicDetails={initialBasicDetails}
                  />
                );
              })}

              <Grid item xs={12} sm={6}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Enter your email
                </Typography>
                <TextField
                  sx={{
                    '& .MuiInputBase-input.Mui-disabled': {
                      WebkitTextFillColor: '#000000',
                    },
                  }}
                  label="Email *"
                  variant="outlined"
                  name={'email'}
                  disabled={!initialBasicDetails.firstName ? false : true}
                  fullWidth
                  value={
                    initialBasicDetails.firstName == ''
                      ? formik.values.email
                      : initialBasicDetails.email
                  }
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>

              {[
                { title: 'Linked In URL', sm: 6 },
                { title: 'Contact Number', sm: 6 },
                { title: 'Alternate Contact Number', sm: 6 },
                { title: 'Current Location', sm: 6 },
                { title: 'Current Client Location', sm: 6 },
                { title: 'Bachelors University', sm: 6 },
                // { title: 'Current Client Location', sm: 6 },
              ].map((x, i) => {
                return (
                  <TextInput
                    formik={formik}
                    title={x.title}
                    sm={x.sm}
                    key={x.title + i}
                    basicDetails={initialBasicDetails}
                  />
                );
              })}

              {[{ title: 'Year of Completion', sm: 6 }].map((x, i) => {
                return (
                  <DateInput
                    formik={formik}
                    title={x.title}
                    sm={x.sm}
                    key={x.title + i}
                    basicDetails={initialBasicDetails}
                  />
                );
              })}

              {[
                { title: 'Masters University', sm: 6 },
                { title: 'Masters Course', sm: 6 },
              ].map((x, i) => {
                return (
                  <TextInput
                    formik={formik}
                    title={x.title}
                    sm={x.sm}
                    key={x.title + i}
                    basicDetails={initialBasicDetails}
                  />
                );
              })}

              {[
                { title: 'Date of Birth', sm: 6 },
                { title: 'Landed in Usa', sm: 6 },
              ].map((x, i) => {
                return (
                  <DateInput
                    formik={formik}
                    title={x.title}
                    sm={x.sm}
                    key={x.title + i}
                    basicDetails={initialBasicDetails}
                  />
                );
              })}

              {[
                {
                  title: 'Ready To Relocate',
                  sm: 6,
                },

                {
                  title: 'Willing to come to the Guest House',
                  sm: 6,
                },
                { title: 'Are you a US Citizen', sm: 6 },
                { title: 'SSN Last 4 Digits', sm: 6 },
              ].map((x, i) => {
                return (
                  <TextInput
                    formik={formik}
                    title={x.title}
                    sm={x.sm}
                    key={x.title + i}
                    basicDetails={initialBasicDetails}
                  />
                );
              })}

              <Grid item container xs={12}>
                <Box
                  display="flex"
                  flexDirection={{ xs: 'column', sm: 'row' }}
                  alignItems={{ xs: 'stretched', sm: 'center' }}
                  justifyContent={'space-between'}
                  width={1}
                  margin={'0 auto'}
                >
                  <Box marginBottom={{ xs: 1, sm: 0 }}>
                    <Typography variant={'subtitle2'}>
                      You may also consider to update your
                      <Button
                        color={'primary'}
                        onClick={() => {
                          navigate('/references');
                        }}
                        underline={'none'}
                      >
                        references.
                      </Button>
                    </Typography>
                  </Box>
                  {!initialBasicDetails.firstName && (
                    <Button
                      size={'large'}
                      disabled={submitLoading}
                      variant={'contained'}
                      type={'submit'}
                    >
                      {submitLoading ? 'Wait' : 'Save'}
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Page>
    </Main>
  );
};

export default General;
