import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import folder from './folder.png';
import upload from './upload.png';
import useApp from 'hooks/useApp';
import constants from 'app-constants';
import ButtonComponent from 'components/Button';

function UploadDocument({
  title,
  state,
  setState,
  constantString,
  handleUpload,
  getPutObjectSignedUrl,
  documentsUploaded,
  divider = true,
}) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const [imgUrl, setImgUrl] = useState('');
  const token = window.localStorage.getItem('accessToken');
  const { apiUrl } = useApp();
  const a = async () => {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'access-token': `${token}`,
      },
      body: JSON.stringify({
        documentName: constantString,
      }),
    };
    const resp = await fetch(`${apiUrl}/documents`, options);
    const data = await resp.json();
    constants.pp(data);
    setImgUrl(data);
  };
  useEffect(() => {
    if (documentsUploaded) {
      a();
    }
  }, []);

  if (documentsUploaded) {
    return (
      <Fragment>
        {divider && (
          <Box paddingY={4}>
            <Divider />
          </Box>
        )}
        <Typography pb={1} variant="subtitle2" gutterBottom fontWeight={700}>
          {title}
        </Typography>
        <Button
          size={'large'}
          variant="contained"
          color="primary"
          fullWidth
          component="a"
          target="blank"
          href={imgUrl.url}
        >
          View {title}
        </Button>
      </Fragment>
    );
  }
  return (
    <Fragment>
      {divider && (
        <Box paddingY={4}>
          <Divider />
        </Box>
      )}

      <Typography pb={1} variant="subtitle2" gutterBottom fontWeight={700}>
        {title}
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Box
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'space-between'}
          >
            <ButtonComponent
              loading={loading}
              done={done}
              component="label"
              variant="contained"
              sx={{
                width: '50%',
              }}
              startIcon={
                <Box
                  component="img"
                  sx={{
                    height: 233,
                    width: 350,
                    maxHeight: { xs: 20, md: 20 },
                    maxWidth: { xs: 20, md: 20 },
                  }}
                  alt={`Select ${title}`}
                  src={folder}
                />
              }
              fullWidth
            >
              {`Select`}
              <input
                style={{
                  clip: 'rect(0 0 0 0)',
                  clipPath: 'inset(50%)',
                  height: 1,
                  overflow: 'hidden',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  whiteSpace: 'nowrap',
                  width: 1,
                }}
                onChange={(e) => {
                  handleUpload(e, state, setState);
                }}
                type="file"
              />
            </ButtonComponent>
            <ButtonComponent
              loading={loading}
              done={done}
              component="label"
              variant="contained"
              disabled={state.name ? false : true}
              sx={{
                width: '40%',
              }}
              startIcon={
                <Box
                  component="img"
                  sx={{
                    height: 233,
                    width: 350,
                    maxHeight: { xs: 20, md: 20 },
                    maxWidth: { xs: 20, md: 20 },
                  }}
                  alt={`Upload ${title}`}
                  src={upload}
                />
              }
              onClick={async () => {
                await getPutObjectSignedUrl(
                  constantString,
                  state,
                  setLoading,
                  setDone,
                );
                await a();
              }}
            >
              Upload
            </ButtonComponent>
          </Box>
        </Grid>
        <Grid
          item
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          xs={12}
          sm={6}
        >
          <Typography
            variant={'subtitle2'}
            sx={{ marginBottom: 2 }}
            fontWeight={700}
          >
            {state.name}
          </Typography>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default UploadDocument;
