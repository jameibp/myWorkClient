import React from 'react';
import Page from '../components/Page';
import Main from 'layouts/Main';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import useApp from 'hooks/useApp';
import constants from 'app-constants';
import UploadDocument from './comp/UploadDocument';
import { Fragment } from 'react';
import ModalComp from 'components/ModalComponent';

const DocumentsUpload = ({ apiUrl, usc, visaType }) => {
  const { documentsUploadedObject, setDocumentsUploadedObject } = useApp();
  const [openModal, setOpenModal] = React.useState(false);
  const [modalHeading, setModalHeading] = useState('');
  const [modalText, setModalText] = useState('');

  const token = window.localStorage.getItem('accessToken');
  const [resume, setResume] = useState({});
  const [dl, setDl] = useState({});
  const [visaCopy, setVisaCopy] = useState({});
  const [i20, setI20] = useState({});
  const [optCard, setOptCard] = useState({});
  const [passport, setPassport] = useState({});
  const [gcCopy, setGcCopy] = useState({});
  const [i797, setI797] = useState({});
  const [eadCopy, setEadCopy] = useState({});

  /* eslint-disable no-unused-vars */

  /* eslint-enable no-unused-vars */

  function handleUpload(event, file, setFunc) {
    event.preventDefault();
    if (file == event.target.files[0]) return;
    if (event.target.files[0].name) {
      setFunc(event.target.files[0]);
    }
  }

  const getPutObjectSignedUrl = async (
    documentName,
    file,
    setLoading,
    setDone,
  ) => {
    setLoading(true);
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'access-token': `${token}`,
      },
      body: JSON.stringify({
        fileName: file.name,
        fileType: file.type,
        documentName,
      }),
    };
    const resp = await fetch(`${apiUrl}/documents/getS3UploadUrl`, options);
    const data = await resp.json();
    const result = await fetch(data.url, {
      method: 'PUT',
      body: file,
    });
    if (result.status === 200) {
      const postDocumentResponse = await fetch(`${apiUrl}/documents/post`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'access-token': `${token}`,
        },
        body: JSON.stringify({
          documentName,
        }),
      });
      if (postDocumentResponse.ok) {
        setModalHeading('Done');
        setModalText('Document has been uploaded successfully!!');
        setOpenModal(true);
        setDocumentsUploadedObject((prev) => {
          let newPrev = { ...prev };
          newPrev[documentName] = true;
          return newPrev;
        });
        setDone(true);
        setLoading(false);
      } else {
        setModalHeading('Oops!');
        setModalText('Something Went Wrong!!');
        setOpenModal(true);
      }
    }
  };

  return (
    <Main>
      <ModalComp
        open={openModal}
        setOpen={setOpenModal}
        modalHeading={modalHeading}
        modalText={modalText}
      />
      <Page>
        <Typography pb={1} variant="h6" gutterBottom fontWeight={700}>
          Documents
        </Typography>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <UploadDocument
            title="Updated Resume"
            state={resume}
            setState={setResume}
            constantString={constants.DOCUMENT_LIST.Resume}
            handleUpload={handleUpload}
            getPutObjectSignedUrl={getPutObjectSignedUrl}
            documentsUploaded={
              documentsUploadedObject[constants.DOCUMENT_LIST.Resume]
                ? true
                : false
            }
            divider={false}
          />

          <UploadDocument
            title="DL Copy / State ID"
            state={dl}
            setState={setDl}
            constantString={constants.DOCUMENT_LIST.DlStateId}
            handleUpload={handleUpload}
            getPutObjectSignedUrl={getPutObjectSignedUrl}
            documentsUploaded={
              documentsUploadedObject[constants.DOCUMENT_LIST.DlStateId]
                ? true
                : false
            }
          />

          {!(usc || visaType == 'TN') && (
            <Fragment>
              {visaType === 'CPT Part Time' && (
                <Fragment>
                  <UploadDocument
                    title="Visa Copy"
                    state={visaCopy}
                    setState={setVisaCopy}
                    constantString={constants.DOCUMENT_LIST.VisaCopy}
                    handleUpload={handleUpload}
                    getPutObjectSignedUrl={getPutObjectSignedUrl}
                    documentsUploaded={
                      documentsUploadedObject[constants.DOCUMENT_LIST.VisaCopy]
                        ? true
                        : false
                    }
                  />

                  <UploadDocument
                    title="Passport Copy"
                    state={passport}
                    setState={setPassport}
                    constantString={constants.DOCUMENT_LIST.Passport}
                    handleUpload={handleUpload}
                    getPutObjectSignedUrl={getPutObjectSignedUrl}
                    documentsUploaded={
                      documentsUploadedObject[constants.DOCUMENT_LIST.Passport]
                        ? true
                        : false
                    }
                  />

                  <UploadDocument
                    title="I20"
                    state={i20}
                    setState={setI20}
                    constantString={constants.DOCUMENT_LIST.I20}
                    handleUpload={handleUpload}
                    getPutObjectSignedUrl={getPutObjectSignedUrl}
                    documentsUploaded={
                      documentsUploadedObject[constants.DOCUMENT_LIST.I20]
                        ? true
                        : false
                    }
                  />
                </Fragment>
              )}

              {visaType === 'OPT Full Time' && (
                <Fragment>
                  <UploadDocument
                    title="Visa Copy"
                    state={visaCopy}
                    setState={setVisaCopy}
                    constantString={constants.DOCUMENT_LIST.VisaCopy}
                    handleUpload={handleUpload}
                    getPutObjectSignedUrl={getPutObjectSignedUrl}
                    documentsUploaded={
                      documentsUploadedObject[constants.DOCUMENT_LIST.VisaCopy]
                        ? true
                        : false
                    }
                  />

                  <UploadDocument
                    title="Passport Copy"
                    state={passport}
                    setState={setPassport}
                    constantString={constants.DOCUMENT_LIST.Passport}
                    handleUpload={handleUpload}
                    getPutObjectSignedUrl={getPutObjectSignedUrl}
                    documentsUploaded={
                      documentsUploadedObject[constants.DOCUMENT_LIST.Passport]
                        ? true
                        : false
                    }
                  />

                  <UploadDocument
                    title="I20"
                    state={i20}
                    setState={setI20}
                    constantString={constants.DOCUMENT_LIST.I20}
                    handleUpload={handleUpload}
                    getPutObjectSignedUrl={getPutObjectSignedUrl}
                    documentsUploaded={
                      documentsUploadedObject[constants.DOCUMENT_LIST.I20]
                        ? true
                        : false
                    }
                  />
                </Fragment>
              )}

              {visaType === 'OPT' && (
                <Fragment>
                  <UploadDocument
                    title="Visa Copy"
                    state={visaCopy}
                    setState={setVisaCopy}
                    constantString={constants.DOCUMENT_LIST.VisaCopy}
                    handleUpload={handleUpload}
                    getPutObjectSignedUrl={getPutObjectSignedUrl}
                    documentsUploaded={
                      documentsUploadedObject[constants.DOCUMENT_LIST.VisaCopy]
                        ? true
                        : false
                    }
                  />

                  <UploadDocument
                    title="OPT Card"
                    state={optCard}
                    setState={setOptCard}
                    constantString={constants.DOCUMENT_LIST.OptCard}
                    handleUpload={handleUpload}
                    getPutObjectSignedUrl={getPutObjectSignedUrl}
                    documentsUploaded={
                      documentsUploadedObject[constants.DOCUMENT_LIST.OptCard]
                        ? true
                        : false
                    }
                  />

                  <UploadDocument
                    title="I20"
                    state={i20}
                    setState={setI20}
                    constantString={constants.DOCUMENT_LIST.I20}
                    handleUpload={handleUpload}
                    getPutObjectSignedUrl={getPutObjectSignedUrl}
                    documentsUploaded={
                      documentsUploadedObject[constants.DOCUMENT_LIST.I20]
                        ? true
                        : false
                    }
                  />
                </Fragment>
              )}

              {visaType === 'OPT-STEM' && (
                <Fragment>
                  <UploadDocument
                    title="OPT Card"
                    state={optCard}
                    setState={setOptCard}
                    constantString={constants.DOCUMENT_LIST.OptCard}
                    handleUpload={handleUpload}
                    getPutObjectSignedUrl={getPutObjectSignedUrl}
                    documentsUploaded={
                      documentsUploadedObject[constants.DOCUMENT_LIST.OptCard]
                        ? true
                        : false
                    }
                  />

                  <UploadDocument
                    title="I20"
                    state={i20}
                    setState={setI20}
                    constantString={constants.DOCUMENT_LIST.I20}
                    handleUpload={handleUpload}
                    getPutObjectSignedUrl={getPutObjectSignedUrl}
                    documentsUploaded={
                      documentsUploadedObject[constants.DOCUMENT_LIST.I20]
                        ? true
                        : false
                    }
                  />
                </Fragment>
              )}

              {visaType === 'H-1B' && (
                <Fragment>
                  <UploadDocument
                    title="I797"
                    state={i797}
                    setState={setI797}
                    constantString={constants.DOCUMENT_LIST.I797Copy}
                    handleUpload={handleUpload}
                    documentsUploaded={
                      documentsUploadedObject[constants.DOCUMENT_LIST.I797Copy]
                        ? true
                        : false
                    }
                    getPutObjectSignedUrl={getPutObjectSignedUrl}
                  />
                </Fragment>
              )}

              {visaType === 'Green Card' && (
                <Fragment>
                  <UploadDocument
                    title="GC Copy"
                    state={gcCopy}
                    setState={setGcCopy}
                    constantString={constants.DOCUMENT_LIST.GcCopy}
                    handleUpload={handleUpload}
                    getPutObjectSignedUrl={getPutObjectSignedUrl}
                    documentsUploaded={
                      documentsUploadedObject[constants.DOCUMENT_LIST.GcCopy]
                        ? true
                        : false
                    }
                  />
                </Fragment>
              )}

              {visaType === 'HE-EAD' && (
                <Fragment>
                  <UploadDocument
                    title="EAD Copy"
                    state={eadCopy}
                    setState={setEadCopy}
                    constantString={constants.DOCUMENT_LIST.EadCopy}
                    handleUpload={handleUpload}
                    getPutObjectSignedUrl={getPutObjectSignedUrl}
                    documentsUploaded={
                      documentsUploadedObject[constants.DOCUMENT_LIST.EadCopy]
                        ? true
                        : false
                    }
                  />
                </Fragment>
              )}
            </Fragment>
          )}
        </form>
      </Page>
    </Main>
  );
};

const Documents = () => {
  const { apiUrl, visaInfo, basicDetails } = useApp();
  if (!basicDetails.firstName) {
    return (
      <Main>
        <Page>
          <Box>
            <Typography variant="h6" gutterBottom fontWeight={700}>
              Fill your basic details
            </Typography>
            <Typography variant={'subtitle2'} color={'text.secondary'}>
              To access your documents dashboard, please fill your basic details
              first!
            </Typography>
          </Box>
        </Page>
      </Main>
    );
  }

  if (
    basicDetails.firstName &&
    basicDetails.areYouAUsCitizen == 'no' &&
    !visaInfo.visaStatus
  ) {
    return (
      <Main>
        <Page>
          <Box>
            <Typography variant="h6" gutterBottom fontWeight={700}>
              Fill your Visa and Work Authorization details
            </Typography>
            <Typography variant={'subtitle2'} color={'text.secondary'}>
              To access your documents dashboard, please fill your visa details
              first!
            </Typography>
          </Box>
        </Page>
      </Main>
    );
  }

  return (
    <DocumentsUpload
      apiUrl={apiUrl}
      usc={basicDetails.areYouAUsCitizen == 'yes' ? true : false}
      visaType={visaInfo.visaStatus}
    />
  );
};

export default Documents;
