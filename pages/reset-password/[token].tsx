import { Button, CircularProgress, Grid, Typography } from '@material-ui/core';
import { NextPage } from 'next';
import React from 'react';
import { useForm } from 'react-hook-form';
import InputFormControl from '../../components/InputFormControl';
import Layout from '../../components/Layout';
import Login from '../../components/Login';
import { useResetPasswordMutation } from '../../generated/graphql';
import Alert from '@material-ui/lab/Alert';

const ResetPassword: NextPage<{ token: string }> = ({ token }) => {
  interface IFormInput {
    password: string;
    confirmPassword: string;
  }

  const { handleSubmit, getValues, control } = useForm<IFormInput>();

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
          message={<Alert variant="outlined">Password reset success</Alert>}
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
                  <InputFormControl
                    name="password"
                    label="Password"
                    type="password"
                    control={control}
                    rules={{
                      required: 'Password is required',
                      minLength: {
                        value: 10,
                        message:
                          'Password must be at least 10 chars long because security',
                      },
                    }}
                    inputProps={{ maxLength: 75 }}
                    inputLabelProps={null}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputFormControl
                    name="confirmPassword"
                    label="Password Confirm"
                    type="password"
                    control={control}
                    rules={{
                      required: 'Confirm password is required',
                      validate: (value: any) =>
                        value === getValues('password') ||
                        'Passwords do not match',
                    }}
                    inputProps={{ maxLength: 75 }}
                    inputLabelProps={null}
                  />
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
                      <Alert variant="outlined" severity="error">
                        {message}
                      </Alert>
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
