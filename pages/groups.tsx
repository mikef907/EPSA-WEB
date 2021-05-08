import { Grid, Typography } from '@material-ui/core';
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
      <Grid container justify="center">
        <Grid item>
          {groups.map((group) => (
            <GroupItem key={group.id} group={group}></GroupItem>
          ))}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default GroupsPage;

export async function getStaticProps() {
  const { data } = await client.query({
    query: AllGroupsDocument,
    variables: { active: true },
  });

  return {
    props: {
      groups: data.groups.map((group: any) => {
        group.start = dayjs(group.start).format('MMMM Do YYYY');
        group.end = dayjs(group.end).format('MMMM Do YYYY');
        return group;
      }),
    },
    revalidate: 120,
  };
}
