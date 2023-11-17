/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import google from 'svg/illustrations/google.png';
import {
  Avatar,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from '@mui/material';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import 'firebase/auth';
import 'config/firebase-config';
import useApp from 'hooks/useApp';
import apis from 'views/SignupSimple/apis';
import TextInput from './TextInput/TextInput';
import ButtonComponent from 'components/Button';
import constants from 'app-constants';

const validationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email is required.'),
  fullName: yup
    .string()
    .trim()
    .min(2, 'Please enter a valid name')
    .max(80, 'Please enter a valid name')
    .required('Please specify your name'),
  password: constants.yup.password,
  accountType: yup
    .string()
    .oneOf(['0', '1'], 'Something went wrong')
    .required('Please specify'),
});
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  borderRadius: 4,
};

const initCredentials = {
  email: '',
  password: '',
  fullName: '',
  accountType: 0,
};

const Form = () => {
  const [loading, setLoading] = useState(false);

  const [accountType, setAccountType] = useState(0);
  const [accountCreated, setAccountCreated] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [modalHeading, setModalHeading] = useState('');
  const [modalText, setModalText] = useState('');

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const camelCaseAccountType = 'accountType';

  const { apiUrl } = useApp();

  const onSubmit = async (values) => {
    await apis.registerWithEmail(
      values,
      apiUrl,
      setAccountCreated,
      setModalHeading,
      setModalText,
      handleModalOpen,
      setLoading,
    );
    console.log(values);
    return values;
  };
  const formik = useFormik({
    initialValues: initCredentials,
    validationSchema: validationSchema,
    onSubmit,
  });

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const registerWithGoogle = async () => {
    await apis.registerWithGoogle(
      signInWithPopup,
      auth,
      provider,
      setAccountCreated,
      setModalHeading,
      setModalText,
      handleModalOpen,
      apiUrl,
      accountType,
    );
  };

  return (
    <Box>
      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...modalStyle, width: 400 }}>
          <h2 id="parent-modal-title">{modalHeading}</h2>
          <p id="parent-modal-description">{modalText}</p>
        </Box>
      </Modal>
      {accountCreated ? (
        <Box marginBottom={4}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
            }}
          >
            Your account has been created!
          </Typography>
          <Typography variant="h6" color="text.secondary">
            <Link
              component={'a'}
              color={'primary'}
              href={'/'}
              underline={'none'}
            >
              Login
            </Link>{' '}
            now and manage your account.
          </Typography>
        </Box>
      ) : (
        <>
          <Box marginBottom={4}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
              }}
            >
              Create an account
            </Typography>
          </Box>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              {[
                {
                  title: 'Email',
                  sm: 12,
                },
                {
                  title: 'Password',
                  sm: 12,
                },
                {
                  title: 'Full Name',
                  sm: 6,
                },
              ].map((x, i) => {
                return (
                  <TextInput
                    formik={formik}
                    title={x.title}
                    sm={x.sm}
                    key={x.title + i}
                  />
                );
              })}

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Account Type</InputLabel>
                  <Select
                    name={camelCaseAccountType}
                    value={formik.values[camelCaseAccountType]}
                    onChange={formik.handleChange}
                    error={
                      formik.touched[camelCaseAccountType] &&
                      Boolean(formik.errors[camelCaseAccountType])
                    }
                    helperText={
                      formik.touched[camelCaseAccountType] &&
                      formik.errors[camelCaseAccountType]
                    }
                    label="Account Type"
                  >
                    <MenuItem value={0}>Consultant</MenuItem>
                    <MenuItem value={1}>Employee</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12}>
                <ButtonComponent
                  fullWidth
                  onClick={formik.handleSubmit}
                  type="submit"
                  variant="contained"
                  loading={loading}
                >
                  Sign Up
                </ButtonComponent>
              </Grid>
              <Typography
                sx={{
                  textTransform: 'uppercase',
                  fontWeight: 'medium',
                  width: '100%',
                  textAlign: 'center',
                }}
                gutterBottom
                mt={2}
                color={'text.secondary'}
              >
                or
              </Typography>
              <Grid
                justifyItems={'center'}
                alignItems={'stretch'}
                item
                container
                spacing={2}
                xs={12}
              >
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Account Type</InputLabel>
                    <Select
                      onChange={(e) => {
                        e.preventDefault();
                        setAccountType(e.target.value);
                      }}
                      value={accountType}
                      label="Account Type"
                    >
                      <MenuItem value={0}>Consultant</MenuItem>
                      <MenuItem value={1}>Employee</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    sx={{
                      height: '100%',
                    }}
                    fullWidth
                    onClick={registerWithGoogle}
                    variant="outlined"
                    startIcon={
                      <Avatar
                        sx={{
                          width: '25px',
                          height: '25px',
                        }}
                        src={google}
                      />
                    }
                  >
                    Sign Up With Google
                  </Button>
                </Grid>
                <Box
                  display="flex"
                  flexDirection={{ xs: 'column', sm: 'row' }}
                  alignItems={{ xs: 'stretched', sm: 'center' }}
                  justifyContent={'space-between'}
                  width={1}
                  maxWidth={600}
                  pt={2}
                  margin={'0 auto'}
                >
                  <Box marginBottom={{ xs: 1, sm: 0 }}>
                    <Typography variant={'subtitle2'}>
                      Already have an account?{' '}
                      <Link
                        component={'a'}
                        color={'primary'}
                        href={'/'}
                        underline={'none'}
                      >
                        Login.
                      </Link>
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </form>
        </>
      )}
    </Box>
  );
};

export default Form;
