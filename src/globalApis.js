import constants from 'app-constants';

const globalApis = {
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
    path,
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
        if (path) {
          navigate(path);
        }
      }
    }
  },

  handleAuth: async function (
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
  ) {
    if (!token) {
      return;
    }
    const requestOptions = {
      method: 'GET',
      headers: {
        'access-token': `${token}`,
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(`${apiUrl}/user/auth`, requestOptions);
    const data = await response.json();

    setAccessToken(data.token);
    window.localStorage.setItem('accessToken', data.token);
    setUser(data.user);
    if (data.user.basicDetailsFilled) {
      if (!data.user.basicDetails.areYouAUsCitizen) {
        setPages(constants.PAGES.visa);
      }
      const mappedData = globalApis.convertBooleansToStrings(
        data.user.basicDetails,
      );
      setInitialBasicDetails({ ...mappedData });
      setBasicDetails({ ...mappedData });
    }

    if (data.user.referencesFilled) {
      setReferences({ ...data.user.references });
      setInitialReferences({ ...data.user.references });
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
    if (data.user.documentsSubmitted) {
      setDocumentsUploadedObject((prev) => {
        return { ...prev, ...data.user.documents };
      });
    }
    if (data.user.h1bInfo) {
      setH1bInfo(data.user.h1bInfo);
      setInitialH1bInfo(data.user.h1bInfo);
    } else {
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
    }
  },
  convertBooleansToStrings: (originalObj) => {
    const newObj = {};

    for (let key in originalObj) {
      if (Object.hasOwnProperty.call(originalObj, key)) {
        if (typeof originalObj[key] === 'boolean') {
          newObj[key] = originalObj[key] ? 'yes' : 'no';
        } else {
          newObj[key] = originalObj[key];
        }
      }
    }

    return newObj;
  },

  handleLoginStates: async (
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
    setLoading,
  ) => {
    if (!data.error) {
      if (response.status === 200) {
        setAccessToken(data.token);
        window.localStorage.setItem('accessToken', data.token);
        setUser(data.user);

        if (data.user.userType) {
          navigate('/admin');
          return;
        }
        if (data.user.basicDetailsFilled) {
          if (!data.user.basicDetails.areYouAUsCitizen) {
            setPages(constants.PAGES.visa);
          }
          const mappedData = globalApis.convertBooleansToStrings(
            data.user.basicDetails,
          );
          setInitialBasicDetails({ ...mappedData });
          setBasicDetails({ ...mappedData });
        }

        if (data.user.referencesFilled) {
          setReferences({ ...data.user.references });
          setInitialReferences({ ...data.user.references });
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
        if (data.user.documentsSubmitted) {
          setDocumentsUploadedObject((prev) => {
            return { ...prev, ...data.user.documents };
          });
        }
        if (data.user.h1bInfo) {
          setH1bInfo(data.user.h1bInfo);
          setInitialH1bInfo(data.user.h1bInfo);
        } else {
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
        }
        navigate('/basic-details');
      }
    }
    if (data.error) {
      if (response.status === 404) {
        setModalHeading('Oops! 🚫🔒');
        setModalText(
          `It appears you've stumbled upon a mysterious door, but alas, the guardians of this digital kingdom have whispered a firm "Access Denied" in your direction!`,
        );
        handleModalOpen();
      } else if (response.status === 200) {
        if (data.error === '404') {
          setModalHeading('Oops! 🚫🔒');
          setModalText(
            `Oops! It seems like the user you're looking for doesn't exist in our records. To get started, please register for a new account.`,
          );
          handleModalOpen();
        }
        if (data.error === '401') {
          setModalHeading('Oops! 🚫🔒');
          setModalText(
            `The password you entered is incorrect. Please try again.`,
          );
          handleModalOpen();
        }
      } else if (response.status === 401) {
        setModalHeading('Oops! 🚫🔒');
        setModalText(`Invalid Credentials`);
        handleModalOpen();
      } else {
        setModalHeading('Oops! 🚫🌐');
        setModalText(
          `An Internal Server Error has occurred. Please try your request again later. Our team is actively working to resolve the issue. We apologize for any inconvenience. If you continue to experience problems, please don't hesitate to contact us. 📧📞`,
        );
        handleModalOpen();
      }
    }
    setLoading(false);
  },
};

export default globalApis;
