import {
  CircularProgress,
  Divider,
  IconButton,
  Link as MatLink,
  Typography,
} from '@material-ui/core';
import React from 'react';
import Layout from '../../components/Layout';
import Protect from '../../components/Protect';
import { DataGrid, GridCellParams, GridColDef } from '@material-ui/data-grid';
import {
  useAllStaffQuery,
  useRemoveStaffMutation,
} from '../../generated/graphql';
import Link from '../../components/Link';
import { NextPage } from 'next';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ErrorDisplay from '../../components/ErrorDisplay';

const StaffMembers: NextPage = () => {
  const { data, loading, error } = useAllStaffQuery();

  const [removeStaff, { loading: removeLoading, error: removeError }] =
    useRemoveStaffMutation({
      refetchQueries: () => ['AllStaff'],
    });

  const columns: GridColDef[] = [
    {
      field: 'first_name',
      headerName: 'First Name',
      width: 160,
      valueFormatter: (p) => p.row.user.first_name,
    },
    {
      field: 'last_name',
      headerName: 'Last Name',
      width: 160,
      valueFormatter: (p) => p.row.user.last_name,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      valueFormatter: (p) => p.row.user.email,
    },
    {
      field: 'start',
      headerName: 'Start',
      width: 160,
    },
    {
      field: 'id',
      headerName: 'Action',
      width: 130,
      renderCell: (params: GridCellParams) => {
        if (params?.value) {
          const link = `/admin/staff/${params.value}`;
          return (
            <>
              <Link as={link} href="/admin/staff/[id]">
                <IconButton>
                  <EditIcon fontSize="small"></EditIcon>
                </IconButton>
              </Link>
              <IconButton
                onClick={() => {
                  if (confirm('Remove staff member? (this is not undoable)')) {
                    removeStaff({ variables: { id: params.value as number } });
                  }
                }}
              >
                <DeleteIcon fontSize="small"></DeleteIcon>
                {removeLoading && (
                  <CircularProgress
                    color="secondary"
                    size={20}
                  ></CircularProgress>
                )}
              </IconButton>
            </>
          );
        } else return <></>;
      },
    },
  ];

  return (
    <Layout>
      <Protect roles={['Admin']}>
        <Typography
          variant="h4"
          component="h1"
          style={{ textAlign: 'center' }}
          gutterBottom
        >
          Staff
        </Typography>
        <Link href="/admin/staff">Add Staff</Link>
        <ErrorDisplay error={error || removeError}></ErrorDisplay>
        {loading && <CircularProgress></CircularProgress>}
        {data && (
          <DataGrid
            columns={columns}
            rows={data.allStaff}
            autoHeight={true}
            autoPageSize={true}
          ></DataGrid>
        )}
      </Protect>
    </Layout>
  );
};

export default StaffMembers;
