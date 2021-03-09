import {
  Button,
  FormControl,
  Grid,
  TextareaAutosize,
  TextField,
  Typography,
} from '@material-ui/core';
import dayjs from 'dayjs';
import { NextPage, NextPageContext } from 'next';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../../components/Layout';
import Protect from '../../components/Protect';
import { useUserByIdQuery } from '../../generated/graphql';

interface Context extends NextPageContext {
  query: {
    id: string;
  };
}

interface IProps {
  id: number;
}

interface IFormInput {
  firstname: string;
  lastname: string;
  email: string;
  description?: string;
  img?: string;
}

interface IStaff {
  id: number;
  userId: number;
  date: Date;
  description?: string;
  img?: string;
}

interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  staff: Partial<IStaff>;
}

const StaffPage: NextPage<IProps> = ({ id }) => {
  const [user, setUser] = useState<Partial<IUser>>();

  const { register, errors, reset, handleSubmit } = useForm();

  const { data, loading } = useUserByIdQuery({ variables: { id } });

  const onSubmit = async (input: IFormInput) => {};

  useEffect(() => {
    if (data?.user) {
      console.log(data.user);

      setUser({
        first_name: data.user.first_name,
        last_name: data.user.last_name,
        email: data.user.email,
        staff: {
          img: data.user.staff?.img as string | undefined,
          description: data.user.staff?.description as string | undefined,
        },
      });

      reset({
        firstname: data.user.first_name,
        lastname: data.user.last_name,
        email: data.user.email,
        img: data.user.staff?.img,
        description: data.user.staff?.description,
        start: dayjs(data.user.staff?.start).format('YYYY-MM-DD'),
      });
    }
  }, [data]);

  return (
    <Protect roles={['Admin', 'Staff']}>
      <Layout>
        <Typography
          variant="h4"
          component="h1"
          style={{ textAlign: 'center' }}
          gutterBottom
        >
          {data?.user.first_name} {data?.user.last_name}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container justify="center">
            <Grid item>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      name="firstname"
                      label="First Name"
                      inputProps={{ maxLength: 50 }}
                      inputRef={register({
                        required: 'First name required',
                      })}
                      error={!!errors.firstname}
                      helperText={errors.firstname?.message}
                    ></TextField>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      name="lastname"
                      label="Last Name"
                      inputProps={{ maxLength: 50 }}
                      inputRef={register({
                        required: 'Last name required',
                      })}
                      error={!!errors.lastname}
                      helperText={errors.lastname?.message}
                    ></TextField>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      name="email"
                      label="Email"
                      inputProps={{ maxLength: 50 }}
                      inputRef={register({
                        required: 'Email required',
                      })}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    ></TextField>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      type="date"
                      name="start"
                      label="Start"
                      inputRef={register({
                        required: 'Start is required',
                      })}
                      error={!!errors.start}
                      helperText={errors.start?.message}
                    ></TextField>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <TextareaAutosize name="description"></TextareaAutosize>
                  </FormControl>
                </Grid>
                <Grid item>
                  <Button
                    type="submit"
                    style={{ alignSelf: 'flex-end' }}
                    disabled={loading}
                    variant="contained"
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Layout>
    </Protect>
  );
};

StaffPage.getInitialProps = (ctx: Context) => {
  return { id: parseInt(ctx.query.id) };
};

export default StaffPage;
