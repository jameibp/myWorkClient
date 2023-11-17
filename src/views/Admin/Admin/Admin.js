import React from 'react';

import Page from '../components/Page';
import Main from 'layouts/Main';
import Faq from './Faq';

const Admin = () => {
  return (
    <Main>
      <Page>
        <Faq />
      </Page>
    </Main>
  );
};

export default Admin;
