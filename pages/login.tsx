import {
  Box,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Typography,
  Button,
  Link,
} from '@material-ui/core';
import { Container } from 'next/app';
import Layout from '../components/Layout';

export default function Login() {
  return (
    <Layout>
      <Typography
        variant="h4"
        component="h1"
        style={{ textAlign: 'center' }}
        gutterBottom
      >
        Login
      </Typography>
      <Grid
        container
        alignContent="center"
        justify="center"
        direction="column"
        spacing={2}
      >
        <Grid item xs={12}>
          <Grid spacing={1} container direction="row">
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input id="email" type="email"></Input>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input id="password" type="password"></Input>
              </FormControl>
            </Grid>
            <Grid item md={4}>
              <Button style={{ alignSelf: 'flex-end' }} variant="contained">
                Login
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid spacing={4} container>
            <Grid item>
              <Link>Forgot Password?</Link>
            </Grid>
            <Grid item>
              <Link>Create Account</Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}
