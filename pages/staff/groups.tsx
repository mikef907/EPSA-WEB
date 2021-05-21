import { CircularProgress, IconButton, Typography } from '@material-ui/core';
import React from 'react';
import Layout from '../../components/Layout';
import Protect from '../../components/Protect';
import { DataGrid, GridCellParams, GridColDef } from '@material-ui/data-grid';
import {
  useAllGroupsQuery,
  useRemoveGroupMutation,
} from '../../generated/graphql';
import Link from '../../components/Link';
import dayjs from 'dayjs';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ErrorDisplay from '../../components/ErrorDisplay';

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
      headerName: 'Action',
      width: 130,
      renderCell: (params: GridCellParams) => {
        const link = `/staff/group/${params.value}`;
        return (
          <>
            <Link as={link} href="/staff/group/[[...id]]">
              <IconButton>
                <EditIcon fontSize="small"></EditIcon>
              </IconButton>
            </Link>
            <IconButton
              onClick={() => {
                if (confirm('Remove group? (This is not undoable)')) {
                  removeGroup({ variables: { id: params.value as number } });
                }
              }}
            >
              <DeleteIcon fontSize="small"></DeleteIcon>
              {removeLoading && (
                <CircularProgress color="secondary" size={20} />
              )}
            </IconButton>
          </>
        );
      },
    },
  ];

  const { data, error, loading } = useAllGroupsQuery();

  const [removeGroup, { error: removeError, loading: removeLoading }] =
    useRemoveGroupMutation({
      refetchQueries: () => ['AllGroups'],
    });

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
        <ErrorDisplay error={error || removeError}></ErrorDisplay>
        {loading && <CircularProgress></CircularProgress>}
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
