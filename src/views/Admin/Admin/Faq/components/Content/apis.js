import constants from 'app-constants';

const apis = {
  getAllUsers: async () => {},

  findDocuments: async (documents, token, apiUrl, consultantId) => {
    function filterTrueValues(obj) {
      let keysToCheck = Object.values(constants.DOCUMENT_LIST);
      return keysToCheck.filter((key) => obj[key] === true).map((key) => key);
    }
    function titleCaseToWordsWithSpace(titleCaseString) {
      // Use a regular expression to split the string by uppercase letters
      return titleCaseString.split(/(?=[A-Z])/).join(' ');
    }
    const keys = [];
    let valuesToFind = filterTrueValues(documents);
    for (const key in constants.DOCUMENT_LIST) {
      if (valuesToFind.includes(constants.DOCUMENT_LIST[key])) {
        const options = {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'access-token': `${token}`,
          },
        };
        const resp = await fetch(
          `${apiUrl}/admin/${constants.DOCUMENT_LIST[key]}/${consultantId}`,
          options,
        );
        const data = await resp.json();
        let k = titleCaseToWordsWithSpace(key);
        keys.push({ title: k, url: data.url });
      }
    }
    return keys;
  },
};

export default apis;
