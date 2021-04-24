import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Layout from '../components/Layout';
import UpcomingEvents from '../components/UpcomingEvents';
import PostsPreview from '../components/PostsPreview';
import { NextPage } from 'next';
import {
  AllPostsDocument,
  EventQuery,
  EventsDocument,
  PostQuery,
} from '../generated/graphql';
import { client } from './_app';
import { CODES } from '../constants';

interface IProps {
  posts: PostQuery[];
  events: EventQuery[];
}

const Index: NextPage<IProps> = ({ posts, events }) => {
  return (
    <Layout>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to EPSA.
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
      <Box marginY="10px">
        <Typography variant="h5">Upcoming Events</Typography>
        <UpcomingEvents events={events}></UpcomingEvents>
      </Box>
      <Box>
        <Typography variant="h5">Recent Posts</Typography>
        <PostsPreview posts={posts}></PostsPreview>
      </Box>
    </Layout>
  );
};

export default Index;

export async function getStaticProps() {
  const { data: posts } = await client.query({
    query: AllPostsDocument,
    variables: { isPublished: true, take: 5 },
  });

  const { data: events } = await client.query({
    query: EventsDocument,
    variables: { take: 5 },
  });

  return {
    props: {
      posts: posts.allPosts.map((post: any) => {
        post.published = post.published.toLocaleString();
        post.created_at = post.created_at.toLocaleString();
        post.updated_at = post.updated_at.toLocaleString();
        return post;
      }),
      events: events.events.map((event: any) => {
        event.start = event.start.toLocaleString();
        event.end = event.end?.toLocaleString() || null;
        event.language = CODES.filter(
          (_) => _.code === event.language.toLocaleLowerCase()
        )[0].name;
        return event;
      }),
    },
    revalidate: 120,
  };
}
