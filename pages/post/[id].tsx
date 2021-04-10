import { gql } from '@apollo/client';
import { CircularProgress, Typography } from '@material-ui/core';
import { NextPage, NextPageContext } from 'next';
import React from 'react';
import Layout from '../../components/Layout';
import { useAllPostIdsQuery, usePostByIdQuery } from '../../generated/graphql';
import { client } from '../_app';

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

// export async function getStaticProps({ params }: any) {
//   console.log(params.id);
//   return {
//     props: {
//       id: parseInt(params.id),
//     },
//   };
// }

//export async function getStaticPaths() {
// return {
//   paths: [
//     {
//       params: {
//         id: '1',
//       },
//     },
//   ],
//   fallback: false,
// };

//   const { data } = await client.query({
//     query: gql`
//       query AllPostIds {
//         allPosts {
//           id
//         }
//       }
//     `,
//   });

//   console.log(data);

//   return {
//     paths: data?.allPosts.map((post: any) => {
//       return {
//         params: {
//           id: post.id,
//         },
//       };
//     }),
//     fallback: false,
//   };
// }

export default Post;
