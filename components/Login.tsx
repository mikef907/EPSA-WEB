import { Grid, Button, CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { UserContext, parseUserFromToken } from '../context/UserContext';
import { useLoginMutation } from '../generated/graphql';
import InputFormControl from './InputFormControl';
import Link from './Link';

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

  const { handleSubmit, control } = useForm<IFormInput>();

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

      if (router.query.r !== undefined) router.push(router.query.r as string);
      else if (redirect === undefined) router.push('/');
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
              <InputFormControl
                name="email"
                label="Email"
                control={control}
                rules={{ required: 'Email is required' }}
                inputProps={{ maxLength: 75 }}
                inputLabelProps={null}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputFormControl
                name="password"
                label="Password"
                type="password"
                control={control}
                rules={{ required: 'Password is required' }}
                inputProps={{ maxLength: 75 }}
                inputLabelProps={null}
              />
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
                <Alert variant="outlined" severity="error">
                  {message}
                </Alert>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default Login;
