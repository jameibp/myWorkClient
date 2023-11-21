/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Avatar, Modal } from '@mui/material';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import 'firebase/auth';
import 'config/firebase-config';
import google from 'svg/illustrations/google.png';
import { useNavigate } from 'react-router-dom';
import useApp from 'hooks/useApp';
import apis from 'views/SigninSimple/api';
import * as yup from 'yup';
import { useFormik } from 'formik';
import TextInput from '../TextInput/TextInput';
import constants from 'app-constants';
import ButtonComponent from 'components/Button';

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

const validationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email is required.'),
  password: constants.yup.password,
  accountType: yup
    .string()
    .oneOf(['0', '1'], 'Something went wrong')
    .required('Please specify'),
});

const initCredentials = {
  email: '',
  password: '',
  accountType: 0,
};

const Form = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalHeading, setModalHeading] = useState('');
  const [modalText, setModalText] = useState('');

  const [loading, setLoading] = useState(false);

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    await apis.loginWithEmail(
      apiUrl,
      values,
      setAccessToken,
      setUser,
      navigate,
      setPages,
      setInitialBasicDetails,
      setBasicDetails,
      setVisaInfo,
      setinitialVisaInfo,
      setH1bInfo,
      setInitialH1bInfo,
      setDocumentsUploadedObject,
      setInitialReferences,
      setReferences,
      setModalHeading,
      setModalText,
      handleModalOpen,
      setLoading,
    );
    return values;
  };
  const formik = useFormik({
    initialValues: initCredentials,
    validationSchema: validationSchema,
    onSubmit,
  });

  const {
    apiUrl,
    setAccessToken,
    setUser,
    setPages,
    setInitialBasicDetails,
    setInitialH1bInfo,
    setinitialVisaInfo,
    setBasicDetails,
    setVisaInfo,
    setH1bInfo,
    setDocumentsUploadedObject,
    setInitialReferences,
    setReferences,
  } = useApp();

  const loginWithGoogle = async () => {
    await apis.loginWithGoogle(
      signInWithPopup,
      auth,
      provider,
      apiUrl,
      navigate,
      setAccessToken,
      setUser,
      setPages,
      setInitialBasicDetails,
      setInitialH1bInfo,
      setinitialVisaInfo,
      setBasicDetails,
      setVisaInfo,
      setH1bInfo,
      setDocumentsUploadedObject,
      setInitialReferences,
      setReferences,
      setModalHeading,
      setModalText,
      handleModalOpen,
      setLoading,
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
      <Box marginBottom={4}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
          }}
        >
          Welcome back
        </Typography>
        <Typography color="text.secondary">
          Login to manage your account.
        </Typography>
      </Box>
      <form>
        <Grid container spacing={4}>
          {[
            {
              title: 'Email',
              sm: 12,
            },
            {
              title: 'Password',
              sm: 12,
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

          <Grid item xs={12} sm={12}>
            <ButtonComponent
              loading={loading}
              fullWidth
              onClick={formik.handleSubmit}
              type="submit"
              variant="contained"
            >
              Log In
            </ButtonComponent>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Typography
              sx={{
                textTransform: 'uppercase',
                fontWeight: 'medium',
                width: '100%',
                textAlign: 'center',
              }}
              gutterBottom
              variant="subtitle1"
              color={'text.secondary'}
            >
              or
            </Typography>
          </Grid>

          <Grid
            justifyItems={'center'}
            alignItems={'stretch'}
            item
            container
            spacing={2}
            xs={12}
          >
            <Grid item xs={12} sm={12}>
              <ButtonComponent
                sx={{
                  height: '100%',
                }}
                loading={loading}
                fullWidth
                onClick={loginWithGoogle}
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
                Log In With Google
              </ButtonComponent>
            </Grid>
          </Grid>

          <Grid item container xs={12}>
            <Box
              display="flex"
              flexDirection={{ xs: 'column', sm: 'column' }}
              alignItems={{ xs: 'stretched', sm: 'stretched' }}
              justifyContent={'space-between'}
              width={1}
              maxWidth={600}
              margin={'0 auto'}
            >
              <Box marginBottom={{ xs: 1, sm: 0 }}>
                <Typography variant={'subtitle1'}>
                  Don't have an account yet?{' '}
                  <Link
                    component={'a'}
                    color={'primary'}
                    href={'/signup-simple'}
                    underline={'none'}
                  >
                    Sign up here.
                  </Link>
                </Typography>
              </Box>

              <Box marginBottom={{ xs: 1, sm: 0 }}>
                <Typography variant={'subtitle1'}>
                  <Link
                    component={'a'}
                    color={'primary'}
                    href={'/request-reset'}
                    underline={'none'}
                  >
                    Forgot Password?
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Form;
