import { gql, useMutation } from '@apollo/client';
import {
  Grid,
  FormControl,
  TextField,
  Button,
  CircularProgress,
  Link,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { UserContext, parseUserFromToken } from '../context/UserContext';

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

interface IFormInput {
  email: string;
  password: string;
}

interface IProps {
  message?: JSX.Element;
  redirect?: string | false;
}

const Login: React.FC<IProps> = ({ message, redirect }) => {
  const router = useRouter();

  const userContext = React.useContext(UserContext);

  const { register, handleSubmit, errors } = useForm<IFormInput>();

  const [login, { loading, error }] = useMutation(LOGIN, {
    onCompleted({ login }) {
      localStorage.setItem('token', login);
      userContext.setUser(parseUserFromToken(login));

      if (redirect === undefined) router.push('/');
      else if (redirect) router.push(redirect);
    },
  });

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
          {message && <Grid item>{message}</Grid>}
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
              error.graphQLErrors.map(({ message }) => (
                <p style={{ color: 'red' }}>{message} 🙁</p>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default Login;
