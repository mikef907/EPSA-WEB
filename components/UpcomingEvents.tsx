import { List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { useEventsQuery } from '../generated/graphql';
import CircularProgress from '@material-ui/core/CircularProgress';

const formatWhen = (start: Date, end?: Date) => {
  return (
    <Typography>
      {start.toLocaleDateString()} {start.toLocaleString()}{' '}
      {end && ` -  ${end.toLocaleDateString()} ${end.toLocaleTimeString()}`}
    </Typography>
  );
};

const UpcomingEvents: React.FC = () => {
  const { data, loading } = useEventsQuery();

  return (
    <>
      {loading && <CircularProgress color="secondary" />}
      {data && (
        <List>
          {data.events.map((event) => {
            return (
              <ListItem key={event.id} button>
                <ListItemText
                  primary={event.name}
                  secondaryTypographyProps={{ component: 'span' }}
                  secondary={
                    <>
                      {formatWhen(event.start, event?.end)}
                      <Typography>{event.description}</Typography>
                    </>
                  }
                />
              </ListItem>
            );
          })}
        </List>
      )}
    </>
  );
};

export default UpcomingEvents;
