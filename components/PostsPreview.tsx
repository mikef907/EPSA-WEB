import React from 'react';
import { StaffQuery, useAllPostsQuery } from '../generated/graphql';
import {
  Avatar,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import Link from './Link';

const getAuthorImgLink = (author: StaffQuery) =>
  author.img ? `${process.env.api}/images/${author.img}` : '';

const PostsPreview: React.FC = () => {
  const { data, loading } = useAllPostsQuery({
    variables: { isPublished: true, take: 5 },
  });

  return (
    <>
      {loading && <CircularProgress color="secondary" />}
      {data && (
        <List>
          {data.allPosts.map((post) => {
            return (
              <ListItem key={post.id}>
                <Avatar
                  style={{ marginRight: '5px' }}
                  src={getAuthorImgLink(post.author as StaffQuery)}
                ></Avatar>
                <ListItemText
                  primary={post.headline}
                  secondaryTypographyProps={{ component: 'span' }}
                  secondary={
                    <>
                      <Typography variant="subtitle2">{`Published on ${post.published.toLocaleDateString()} at ${post.published.toLocaleTimeString()}`}</Typography>
                      <Link as={`/post/${post.id}`} href="/post/[id]">
                        Link
                      </Link>
                    </>
                  }
                />
              </ListItem>
            );
          })}
        </List>
      )}
    </>
  );
};

export default PostsPreview;
