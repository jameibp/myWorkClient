import useApp from 'hooks/useApp';
import React from 'react';
import General from './General';

function WrapperComp() {
  const { basicDetails, apiUrl } = useApp();

  return (
    <General
      apiUrl={apiUrl}
      initialBasicDetails={basicDetails}
      key={'general component'}
    />
  );
}

export default WrapperComp;
