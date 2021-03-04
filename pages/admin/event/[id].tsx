import { NextPage } from 'next';
import EventForm from '../../../components/EventForm';

const EventAdminPage: NextPage<{ id: string | undefined }> = ({ id }) => {
  return <EventForm id={id as number | undefined}></EventForm>;
};

EventAdminPage.getInitialProps = ({ query }) => {
  return { id: query?.id as string | undefined };
};

export default EventAdminPage;
