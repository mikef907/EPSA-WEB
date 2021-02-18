import {
  FormControl,
  Grid,
  Input,
  InputLabel,
  Typography,
  Button,
  Link,
  CircularProgress,
} from '@material-ui/core';
import Layout from '../components/Layout';
import { gql, useLazyQuery } from '@apollo/client';
import React, { useState } from 'react';

const LOGIN = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export default function Login() {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const [login, { loading, error, data }]: any = useLazyQuery(LOGIN);

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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login({
            variables: {
              email: formState.email,
              password: formState.password,
            },
          });
        }}
      >
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
                  <InputLabel htmlFor="email" required={true}>
                    Email Address
                  </InputLabel>
                  <Input
                    id="email"
                    type="email"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                  ></Input>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="password" required={true}>
                    Password
                  </InputLabel>
                  <Input
                    id="password"
                    type="password"
                    value={formState.password}
                    onChange={(e) =>
                      setFormState({ ...formState, password: e.target.value })
                    }
                  ></Input>
                </FormControl>
              </Grid>
              <Grid item md={4}>
                <Button
                  type="submit"
                  style={{ alignSelf: 'flex-end' }}
                  disabled={loading}
                  variant="contained"
                >
                  Login
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    style={{ position: 'relative', left: '-50px', top: '8px' }}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid spacing={4} container>
              <Grid item>
                <Link>Forgot Password?</Link>
              </Grid>
              <Grid item>
                <Link href="sign-up">Sign Up</Link>
              </Grid>
            </Grid>
            {error && (
              <Grid>
                <p style={{ color: 'red' }}>{error.message} 🙁</p>
              </Grid>
            )}
          </Grid>
        </Grid>
      </form>
      {data?.login && localStorage.setItem('token', data.login)}
    </Layout>
  );
}
