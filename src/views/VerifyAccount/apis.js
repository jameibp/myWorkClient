export default {
  verifyAccount: async (uuid, setLoading, setError, apiUrl) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uuid,
        }),
      };
      const res = await fetch(`${apiUrl}/user/verify-email`, requestOptions);
      if (res.status === 200) {
        setError(false);
        setLoading(false);
      } else {
        setLoading(false);
        setError(true);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  },
};
