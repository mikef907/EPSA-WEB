import '../styles/globals.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Component {...pageProps} />
    </React.Fragment>
  );
}

export default MyApp;
