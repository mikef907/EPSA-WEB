import { Box, Typography } from '@material-ui/core';
import React from 'react';
import Layout from '../components/Layout';

const About: React.FC = () => {
  return (
    <Layout>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          About PIPA
        </Typography>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem
          ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Egestas quis ipsum
          suspendisse ultrices gravida dictum fusce ut placerat. Pretium nibh
          ipsum consequat nisl vel pretium lectus quam id. Vitae ultricies leo
          integer malesuada nunc vel risus commodo. Feugiat in fermentum posuere
          urna nec tincidunt praesent semper. Vel orci porta non pulvinar.
          Pulvinar sapien et ligula ullamcorper malesuada proin libero nunc.
          Sollicitudin aliquam ultrices sagittis orci a scelerisque purus
          semper. Felis donec et odio pellentesque diam. Ligula ullamcorper
          malesuada proin libero. Dignissim cras tincidunt lobortis feugiat
          vivamus. Tincidunt vitae semper quis lectus nulla at volutpat diam.
          Tristique senectus et netus et.
        </Typography>
      </Box>
    </Layout>
  );
};

export default About;
