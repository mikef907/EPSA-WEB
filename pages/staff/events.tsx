import { CircularProgress, IconButton, Typography } from '@material-ui/core';
import React from 'react';
import Layout from '../../components/Layout';
import Protect from '../../components/Protect';
import { DataGrid, GridCellParams, GridColDef } from '@material-ui/data-grid';
import {
  useDeleteEventMutation,
  useEventsQuery,
} from '../../generated/graphql';
import Link from '../../components/Link';
import { NextPage } from 'next';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ErrorDisplay from '../../components/ErrorDisplay';

const Events: NextPage = () => {
  const { data, loading, error } = useEventsQuery();

  const [
    deleteEvent,
    { data: deleteData, loading: deleteLoading, error: deleteError },
  ] = useDeleteEventMutation({ refetchQueries: ['Events'] });

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
      width: 130,
      headerName: 'Action',
      renderCell: (params: GridCellParams) => {
        const link = `/staff/event/${params.value}`;
        return (
          <>
            <Link as={link} href="/staff/event/[[...id]]">
              <IconButton>
                <EditIcon fontSize="small"></EditIcon>
              </IconButton>
            </Link>
            <IconButton
              onClick={() => {
                if (confirm('Remove this event? (This is not undoable)')) {
                  deleteEvent({ variables: { id: params.value as number } });
                }
              }}
            >
              <DeleteIcon fontSize="small"></DeleteIcon>
              {deleteLoading && (
                <CircularProgress color="secondary" size={20} />
              )}
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <Layout>
      <Protect roles={['Staff']}>
        <Typography
          variant="h4"
          component="h1"
          style={{ textAlign: 'center' }}
          gutterBottom
        >
          Events
        </Typography>
        <Link as={'/staff/event'} href="/staff/event/[[...id]]">
          Add Event
        </Link>
        <ErrorDisplay error={error || deleteError}></ErrorDisplay>
        {loading && <CircularProgress></CircularProgress>}
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
