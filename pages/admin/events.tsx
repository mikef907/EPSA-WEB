import { gql, useQuery } from '@apollo/client';
import { Typography } from '@material-ui/core';
import React from 'react';
import Layout from '../../components/Layout';
import Protect from '../../components/Protect';
import { DataGrid, GridColDef } from '@material-ui/data-grid';

const EVENTS = gql`
  query Events {
    events {
      id
      parentId
      name
      description
      start
      end
      allDay
    }
  }
`;

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Title', width: 160 },
  { field: 'description', headerName: 'Description', width: 160 },
  { field: 'start', headerName: 'Start', width: 160, type: 'dateTime' },
  { field: 'end', headerName: 'End', width: 160, type: 'dateTime' },
  { field: 'allDay', headerName: 'All Day', width: 160, type: 'bool' },
];

const Events: React.FC = () => {
  const { loading, error, data } = useQuery(EVENTS);

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
