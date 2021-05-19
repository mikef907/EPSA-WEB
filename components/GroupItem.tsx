import {
  ListItem,
  Avatar,
  ListItemText,
  Typography,
  Button,
  IconButton,
  CircularProgress,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Alert } from '@material-ui/lab';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import {
  GroupQuery,
  useJoinedGroupsLazyQuery,
  useRequestToJoinGroupMutation,
  useRequestToLeaveGroupMutation,
} from '../generated/graphql';
import { useLanguageCodeConverter } from '../hooks/language';
import { useStaffImg } from '../hooks/staffImg';
import { useStyles } from '../hooks/styles';
import ErrorDisplay from './ErrorDisplay';
import Link from './Link';

interface IProps {
  group: GroupQuery;
}

const GroupItem: React.FC<IProps> = ({ group }) => {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const [joinedGroups, setJoinedGroups] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const [requestToJoin, { error: joinError, loading: joinLoading }] =
    useRequestToJoinGroupMutation({
      refetchQueries: ['JoinedGroups'],
    });

  const [leaveGroup, { error: leaveError, loading: leaveLoading }] =
    useRequestToLeaveGroupMutation({
      refetchQueries: ['JoinedGroups'],
    });

  const [joinedGroupsQuery, { data: joinedGroupsResult }] =
    useJoinedGroupsLazyQuery();

  const isInGroup = (id: number) => joinedGroups.includes(id);

  const leave = (id: number) => leaveGroup({ variables: { id } });

  useEffect(() => {
    setLoading(joinLoading || leaveLoading);
  }, [joinLoading, leaveLoading]);

  useEffect(() => {
    if (user) {
      joinedGroupsQuery();
    }
  }, [user]);

  useEffect(() => {
    setJoinedGroups(joinedGroupsResult?.joinedGroups || []);
  }, [joinedGroupsResult]);

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
                  {group.title}
                </Typography>
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
                {user &&
                  !isInGroup(parseInt(group.id)) &&
                  joinedGroups.length === 0 && (
                    <Button
                      color="primary"
                      variant="contained"
                      disabled={loading}
                      onClick={() => {
                        if (confirm('Join this group?'))
                          requestToJoin({
                            variables: { id: parseInt(group.id) },
                          });
                      }}
                    >
                      Request to join
                      {loading && (
                        <CircularProgress color="secondary" size={20} />
                      )}
                    </Button>
                  )}
                {user && isInGroup(parseInt(group.id)) && (
                  <Alert
                    variant="outlined"
                    severity="success"
                    action={
                      <IconButton
                        color="secondary"
                        size="small"
                        aria-label="Leave group"
                        disabled={loading}
                        onClick={() => {
                          if (confirm('leave this group?')) {
                            leave(parseInt(group.id));
                          }
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                        {loading && (
                          <CircularProgress color="secondary" size={20} />
                        )}
                      </IconButton>
                    }
                  >
                    You are in this group!
                  </Alert>
                )}
                <ErrorDisplay error={joinError || leaveError}></ErrorDisplay>
              </>
            }
          />
        </ListItem>
      )}
    </>
  );
};

export default GroupItem;
