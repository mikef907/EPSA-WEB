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
import React from 'react';
import Layout from '../components/Layout';
import { useForm } from 'react-hook-form';
import { parseUserFromToken, UserContext } from '../context/UserContext';
import router from 'next/router';

const ADD_USER = gql`
  mutation AddUser($data: UserInput!) {
    addUser(data: $data)
  }
`;

interface IFormInput {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const CreateUser: React.FC = () => {
  const { user, setUser } = React.useContext(UserContext);

  const [addUser, { loading, error }] = useMutation(ADD_USER, {
    onCompleted({ addUser }) {
      localStorage.setItem('token', addUser);
      setUser(parseUserFromToken(addUser));
      router.push('/');
    },
  });

  const { register, handleSubmit, getValues, errors } = useForm<IFormInput>();

  const onSubmit = (data: IFormInput) => {
    addUser({
      variables: {
        data: {
          first_name: data.firstname,
          last_name: data.lastname,
          email: data.email,
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
                    <TextField
                      name="firstname"
                      label="First Name"
                      inputProps={{ maxLength: 50 }}
                      inputRef={register({ required: 'First name required' })}
                      error={!!errors.firstname}
                      helperText={errors.firstname?.message}
                    ></TextField>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      label="Last Name"
                      name="lastname"
                      inputProps={{ maxLength: 50 }}
                      inputRef={register({ required: 'Last name required' })}
                      error={!!errors.lastname}
                      helperText={errors.lastname?.message}
                    ></TextField>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      label="Email"
                      name="email"
                      type="email"
                      inputProps={{ maxLength: 75 }}
                      inputRef={register({ required: 'Email required' })}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    ></TextField>
                  </FormControl>
                </Grid>
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
                  error.graphQLErrors.map(({ message }, i) => (
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
