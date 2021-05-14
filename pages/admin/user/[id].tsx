import {
  Box,
  CircularProgress,
  Grid,
  List,
  ListItem,
  TextField,
  Typography,
} from '@material-ui/core';
import { NextPage, NextPageContext } from 'next';
import React, { useEffect } from 'react';
import Layout from '../../../components/Layout';
import { useUserByIdLazyQuery } from '../../../generated/graphql';

interface Context extends NextPageContext {
  query: {
    id: string[] | undefined;
  };
}

interface IProps {
  id: number | undefined;
}

const UserDetails: NextPage<IProps> = ({ id }) => {
  const [userQuery, { data, loading, error }] = useUserByIdLazyQuery();

  useEffect(() => {
    if (id) userQuery({ variables: { id } });
  }, []);

  return (
    <Layout>
      <Typography component="h1" variant="h4" style={{ textAlign: 'center' }}>
        User Details
      </Typography>
      {loading && (
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
          }}
        >
          <CircularProgress></CircularProgress>
        </Box>
      )}
      {!loading && (
        <Grid container justify="center">
          <Grid item md={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={data?.user.first_name}
                  InputProps={{
                    readOnly: true,
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={data?.user.last_name}
                  InputProps={{
                    readOnly: true,
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Email"
                  value={data?.user.email}
                  InputProps={{
                    readOnly: true,
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={6}>
                <Typography>Roles</Typography>
                <List>
                  {data?.user.roles.map((role) => (
                    <ListItem key={role.id}>{role.name}</ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
};

UserDetails.getInitialProps = (ctx: Context) => {
  if (ctx.query?.id) {
    return { id: parseInt(ctx.query.id[0]) };
  }
  return { id: undefined };
};

export default UserDetails;
