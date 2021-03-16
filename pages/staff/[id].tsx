import {
  Avatar,
  Button,
  createStyles,
  FormControl,
  Grid,
  makeStyles,
  TextareaAutosize,
  TextField,
  Typography,
} from '@material-ui/core';
import { NextPage, NextPageContext } from 'next';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../../components/Layout';
import Protect from '../../components/Protect';
import { getUserImgLink, UserContext } from '../../context/UserContext';
import {
  useStaffByIdQuery,
  useUpdateStaffMutation,
  useUploadAvatarMutation,
} from '../../generated/graphql';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

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
  start: Date;
}

// interface IUser {
//   first_name: string;
//   last_name: string;
//   email: string;
// }

// interface IStaff {
//   id: number;
//   userId: number;
//   start: Date;
//   description?: string;
//   img?: string;
//   user: IUser;
// }

const useStyles = makeStyles(() =>
  createStyles({
    large: {
      width: 200,
      height: 200,
    },
  })
);

const StaffPage: NextPage<IProps> = ({ id }) => {
  const classes = useStyles();

  const { user, checkRoles, setUser } = useContext(UserContext);

  const [description, setDescription] = useState<string>('');

  const [startDate, setStartDate] = useState<MaterialUiPickersDate>(null);

  const { register, errors, reset, handleSubmit, setValue, watch } = useForm();

  const startDateValue = watch('start') as Date;

  const { data, loading } = useStaffByIdQuery({ variables: { id } });

  const [updateStaff] = useUpdateStaffMutation();

  const [uploadAvatar] = useUploadAvatarMutation();

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

  const fileUpload = async ({
    target: {
      files: [file],
    },
  }: any) => {
    if (file && data && user) {
      await uploadAvatar({ variables: { file, userId: data.staff.userId } });
      setUser({ ...user, img: file.name });
      localStorage.setItem(process.env.tmpImgKey as string, file.name);
    }
  };

  useEffect(() => register('start', { required: 'Start date required' }), [
    register,
  ]);

  useEffect(() => {
    setStartDate(startDateValue || null);
  }, [setStartDate, startDateValue]);

  useEffect(() => {
    if (data?.staff) {
      console.log(data.staff);

      setDescription(data.staff.description || '');

      reset({
        firstname: data.staff.user.first_name,
        lastname: data.staff.user.last_name,
        email: data.staff.user.email,
        img: data.staff.img,
        description: data.staff.description,
        start: data.staff.start,
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
                    <Avatar
                      className={classes.large}
                      src={getUserImgLink(user)}
                    ></Avatar>
                  </Grid>
                  <Grid item>
                    <Typography variant="caption">
                      Upload avatar here
                    </Typography>
                  </Grid>
                  <Grid item>
                    <input type="file" onChange={fileUpload}></input>
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
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      label="Start Date"
                      value={startDate}
                      onChange={(date) =>
                        setValue('start', date, {
                          shouldValidate: true,
                          shouldDirty: true,
                        })
                      }
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      disabled={!checkRoles(user, 'Admin')}
                      error={!!errors.start}
                      helperText={errors.start?.message}
                    ></KeyboardDatePicker>
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
