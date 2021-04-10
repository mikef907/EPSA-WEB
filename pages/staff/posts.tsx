import { Divider, Link as MatLink, Typography } from '@material-ui/core';
import React from 'react';
import Layout from '../../components/Layout';
import Protect from '../../components/Protect';
import { DataGrid, GridCellParams, GridColDef } from '@material-ui/data-grid';
import {
  useAllPostsQuery,
  useRemovePostMutation,
} from '../../generated/graphql';
import Link from '../../components/Link';

const Events: React.FC = () => {
  const columns: GridColDef[] = [
    { field: 'headline', headerName: 'Headline', width: 160 },
    {
      field: 'first_name',
      headerName: 'First Name',
      width: 160,
      valueFormatter: (p) => p.row.author.user.first_name,
    },
    {
      field: 'last_name',
      headerName: 'Last Name',
      width: 160,
      valueFormatter: (p) => p.row.author.user.last_name,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      valueFormatter: (p) => p.row.author.user.email,
    },
    {
      field: 'published',
      headerName: 'Published',
      width: 160,
    },
    {
      field: 'id',
      headerName: ' ',
      width: 160,
      renderCell: (params: GridCellParams) => {
        const link = `/staff/post/${params.value}`;
        return (
          <>
            <Link as={link} href="/staff/post/[[...id]]">
              Edit
            </Link>
            <Divider
              orientation="vertical"
              variant="middle"
              style={{ height: '50%' }}
            ></Divider>
            <MatLink
              component="button"
              onClick={async () => await removePostById(params.row.id as any)}
            >
              Remove
            </MatLink>
          </>
        );
      },
    },
  ];

  const { data } = useAllPostsQuery();

  const [removePost] = useRemovePostMutation({
    refetchQueries: () => ['AllPosts'],
  });

  const removePostById = async (id: any) => {
    if (confirm('Remove post? (This is not undoable)')) {
      await removePost({ variables: { id } });
    }
  };

  return (
    <Layout>
      <Protect roles={['Admin', 'Staff']}>
        <Typography
          variant="h4"
          component="h1"
          style={{ textAlign: 'center' }}
          gutterBottom
        >
          Blog Posts
        </Typography>
        <Link as={`/staff/post`} href="/staff/post/[[...id]]">
          Add Post
        </Link>
        {data && (
          <DataGrid
            columns={columns}
            rows={data.allPosts}
            autoHeight={true}
            autoPageSize={true}
          ></DataGrid>
        )}
      </Protect>
    </Layout>
  );
};

export default Events;
