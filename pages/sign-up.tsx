import {
  Button,
  CircularProgress,
  Grid,
  Link,
  Typography,
} from '@material-ui/core';
import React from 'react';
import Layout from '../components/Layout';
import { useForm } from 'react-hook-form';
import { parseUserFromToken, UserContext } from '../context/UserContext';
import router from 'next/router';
import { useAddUserMutation } from '../generated/graphql';
import { NextPage } from 'next';
import InputFormControl from '../components/InputFormControl';

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

  const { handleSubmit, getValues, control } = useForm<IFormInput>();

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
                  <InputFormControl
                    name="firstname"
                    label="First Name"
                    control={control}
                    rules={{ required: 'First name is required' }}
                    inputProps={{ maxLength: 50 }}
                    inputLabelProps={null}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputFormControl
                    name="lastname"
                    label="Last Name"
                    control={control}
                    rules={{ required: 'Last name is required' }}
                    inputProps={{ maxLength: 50 }}
                    inputLabelProps={null}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputFormControl
                    name="email"
                    label="Email"
                    type="email"
                    control={control}
                    rules={{ required: 'Email is required' }}
                    inputProps={{ maxLength: 75 }}
                    inputLabelProps={null}
                  />
                </Grid>
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
