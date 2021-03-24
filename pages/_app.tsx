import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import '../styles/globals.css';
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client';
import {
  setUserFromLocalStorage,
  checkRoles,
  UserContext,
} from '../context/UserContext';
import { buildClientSchema } from 'graphql';
import { withScalars } from 'apollo-link-scalars';
import introspectionResults from '../graphql.schema.json';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { createUploadLink } from 'apollo-upload-client';
import { IUser } from '../interfaces/IUser';
import { cyan, deepOrange, green, orange } from '@material-ui/core/colors';
import { ThemeContext } from '../context/ThemeContext';
import { IS_SERVER } from '../constants';

const MyApp = (props: AppProps) => {
  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? 'dark' : 'light';
  const mainPrimaryColor = darkState ? deepOrange[300] : cyan[400];
  const mainSecondaryColor = darkState ? green['A700'] : orange[900];

  useEffect(() => {
    setDarkState(localStorage.getItem('dark-theme') === 'true');
  }, []);

  useEffect(() => {
    localStorage.setItem('dark-theme', `${darkState}`);
  }, [darkState]);

  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor,
      },
      secondary: {
        main: mainSecondaryColor,
      },
    },
  });

  const { Component, pageProps } = props;

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
    createUploadLink({
      uri: `${process.env.api}`,
      headers: {
        Authorization:
          !IS_SERVER && localStorage.getItem('token')
            ? `Bearer ${localStorage.getItem('token')}`
            : '',
      },
    }),
  ]);

  const client = new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            allStaff: {
              merge: false,
            },
          },
        },
      },
    }),
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
        <title>Early Parenting Support Alaska</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeContext.Provider
        value={{ state: darkState, setState: setDarkState }}
      >
        <ThemeProvider theme={darkTheme}>
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
      </ThemeContext.Provider>
    </React.Fragment>
  );
};

export default MyApp;
