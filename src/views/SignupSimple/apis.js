import constants from 'app-constants';

export default {
  registerWithEmail: async (
    values,
    apiUrl,
    setAccountCreated,
    setModalHeading,
    setModalText,
    handleModalOpen,
    setLoading,
  ) => {
    const { accountType, email, fullName, password } = values;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        name: fullName,
        password,
        accountType,
      }),
    };
    setLoading(true);
    const response = await fetch(
      `${apiUrl}/user/register-with-email`,
      requestOptions,
    );
    const data = await response.json();
    if (!data.error) {
      if (response.status === 201) {
        setAccountCreated(true);
      }
    }
    if (data.error) {
      if (response.status === 200) {
        if (data.error === '409') {
          setModalHeading('Oops!');
          setModalText('Seems like you already have an account with us.');
          handleModalOpen();
        }

        if (data.error === '403') {
          if (data.message === 'Employee') {
            setModalHeading('Oops!');
            setModalText(`You can't make a employee account.`);
            handleModalOpen();
          }
          if (data.message === 'Consultant') {
            setModalHeading('Oops!');
            setModalText(`You can't make an consultant account.`);
            handleModalOpen();
          }
        }
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

  registerWithGoogle: async (
    signInWithPopup,
    auth,
    provider,
    setAccountCreated,
    setModalHeading,
    setModalText,
    handleModalOpen,
    apiUrl,
    accountType,
  ) => {
    try {
      const res = await signInWithPopup(auth, provider);
      const token = await res.user.getIdToken();
      const requestOptions = {
        method: 'POST',
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accountType,
        }),
      };
      const response = await fetch(`${apiUrl}/user/register`, requestOptions);
      const data = await response.json();
      constants.ppp(data);
      if (!data.error) {
        if (response.status === 201) {
          setAccountCreated(true);
        }
      }
      if (data.error) {
        if (response.status === 200) {
          if (data.error === '409') {
            setModalHeading('Oops!');
            setModalText('Seems like you already have an account with us.');
            handleModalOpen();
          }

          if (data.error === '403') {
            if (data.message === 'Employee') {
              setModalHeading('Oops!');
              setModalText(`You can't make a employee account.`);
              handleModalOpen();
            }
            if (data.message === 'Consultant') {
              setModalHeading('Oops!');
              setModalText(`You can't make an consultant account.`);
              handleModalOpen();
            }
          }
        } else {
          setModalHeading('Oops! 🚫🌐');
          setModalText(
            `An Internal Server Error has occurred. Please try your request again later. Our team is actively working to resolve the issue. We apologize for any inconvenience. If you continue to experience problems, please don't hesitate to contact us. 📧📞`,
          );

          handleModalOpen();
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  },
};
