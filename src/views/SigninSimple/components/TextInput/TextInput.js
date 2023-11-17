import { Grid, TextField } from '@mui/material';
import React from 'react';
import helpers from 'views/Account/General/comp/helperFunction';

function TextInput({ title, formik, sm = 6 }) {
  let camelCase = helpers.toCamelCase(title);

  return (
    <Grid item xs={12} sm={sm}>
      <TextField
        type={title === 'Password' ? 'password' : 'text'}
        label={`${title} *`}
        variant="outlined"
        fullWidth
        sx={{
          '& .MuiInputBase-input.Mui-disabled': {
            WebkitTextFillColor: '#000000',
          },
        }}
        name={camelCase}
        value={formik.values[camelCase]}
        onChange={formik.handleChange}
        error={formik.touched[camelCase] && Boolean(formik.errors[camelCase])}
        helperText={formik.touched[camelCase] && formik.errors[camelCase]}
      />
    </Grid>
  );
}

export default TextInput;
