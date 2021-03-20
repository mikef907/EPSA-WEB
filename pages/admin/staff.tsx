import { Link, Typography } from '@material-ui/core';
import React from 'react';
import Layout from '../../components/Layout';
import Protect from '../../components/Protect';
import { DataGrid, GridCellParams, GridColDef } from '@material-ui/data-grid';
import { useAllStaffQuery } from '../../generated/graphql';

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
    width: 160,
    valueFormatter: (p) => p.row.user.email,
  },
  {
    field: 'start',
    headerName: 'Start',
    width: 160,
  },
  {
    field: 'id',
    headerName: 'Edit',
    renderCell: (params: GridCellParams) => {
      const link = `/staff/${params.value}`;
      return (
        <>
          <Link href={link}>Edit</Link>
        </>
      );
    },
  },
];

const StaffMembers: React.FC = () => {
  const { data } = useAllStaffQuery();

  return (
    <Layout>
      <Protect roles={['Admin', 'Staff']}>
        <Typography
          variant="h4"
          component="h1"
          style={{ textAlign: 'center' }}
          gutterBottom
        >
          Staff
        </Typography>
        <Link href="/staff">Add Staff</Link>
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
