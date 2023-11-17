import constants from 'app-constants';

const apis = {
  convertBooleanToString: (obj) => {
    const result = { ...obj }; // Create a shallow copy of the original object
    const keysToConvert = [
      'areYouAUsCitizen',
      'willingToComeToTheGuestHouse',
      'readyToRelocate',
    ];

    for (const key of keysToConvert) {
      if (Object.prototype.hasOwnProperty.call(result, key)) {
        if (result[key] === true) {
          result[key] = 'yes';
        } else if (result[key] === false) {
          result[key] = 'no';
        }
      }
    }

    return result;
  },

  handleSubmit: async (
    token,
    values,
    apiUrl,
    setModalHeading,
    setModalText,
    setOpenModal,
    setPages,
    setInitialBasicDetails,
    setBasicDetails,
    setUser,
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
        const resp = await fetch(`${apiUrl}/basicDetails`, requestOptions);
        return resp;
      };
      const resp = await postBasicDetails(token, values, apiUrl);
      const data = await resp.json();
      console.log(data);
      if (resp.ok) {
        setModalHeading('Done');
        setModalText('Your Details Have been updated Successfully!!');
        setOpenModal(true);
        setInitialBasicDetails(values);
        setBasicDetails(values);
        setUser((prev) => {
          return {
            basicDetailsFilled: true,
            ...prev,
          };
        });
        if (values.areYouAUsCitizen === 'yes') {
          setPages(constants.PAGES.init);
        } else {
          setPages(constants.PAGES.visa);
        }
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

export default apis;
