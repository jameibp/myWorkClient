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
import TextInput from './TextInput/TextInput';
import { Button } from '@mui/material';
import DateInput from './DateInput.js/DateInput';
import ModalComp from 'components/ModalComponent';
import apis from './api';
import { useState } from 'react';

const validationSchema = yup.object({
  visaStatus: yup
    .string()
    .oneOf(
      [
        'CPT Part Time',
        'CPT Full Time',
        'OPT',
        'OPT-STEM',
        'H-1B',
        'Green Card',
        'TN',
        'H-4 EAD',
      ],
      "Please exactly type one of the following 'CPT Part Time', 'CPT Full Time', 'OPT', 'OPT-STEM', 'H-1B', 'Green Card', 'TN', or 'H-4 EAD'. Feel free to copy and paste!",
    )
    .required('Please specify your visa status'),
  visaExpiryDate: yup
    .string()
    .trim()
    .min(10, 'Please enter a valid date')
    .max(10, 'Please enter a valid date')
    .required('Please specify your Visa Expiry'),
  workAuthorizationExpiryDate: yup
    .string()
    .trim()
    .min(10, 'Please enter a valid date')
    .max(10, 'Please enter a valid date')
    .required('Please specify your Work Authorization Expiry'),
});

const VisaInfo = () => {
  const token = window.localStorage.getItem('accessToken');

  const [submitLoading, setSubmitLoading] = useState(false); // eslint-disable-line no-unused-vars
  const [openModal, setOpenModal] = React.useState(false);
  const [modalHeading, setModalHeading] = useState('');
  const [modalText, setModalText] = useState('');

  const { initialVisaInfo, apiUrl, setPages, setVisaInfo, setinitialVisaInfo } =
    useApp();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    await apis.handleSubmit(
      token,
      setPages,
      setVisaInfo,
      setinitialVisaInfo,
      values,
      apiUrl,
      setModalHeading,
      setModalText,
      setOpenModal,
    );
    return values;
  };

  const formik = useFormik({
    initialValues: initialVisaInfo,
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
              {[{ title: 'Visa Status', sm: 12 }].map((x, i) => {
                return (
                  <TextInput
                    formik={formik}
                    title={x.title}
                    sm={x.sm}
                    key={x.title + i}
                    basicDetails={initialVisaInfo}
                  />
                );
              })}

              {[
                { title: 'Visa Expiry Date', sm: 6 },
                { title: 'Work Authorization Expiry Date', sm: 6 },
              ].map((x, i) => {
                return (
                  <DateInput
                    formik={formik}
                    title={x.title}
                    sm={x.sm}
                    key={x.title + i}
                    basicDetails={initialVisaInfo}
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

                  {!initialVisaInfo.visaStatus && (
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

export default VisaInfo;
