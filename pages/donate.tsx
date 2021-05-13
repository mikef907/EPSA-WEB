import { Typography } from '@material-ui/core';
import { NextPage } from 'next';
import Layout from '../components/Layout';

const DonatePage: NextPage = () => {
  return (
    <Layout>
      <Typography component="h1" variant="h4" style={{ textAlign: 'center' }}>
        Donate to EPSA
      </Typography>
    </Layout>
  );
};

export default DonatePage;
