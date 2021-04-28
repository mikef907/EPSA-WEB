import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { NextPage } from 'next';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import Layout from '../../components/Layout';
import Login from '../../components/Login';
import { useResetPasswordMutation } from '../../generated/graphql';

const ResetPassword: NextPage<{ token: string }> = ({ token }) => {
  interface IFormInput {
    password: string;
    confirmPassword: string;
  }

  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm<IFormInput>();

  const [resetPassword, { loading, error, data }] = useResetPasswordMutation();

  const onSubmit = async (data: IFormInput) => {
    await resetPassword({
      variables: {
        input: {
          nonce: token,
          password: data.password,
        },
      },
    });
  };

  return (
    <Layout>
      <Typography
        variant="h4"
        component="h1"
        style={{ textAlign: 'center' }}
        gutterBottom
      >
        Reset Password
      </Typography>
      {data?.resetPassword && (
        <Login
          message={
            <Typography color="textPrimary">Password reset success"</Typography>
          }
        ></Login>
      )}
      {!data?.resetPassword && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            alignContent="center"
            justify="center"
            direction="row"
            spacing={2}
          >
            <Grid item md={4}>
              <Grid spacing={1} container direction="row">
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Controller
                      name="password"
                      defaultValue=""
                      control={control}
                      rules={{
                        required: 'Password is required',
                        minLength: {
                          value: 10,
                          message:
                            'Password must be at least 10 chars long because security',
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Password"
                          type="password"
                          inputProps={{ maxLength: 75 }}
                          error={!!errors.password}
                          helperText={errors.password?.message}
                        ></TextField>
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Controller
                      name="confirmPassword"
                      defaultValue=""
                      control={control}
                      rules={{
                        required: 'Confirm password is required',
                        validate: (value) =>
                          value === getValues('password') ||
                          'Passwords do not match',
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Confirm Password"
                          type="password"
                          inputProps={{ maxLength: 75 }}
                          error={!!errors.confirmPassword}
                          helperText={errors.confirmPassword?.message}
                        ></TextField>
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    style={{ alignSelf: 'flex-end' }}
                    disabled={loading}
                    variant="contained"
                  >
                    Reset Password
                  </Button>
                  {loading && (
                    <CircularProgress
                      size={24}
                      style={{
                        position: 'relative',
                        left: '-50px',
                        top: '8px',
                      }}
                    />
                  )}
                </Grid>
                <Grid item md={4}>
                  {error &&
                    error.graphQLErrors.map(({ message }, i) => (
                      <Typography component="p" color="error">
                        {message} 🙁
                      </Typography>
                    ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      )}
    </Layout>
  );
};

ResetPassword.getInitialProps = ({ query }) => {
  return { token: query.token as string };
};

export default ResetPassword;
