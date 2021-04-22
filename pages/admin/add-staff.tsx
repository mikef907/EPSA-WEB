import Layout from '../../components/Layout';
import Protect from '../../components/Protect';
import { Typography } from '@material-ui/core';
import StaffForm from '../../components/StaffForm';
import { NextPage } from 'next';

const AddStaffPage: NextPage = () => {
  return (
    <Protect roles={['Admin']}>
      <Layout>
        <Typography
          variant="h4"
          component="h1"
          style={{ textAlign: 'center' }}
          gutterBottom
        >
          Add Staff Member
        </Typography>
        <StaffForm></StaffForm>
      </Layout>
    </Protect>
  );
};

export default AddStaffPage;
