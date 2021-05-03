import { Typography } from '@material-ui/core';
import dayjs from 'dayjs';
import { NextPage } from 'next';
import React from 'react';
import GroupItem from '../components/GroupItem';
import Layout from '../components/Layout';
import { AllGroupsDocument, GroupQuery } from '../generated/graphql';
import { client } from './_app';

interface IProps {
  groups: GroupQuery[];
}

const GroupsPage: NextPage<IProps> = ({ groups }) => {
  return (
    <Layout>
      <Typography component="h1" variant="h4" style={{ textAlign: 'center' }}>
        Groups
      </Typography>
      {groups.map((group) => (
        <GroupItem key={group.id} group={group}></GroupItem>
      ))}
    </Layout>
  );
};

export default GroupsPage;

export async function getStaticProps() {
  const { data } = await client.query({
    query: AllGroupsDocument,
  });

  return {
    props: {
      groups: data.groups.map((group: any) => {
        group.created_at = dayjs(group.created_at).format('MMMM Do YYYY');
        return group;
      }),
    },
    revalidate: 120,
  };
}
