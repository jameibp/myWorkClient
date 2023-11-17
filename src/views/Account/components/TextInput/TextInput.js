import { Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import helpers from '../../General/comp/helperFunction';

function TextInput({ title, formik, sm = 6, basicDetails }) {
  let camelCase = helpers.toCamelCase(title);
  let submittedValue = basicDetails[camelCase];
  let value = submittedValue ? submittedValue : formik.values[camelCase] || '';
  let disabled = !basicDetails.firstName ? false : true;

  return (
    <Grid item xs={12} sm={sm}>
      <Typography
        variant={'subtitle2'}
        sx={{ marginBottom: 2 }}
        fontWeight={700}
      >
        {title}
      </Typography>
      <TextField
        label={`${title} *`}
        variant="outlined"
        name={camelCase}
        fullWidth
        sx={{
          '& .MuiInputBase-input.Mui-disabled': {
            WebkitTextFillColor: '#000000',
          },
        }}
        disabled={disabled}
        value={value}
        onChange={formik.handleChange}
        error={formik.touched[camelCase] && Boolean(formik.errors[camelCase])}
        helperText={formik.touched[camelCase] && formik.errors[camelCase]}
      />
    </Grid>
  );
}

export default TextInput;
