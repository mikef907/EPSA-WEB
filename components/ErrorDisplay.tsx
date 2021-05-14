import { ApolloError } from '@apollo/client';
import { Alert } from '@material-ui/lab';
import React from 'react';

interface IProps {
  error?: ApolloError | undefined;
}

const ErrorDisplay: React.FC<IProps> = ({ error }) => {
  return (
    <>
      {error &&
        error.graphQLErrors.map(({ message }) => (
          <Alert variant="outlined" severity="error">
            {message}
          </Alert>
        ))}
    </>
  );
};

export default ErrorDisplay;
