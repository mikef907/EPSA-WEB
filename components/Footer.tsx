import { Box, Typography, Grid, useTheme } from '@material-ui/core';
import { Instagram, Facebook, Email } from '@material-ui/icons';
import React from 'react';

const Footer: React.FC = () => {
  const theme = useTheme();

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignContent="center"
      alignItems="center"
      spacing={1}
      style={{ backgroundColor: theme.palette.primary.light }}
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
          © PIPA {new Date().getFullYear()}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
