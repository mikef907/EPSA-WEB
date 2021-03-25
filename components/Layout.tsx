import { Container, useMediaQuery, useTheme } from '@material-ui/core';
import React from 'react';
import { useWindowSize } from '../hooks/windowSize';
import Footer from './Footer';
import NavBar from './NavBar';

const Layout: React.FC = (props: any) => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const windowSize = useWindowSize();

  const offset = () => (sm ? 64 : 39) + 119;

  return (
    <React.Fragment>
      <NavBar></NavBar>
      <Container
        maxWidth="lg"
        style={{ minHeight: windowSize.height - offset() }}
      >
        {props.children}
      </Container>
      <Footer></Footer>
    </React.Fragment>
  );
};

export default Layout;
