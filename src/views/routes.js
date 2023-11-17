import React from 'react';

import {
  SigninSimple as SigninSimpleView,
  SignupSimple as SignupSimpleView,
  NotFound as NotFoundView,
  AccountGeneral as AccountGeneralView,
  AccountDocuments as AccountDocumentsView,
  AccountReferences as AccountReferencesView,
  AccountVisaInfo as AccountVisaInfoView,
  AccountH1B as AccountH1BView,
  Admin as AdminView,
  NotFoundCover as AccessDeniedView,
  VerifyAccount,
  Verify,
  ResetPassword,
  ResetPasswordSimpleForm,
} from 'views';

const routes = [
  {
    path: '/',
    renderer: (params = {}) => <SigninSimpleView {...params} />,
  },
  {
    path: '/signup-simple',
    renderer: (params = {}) => <SignupSimpleView {...params} />,
  },
  {
    path: '/basic-details',
    renderer: (params = {}) => <AccountGeneralView {...params} />,
  },
  {
    path: '/documents',
    renderer: (params = {}) => <AccountDocumentsView {...params} />,
  },
  {
    path: '/references',
    renderer: (params = {}) => <AccountReferencesView {...params} />,
  },
  {
    path: '/h1b',
    renderer: (params = {}) => <AccountH1BView {...params} />,
  },
  {
    path: '/visa-info',
    renderer: (params = {}) => <AccountVisaInfoView {...params} />,
  },
  {
    path: '/admin',
    renderer: (params = {}) => <AdminView {...params} />,
  },

  {
    path: '/verify-account/:uuid',
    renderer: (params = {}) => <VerifyAccount {...params} />,
  },
  {
    path: '/not-found',
    renderer: (params = {}) => <NotFoundView {...params} />,
  },
  {
    path: '/403-forbidden',
    renderer: (params = {}) => <AccessDeniedView {...params} />,
  },
  {
    path: '/verify',
    renderer: (params = {}) => <Verify {...params} />,
  },

  {
    path: '/request-reset',
    renderer: (params = {}) => <ResetPassword {...params} />,
  },
  // {
  //   path: '/p',
  //   renderer: (params = {}) => <ServerError {...params} />,
  // },
  {
    path: '/password-reset/:token/:userId',
    renderer: (params = {}) => <ResetPasswordSimpleForm {...params} />,
  },
];

export default routes;
