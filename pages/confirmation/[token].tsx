import {
  Button,
  CircularProgress,
  Grid,
  Link,
  Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { NextPage } from 'next';
import React, { useContext, useEffect } from 'react';
import Layout from '../../components/Layout';
import Protect from '../../components/Protect';
import { UserContext } from '../../context/UserContext';
import {
  useConfirmationMutation,
  useResendConfirmationLazyQuery,
} from '../../generated/graphql';

const ConfirmationPage: NextPage<{ token: string }> = ({ token }) => {
  const { user } = useContext(UserContext);
  const [confirmation, { data, loading, error }] = useConfirmationMutation();
  const [
    resend,
    { data: resendResult, loading: resendLoading, error: resendError },
  ] = useResendConfirmationLazyQuery();

  useEffect(() => {
    if (token && user && !user.confirmed)
      confirmation({ variables: { token } });
  }, [user]);

  const isLoading = () => loading || resendLoading;

  return (
    <Layout>
      <Typography variant="h4" component="h1" style={{ textAlign: 'center' }}>
        Account Confirmation
      </Typography>
      <Protect roles={['User']}>
        <Grid container justify="center">
          <Grid item>
            {isLoading() && (
              <Alert variant="outlined" severity="info">
                Processing Request...
                <CircularProgress size={14}></CircularProgress>
              </Alert>
            )}
            {user?.confirmed && (
              <Alert variant="outlined" severity="info">
                Account already confirmed
              </Alert>
            )}
            {data && (
              <Alert variant="outlined">Account confirmation complete!</Alert>
            )}
            {resendResult && resendResult.resendConfirmation && (
              <Alert variant="outlined">
                Confirmation email resent, please check your email (including
                your spam folder)!
              </Alert>
            )}
            {!isLoading() &&
              !resendResult &&
              !resendError &&
              error &&
              error.graphQLErrors.map(({ message }) => (
                <Alert variant="outlined" severity="error">
                  {message}{' '}
                  <Link component="button" onClick={() => resend()}>
                    resend confirmation
                  </Link>
                </Alert>
              ))}
            {!isLoading() &&
              resendError &&
              resendError.graphQLErrors.map(({ message }) => (
                <Alert variant="outlined" severity="error">
                  {message}
                </Alert>
              ))}
          </Grid>
        </Grid>
      </Protect>
    </Layout>
  );
};

ConfirmationPage.getInitialProps = ({ query }) => {
  return { token: query.token as string };
};

export default ConfirmationPage;
