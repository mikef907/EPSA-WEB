import { List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { useEventsQuery } from '../generated/graphql';
import CircularProgress from '@material-ui/core/CircularProgress';

const formatWhen = (start: Date, end?: Date) => {
  return (
    <Typography variant="subtitle2">
      Starts {start.toLocaleDateString()} at {start.toLocaleTimeString()}{' '}
      {end &&
        ` Ends  ${end.toLocaleDateString()} at ${end.toLocaleTimeString()}`}
    </Typography>
  );
};

const UpcomingEvents: React.FC = () => {
  const { data, loading } = useEventsQuery({ variables: { take: 5 } });

  return (
    <>
      {loading && <CircularProgress color="secondary" />}
      {data && (
        <List>
          {data.events.map((event) => {
            return (
              <ListItem key={event.id}>
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
