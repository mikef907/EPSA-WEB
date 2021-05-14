import { Grid, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { UserContext } from '../context/UserContext';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import Link from '../components/Link';
import UserForm from '../components/UserForm';

const CreateUser: NextPage = () => {
  const { user, setUser } = React.useContext(UserContext);

  const router = useRouter();

  useEffect(() => {
    if (user) router.push('/profile');
  });

  return (
    <Layout>
      <Typography
        variant="h4"
        component="h1"
        style={{ textAlign: 'center' }}
        gutterBottom
      >
        Sign Up
      </Typography>
      <Grid
        container
        alignContent="center"
        justify="center"
        direction="column"
        spacing={2}
      >
        <Grid item xs={12} md={4}>
          <UserForm></UserForm>
          <Grid item xs={12} md={4}>
            <Grid spacing={4} container>
              <Grid item>
                <Link href="login">Already a member?</Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default CreateUser;
