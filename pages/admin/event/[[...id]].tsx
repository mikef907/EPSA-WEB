import { NextPage, NextPageContext } from 'next';
import EventForm from '../../../components/EventForm';

interface Context extends NextPageContext {
  query: {
    id: string[] | undefined;
  };
}

interface IProps {
  id: number | undefined;
}

const EventAdminPage: NextPage<IProps> = ({ id }) => {
  return <EventForm id={id}></EventForm>;
};

EventAdminPage.getInitialProps = (ctx: Context) => {
  if (ctx.query?.id) {
    return { id: parseInt(ctx.query.id[0]) };
  }
  return { id: undefined };
};

export default EventAdminPage;
