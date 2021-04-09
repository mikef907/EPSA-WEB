import { CircularProgress, Typography } from '@material-ui/core';
import { NextPage, NextPageContext } from 'next';
import React from 'react';
import Layout from '../../components/Layout';
import { usePostByIdQuery } from '../../generated/graphql';

interface Context extends NextPageContext {
  query: {
    id: string;
  };
}

interface IProps {
  id: number;
}

const Post: NextPage<IProps> = ({ id }) => {
  const { data, loading } = usePostByIdQuery({ variables: { id } });

  return (
    <Layout>
      {loading && <CircularProgress color="secondary" />}
      {data && (
        <>
          <Typography
            variant="h4"
            component="h1"
            style={{ textAlign: 'center' }}
          >
            {data.post.headline}
          </Typography>
          <div dangerouslySetInnerHTML={{ __html: data.post.content }}></div>
        </>
      )}
    </Layout>
  );
};

Post.getInitialProps = (ctx: Context) => {
  return { id: parseInt(ctx.query.id) };
};

export default Post;
