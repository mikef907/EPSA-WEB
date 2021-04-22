import React from 'react';
import { PostQuery, StaffQuery } from '../generated/graphql';
import {
  Avatar,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import Link from './Link';
import { useStaffImg } from '../hooks/staffImg';

interface IProps {
  posts: PostQuery[];
}

const PostsPreview: React.FC<IProps> = ({ posts }) => {
  return (
    <List>
      {posts.map((post) => {
        return (
          <ListItem key={post.id}>
            <Avatar
              style={{ marginRight: '5px' }}
              src={useStaffImg(post.author as StaffQuery)}
            ></Avatar>
            <ListItemText
              primary={post.headline}
              secondaryTypographyProps={{ component: 'span' }}
              secondary={
                <>
                  <Typography variant="subtitle2">{`Published on ${post.published}`}</Typography>
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
  );
};

export default PostsPreview;
