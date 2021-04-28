import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import React, { useState, useEffect, useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { UserContext } from '../context/UserContext';
import {
  Avatar,
  Button,
  FormControl,
  Grid,
  InputLabel,
  TextareaAutosize,
  TextField,
  Typography,
} from '@material-ui/core';
import {
  useStaffByIdLazyQuery,
  useUpdateStaffMutation,
  useUploadAvatarMutation,
  useAddStaffMutation,
} from '../generated/graphql';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { IUser } from '../interfaces/IUser';
import UsersPicker from './UsersPicker';
import { useRouter } from 'next/router';
import { API, IMGKEY } from '../constants';
import { useStyles } from '../hooks/styles';

interface IProps {
  id?: number;
}

export interface IFormInput {
  firstname: string;
  lastname: string;
  email: string;
  description: string;
  start: Date;
}

const StaffForm: React.FC<IProps> = ({ id }) => {
  const classes = useStyles();

  const router = useRouter();

  const { user, checkRoles, setUser } = useContext(UserContext);

  const [newStaff, setNewStaff] = useState<IUser | null>(null);

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [description, setDescription] = useState<string>('');

  const [staffById, { data, loading }] = useStaffByIdLazyQuery();

  const [updateStaff] = useUpdateStaffMutation();

  const [addStaff] = useAddStaffMutation();

  const onSubmit = async (input: IFormInput) => {
    if (id && data) {
      await updateStaff({
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
    } else if (!id && newStaff) {
      await addStaff({
        variables: {
          staff: {
            userId: newStaff.id,
            start: input.start,
            user: {
              first_name: input.firstname,
              last_name: input.lastname,
              email: input.email,
            },
          },
        },
      });

      router.push(`/admin/staff`);
    }
  };

  const [uploadAvatar] = useUploadAvatarMutation({
    refetchQueries: ['StaffById'],
  });

  const fileUpload = async ({
    target: {
      files: [file],
    },
  }: any) => {
    if (file && data && user) {
      await uploadAvatar({ variables: { file, userId: data.staff.userId } });
      if (user.id === data.staff.userId) {
        setUser({ ...user, img: file.name });
        localStorage.setItem(IMGKEY, file.name);
      }
    }
  };

  useEffect(() => {
    if (id !== undefined) staffById({ variables: { id } });
  }, []);

  useEffect(() => {
    if (data?.staff) {
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

  useEffect(() => {
    if (!id && newStaff) {
      reset({
        firstname: newStaff.first_name,
        lastname: newStaff.last_name,
        email: newStaff.email,
      });
    }
  }, [newStaff]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container justify="center">
        <Grid item md={6}>
          <Grid
            container
            direction="row"
            justify="center"
            spacing={2}
            style={{ margin: 0 }}
          >
            {id && (
              <Grid container direction="column" alignItems="center">
                <>
                  <Grid item md={12}>
                    <Avatar
                      className={classes.large}
                      src={data && `${API}/images/${data?.staff.img}`}
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
                </>
              </Grid>
            )}
            {!id && (
              <Grid item xs={12} md={12}>
                <FormControl fullWidth>
                  <InputLabel id="user-label">Select user to assign</InputLabel>
                  <UsersPicker
                    id="user-label"
                    setUser={setNewStaff}
                    user={newStaff}
                  ></UsersPicker>
                </FormControl>
              </Grid>
            )}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Controller
                  name="firstname"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'First name required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      InputLabelProps={{ shrink: true }}
                      label="First Name"
                      inputProps={{ maxLength: 50 }}
                      error={!!errors.firstname}
                      helperText={errors.firstname?.message}
                    ></TextField>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Controller
                  name="lastname"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Last name required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      InputLabelProps={{ shrink: true }}
                      label="Last Name"
                      inputProps={{ maxLength: 50 }}
                      error={!!errors.lastname}
                      helperText={errors.lastname?.message}
                    ></TextField>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Email required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      InputLabelProps={{ shrink: true }}
                      label="Email"
                      inputProps={{ maxLength: 50 }}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    ></TextField>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Controller
                  name="start"
                  control={control}
                  defaultValue={new Date()}
                  rules={{ required: 'Start required' }}
                  render={({ field }) => (
                    <KeyboardDatePicker
                      inputRef={field.ref}
                      disableToolbar
                      autoOk
                      variant="inline"
                      format="MM/DD/YYYY"
                      label="Start Date"
                      defaultValue={new Date()}
                      value={field.value || new Date()}
                      onChange={field.onChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      disabled={!checkRoles(user, 'Admin')}
                      error={!!errors.start}
                      helperText={errors.start?.message}
                    ></KeyboardDatePicker>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="caption">Description</Typography>
              <FormControl fullWidth>
                <TextareaAutosize
                  name="description"
                  rowsMin="4"
                  maxLength={255}
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
                color="primary"
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default StaffForm;
