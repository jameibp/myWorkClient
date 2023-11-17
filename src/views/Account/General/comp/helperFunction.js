const helpers = {
  toCamelCase: (inputString) => {
    // Split the input string into words
    const words = inputString.split(' ');

    // Convert each word to lowercase except the first word
    const camelCaseWords = words.map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
    });

    // Join the words to form the camelCase string
    const camelCaseString = camelCaseWords.join('');

    return camelCaseString;
  },
};

export default helpers;
