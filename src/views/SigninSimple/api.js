import globalApis from 'globalApis';
import constants from 'app-constants';

const apis = {
  getBasicDetails: async (token, apiUrl) => {
    const requestOptions = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'access-token': `${token}`,
      },
    };
    const resp = await fetch(`${apiUrl}/basicDetails`, requestOptions);
    return resp;
  },
  getConsultantData: async (
    apiUrl,
    token,
    setPages,
    setInitialBasicDetails,
    setBasicDetails,
    setVisaInfo,
    setinitialVisaInfo,
    setH1bInfo,
    setInitialH1bInfo,
    navigate,
  ) => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'access-token': `${token}`,
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(`${apiUrl}/consultant`, requestOptions);
    const data = await response.json();
    if (!data.error) {
      if (response.status === 200) {
        if (data.user.basicDetailsFilled) {
          if (!data.user.basicDetails.areYouAUsCitizen) {
            setPages(constants.PAGES.usc);
          }
          setInitialBasicDetails(data.user.basicDetails);
          setBasicDetails(data.user.basicDetails);
        }
        if (data.user.visaInfoFilled) {
          if (
            !data.user.basicDetails.areYouAUsCitizen &&
            data.user.visaInfo.visaStatus == 'H-1B'
          ) {
            setPages(constants.PAGES.h1b);
          }
          setVisaInfo(data.user.visaInfo);
          setinitialVisaInfo(data.user.visaInfo);
        }
        if (data.user.h1bInfoFilled) {
          setH1bInfo(data.user.h1bInfo);
          setInitialH1bInfo(data.user.h1bInfo);
        }
        navigate('/');
      }
    }
  },

  loginWithEmail: async (
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
  ) => {
    const { email, password, accountType } = values;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        accountType,
      }),
    };
    const response = await fetch(
      `${apiUrl}/user/login-with-email`,
      requestOptions,
    );
    const data = await response.json();

    await globalApis.handleLoginStates(
      data,
      response,
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
    );
  },

  loginWithGoogle: async (
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
  ) => {
    try {
      const res = await signInWithPopup(auth, provider);
      const token = await res.user.getIdToken();
      const requestOptions = {
        method: 'GET',
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(`${apiUrl}/user/login`, requestOptions);
      const data = await response.json();

      await globalApis.handleLoginStates(
        data,
        response,
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
      );
    } catch (error) {
      console.log(error.message);
    }
  },
};

export default apis;
