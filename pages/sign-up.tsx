import { gql, useMutation } from '@apollo/client';
import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  Link,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import Layout from '../components/Layout';

interface UserInput {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

const ADD_USER = gql`
  mutation AddUser($data: UserInput!) {
    addUser(data: $data) {
      id
    }
  }
`;

export default function CreateUser() {
  const [formState, setFormState] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const [addUser, { loading, error, data }] = useMutation(ADD_USER);

  const [validationState, setValidationState] = useState({
    first_name: true,
    last_name: true,
    email: true,
    password: true,
    confirm_password: true,
  });

  const formValid = () =>
    Object.values(validationState).every((x) => x === true);

  return (
    <Layout>
      <Typography
        variant="h4"
        component="h1"
        style={{ textAlign: 'center' }}
        gutterBottom
      >
        Sign Up
      </Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (formValid()) {
            addUser({
              variables: {
                data: {
                  first_name: formState.first_name,
                  last_name: formState.last_name,
                  email: formState.email,
                  password: formState.password,
                },
              },
            });
          }
        }}
      >
        <Grid
          container
          alignContent="center"
          justify="center"
          direction="column"
          spacing={2}
        >
          <Grid item xs={12} md={4}>
            <Grid spacing={1} container direction="row">
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    id="first-name"
                    label="First Name"
                    value={formState.first_name}
                    required
                    onChange={(e) => {
                      setFormState({
                        ...formState,
                        first_name: e.target.value,
                      });
                      setValidationState({
                        ...validationState,
                        first_name: !!e.target.value,
                      });
                    }}
                    error={!validationState.first_name}
                    helperText={
                      !validationState.first_name
                        ? 'First Name Required.'
                        : null
                    }
                  ></TextField>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    label="Last Name"
                    id="last-name"
                    value={formState.last_name}
                    required
                    onChange={(e) => {
                      setFormState({ ...formState, last_name: e.target.value });
                      setValidationState({
                        ...validationState,
                        last_name: !!e.target.value,
                      });
                    }}
                    error={!validationState.last_name}
                    helperText={
                      !validationState.last_name ? 'Last Name Required.' : null
                    }
                  ></TextField>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    id="email"
                    label="Email"
                    type="email"
                    value={formState.email}
                    required
                    onChange={(e) => {
                      setFormState({ ...formState, email: e.target.value });
                      setValidationState({
                        ...validationState,
                        email: !!e.target.value,
                      });
                    }}
                    error={!validationState.email}
                    helperText={
                      !validationState.email ? 'Email Required.' : null
                    }
                  ></TextField>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    id="password"
                    label="Password"
                    type="password"
                    value={formState.password}
                    required
                    onChange={(e) => {
                      setFormState({ ...formState, password: e.target.value });
                      setValidationState({
                        ...validationState,
                        password: !!e.target.value,
                        confirm_password:
                          e.target.value === formState.confirm_password,
                      });
                    }}
                    error={!validationState.password}
                    helperText={
                      !validationState.password ? 'Password Required.' : null
                    }
                  ></TextField>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    id="confirm-password"
                    label="Confirm Password"
                    type="password"
                    value={formState.confirm_password}
                    required
                    onChange={(e) => {
                      setFormState({
                        ...formState,
                        confirm_password: e.target.value,
                      });
                      setValidationState({
                        ...validationState,
                        confirm_password: e.target.value === formState.password,
                      });
                    }}
                    error={!validationState.confirm_password}
                    helperText={
                      !validationState.confirm_password
                        ? 'Must Match Password.'
                        : null
                    }
                  ></TextField>
                </FormControl>
              </Grid>
              <Grid item md={4}>
                <Button
                  type="submit"
                  style={{ alignSelf: 'flex-end' }}
                  disabled={loading}
                  variant="contained"
                >
                  Sign Up
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
          <Grid item xs={12} md={4}>
            <Grid spacing={4} container>
              <Grid item>
                <Link>Forgot Password?</Link>
              </Grid>
              <Grid item>
                <Link href="login">Login</Link>
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
    </Layout>
  );
}
