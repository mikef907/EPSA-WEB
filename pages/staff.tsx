import { List, Typography } from '@material-ui/core';
import { NextPage } from 'next';
import React from 'react';
import Layout from '../components/Layout';
import StaffListItem from '../components/StaffListItem';
import { AllStaffDocument, StaffQuery } from '../generated/graphql';
import { client } from './_app';

interface IProps {
  staff: StaffQuery[];
}

const StaffPage: NextPage<IProps> = ({ staff }) => {
  return (
    <Layout>
      <Typography component="h1" variant="h4">
        EPSA Staff
        <List>
          {staff.map((s) => (
            <StaffListItem staff={s} key={s.id} />
          ))}
        </List>
      </Typography>
    </Layout>
  );
};

export default StaffPage;

export async function getStaticProps() {
  const { data } = await client.query({
    query: AllStaffDocument,
  });

  return {
    props: {
      staff: data.allStaff.map((s: any) => {
        s.start = s.start.toLocaleString();
        return s;
      }),
    },
    revalidate: 120,
  };
}
