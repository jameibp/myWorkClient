/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Main } from 'layouts';
import Container from 'components/Container';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Skeleton, useMediaQuery } from '@mui/material';
import { useEffect } from 'react';
import apis from './apis';
import useApp from 'hooks/useApp';

const mock = [
  {
    title: 'Complete your application',
    subtitle:
      'Fill out our standardized application on our platform. Most applicants finish in under an hour.',
    icon: (
      <svg
        height={24}
        width={24}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
        />
      </svg>
    ),
  },

  {
    title: 'Choose your offer',
    subtitle:
      'After 3 days all of your offers will arrive and you will have another 7 days to select your new company.',
    icon: (
      <svg
        height={24}
        width={24}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
];

function isUUID(str) {
  const uuidRegex =
    /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
  return uuidRegex.test(str);
}

const VerifyAccount = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  let { uuid } = useParams();
  const { apiUrl } = useApp();

  useEffect(() => {
    const verifyEmail = async () => {
      const isUuid = isUUID(uuid);
      if (!isUuid) {
        setError(true);
        setLoading(false);
        return;
      }
      await apis.verifyAccount(uuid, setLoading, setError, apiUrl);
    };
    console.log('++++');

    verifyEmail();
  }, []);

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  if (loading) {
    return (
      <Main>
        <Container>
          <Skeleton
            animation="wave"
            height={30}
            width="100%"
            marginBottom={4}
          />
          <Skeleton
            animation="wave"
            height={20}
            width="60%"
            margin="auto"
            marginBottom={2}
          />

          <Box marginTop={4} display="flex" justifyContent="center">
            {[...Array(3)].map((_, i) => (
              <Skeleton
                key={_ + i}
                animation="wave"
                width={150}
                height={40}
                marginBottom={4}
              />
            ))}
          </Box>

          <Box>
            <Grid container spacing={4} justifyItems="center">
              {[...Array(2)].map((_, i) => (
                <Grid item xs={12} md={6} key={i + _}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <Skeleton
                      component={Avatar}
                      width={80}
                      height={80}
                      marginBottom={2}
                      animation="wave"
                    />
                    <Skeleton
                      animation="wave"
                      height={30}
                      width="60%"
                      marginBottom={1}
                    />
                    <Skeleton animation="wave" height={20} width="40%" />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box marginTop={4} display="flex" justifyContent="center">
            <Skeleton
              component={Button}
              variant="outlined"
              animation="wave"
              width={150}
              height={40}
            />
          </Box>
        </Container>
      </Main>
    );
  }

  if (error) {
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
                    oops!
                  </Typography>
                  <Typography
                    variant="h6"
                    component="p"
                    color="text.secondary"
                    align={isMd ? 'left' : 'center'}
                  >
                    something went wrong!
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
  }

  return (
    <Main>
      <Container>
        <Box marginBottom={4}>
          <Typography
            variant={'h4'}
            gutterBottom
            align={'center'}
            sx={{ fontWeight: 700 }}
          >
            Account Verified!
          </Typography>
          <Typography
            variant={'h4'}
            gutterBottom
            align={'center'}
            sx={{ fontWeight: 700 }}
          >
            Our process to find you a new job is fast
          </Typography>
          <Typography
            variant={'h6'}
            component={'p'}
            color={'text.secondary'}
            align={'center'}
          >
            Fill out our standardized application on our platform.
            <br />
            Most applicants finish in under an hour.
          </Typography>
        </Box>
        <Box>
          <Grid container justifyItems={'center'} spacing={4}>
            {mock.map((item, i) => (
              <Grid item xs={12} md={6} key={i}>
                <Box
                  display={'flex'}
                  flexDirection={'column'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  data-aos={'fade-up'}
                  data-aos-delay={i * 100}
                  data-aos-offset={100}
                  data-aos-duration={600}
                >
                  <Box
                    component={Avatar}
                    width={80}
                    height={80}
                    marginBottom={2}
                    bgcolor={alpha(theme.palette.primary.main, 0.1)}
                    color={theme.palette.primary.main}
                    variant={'rounded'}
                    borderRadius={2}
                  >
                    {item.icon}
                  </Box>
                  <Typography
                    variant={'h5'}
                    gutterBottom
                    sx={{ fontWeight: 700 }}
                  >
                    {item.title}
                  </Typography>
                  <Typography textAlign={'center'} color="text.secondary">
                    {item.subtitle}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Box marginTop={4} display={'flex'} justifyContent={'center'}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              href="/"
              endIcon={
                <svg
                  width={16}
                  height={16}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              }
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </Main>
  );
};

export default VerifyAccount;
