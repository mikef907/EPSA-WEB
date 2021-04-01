import { Typography } from '@material-ui/core';
import { NextPage, NextPageContext } from 'next';
import React, { useState } from 'react';
import SunEditor, { buttonList } from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import Layout from '../../../components/Layout';

interface Context extends NextPageContext {
  query: {
    id: string[] | undefined;
  };
}

interface IProps {
  id: number | undefined;
}

const StaffBlogPage: NextPage<IProps> = ({ id }) => {
  return (
    <Layout>
      <Typography
        variant="h4"
        component="h1"
        style={{ textAlign: 'center' }}
        gutterBottom
      >
        EPSA Blog
      </Typography>
      <SunEditor
        setOptions={{
          buttonList: buttonList.complex,
        }}
      ></SunEditor>
    </Layout>
  );
};

StaffBlogPage.getInitialProps = (ctx: Context) => {
  if (ctx.query?.id) {
    return { id: parseInt(ctx.query.id[0]) };
  }
  return { id: undefined };
};

export default StaffBlogPage;
