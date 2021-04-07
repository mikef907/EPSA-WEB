import React from 'react';
import { useAllPostsQuery } from '../generated/graphql';
import NextLink from 'next/link';
import {
  CircularProgress,
  Link,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';

const PostsPreview: React.FC = () => {
  const { data, loading } = useAllPostsQuery();

  return (
    <>
      {loading && <CircularProgress color="secondary" />}
      {data && (
        <List>
          {data.allPosts.map((post) => {
            return (
              <ListItem key={post.id} button>
                <ListItemText
                  primary={post.headline}
                  secondaryTypographyProps={{ component: 'span' }}
                  secondary={
                    <NextLink as={'/post'} href="/post/[[...id]]" passHref>
                      <Link>Link</Link>
                    </NextLink>
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
