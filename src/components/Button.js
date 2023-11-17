const { Button, CircularProgress, Avatar } = require('@mui/material');
// import imgSrc from '/correct.png';
import imgSrc from 'svg/correct.png';

const ButtonComponent = (props) => {
  const { loading, done, ...other } = props;

  if (done) {
    return (
      <Button
        startIcon={
          <Avatar
            sx={{
              width: '25px',
              height: '25px',
            }}
            src={imgSrc}
          />
        }
        color="primary"
        {...other}
        disabled
      >
        Done
      </Button>
    );
  } else if (loading) {
    return (
      <Button disabled {...other}>
        <CircularProgress size={'25px'} color="inherit" />
      </Button>
    );
  } else {
    return <Button {...other} />;
  }
};

export default ButtonComponent;
