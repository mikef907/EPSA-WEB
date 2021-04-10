import { Divider, Link as MatLink, Typography } from '@material-ui/core';
import React from 'react';
import Layout from '../../components/Layout';
import Protect from '../../components/Protect';
import { DataGrid, GridCellParams, GridColDef } from '@material-ui/data-grid';
import {
  useAllStaffQuery,
  useRemoveStaffMutation,
} from '../../generated/graphql';
import Link from '../../components/Link';

const StaffMembers: React.FC = () => {
  const { data } = useAllStaffQuery();

  const [removeStaff] = useRemoveStaffMutation({
    refetchQueries: () => ['AllStaff'],
  });

  const removeStaffById = async (id: number) => {
    if (
      data?.allStaff &&
      confirm('Remove staff member? (this is not undoable)')
    ) {
      await removeStaff({ variables: { id } });
    }
  };

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
      headerName: ' ',
      width: 160,
      renderCell: (params: GridCellParams) => {
        if (params?.value) {
          const link = `/staff/${params.value}`;
          return (
            <>
              <Link as={link} href="/staff/[id]">
                Edit
              </Link>
              <Divider
                orientation="vertical"
                variant="middle"
                style={{ height: '50%' }}
              ></Divider>
              <MatLink
                component="button"
                onClick={async () =>
                  await removeStaffById(params.row.user.id as any)
                }
              >
                Remove
              </MatLink>
            </>
          );
        } else return <></>;
      },
    },
  ];

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
        <Link href="/admin/add-staff">Add Staff</Link>
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
