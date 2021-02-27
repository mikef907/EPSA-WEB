import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../themes';
import '../styles/globals.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import {
  IUser,
  setUserFromLocalStorage,
  checkRoles,
  UserContext,
} from '../context/UserContext';
import { getStoreKeyName } from '@apollo/client/utilities';

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  const IS_SERVER = typeof window === 'undefined';

  const setToken = () => {
    if (!IS_SERVER) return `Bearer ${localStorage.getItem('token')}` || '';
  };

  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
    headers: {
      Authorization:
        !IS_SERVER && localStorage.getItem('token')
          ? `Bearer ${localStorage.getItem('token')}`
          : '',
    },
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
            <Component {...pageProps} />
          </UserContext.Provider>
        </ApolloProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}
