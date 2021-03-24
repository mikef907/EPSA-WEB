import { Container, useTheme } from '@material-ui/core';
import React from 'react';
import { useWindowSize } from '../hooks/windowSize';
import Footer from './Footer';
import NavBar from './NavBar';

const Layout: React.FC = (props: any) => {
  const theme = useTheme();

  const windowSize = useWindowSize();

  return (
    <React.Fragment>
      <NavBar></NavBar>
      <Container maxWidth="lg" style={{ minHeight: windowSize.height - 106 }}>
        {props.children}
      </Container>
      <Footer></Footer>
    </React.Fragment>
  );
};

export default Layout;
