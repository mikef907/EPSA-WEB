import { Container } from '@material-ui/core';
import React from 'react';
import NavBar from './NavBar';

const Layout: React.FC = (props: any) => {
  return (
    <React.Fragment>
      <NavBar></NavBar>
      <Container maxWidth="lg">{props.children}</Container>
    </React.Fragment>
  );
};

export default Layout;
