import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Page from '../components/Page';
import { useNavigate } from 'react-router-dom';
import { Main } from 'layouts';
import useApp from 'hooks/useApp';
import { Button } from '@mui/material';
import TextInput from './TextInput/TextInput';
import ModalComp from 'components/ModalComponent';
import { useState } from 'react';
import apis from './api';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const validationSchema = yup.object({
  currentEmployerName: yup
    .string()
    .trim()
    .min(2, 'Please enter a valid name')
    .max(50, 'Please enter a valid name')
    .required('Please specify your emplyers name name'),
  recruiterName: yup
    .string()
    .trim()
    .min(2, 'Please enter a valid name')
    .max(50, 'Please enter a valid name')
    .required('Please specify your emplyers name name'),
  recruiterEmail: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email is required.'),
  recruiterPhoneNumber: yup
    .string()
    .trim()
    .matches(phoneRegExp, 'Please enter a valid Phone Number')
    .min(10, 'Please enter a valid Phone Number')
    .max(10, 'Please enter a valid Phone Number')
    .required('Phone Number is required'),
});

const H1B = () => {
  /* eslint-disable no-unused-vars */
  const token = window.localStorage.getItem('accessToken');

  const navigate = useNavigate();
  const [submitLoading, setSubmitLoading] = useState(false); // eslint-disable-line no-unused-vars
  const [openModal, setOpenModal] = React.useState(false);
  const [modalHeading, setModalHeading] = useState('');
  const [modalText, setModalText] = useState('');

  const {
    initialH1bInfo,
    setPages,
    setInitialBasicDetails,
    setBasicDetails,
    setVisaInfo,
    setinitialVisaInfo,
    setH1bInfo,
    setInitialH1bInfo,
    apiUrl,
  } = useApp();

  const onSubmit = async (values) => {
    await apis.handleSubmit(
      token,
      values,
      apiUrl,
      setModalHeading,
      setModalText,
      setOpenModal,
      setH1bInfo,
      setInitialH1bInfo,
    );
    return values;
  };

  const formik = useFormik({
    initialValues: initialH1bInfo,
    validationSchema: validationSchema,
    onSubmit,
  });

  /* eslint-enable no-unused-vars */
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
                { title: 'Current Employer Name', sm: 12 },
                { title: 'Recruiter Name', sm: 12 },
                { title: 'Recruiter Email', sm: 12 },
                { title: 'Recruiter Phone Number', sm: 12 },
              ].map((x, i) => {
                return (
                  <TextInput
                    formik={formik}
                    title={x.title}
                    sm={x.sm}
                    key={x.title + i}
                    basicDetails={initialH1bInfo}
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

                  {!initialH1bInfo.currentEmployerName && (
                    <Button
                      size={'large'}
                      variant={'contained'}
                      type={'submit'}
                    >
                      Save
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

export default H1B;
