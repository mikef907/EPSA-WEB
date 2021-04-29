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
import InputFormControl from './InputFormControl';

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
            description: input.description,
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
            description: input.description,
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
              <InputFormControl
                control={control}
                name="firstname"
                label="First Name"
                rules={{ required: 'First name is required' }}
                inputProps={{ maxLength: 50 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputFormControl
                control={control}
                name="lastname"
                label="Last Name"
                rules={{ required: 'Last name is required' }}
                inputProps={{ maxLength: 50 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputFormControl
                control={control}
                name="email"
                label="Email"
                rules={{ required: 'Email is required' }}
                inputProps={{ maxLength: 50 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Controller
                  name="start"
                  control={control}
                  defaultValue={null}
                  rules={{ required: 'Start required' }}
                  render={({ field }) => (
                    <KeyboardDatePicker
                      inputRef={field.ref}
                      disableToolbar
                      autoOk
                      variant="inline"
                      format="MM/DD/YYYY"
                      label="Start Date"
                      value={field.value}
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
                <Controller
                  name="description"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextareaAutosize
                      {...field}
                      rowsMin="4"
                      maxLength={255}
                      value={field.value || ''}
                      onChange={field.onChange}
                    ></TextareaAutosize>
                  )}
                />
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
