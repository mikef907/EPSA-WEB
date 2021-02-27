import { gql, useQuery } from '@apollo/client';
import { Typography } from '@material-ui/core';
import React from 'react';
import Layout from '../../components/Layout';
import Protect from '../../components/Protect';
import { IUser } from '../../context/UserContext';
import { DataGrid, GridColDef } from '@material-ui/data-grid';

const USERS = gql`
  query Users {
    users {
      id
      first_name
      last_name
      email
    }
  }
`;

const columns: GridColDef[] = [
  { field: 'first_name', headerName: 'First Name', width: 160 },
  { field: 'last_name', headerName: 'Last Name', width: 160 },
  { field: 'email', headerName: 'Email', width: 160 },
];

const Users: React.FC = () => {
  const { loading, error, data } = useQuery(USERS);

  return (
    <Layout>
      <Protect roles={['Admin', 'Staff']}>
        <Typography
          variant="h4"
          component="h1"
          style={{ textAlign: 'center' }}
          gutterBottom
        >
          Users
        </Typography>
        {data && (
          <DataGrid
            columns={columns}
            rows={data.users}
            autoHeight={true}
            autoPageSize={true}
          ></DataGrid>
        )}
      </Protect>
    </Layout>
  );
};

export default Users;
