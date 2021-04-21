import { CircularProgress, Typography } from '@material-ui/core';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/Layout';
import {
  AllPostIdsDocument,
  PostByIdDocument,
  PostQuery,
} from '../../generated/graphql';
import { client } from '../_app';

interface IProps {
  post: PostQuery;
}

const Post: NextPage<IProps> = ({ post }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <CircularProgress color="secondary" />;
  }

  return (
    <Layout>
      {
        <>
          <Typography
            variant="h4"
            component="h1"
            style={{ textAlign: 'center' }}
          >
            {post.headline}
          </Typography>
          <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
        </>
      }
    </Layout>
  );
};

export async function getStaticProps({ params }: any) {
  const { data } = await client.query({
    query: PostByIdDocument,
    variables: { id: params.id },
  });

  data.post.published = data.post.published.toLocaleString();
  data.post.created_at = data.post.created_at.toLocaleString();
  data.post.updated_at = data.post.updated_at.toLocaleString();

  return {
    props: {
      post: data.post,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: AllPostIdsDocument,
  });

  return {
    paths: data?.allPosts.map((post: PostQuery) => {
      return {
        params: {
          id: post.id,
        },
      };
    }),
    fallback: true,
  };
}

export default Post;
