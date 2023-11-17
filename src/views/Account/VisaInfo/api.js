import constants from 'app-constants';

const apis = {
  getVisaInfo: async (token, apiUrl, setInit, setState) => {
    console.log('hello worl');
    const getVisaInfo = async () => {
      const requestOptions = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'access-token': `${token}`,
        },
      };
      const resp = await fetch(`${apiUrl}/visaInfo`, requestOptions);
      return resp;
    };
    const resp = await getVisaInfo();
    console.log(resp);
    if (resp.status === 200) {
      const data = await resp.json();
      setInit(data.data);
      setState(data.data);
    }
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
        console.log(data);
        // window.location.href = '/';
        navigate('/visa-info');
      }
    }
  },
  handleSubmit: async (
    token,
    setPages,
    setVisaInfo,
    setinitialVisaInfo,
    values,
    apiUrl,
    setModalHeading,
    setModalText,
    setOpenModal,
  ) => {
    const postVisaInfo = async (token, data, apiUrl) => {
      const requestOptions = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'access-token': `${token}`,
        },
        body: JSON.stringify({
          ...data,
        }),
      };
      const resp = await fetch(`${apiUrl}/visaInfo`, requestOptions);
      return resp;
    };

    const resp = await postVisaInfo(token, values, apiUrl);
    if (resp.ok) {
      setModalHeading('Done');
      setModalText('Your Details Have been updated Successfully!!');
      setOpenModal(true);
      setinitialVisaInfo(values);
      setVisaInfo(values);
      if (values.visaStatus === 'H-1B') {
        setPages(constants.PAGES.h1b);
      }
    } else {
      setModalHeading('Oops!');
      setModalText('Something Went Wrong!!');
      setOpenModal(true);
    }
  },
};

export default apis;
