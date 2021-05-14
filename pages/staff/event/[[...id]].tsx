import { Typography } from '@material-ui/core';
import { NextPage, NextPageContext } from 'next';
import React from 'react';
import EventForm from '../../../components/EventForm';
import Layout from '../../../components/Layout';
import Protect from '../../../components/Protect';

interface Context extends NextPageContext {
  query: {
    id: string[] | undefined;
  };
}

interface IProps {
  id: number | undefined;
}

const EventAdminPage: NextPage<IProps> = ({ id }) => {
  return (
    <Layout>
      <Protect roles={['Staff']}>
        <Typography
          variant="h4"
          component="h1"
          style={{ textAlign: 'center' }}
          gutterBottom
        >
          {id ? 'Edit Event' : 'Add Event'}
        </Typography>
        <EventForm id={id}></EventForm>;
      </Protect>
    </Layout>
  );
};

EventAdminPage.getInitialProps = (ctx: Context) => {
  if (ctx.query?.id) {
    return { id: parseInt(ctx.query.id[0]) };
  }
  return { id: undefined };
};

export default EventAdminPage;
