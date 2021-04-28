import {
  Grid,
  FormControl,
  TextField,
  Button,
  CircularProgress,
  Link,
  useTheme,
  Typography,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { UserContext, parseUserFromToken } from '../context/UserContext';
import { useLoginMutation } from '../generated/graphql';

interface IFormInput {
  email: string;
  password: string;
}

interface IProps {
  message?: JSX.Element;
  redirect?: string | false;
}

const Login: React.FC<IProps> = ({ message, redirect }) => {
  const theme = useTheme();

  const router = useRouter();

  const userContext = React.useContext(UserContext);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInput>();

  const [login, { loading, error }] = useLoginMutation();

  const onSubmit = async (data: IFormInput) => {
    const result = await login({
      variables: {
        email: data.email,
        password: data.password,
      },
    });
    if (result.data) {
      userContext.setUser(parseUserFromToken(result.data.login));

      if (redirect === undefined) router.push('/');
      else if (redirect) router.push(redirect);
    }
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
                <Controller
                  name="email"
                  defaultValue=""
                  control={control}
                  rules={{ required: 'Email is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="email"
                      label="Email"
                      inputProps={{ maxLength: 75 }}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    ></TextField>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Controller
                  name="password"
                  defaultValue=""
                  control={control}
                  rules={{ required: 'Password is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="password"
                      label="Password"
                      inputProps={{ maxLength: 75 }}
                      error={!!errors.password}
                      helperText={errors.password?.message}
                    ></TextField>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item md={4}>
              <Button
                type="submit"
                style={{
                  alignSelf: 'flex-end',
                }}
                disabled={loading}
                variant="contained"
                color="primary"
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
                <Typography color="error" component="p">
                  {message} 🙁
                </Typography>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default Login;
