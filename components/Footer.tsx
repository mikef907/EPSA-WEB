import { Box, Typography, Grid } from '@material-ui/core';
import { Instagram, Facebook, Email } from '@material-ui/icons';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignContent="center"
      alignItems="center"
    >
      <Grid item>
        <Typography variant="h5">Connect with us!</Typography>
      </Grid>
      <Grid item>
        <Box>
          <Facebook></Facebook>
          <Email></Email>
          <Instagram></Instagram>
        </Box>
      </Grid>
      <Grid>
        <Typography variant="subtitle1">
          Copyright PIPA {new Date().getFullYear()}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
