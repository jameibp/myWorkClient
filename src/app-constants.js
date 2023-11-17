import * as yup from 'yup';

const constants = {
  PAGES: {
    init: [
      {
        id: 'basicDetails',
        href: '/basic-details',
        title: 'Basic Details',
      },
      {
        id: 'documents',
        href: '/documents',
        title: 'Documents',
      },
      {
        id: 'references',
        href: '/references',
        title: 'References',
      },
    ],
    h1b: [
      {
        id: 'basicDetails',
        href: '/basic-details',
        title: 'Basic Details',
      },
      {
        id: 'visaInfo',
        href: '/visa-info',
        title: 'Visa Details',
      },
      {
        id: 'h1b',
        href: '/h1b',
        title: 'H-1B Information',
      },
      {
        id: 'documents',
        href: '/documents',
        title: 'Documents',
      },
      {
        id: 'references',
        href: '/references',
        title: 'References',
      },
    ],
    visa: [
      {
        id: 'basicDetails',
        href: '/basic-details',
        title: 'Basic Details',
      },
      {
        id: 'visaInfo',
        href: '/visa-info',
        title: 'Visa Details',
      },
      {
        id: 'documents',
        href: '/documents',
        title: 'Documents',
      },
      {
        id: 'references',
        href: '/references',
        title: 'References',
      },
    ],
  },

  DOCUMENT_LIST: {
    Resume: 'updatedResume',
    DlStateId: 'dlCopyStateId',
    Passport: 'passportCopy',
    OptCard: 'optCard',
    I797Copy: 'i797Copy',
    VisaCopy: 'visaCopy',
    GcCopy: 'gcCopy',
    EadCopy: 'eadCopy',
    I20: 'i20',
  },
  pp: (str) => {
    console.log(str);
  },
  ppp: (str, d) => {
    console.log(d + d + d + d);
    console.log(d + d + d + d);
    console.log(d + d + d + d);
    console.log(d + d + d + d);
    console.log(str);
    console.log(d + d + d + d);
    console.log(d + d + d + d);
    console.log(d + d + d + d);
    console.log(d + d + d + d);
  },
  yup: {
    password: yup
      .string()
      .trim()
      .min(8, 'Your password must be at least 8 characters long.')
      .max(50, 'Your password can be atmost 50 characters long.')
      .required('Please specify your password'),
  },
};

export default constants;
