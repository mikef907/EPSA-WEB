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
import { NextPage } from 'next';
import React from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../../components/Layout';

const RESET_PASSOWRD = gql`
  mutation ResetPassword($input: UserResetPassword!) {
    resetPassword(input: $input)
  }
`;

const ResetPassword: NextPage<{ token: string }> = ({ token }) => {
  interface IFormInput {
    password: string;
    confirmPassword: string;
  }

  const { register, handleSubmit, getValues, errors } = useForm<IFormInput>();

  const [resetPassword, { loading, error, data }] = useMutation(RESET_PASSOWRD);

  const onSubmit = (data: IFormInput) => {
    resetPassword({
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          alignContent="center"
          justify="center"
          direction="column"
          spacing={2}
        >
          <Grid item xs={12}>
            <Grid spacing={1} container direction="row">
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    label="Password"
                    name="password"
                    type="password"
                    inputProps={{ maxLength: 75 }}
                    inputRef={register({
                      required: 'Password required',
                    })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  ></TextField>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    inputProps={{ maxLength: 75 }}
                    inputRef={register({
                      required: 'Confirm password required',
                      validate: (value) =>
                        value === getValues('password') ||
                        'Passwords do not match',
                    })}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
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
                  Reset Password
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
        </Grid>
      </form>
    </Layout>
  );
};

ResetPassword.getInitialProps = ({ query }) => {
  return { token: query.token as string };
};

export default ResetPassword;
