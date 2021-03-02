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
  gql,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import {
  IUser,
  setUserFromLocalStorage,
  checkRoles,
  UserContext,
} from '../context/UserContext';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLScalarType, Kind } from 'graphql';
import { fetch } from 'cross-fetch';
import { print, graphqlSync } from 'graphql';
import { introspectSchema, wrapSchema } from '@graphql-tools/wrap';
import { withScalars } from 'apollo-link-scalars';

// const executor = async ({ document, variables }) => {
//   const query = print(document);
//   const fetchResult = await fetch('http://localhost:4000/graphql', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ query, variables }),
//   });
//   return fetchResult.json();
// };

// const getSchema = async () => {
//   const schema = wrapSchema({
//     schema: await introspectSchema(executor),
//     executor,
//   });
//   return schema;
// };

const MyApp = (props: AppProps) => {
  const { Component, pageProps } = props;

  const IS_SERVER = typeof window === 'undefined';

  // const link = new HttpLink({ uri: 'http://localhost:4000/graphql', fetch });

  //getSchema().then((schema) => console.log(schema));

  // const executableSchema = makeRemoteExecutableSchema({
  //   schema,
  //   link,
  // });

  const typeDefs = gql`
    directive @specifiedBy(url: String!) on SCALAR
    scalar DateTime

    input EventInput {
      parentId: Float
      name: String!
      description: String!
      allDay: Boolean
      start: DateTime!
      end: DateTime
    }

    type EventQuery {
      id: ID!
      parentId: Float
      name: String!
      description: String!
      allDay: Boolean
      start: DateTime!
      end: DateTime
      created_at: DateTime!
      updated_at: DateTime!
    }

    type Mutation {
      resetPassword(input: UserResetPassword!): Boolean!
      forgotPassword(email: String!): Boolean!
      addUser(data: UserInput!): String!
      login(email: String!, password: String!): String!
      addEvent(event: EventInput!): EventQuery!
    }

    type Query {
      users: [UserQuery!]!
      user(id: Float!): UserQuery!
      events: [EventQuery!]!
      event(id: Float!): EventQuery!
    }

    type RoleQuery {
      id: ID!
      name: String!
    }

    input UserInput {
      first_name: String!
      last_name: String!
      email: String!
      password: String!
    }

    type UserQuery {
      id: ID!
      first_name: String!
      last_name: String!
      email: String!
      roles: [RoleQuery!]!
    }

    input UserResetPassword {
      nonce: String!
      password: String!
    }
  `;

  const resolvers = {
    Date: {
      name: 'Date',
      description: 'Date custom scalar type',
      parseValue(value: any) {
        return new Date(value); // value from the client
      },
      serialize(value: any) {
        return value.getTime(); // value sent to the client
      },
      parseLiteral(ast: any) {
        if (ast.kind === Kind.INT) {
          return new Date(+ast.value); // ast value is always in string format
        }
        return null;
      },
    },
  };

  const schema = makeExecutableSchema({
    typeDefs,
  });

  const link = ApolloLink.from([
    withScalars({ schema, resolvers }),
    new HttpLink({ uri: 'http://example.org/graphql' }),
  ]);

  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
    link,
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
};

export default MyApp;
