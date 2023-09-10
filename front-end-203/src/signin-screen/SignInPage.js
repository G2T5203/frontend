import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const defaultTheme = createTheme();

export default function SignInPage() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    if (email && password) {
      try {
        const response = await fetch('http://localhost:3001/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }), // Send email and password to the server
        });

        const responseData = await response.json();

        if (response.status === 200) {
          // Authentication successful, store the token and handle the user's session
          // You can store the token in a secure way (e.g., in a cookie or local storage) for future requests
          console.log('Okay');
          // Redirect to an authenticated page or perform other actions
        } else {
          // Authentication failed, display an error message to the user
          console.error(responseData.message);
          // console.error(responseData.message); would log "Invalid email or password in the browser
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://images.inc.com/uploaded_files/image/1920x1080/getty_543224919_124254.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{ backgroundColor: '#143965' }}>

          <Typography variant="h3" color="white" sx={{ fontFamily: 'Merriweather', fontSize: '100px', fontWeight: 500, marginTop: '60px' }}>
            WingIt.
          </Typography>
          <Box
            sx={{
              my: 4,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: '16px',
              height: '400px',
              padding: '2rem',
            }}
          >

            <Typography variant="h1" sx={{ fontFamily: 'Merriweather', fontSize: '1.5rem', fontWeight: 'bold', marginTop: 'auto', marginLeft: '0rem', marginRight: 'auto' }}>
              Sign in
            </Typography>

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              // sx={{ width: 'calc(100% - 100px)', marginBottom: '8px' }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              // sx={{ width: 'calc(100% - 100px)', marginBottom: '8px' }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                sx={{ marginBottom: '-1rem' }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, width: 'calc(100% - 150px)', fontSize: '14px', backgroundColor: '#F58A07' }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2" style={{ marginRight: '4rem' }}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}