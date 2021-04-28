import { ListItem, Avatar, ListItemText, Typography } from '@material-ui/core';
import dayjs from 'dayjs';
import React from 'react';
import { StaffQuery } from '../generated/graphql';
import { useStaffImg } from '../hooks/staffImg';
import { useStyles } from '../hooks/styles';

interface IProps {
  staff: StaffQuery;
}

const StaffListItem: React.FC<IProps> = ({ staff }) => {
  const classes = useStyles();

  return (
    <ListItem>
      <Avatar
        className={classes.medium}
        style={{ marginRight: '5px' }}
        src={useStaffImg(staff)}
      ></Avatar>
      <ListItemText
        primary={`${staff.user.first_name} ${staff.user.last_name}`}
        primaryTypographyProps={{ component: 'h2', variant: 'h5' }}
        secondaryTypographyProps={{ component: 'span' }}
        secondary={
          <>
            <Typography component="p" variant="subtitle2">
              Since {dayjs(staff.start).format('MMMM YYYY')}
            </Typography>
            <Typography component="p" variant="body1">
              {staff.description}
            </Typography>
          </>
        }
      />
    </ListItem>
  );
};

export default StaffListItem;
