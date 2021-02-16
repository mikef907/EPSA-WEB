import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Divider, Drawer, Link, List, ListItem } from '@material-ui/core';
import React from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerPaper: {
      width: 200,
    },
  })
);

export default function NavBar() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar variant="elevation" position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography style={{ flexGrow: 1 }} variant="h6">
            PIPA
          </Typography>
          <Button color="inherit" href="/login">
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        open={open}
        classes={{ paper: classes.drawerPaper }}
      >
        <IconButton onClick={handleDrawerClose}>
          <Typography style={{ flexGrow: 1, display: 'flex' }}>PIPA</Typography>
          <ChevronLeftIcon style={{ justifyContent: 'flex-end' }} />
        </IconButton>
        <Divider />
        <List>
          <ListItem>
            <Link href="/" variant="button">
              Home
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/about" variant="button">
              About
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/contact-us" variant="button">
              Contact Us
            </Link>
          </ListItem>
        </List>
      </Drawer>
    </React.Fragment>
  );
}
