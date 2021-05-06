import {
  ListItem,
  Avatar,
  ListItemText,
  Typography,
  Button,
} from '@material-ui/core';
import dayjs from 'dayjs';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import {
  GroupQuery,
  useJoinedGroupsLazyQuery,
  useRequestToJoinGroupMutation,
} from '../generated/graphql';
import { useLanguageCodeConverter } from '../hooks/language';
import { useStaffImg } from '../hooks/staffImg';
import { useStyles } from '../hooks/styles';
import Link from './Link';

interface IProps {
  group: GroupQuery;
}

const GroupItem: React.FC<IProps> = ({ group }) => {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const [joinedGroups, setJoinedGroups] = useState<number[]>([]);
  const [
    requestToJoin,
    { data, error, loading },
  ] = useRequestToJoinGroupMutation();
  const [
    joinedGroupsQuery,
    { data: joinedGroupsResult },
  ] = useJoinedGroupsLazyQuery();
  const isInGroup = (id: number) => joinedGroups.includes(id);

  useEffect(() => {
    if (user) {
      joinedGroupsQuery();
    }
  }, [user]);

  useEffect(() => {
    setJoinedGroups(joinedGroupsResult?.joinedGroups || []);
  }, [joinedGroupsResult]);

  useEffect(() => {
    if (data) setJoinedGroups([...joinedGroups, data.requestToJoin]);
  }, [data]);

  return (
    <>
      {group.facilitator && (
        <ListItem>
          <Avatar
            className={classes.medium}
            style={{ marginRight: '5px' }}
            src={useStaffImg(group.facilitator)}
            alt="Facilitator image avatar"
          ></Avatar>
          <ListItemText
            primary={`Facilitator: ${group.facilitator.user.first_name} ${group.facilitator.user.last_name}`}
            primaryTypographyProps={{ component: 'h2', variant: 'h5' }}
            secondaryTypographyProps={{ component: 'span' }}
            secondary={
              <>
                <Typography component="p" variant="subtitle1">
                  From {group.start} to {group.end}
                </Typography>
                <Typography component="p" variant="subtitle2">
                  Language {useLanguageCodeConverter(group.language)}
                </Typography>
                <Typography component="p" variant="body2">
                  In {group.city} around zip code {group.zipCode}
                </Typography>
                {!user && <Link href="/login?r=/groups">Sign in to join</Link>}
                {user && !isInGroup(parseInt(group.id)) && (
                  <Button
                    color="primary"
                    variant="contained"
                    disabled={loading}
                    onClick={() =>
                      requestToJoin({ variables: { id: parseInt(group.id) } })
                    }
                  >
                    Request to join
                  </Button>
                )}
                {user && isInGroup(parseInt(group.id)) && (
                  <Typography color="secondary">
                    You are in this group!
                  </Typography>
                )}
                {error &&
                  error.graphQLErrors.map(({ message }) => (
                    <Typography color="error" component="p">
                      {message} 🙁
                    </Typography>
                  ))}
              </>
            }
          />
        </ListItem>
      )}
    </>
  );
};

export default GroupItem;
