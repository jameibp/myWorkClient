export default {
  handleSubmit: async (
    token,
    values,
    apiUrl,
    setModalHeading,
    setModalText,
    setOpenModal,
    setInitialReferences,
    setReferences,
    setUser,
    setLoading,
    setDone,
  ) => {
    try {
      const postBasicDetails = async (token, data, apiUrl) => {
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
        setLoading(true);
        const resp = await fetch(`${apiUrl}/references`, requestOptions);
        return resp;
      };
      const resp = await postBasicDetails(token, values, apiUrl);
      const data = await resp.json();
      console.log(data);
      setLoading(false);
      setDone(true);
      if (resp.ok) {
        setModalHeading('Done');
        setModalText('Your Details Have been updated Successfully!!');
        setOpenModal(true);
        setInitialReferences(values);
        setReferences(values);
        setUser((prev) => {
          return {
            referencesFilled: true,
            ...prev,
          };
        });
      } else {
        setModalHeading('Oops!');
        setModalText('Something Went Wrong!!');
        setOpenModal(true);
      }
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  },
};
