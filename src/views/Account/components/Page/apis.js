const apis = {
  getBasicDetails: async (
    token,
    apiUrl,
    setInitialBasicDetails,
    setBasicDetails,
  ) => {
    console.log('hello worl');
    const getBasicDetails = async () => {
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
    };
    const resp = await getBasicDetails();
    console.log(resp);
    if (resp.status === 200) {
      const data = await resp.json();
      const mapped = apis.convertBooleanToString(data.data);
      setInitialBasicDetails(mapped);
      setBasicDetails(mapped);
    }
  },

  getH1bInfo: async (token, apiUrl, setInit, setState) => {
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
      const resp = await fetch(`${apiUrl}/h1bInfo`, requestOptions);
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
};

export default apis;
