import DecorBgImg from 'public/images/decor_bg.png';
import DecorCenterImg from 'public/images/decor_center.png';
import DecorLeftImg from 'public/images/decor_left.png';
import DecorRightImg from 'public/images/decor_right.png';
import DecorTopImg from 'public/images/decor_top.png';
//
import { Box, Button, Container, Grid, TextField, Theme, Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import React, { SyntheticEvent, useState } from 'react';
import { toast } from 'react-toastify';

const RegisterForm = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [nameHT, setNameHT] = useState<string | undefined>();
  const [emailHT, setEmailHT] = useState<string | undefined>();
  const [messageHT, setMessageHT] = useState<string | undefined>();
  const [submitting, setSubmitting] = useState<boolean>(false);

  const inputChangeHandler =
    (set: React.Dispatch<React.SetStateAction<string>>, validate: (val: string) => boolean) =>
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      set(ev.target.value);
      validate(ev.target.value);
    };

  const validateName = (val: string) => {
    if (!val) {
      setNameHT('This field is required');
      return false;
    }
    setNameHT(undefined);
    return true;
  };

  const validateEmail = (val: string) => {
    const EMAIL_REGEX =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!val) {
      setEmailHT('This field is required');
      return false;
    } else if (!EMAIL_REGEX.test(val)) {
      setEmailHT('Email is invalid');
      return false;
    }

    setEmailHT(undefined);
    return true;
  };

  const validateMessage = (val: string) => {
    if (!val) {
      setMessageHT('This field is required');
      return false;
    }
    setMessageHT(undefined);
    return true;
  };

  const isValidForm = () => {
    return validateName(name) && validateEmail(email) && validateMessage(message);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setMessage('');
    setNameHT(undefined);
    setEmailHT(undefined);
    setMessageHT(undefined);
  };

  const handleSubmit = async (ev: SyntheticEvent) => {
    ev.preventDefault();
    if (!isValidForm()) {
      return false;
    }
    setSubmitting(true);
    await fetch('https://scoringapi.trava.finance/landing-page/contacts', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        name,
        message,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          toast.success('Submit successfully!');
          resetForm();
        } else {
          toast.error('Something was wrong!');
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(String(error));
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', mb: nameHT ? 1 : 4 }}>
        <Box sx={{ display: 'flex', mb: 0.5 }}>
          <Typography component="label" color="#646A71" htmlFor="name" id="l1">
            Your name
          </Typography>
          &nbsp;
          <Typography component="span" id="d1" color="error">
            *
          </Typography>
        </Box>
        <TextField
          id="name"
          name="name"
          variant="outlined"
          size="small"
          fullWidth
          autoComplete="off"
          inputProps={{
            'aria-labelledby': 'l1',
            'aria-describedby': 'd1',
          }}
          value={name}
          onChange={inputChangeHandler(setName, validateName)}
          helperText={nameHT}
          error={nameHT !== undefined}
        />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', mb: emailHT ? 1 : 4 }}>
        <Box sx={{ display: 'flex', mb: 0.5 }}>
          <Typography component="label" color="#646A71" htmlFor="email" id="l2">
            Your email
          </Typography>
          &nbsp;
          <Typography component="span" id="d2" color="error">
            *
          </Typography>
        </Box>
        <TextField
          id="email"
          name="email"
          type="email"
          variant="outlined"
          size="small"
          fullWidth
          autoComplete="off"
          inputProps={{
            'aria-labelledby': 'l2',
            'aria-describedby': 'd2',
          }}
          value={email}
          onChange={inputChangeHandler(setEmail, validateEmail)}
          helperText={emailHT}
          error={emailHT !== undefined}
        />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', mb: messageHT ? 1 : 4 }}>
        <Box sx={{ display: 'flex', mb: 0.5 }}>
          <Typography component="label" color="#646A71" htmlFor="email" id="l3">
            Your message
          </Typography>
          &nbsp;
          <Typography component="span" id="d3" color="error">
            *
          </Typography>
        </Box>
        <TextField
          id="message"
          name="message"
          variant="outlined"
          size="small"
          autoComplete="off"
          fullWidth
          multiline
          rows={4}
          inputProps={{
            'aria-labelledby': 'l3',
            'aria-describedby': 'd3',
          }}
          value={message}
          onChange={inputChangeHandler(setMessage, validateMessage)}
          helperText={messageHT}
          error={messageHT !== undefined}
        />
      </Box>
      <Box sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          sx={{ width: 160 }}
          disabled={submitting}
        >
          {submitting ? 'Sending' : 'Send'}
        </Button>
      </Box>
    </form>
  );
};

export default function Register() {
  const xsmDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('xsm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        py: 10,
        background: {
          xs: 'linear-gradient(180deg, #FFFFFF, #EDF9FF 50%)',
          md: 'linear-gradient(180deg, #FFFFFF, #EDF9FF 60%)',
        },
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: { xs: '100%', md: '50%' },
            height: { xs: 500, md: '120%' },
            backgroundImage: `url(${DecorBgImg.src})`,
            backgroundPosition: 'center center',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <Grid container spacing={mdDown ? 8 : 4}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              position: 'relative',
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Box
                sx={{
                  mb: 6,
                  position: 'relative',
                }}
              >
                <Box maxWidth={550}>
                  <Typography
                    variant="h1"
                    component="h2"
                    className="roboto-mono"
                    color="text.secondary"
                    fontWeight={300}
                  >
                    Looking for blockchain data services?
                  </Typography>
                </Box>
                <Box
                  sx={{
                    position: 'absolute',
                    left: { xs: '65%', xsm: 350 },
                    bottom: { xs: -40, sm: -30 },
                    width: { xs: 50, xsm: 60, md: 78 },
                    height: 95,
                  }}
                >
                  <Image src={DecorTopImg} alt="services" layout="fill" objectFit="contain" />
                </Box>
              </Box>
              <Box maxWidth={460}>
                <Typography variant="body2" fontWeight={300}>
                  We are always open and we welcome and questions you have for our team. If you wish to get in touch,
                  please fill out the form below. Someone from our team will get back to you shortly.
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <RegisterForm />
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="lg" sx={{ position: 'relative', height: { xs: 200, md: 150 }, zIndex: 1 }}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            transform: { xs: 'translate(-50%, 20%)', sm: 'translate(-50%, 0%)', lg: 'translate(-80%, -30%)' },
            width: { xs: 200, lg: 300 },
          }}
        >
          <Image src={DecorLeftImg} alt="left" objectFit="contain" />
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: { xs: '100%', sm: '50%' },
            transform: { xs: 'translate(-70%, 20%)', sm: 'translate(-50%, -20%)' },
            width: 177,
          }}
        >
          <Image src={DecorCenterImg} alt="center" objectFit="contain" />
        </Box>
        {!xsmDown && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              transform: { xsm: 'translate(50%, -120%)', md: 'translate(100%, -70%)' },
              width: 177,
            }}
          >
            <Image src={DecorRightImg} alt="center" objectFit="contain" />
          </Box>
        )}
      </Container>
    </Box>
  );
}
