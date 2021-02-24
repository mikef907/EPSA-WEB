import { gql, useLazyQuery } from '@apollo/client';
import {
  Grid,
  FormControl,
  TextField,
  Button,
  CircularProgress,
  Link,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext, parseUserFromToken } from '../context/UserContext';

const LOGIN = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

interface IFormInput {
  email: string;
  password: string;
}

interface IProps {
  message?: string;
}

const Login: React.FC<IProps> = ({ message }) => {
  const userContext = React.useContext(UserContext);

  const { register, handleSubmit, getValues, errors } = useForm<IFormInput>();

  const [login, { loading, error, data, client }] = useLazyQuery(LOGIN);

  const router = useRouter();

  useEffect(() => {
    console.log('data', data);
    if (typeof window !== 'undefined' && data?.login) {
      console.log('set user');
      localStorage.setItem('token', data.login);
      userContext.setUser(parseUserFromToken(data.login));
      router.push('/');
    }
  }, [data]);

  const onSubmit = (data: IFormInput) => {
    login({
      variables: {
        email: data.email,
        password: data.password,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        alignContent="center"
        justify="center"
        direction="column"
        spacing={2}
      >
        <Grid item xs={12}>
          <Grid item>
            {message && <p style={{ color: 'green' }}>{message}</p>}
          </Grid>
          <Grid spacing={1} container direction="row">
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  name="email"
                  type="email"
                  label="Email"
                  inputProps={{ maxLength: 75 }}
                  inputRef={register({ required: 'Email required' })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                ></TextField>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  name="password"
                  type="password"
                  label="Password"
                  inputProps={{ maxLength: 75 }}
                  inputRef={register({
                    required: 'Password required',
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
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
              <Link href="forgot-password">Forgot Password?</Link>
            </Grid>
            <Grid item>
              <Link href="sign-up">New member?</Link>
            </Grid>
          </Grid>
          <Grid>
            {error &&
              error.graphQLErrors.map(({ message }, i) => (
                <p style={{ color: 'red' }}>{message} 🙁</p>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default Login;
