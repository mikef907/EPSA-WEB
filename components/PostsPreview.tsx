import React from 'react';
import { useAllPostsQuery } from '../generated/graphql';
import {
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import Link from './Link';

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
                    <Link as={`/post/${post.id}`} href="/post/[id]">
                      Link
                    </Link>
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
