const apis = {
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

  handleSubmit: async (
    token,
    values,
    apiUrl,
    setModalHeading,
    setModalText,
    setOpenModal,
    setH1bInfo,
    setInitialH1bInfo,
  ) => {
    const postH1bInfo = async (token, data, apiUrl) => {
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
      const resp = await fetch(`${apiUrl}/h1bInfo`, requestOptions);
      return resp;
    };
    const resp = await postH1bInfo(token, values, apiUrl);
    const data = await resp.json();
    if (resp.ok) {
      setModalHeading('Done');
      setModalText('Your Details Have been updated Successfully!!');
      setOpenModal(true);
      setInitialH1bInfo(values);
      setH1bInfo(values);
      return;
    } else {
      setModalHeading('Oops!');
      setModalText('Something Went Wrong!!');
      setOpenModal(true);
    }
    console.log(data);
  },
};

export default apis;
