import { gql, useLazyQuery, useMutation } from '@apollo/client';
import {
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';

const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

const ForgotPassword: React.FC = () => {
  interface IFormInput {
    email: string;
    password: string;
  }

  const [forgotPassword, { loading, error, data }] = useMutation(
    FORGOT_PASSWORD
  );

  const { register, handleSubmit, getValues, errors } = useForm<IFormInput>();

  const onSubmit = (data: IFormInput) => {
    forgotPassword({
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
              <TextField
                name="email"
                type="email"
                label="Email"
                inputProps={{ maxLength: 75 }}
                inputRef={register({ required: 'Email required' })}
                error={!!errors.email}
                helperText="We will send you a link to reset your password"
              ></TextField>
            </FormControl>
          </Grid>
          <Grid item>
            <Button
              type="submit"
              disabled={loading || !!data}
              variant="contained"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
        <Grid container justify="center" direction="row" spacing={2}>
          <Grid item>
            {data && data.forgotPassword && (
              <Typography color="textPrimary">
                Check your email for further instructions! 👍
              </Typography>
            )}
            {error &&
              error.graphQLErrors.map(({ message }, i) => (
                <Typography color="error" component="p">
                  {message} 🙁
                </Typography>
              ))}
          </Grid>
        </Grid>
      </form>
    </Layout>
  );
};

export default ForgotPassword;
