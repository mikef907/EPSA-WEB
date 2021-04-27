import { Typography } from '@material-ui/core';
import { NextPage } from 'next';
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
      {JSON.stringify(groups)}
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
        group.created_at = group.created_at.toLocaleString();
        return group;
      }),
    },
    revalidate: 120,
  };
}
