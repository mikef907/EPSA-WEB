import { Typography } from '@material-ui/core';
import React from 'react';
import Layout from '../../components/Layout';
import Protect from '../../components/Protect';
import { DataGrid, GridCellParams, GridColDef } from '@material-ui/data-grid';
import { useEventsQuery } from '../../generated/graphql';
import Link from '../../components/Link';
import { NextPage } from 'next';

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Title', width: 160 },
  { field: 'description', headerName: 'Description', width: 160 },
  { field: 'start', headerName: 'Start', width: 160, type: 'dateTime' },
  { field: 'end', headerName: 'End', width: 160, type: 'dateTime' },
  { field: 'allDay', headerName: 'All Day', width: 160, type: 'bool' },
  { field: 'zipCode', headerName: 'Zip' },
  { field: 'language', headerName: 'Lang' },
  {
    field: 'id',
    headerName: 'Edit',
    renderCell: (params: GridCellParams) => {
      const link = `/admin/event/${params.value}`;
      return (
        <Link as={link} href="/admin/event/[[...id]]">
          Edit
        </Link>
      );
    },
  },
];

const Events: NextPage = () => {
  const { data } = useEventsQuery();

  return (
    <Layout>
      <Protect roles={['Admin', 'Staff']}>
        <Typography
          variant="h4"
          component="h1"
          style={{ textAlign: 'center' }}
          gutterBottom
        >
          Events
        </Typography>
        <Link as={'/admin/event'} href="/admin/event/[[...id]]">
          Add Event
        </Link>
        {data && (
          <DataGrid
            columns={columns}
            rows={data.events}
            autoHeight={true}
            autoPageSize={true}
          ></DataGrid>
        )}
      </Protect>
    </Layout>
  );
};

export default Events;
