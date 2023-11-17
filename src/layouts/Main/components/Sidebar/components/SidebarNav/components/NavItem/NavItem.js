import React from 'react';
import Box from '@mui/material/Box';

import { Button, Typography } from '@mui/material';
import useApp from 'hooks/useApp';
import constants from 'app-constants';
// import { useNavigate } from 'react-router-dom';

const NavItem = ({ title }) => {
  const {
    setUser,
    setAccessToken,
    setBasicDetails,
    setVisaInfo,
    setH1bInfo,
    setInitialBasicDetails,
    setinitialVisaInfo,
    setInitialH1bInfo,
    setPages,
  } = useApp();
  // const navigate = useNavigate();

  if (title === 'Log Out') {
    return (
      <Box display={'flex'} alignItems={'center'} sx={{ cursor: 'pointer' }}>
        <Button
          size={'large'}
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => {
            setAccessToken('');
            localStorage.setItem('accessToken', '');
            setUser({});

            setPages(constants.PAGES.init);

            setBasicDetails({
              firstName: '',
              middleName: '',
              lastName: '',
              email: '',
              linkedInUrl: '',
              contactNumber: '',
              alternateContactNumber: '',
              currentLocation: '',
              currentClientLocation: '',
              bachelorsUniversity: '',
              mastersCourse: '',
              mastersUniversity: '',
              yearOfCompletion: '',
              dateOfBirth: '',
              landedInUsa: '',
              readyToRelocate: '',
              willingToComeToTheGuestHouse: '',
              ssnLast4Digits: '',
              areYouAUsCitizen: '',
            });

            setInitialBasicDetails({
              firstName: '',
              middleName: '',
              lastName: '',
              email: '',
              linkedInUrl: '',
              contactNumber: '',
              alternateContactNumber: '',
              currentLocation: '',
              currentClientLocation: '',
              bachelorsUniversity: '',
              mastersCourse: '',
              mastersUniversity: '',
              yearOfCompletion: '',
              dateOfBirth: '',
              landedInUsa: '',
              readyToRelocate: '',
              willingToComeToTheGuestHouse: '',
              ssnLast4Digits: '',
              areYouAUsCitizen: '',
            });

            setVisaInfo({
              visaStatus: '',
              visaExpiryDate: '',
              workAuthorizationExpiryDate: '',
            });

            setinitialVisaInfo({
              visaStatus: '',
              visaExpiryDate: '',
              workAuthorizationExpiryDate: '',
            });

            setH1bInfo({
              currentEmployerName: '',
              recruiterName: '',
              recruiterEmail: '',
              recruiterPhoneNumber: '',
            });

            setInitialH1bInfo({
              currentEmployerName: '',
              recruiterName: '',
              recruiterEmail: '',
              recruiterPhoneNumber: '',
            });
          }}
          variant="contained"
        >
          {title}
        </Button>
      </Box>
    );
  }
  return (
    <Box display={'flex'} alignItems={'center'} sx={{ cursor: 'grabbing' }}>
      <Typography color={'black'}>{title}</Typography>
    </Box>
  );
};

export default NavItem;
