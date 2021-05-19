import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { NextPage } from 'next';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import ErrorDisplay from '../components/ErrorDisplay';
import Layout from '../components/Layout';
import { useForgotPasswordMutation } from '../generated/graphql';

interface IFormInput {
  email: string;
  password: string;
}

const ForgotPassword: NextPage = () => {
  const [forgotPassword, { loading, error, data }] =
    useForgotPasswordMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit = async (data: IFormInput) => {
    await forgotPassword({
      variables: {
        email: data.email,
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
        Forgot Password
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          alignContent="center"
          justify="center"
          direction="row"
          spacing={2}
        >
          <Grid item>
            <FormControl>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{ required: 'Email is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="email"
                    label="Email"
                    inputProps={{ maxLength: 75 }}
                    error={!!errors.email}
                    helperText="We will send you a link to reset your password"
                  ></TextField>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <Button
              type="submit"
              disabled={loading || !!data}
              variant="contained"
            >
              Submit
              {loading && <CircularProgress color="secondary" size={20} />}
            </Button>
          </Grid>
        </Grid>
        <Grid container justify="center" direction="row" spacing={2}>
          <Grid item>
            {data && data.forgotPassword && (
              <Alert variant="outlined">
                Check your email for further instructions (including your spam
                folder)!
              </Alert>
            )}
            <ErrorDisplay error={error}></ErrorDisplay>
          </Grid>
        </Grid>
      </form>
    </Layout>
  );
};

export default ForgotPassword;
