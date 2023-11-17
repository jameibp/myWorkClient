import { AppContext } from 'App';
import { useContext } from 'react';

const useApp = () => {
  return useContext(AppContext);
};

export default useApp;
