import {
  Avatar,
  Button,
  createStyles,
  FormControl,
  Grid,
  makeStyles,
  TextareaAutosize,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import dayjs from 'dayjs';
import { NextPage, NextPageContext } from 'next';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../../components/Layout';
import Protect from '../../components/Protect';
import { UserContext } from '../../context/UserContext';
import {
  useStaffByIdQuery,
  useUpdateStaffMutation,
  useUserByIdQuery,
} from '../../generated/graphql';
import theme from '../../themes';

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
  description: string;
  imgfile: string;
  start: Date;
}

interface IUser {
  first_name: string;
  last_name: string;
  email: string;
}

interface IStaff {
  id: number;
  userId: number;
  start: Date;
  description?: string;
  img?: string;
  user: IUser;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    large: {
      width: 200,
      height: 200,
    },
  })
);

const StaffPage: NextPage<IProps> = ({ id }) => {
  const { user, checkRoles } = useContext(UserContext);

  const [description, setDescription] = useState<string>('');

  const {
    register,
    errors,
    reset,
    handleSubmit,
    setValue,
    getValues,
  } = useForm();

  const { data, loading } = useStaffByIdQuery({ variables: { id } });

  const [updateStaff] = useUpdateStaffMutation();

  const onSubmit = async (input: IFormInput) => {
    if (data) {
      updateStaff({
        variables: {
          staff: {
            id: data.staff.id,
            userId: data.staff.userId,
            description,
            start: input.start,
            user: {
              first_name: input.firstname,
              last_name: input.lastname,
              email: input.email,
            },
          },
        },
      });
    }
  };

  const classes = useStyles();

  useEffect(() => {
    if (data?.staff) {
      console.log(data.staff);

      // setStaff({
      //   img: data.staff?.img as string | undefined,
      //   description: data.staff?.description as string | undefined,
      //   start: data.staff.start,
      //   user: {
      //     first_name: data.staff.user.first_name,
      //     last_name: data.staff.user.last_name,
      //     email: data.staff.user.email,
      //   },
      // });

      setDescription(data.staff.description || '');

      reset({
        firstname: data.staff.user.first_name,
        lastname: data.staff.user.last_name,
        email: data.staff.user.email,
        img: data.staff.img,
        description: data.staff.description,
        start: dayjs(data.staff.start).format('YYYY-MM-DD'),
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
          {data?.staff.user?.first_name} {data?.staff.user?.last_name}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container justify="center">
            <Grid item md={6}>
              <Grid container direction="row" justify="center" spacing={2}>
                <Grid container direction="column" alignItems="center">
                  <Grid item md={12}>
                    <Avatar className={classes.large}></Avatar>
                  </Grid>
                  <Grid item>
                    <Typography variant="caption">
                      Upload avatar here
                    </Typography>
                  </Grid>
                  <Grid item>
                    <input type="file"></input>
                  </Grid>
                </Grid>
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
                      disabled={!checkRoles(user, 'Admin')}
                      error={!!errors.start}
                      helperText={errors.start?.message}
                    ></TextField>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption">Description</Typography>
                  <FormControl fullWidth>
                    <TextareaAutosize
                      name="description"
                      rowsMin="4"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    ></TextareaAutosize>
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
