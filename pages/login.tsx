import { Typography } from '@material-ui/core';
import Layout from '../components/Layout';
import React from 'react';
import Login from '../components/Login';

export default function LoginPage() {
  return (
    <Layout>
      <Typography
        variant="h4"
        component="h1"
        style={{ textAlign: 'center' }}
        gutterBottom
      >
        Login
      </Typography>
      <Login></Login>
    </Layout>
  );
}
