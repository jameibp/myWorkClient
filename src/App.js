import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import Page from './components/Page';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'aos/dist/aos.css';
import { createContext } from 'react';
import { useState } from 'react';
import constants from 'app-constants';
import { useEffect } from 'react';
import globalApis from 'globalApis';

export const AppContext = createContext();

const App = () => {
  const [pages, setPages] = useState(constants.PAGES.init);

  const [user, setUser] = useState({});
  const [accessToken, setAccessToken] = useState('');

  const [basicDetails, setBasicDetails] = useState({
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
  const [h1bInfo, setH1bInfo] = useState({
    currentEmployerName: '',
    recruiterName: '',
    recruiterEmail: '',
    recruiterPhoneNumber: '',
  });

  const [visaInfo, setVisaInfo] = useState({
    visaStatus: '',
    visaExpiryDate: '',
    workAuthorizationExpiryDate: '',
  });

  const [initialBasicDetails, setInitialBasicDetails] = useState({
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

  const [initialVisaInfo, setinitialVisaInfo] = useState({
    visaStatus: '',
    visaExpiryDate: '',
    workAuthorizationExpiryDate: '',
  });

  const [initialH1bInfo, setInitialH1bInfo] = useState({
    currentEmployerName: '',
    recruiterName: '',
    recruiterEmail: '',
    recruiterPhoneNumber: '',
  });

  const [documentsUploadedObject, setDocumentsUploadedObject] = useState({
    updatedResume: false,
    dlCopyStateId: false,
    passportCopy: false,
    optCard: false,
    i797Copy: false,
    visaCopy: false,
    gcCopy: false,
    eadCopy: false,
    i20: false,
  });

  const [initialReferences, setInitialReferences] = useState({
    firstFullName: '',
    firstTitle: '',
    firstPhoneNumber: '',
    firstEmailId: '',
    firstLinkedInUrl: '',
    firstClientName: '',
    firstClientLocation: '',
    secondFullName: '',
    secondTitle: '',
    secondPhoneNumber: '',
    secondEmailId: '',
    secondLinkedInUrl: '',
    secondClientName: '',
    secondClientLocation: '',
  });

  const [references, setReferences] = useState({
    firstFullName: '',
    firstTitle: '',
    firstPhoneNumber: '',
    firstEmailId: '',
    firstLinkedInUrl: '',
    firstClientName: '',
    firstClientLocation: '',
    secondFullName: '',
    secondTitle: '',
    secondPhoneNumber: '',
    secondEmailId: '',
    secondLinkedInUrl: '',
    secondClientName: '',
    secondClientLocation: '',
  });

  const apiUrl = process.env.REACT_APP_API;
  const token = window.localStorage.getItem('accessToken');

  useEffect(() => {
    globalApis.handleAuth(
      token,
      apiUrl,
      setAccessToken,
      setUser,
      setPages,
      setInitialBasicDetails,
      setBasicDetails,
      setVisaInfo,
      setinitialVisaInfo,
      setDocumentsUploadedObject,
      setInitialReferences,
      setReferences,
      setH1bInfo,
      setInitialH1bInfo,
    );
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        setAccessToken,
        basicDetails,
        setBasicDetails,
        visaInfo,
        setVisaInfo,
        apiUrl,
        h1bInfo,
        setH1bInfo,
        initialBasicDetails,
        setInitialBasicDetails,
        initialVisaInfo,
        setinitialVisaInfo,
        initialH1bInfo,
        setInitialH1bInfo,
        pages,
        setPages,
        documentsUploadedObject,
        setDocumentsUploadedObject,
        initialReferences,
        setInitialReferences,
        references,
        setReferences,
      }}
    >
      <Page>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Page>
    </AppContext.Provider>
  );
};

export default App;
