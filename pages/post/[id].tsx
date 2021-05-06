import {
  Avatar,
  Box,
  CircularProgress,
  Grid,
  Typography,
} from '@material-ui/core';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/Layout';
import {
  AllPostIdsDocument,
  PostByIdDocument,
  PostQuery,
  StaffQuery,
} from '../../generated/graphql';
import { useStaffImg } from '../../hooks/staffImg';
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
    <>
      <Head>
        <title>{post.headline}</title>
        <meta
          name="author"
          content={`${post.author?.user.first_name} ${post.author?.user.last_name}`}
        ></meta>
      </Head>
      <Layout>
        {
          <>
            <Typography
              variant="h4"
              component="h1"
              style={{ textAlign: 'center', marginBottom: '10px' }}
            >
              {post.headline}
            </Typography>
            <Grid container justify="center" spacing={1}>
              <Grid item>
                <Avatar
                  src={useStaffImg(post.author as StaffQuery)}
                  alt="Author image avatar"
                />
              </Grid>
              <Grid item alignContent="flex-end">
                <Typography component="h2" variant="subtitle1">
                  Author: {post.author?.user.first_name}{' '}
                  {post.author?.user.last_name}
                </Typography>
              </Grid>
            </Grid>

            <article
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></article>
          </>
        }
      </Layout>
    </>
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
    revalidate: 120,
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
