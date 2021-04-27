import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Link as MatLink,
  List,
  ListItem,
  Switch,
} from '@material-ui/core';
import React, { useContext, useState } from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { getUserImgLink, UserContext } from '../context/UserContext';
import { useRouter } from 'next/router';
import { ThemeContext } from '../context/ThemeContext';
import { useWindowSize } from '../hooks/windowSize';
import Link from './Link';
import { IMGKEY } from '../constants';
import { useStyles } from '../hooks/styles';

const NavBar: React.FC = () => {
  const windowSize = useWindowSize();

  const [open, setOpen] = useState(false);

  const { user, setUser, checkRoles } = useContext(UserContext);

  const router = useRouter();

  const darkTheme = useContext(ThemeContext);

  const logout = () => {
    delete localStorage?.token;
    delete localStorage?.[IMGKEY];
    setUser(null);
    router.push('/');
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleThemeChange = () => {
    darkTheme.setState(!darkTheme.state);
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
            {(windowSize.width > 600 && 'Early Parenting Support Alaska') ||
              'EPSA'}
          </Typography>
          {user ? (
            <>
              <Box marginRight="10px">
                <Typography>Welcome {user.first_name}</Typography>
                <MatLink color="inherit" component="button" onClick={logout}>
                  Logout
                </MatLink>
              </Box>
              <Avatar src={getUserImgLink(user)}></Avatar>
            </>
          ) : (
            <>
              <Link color="textPrimary" href="/login">
                Login
              </Link>
              <Divider
                orientation="vertical"
                variant="middle"
                style={{ height: '24px' }}
              ></Divider>
              <Link color="textPrimary" href="/sign-up">
                Sign Up
              </Link>
            </>
          )}
          <Switch checked={darkTheme.state} onChange={handleThemeChange} />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        open={open}
        classes={{ paper: classes.drawerPaper }}
      >
        <IconButton onClick={handleDrawerClose}>
          <Typography style={{ flexGrow: 1, display: 'flex' }}>EPSA</Typography>
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
            <Link href="/groups" variant="button">
              Groups
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/about" variant="button">
              About
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/staff" variant="button">
              Staff
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/contact-us" variant="button">
              Contact Us
            </Link>
          </ListItem>
        </List>
        {checkRoles(user, 'Admin', 'Staff') && (
          <>
            <Divider />
            <List>
              <ListItem>
                <Typography
                  style={{ flexGrow: 1, display: 'flex', margin: 'auto' }}
                  variant="button"
                  component="p"
                >
                  Admin
                </Typography>
              </ListItem>
              <ListItem>
                <Link href="/staff/posts" variant="button">
                  Blog Posts
                </Link>
              </ListItem>
              <ListItem>
                <Link href="/admin/users" variant="button">
                  Users
                </Link>
              </ListItem>
              <ListItem>
                <Link href="/admin/staff" variant="button">
                  Staff
                </Link>
              </ListItem>
              <ListItem>
                <Link href="/admin/events" variant="button">
                  Events
                </Link>
              </ListItem>
            </List>
          </>
        )}
      </Drawer>
    </React.Fragment>
  );
};

export default NavBar;
