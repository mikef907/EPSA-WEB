import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  Link,
  TextField,
  Typography,
} from '@material-ui/core';
import React from 'react';
import Layout from '../components/Layout';
import { Controller, useForm } from 'react-hook-form';
import { parseUserFromToken, UserContext } from '../context/UserContext';
import router from 'next/router';
import { useAddUserMutation } from '../generated/graphql';
import { NextPage } from 'next';

interface IFormInput {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const CreateUser: NextPage = () => {
  const { user, setUser } = React.useContext(UserContext);

  const [addUser, { loading, error }] = useAddUserMutation();

  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit = async (input: IFormInput) => {
    const result = await addUser({
      variables: {
        newUser: {
          first_name: input.firstname,
          last_name: input.lastname,
          email: input.email,
          password: input.password,
        },
      },
    });
    if (result.data?.addUser) {
      setUser(parseUserFromToken(result.data?.addUser));
      router.push('/');
    }
  };

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
      {!user && (
        <form onSubmit={handleSubmit(onSubmit)}>
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
                    <Controller
                      name="firstname"
                      defaultValue=""
                      control={control}
                      rules={{ required: 'First name is required' }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="First Name"
                          inputProps={{ maxLength: 50 }}
                          error={!!errors.firstname}
                          helperText={errors.firstname?.message}
                        ></TextField>
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Controller
                      name="lastname"
                      defaultValue=""
                      control={control}
                      rules={{ required: 'Last name is required' }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Last Name"
                          inputProps={{ maxLength: 50 }}
                          error={!!errors.lastname}
                          helperText={errors.lastname?.message}
                        ></TextField>
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Controller
                      name="email"
                      defaultValue=""
                      control={control}
                      rules={{ required: 'Email is required' }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Email"
                          type="email"
                          inputProps={{ maxLength: 75 }}
                          error={!!errors.email}
                          helperText={errors.email?.message}
                        ></TextField>
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Controller
                      name="password"
                      defaultValue=""
                      control={control}
                      rules={`{
                        required: 'Password is required',
                        minLength: {
                          value: 10,
                          message:
                            'Password must be at least 10 chars long because security',
                        },
                      }`}
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
                <Grid item md={4}>
                  <Button
                    type="submit"
                    style={{ alignSelf: 'flex-end' }}
                    disabled={loading}
                    variant="contained"
                    color="primary"
                  >
                    Sign Up
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
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid spacing={4} container>
                <Grid item>
                  <Link href="login">Already a member?</Link>
                </Grid>
              </Grid>
              <Grid>
                {error &&
                  error.graphQLErrors.map(({ message }) => (
                    <Typography color="error" component="p">
                      {message} 🙁
                    </Typography>
                  ))}
              </Grid>
            </Grid>
          </Grid>
        </form>
      )}
    </Layout>
  );
};

export default CreateUser;
