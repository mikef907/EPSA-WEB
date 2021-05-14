import { Grid, Typography } from '@material-ui/core';
import { NextPage } from 'next';
import React, { useContext } from 'react';
import Layout from '../components/Layout';
import Protect from '../components/Protect';
import StaffForm from '../components/StaffForm';
import UserForm from '../components/UserForm';
import { UserContext } from '../context/UserContext';

const ProfilePage: NextPage = () => {
  const { checkRoles, user } = useContext(UserContext);

  return (
    <Layout>
      <Typography component="h1" variant="h4" style={{ textAlign: 'center' }}>
        Profile
      </Typography>
      <Protect roles={['User']}>
        <Grid container justify="center">
          <Grid item md={6}>
            {checkRoles(user, 'Staff') && (
              <StaffForm userId={user!.id}></StaffForm>
            )}
            {!checkRoles(user, 'Staff') && <UserForm></UserForm>}
          </Grid>
        </Grid>
      </Protect>
    </Layout>
  );
};

export default ProfilePage;
