import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    drawerPaper: {
      width: 200,
    },
    large: {
      width: 200,
      height: 200,
    },
    medium: {
      width: 100,
      height: 100,
    },
  })
);
