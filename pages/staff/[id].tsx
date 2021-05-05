import { NextPage, NextPageContext } from 'next';
import React from 'react';
import Layout from '../../components/Layout';
import Protect from '../../components/Protect';
import StaffForm from '../../components/StaffForm';

interface Context extends NextPageContext {
  query: {
    id: string[] | undefined;
  };
}

interface IProps {
  id: number | undefined;
}

const StaffPage: NextPage<IProps> = ({ id }) => {
  return (
    <Layout>
      <Protect roles={['Admin', 'Staff']}>
        <StaffForm id={id}></StaffForm>
      </Protect>
    </Layout>
  );
};

StaffPage.getInitialProps = (ctx: Context) => {
  if (ctx.query?.id) {
    return { id: parseInt(ctx.query.id[0]) };
  }
  return { id: undefined };
};

export default StaffPage;
