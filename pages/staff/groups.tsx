import { Divider, Link as MatLink, Typography } from '@material-ui/core';
import React from 'react';
import Layout from '../../components/Layout';
import Protect from '../../components/Protect';
import { DataGrid, GridCellParams, GridColDef } from '@material-ui/data-grid';
import {
  useAllGroupsQuery,
  useAllPostsQuery,
  useRemoveGroupMutation,
  useRemovePostMutation,
} from '../../generated/graphql';
import Link from '../../components/Link';
import dayjs from 'dayjs';

const Groups: React.FC = () => {
  const columns: GridColDef[] = [
    {
      field: 'first_name',
      headerName: 'Facilitator',
      width: 160,
      valueFormatter: (p) =>
        `${p.row.facilitator.user.first_name} ${p.row.facilitator.user.last_name}`,
    },
    {
      field: 'city',
      headerName: 'City',
      width: 160,
    },
    {
      field: 'zipCode',
      headerName: 'Zip',
      width: 100,
    },
    {
      field: 'language',
      headerName: 'Lang',
      width: 100,
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 160,
    },
    {
      field: 'start',
      headerName: 'Start',
      width: 130,
      valueFormatter: (p) => dayjs(p.row.start).format('MM/DD/YYYY'),
    },
    {
      field: 'end',
      headerName: 'End',
      width: 130,
      valueFormatter: (p) => dayjs(p.row.end).format('MM/DD/YYYY'),
    },
    {
      field: 'limit',
      headerName: 'Limit',
      width: 100,
    },
    {
      field: 'id',
      headerName: ' ',
      width: 160,
      renderCell: (params: GridCellParams) => {
        const link = `/staff/group/${params.value}`;
        return (
          <>
            <Link as={link} href="/staff/group/[[...id]]">
              Edit
            </Link>
            <Divider
              orientation="vertical"
              variant="middle"
              style={{ height: '50%' }}
            ></Divider>
            <MatLink
              component="button"
              onClick={async () => await removeGroupById(params.row.id as any)}
            >
              Remove
            </MatLink>
          </>
        );
      },
    },
  ];

  const { data } = useAllGroupsQuery();

  const [removeGroup] = useRemoveGroupMutation({
    refetchQueries: () => ['AllPosts'],
  });

  const removeGroupById = async (id: any) => {
    if (confirm('Remove group? (This is not undoable)')) {
      await removeGroup({ variables: { id } });
    }
  };

  return (
    <Layout>
      <Typography
        variant="h4"
        component="h1"
        style={{ textAlign: 'center' }}
        gutterBottom
      >
        Groups
      </Typography>
      <Protect roles={['Staff']}>
        <Link as={`/staff/group`} href="/staff/group/[[...id]]">
          Add Group
        </Link>
        {data && (
          <DataGrid
            columns={columns}
            rows={data.groups}
            autoHeight={true}
            autoPageSize={true}
          ></DataGrid>
        )}
      </Protect>
    </Layout>
  );
};

export default Groups;
