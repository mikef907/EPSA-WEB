import {
  ListItem,
  Avatar,
  ListItemText,
  Typography,
  Link,
} from '@material-ui/core';
import dayjs from 'dayjs';
import React from 'react';
import { GroupQuery } from '../generated/graphql';
import { useLanguageCodeConverter } from '../hooks/language';
import { useStaffImg } from '../hooks/staffImg';
import { useStyles } from '../hooks/styles';

interface IProps {
  group: GroupQuery;
}

const GroupItem: React.FC<IProps> = ({ group }) => {
  const classes = useStyles();

  return (
    <>
      {group.facilitator && (
        <ListItem>
          <Avatar
            className={classes.medium}
            style={{ marginRight: '5px' }}
            src={useStaffImg(group.facilitator)}
          ></Avatar>
          <ListItemText
            primary={`Facilitator: ${group.facilitator.user.first_name} ${group.facilitator.user.last_name}`}
            primaryTypographyProps={{ component: 'h2', variant: 'h5' }}
            secondaryTypographyProps={{ component: 'span' }}
            secondary={
              <>
                <Typography component="p" variant="subtitle1">
                  Established {group.created_at}
                </Typography>
                <Typography component="p" variant="subtitle2">
                  Language {useLanguageCodeConverter(group.language)}
                </Typography>
                <Typography component="p" variant="body1">
                  City: {group.city} Zip {group.zipCode}
                </Typography>
                <Link>Request to join</Link>
              </>
            }
          />
        </ListItem>
      )}
    </>
  );
};

export default GroupItem;
