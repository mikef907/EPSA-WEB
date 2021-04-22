import { List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { EventQuery } from '../generated/graphql';

interface IProps {
  events: EventQuery[];
}

const UpcomingEvents: React.FC<IProps> = ({ events }) => {
  return (
    <List>
      {events.map((event) => {
        return (
          <ListItem key={event.id}>
            <ListItemText
              primary={event.name}
              secondaryTypographyProps={{ component: 'span' }}
              secondary={
                <>
                  <Typography variant="subtitle2" component="span">
                    {event.start}
                  </Typography>
                  <Typography variant="subtitle2" component="span">
                    {event.end}
                  </Typography>
                  <Typography>{event.description}</Typography>
                </>
              }
            />
          </ListItem>
        );
      })}
    </List>
  );
};

export default UpcomingEvents;
