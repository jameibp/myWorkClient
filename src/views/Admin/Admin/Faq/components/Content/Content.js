import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { useEffect } from 'react';
import useApp from 'hooks/useApp';
import apis from './apis';
import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  useMediaQuery,
} from '@mui/material';

const FaqGroupItem = ({ basicDetails, i, len }) => {
  const [user, setUser] = useState({});
  const [docList, setDocList] = useState([]);
  const theme = useTheme();
  const token = window.localStorage.getItem('accessToken');
  const { apiUrl } = useApp();
  // const [user, setUser] = useState({});
  const getConsultants = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'access-token': `${token}`,
      },
    };
    const resp = await fetch(
      `${apiUrl}/admin/consultant/${basicDetails['_id']}`,
      requestOptions,
    );
    console.log(resp);
    if (resp.status === 200) {
      const data = await resp.json();
      console.log(data);
      setUser(data);
      let docs = await apis.findDocuments(
        data.documents,
        token,
        apiUrl,
        basicDetails['_id'],
      );
      setDocList(docs);
    }
  };

  useEffect(() => {
    getConsultants();
  }, []);

  return (
    <Box
      component={Accordion}
      key={i}
      padding={1}
      marginBottom={i === len - 1 ? 0 : 2}
      borderRadius={`${theme.spacing(1)} !important`}
      sx={{
        '&::before': {
          display: 'none',
        },
      }}
    >
      <Box
        justifyContent={'space-between'}
        component={AccordionSummary}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id={`panel1a-header--${i}`}
      >
        <Typography fontWeight={600}>{basicDetails.name}</Typography>
      </Box>
      <AccordionDetails>
        <Typography color="text.primary">Email</Typography>
        <Typography color="text.secondary">{basicDetails.email}</Typography>
      </AccordionDetails>

      <AccordionDetails>
        <Typography color="text.primary">
          {basicDetails.basicDetailsFilled
            ? 'Basic Details Filled ✅'
            : 'Basic Details Missing ❌'}
        </Typography>
        {user.basicDetails && (
          <>
            <Typography color="text.secondary">
              <strong>
                {user.basicDetails.areYouAUsCitizen
                  ? 'US Citizen'
                  : 'Immigrant'}
              </strong>
            </Typography>
            <Typography color="text.secondary">
              DOB - <strong>{user.basicDetails.dateOfBirth}</strong>
            </Typography>

            <Typography color="text.secondary">
              Contact Number -{' '}
              <strong>{user.basicDetails.contactNumber}</strong>
            </Typography>
            <Typography color="text.secondary">
              Landed in USA - <strong>{user.basicDetails.landedInUsa}</strong>
            </Typography>
            <Typography color="text.secondary">
              Current Location -{' '}
              <strong>{user.basicDetails.currentLocation}</strong>
            </Typography>

            <Typography color="text.secondary">
              <a
                rel="noopener noreferrer"
                href={user.basicDetails.linkedInUrl}
                target="_blank"
                style={{
                  textDecoration: 'none',
                }}
              >
                <strong>LinkedIn</strong>
              </a>
            </Typography>

            <Typography color="text.secondary">
              Masters University -{' '}
              <strong>{user.basicDetails.mastersUniversity}</strong>
            </Typography>

            <Typography color="text.secondary">
              Masters Course -{' '}
              <strong>{user.basicDetails.mastersCourse}</strong>
            </Typography>
            <Typography color="text.secondary">
              Bachelors University -{' '}
              <strong>{user.basicDetails.bachelorsUniversity}</strong>
            </Typography>
            <Typography color="text.secondary">
              Bachelors Completed -{' '}
              <strong>{user.basicDetails.yearOfCompletion}</strong>
            </Typography>
            <Typography color="text.secondary">
              SSN Last 4 Digits -{' '}
              <strong>{user.basicDetails.ssnLast4Digits}</strong>
            </Typography>
            <Typography color="text.secondary">
              Ready To Relocate{' '}
              <strong>{user.basicDetails.readyToRelocate ? '✅' : '❌'}</strong>
            </Typography>

            <Typography color="text.secondary">
              Relocate to GH{' '}
              <strong>
                {user.basicDetails.willingToComeToTheGuestHouse ? '✅' : '❌'}
              </strong>
            </Typography>
          </>
        )}
      </AccordionDetails>

      {user.visaInfo && (
        <AccordionDetails>
          <Typography color="text.primary">Visa</Typography>
          <Typography color="text.secondary">
            Visa Status - <strong>{user.visaInfo.visaStatus}</strong>
          </Typography>
          <Typography color="text.secondary">
            Visa Expiry - <strong>{user.visaInfo.visaExpiryDate}</strong>
          </Typography>

          <Typography color="text.secondary">
            Work Authorization Expiry -{' '}
            <strong>{user.visaInfo.workAuthorizationExpiryDate}</strong>
          </Typography>
        </AccordionDetails>
      )}

      {user.h1bInfo && (
        <AccordionDetails>
          <Typography color="text.primary">H-1B Information</Typography>
          <Typography color="text.secondary">
            Current Employer -{' '}
            <strong>{user.h1bInfo.currentEmployerName}</strong>
          </Typography>

          <Typography color="text.secondary">
            Recruiter Name - <strong>{user.h1bInfo.recruiterName}</strong>
          </Typography>
          <Typography color="text.secondary">
            Recruiter Email - <strong>{user.h1bInfo.recruiterEmail}</strong>
          </Typography>
          <Typography color="text.secondary">
            Recruiter Contacty -{' '}
            <strong>{user.h1bInfo.recruiterPhoneNumber}</strong>
          </Typography>
        </AccordionDetails>
      )}

      {user.references && (
        <>
          <AccordionDetails>
            <Typography color="text.primary">First Reference</Typography>
            <Typography color="text.secondary">
              Name - <strong>{user.references.firstFullName}</strong>
            </Typography>

            <Typography color="text.secondary">
              Title - <strong>{user.references.firstTitle}</strong>
            </Typography>

            <Typography color="text.secondary">
              Phone - <strong>{user.references.firstPhoneNumber}</strong>
            </Typography>

            <Typography color="text.secondary">
              <a
                rel="noopener noreferrer"
                href={user.references.firstLinkedInUrl}
                target="_blank"
                style={{
                  textDecoration: 'none',
                }}
              >
                <strong>LinkedIn</strong>
              </a>
            </Typography>

            <Typography color="text.secondary">
              Client Name - <strong>{user.references.firstClientName}</strong>
            </Typography>

            <Typography color="text.secondary">
              Location - <strong>{user.references.firstClientLocation}</strong>
            </Typography>
          </AccordionDetails>

          <AccordionDetails>
            <Typography color="text.primary">Second Reference</Typography>
            <Typography color="text.secondary">
              Name - <strong>{user.references.secondFullName}</strong>
            </Typography>

            <Typography color="text.secondary">
              Title - <strong>{user.references.secondTitle}</strong>
            </Typography>

            <Typography color="text.secondary">
              Phone - <strong>{user.references.secondPhoneNumber}</strong>
            </Typography>

            <Typography color="text.secondary">
              <a
                rel="noopener noreferrer"
                href={user.references.secondLinkedInUrl}
                target="_blank"
                style={{
                  textDecoration: 'none',
                }}
              >
                <strong>LinkedIn</strong>
              </a>
            </Typography>

            <Typography color="text.secondary">
              Client Name - <strong>{user.references.secondClientName}</strong>
            </Typography>

            <Typography color="text.secondary">
              Location - <strong>{user.references.secondClientLocation}</strong>
            </Typography>
          </AccordionDetails>
        </>
      )}

      {user.documents && (
        <AccordionDetails>
          <Typography color="text.primary">Documents Submitted</Typography>
          {docList.map((x, i) => {
            return (
              <Typography key={x + i + x.url} color="text.secondary">
                <a
                  rel="noopener noreferrer"
                  href={x.url}
                  target="_blank"
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <strong>{x.title}</strong>
                </a>
              </Typography>
            );
          })}
        </AccordionDetails>
      )}
    </Box>
  );
};

const Content = () => {
  const token = window.localStorage.getItem('accessToken');

  const { apiUrl } = useApp();
  const [allUsers, setAllUsers] = useState([]);
  const getConsultants = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'access-token': `${token}`,
      },
    };
    const resp = await fetch(`${apiUrl}/admin/allConsultants`, requestOptions);
    console.log(resp);
    if (resp.status === 200) {
      const data = await resp.json();
      console.log(data);
      setAllUsers(data.data);
    }
  };

  useEffect(() => {
    getConsultants();
  }, []);

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState('');

  return (
    <Box>
      <Box marginBottom={6}>
        <Box
          mb={4}
          pt={0}
          display={'flex'}
          gap={isMd ? 4 : 1}
          flexDirection={isMd ? 'row' : 'column'}
        >
          <FormControl
            sx={{
              flex: 1,
              alignSelf: 'stretch',
            }}
          >
            <InputLabel id="demo-simple-select-label">Search by</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Search by"
              value={searchType}
              onChange={(e) => {
                setSearchType(e.target.value);
              }}
            >
              <MenuItem value={1}>
                <Box display={'flex'} alignItems={'center'}>
                  <Typography>Name</Typography>
                </Box>
              </MenuItem>
              <MenuItem value={2}>
                <Box display={'flex'} alignItems={'center'}>
                  <Typography>Email</Typography>
                </Box>
              </MenuItem>
              <MenuItem value={3}>
                <Box display={'flex'} alignItems={'center'}>
                  <Typography>ID</Typography>
                </Box>
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl
            sx={{
              flex: 3,
              alignSelf: 'stretch',
            }}
            variant="outlined"
          >
            <OutlinedInput
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              sx={{
                background: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
              }}
              startAdornment={
                <InputAdornment position="start">
                  <Box
                    component={'svg'}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    width={24}
                    height={24}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </Box>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
        <Box>
          <Box>
            {allUsers.length === 0 ? (
              <h1>No Consultants yet!</h1>
            ) : (
              <>
                {allUsers
                  .filter((user) => {
                    if (search.toLowerCase() === '') {
                      return user;
                    }
                    if (searchType == 1 || searchType == '') {
                      return user.name.toLowerCase().includes(search);
                    }

                    if (searchType == 2) {
                      return user.email.toLowerCase().includes(search);
                    }

                    if (searchType == 3) {
                      return user.uuid.toLowerCase().includes(search);
                    }
                  })
                  .map((x, i) => {
                    return (
                      <FaqGroupItem
                        basicDetails={x}
                        key={i + x.name}
                        i={i}
                        len={allUsers.length}
                      />
                    );
                  })}
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Content;
