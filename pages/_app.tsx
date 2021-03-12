import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../themes';
import '../styles/globals.css';
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import {
  IUser,
  setUserFromLocalStorage,
  checkRoles,
  UserContext,
} from '../context/UserContext';
import { buildClientSchema } from 'graphql';
import { withScalars } from 'apollo-link-scalars';
import introspectionResults from '../graphql.schema.json';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const MyApp = (props: AppProps) => {
  const { Component, pageProps } = props;

  const IS_SERVER = typeof window === 'undefined';

  // we can also pass a custom map of functions. These will have priority over the GraphQLTypes parsing and serializing functions from the Schema.
  const typesMap = {
    DateTime: {
      serialize: (parsed: Date) => parsed.toString(),
      parseValue: (raw: string | number | null): Date | null => {
        return raw ? new Date(raw) : null;
      },
    },
  };

  const schema = buildClientSchema(introspectionResults as any);

  const link = ApolloLink.from([
    withScalars({ schema, typesMap }),
    new HttpLink({
      uri: 'http://localhost:4000/graphql',
      headers: {
        Authorization:
          !IS_SERVER && localStorage.getItem('token')
            ? `Bearer ${localStorage.getItem('token')}`
            : '',
      },
    }),
  ]);

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
  });

  const [user, setUser] = React.useState<IUser | null>(null);

  //const value = React.useMemo(() => ({ user, setUser }), [user, setUser]);

  React.useEffect(() => setUser(setUserFromLocalStorage), []);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>PIPA</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <ApolloProvider client={client}>
          <UserContext.Provider value={{ user, setUser, checkRoles }}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Component {...pageProps} />
            </MuiPickersUtilsProvider>
          </UserContext.Provider>
        </ApolloProvider>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default MyApp;
