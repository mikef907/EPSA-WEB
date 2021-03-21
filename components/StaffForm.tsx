import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { getUserImgLink, UserContext } from '../context/UserContext';
import {
  Avatar,
  Button,
  createStyles,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
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
import UsersDDL from './UsersDDL';
import { useRouter } from 'next/router';

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

const useStyles = makeStyles(() =>
  createStyles({
    large: {
      width: 200,
      height: 200,
    },
  })
);

const StaffForm: React.FC<IProps> = ({ id }) => {
  const classes = useStyles();

  const router = useRouter();

  const { user, checkRoles, setUser } = useContext(UserContext);

  const [newStaff, setNewStaff] = useState<IUser | null>(null);

  const { register, errors, reset, handleSubmit, setValue, watch } = useForm();

  const [startDate, setStartDate] = useState<MaterialUiPickersDate>(null);

  const startDateValue = watch('start') as Date;

  const [description, setDescription] = useState<string>('');

  const [staffById, { data, loading }] = useStaffByIdLazyQuery();

  const [updateStaff] = useUpdateStaffMutation();

  const [addStaff] = useAddStaffMutation();

  const onSubmit = async (input: IFormInput) => {
    if (id && data) {
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

  const [uploadAvatar] = useUploadAvatarMutation();

  const fileUpload = async ({
    target: {
      files: [file],
    },
  }: any) => {
    if (file && data && user) {
      await uploadAvatar({ variables: { file, userId: data.staff.userId } });
      if (user.id === data.staff.userId) {
        setUser({ ...user, img: file.name });
        localStorage.setItem(process.env.tmpImgKey as string, file.name);
      }
    }
  };

  useEffect(() => {
    console.log('use effect');
    if (id !== undefined) staffById({ variables: { id } });
  }, []);

  useEffect(() => register('start', { required: 'Start date required' }), [
    register,
  ]);

  useEffect(() => {
    if (data?.staff) {
      console.log('staff data', data.staff);

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
    setStartDate(startDateValue || null);
  }, [setStartDate, startDateValue]);

  useEffect(() => {
    if (!id && newStaff) {
      console.log('user selected', newStaff);
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
                </>
              </Grid>
            )}
            {!id && (
              <Grid item xs={12} md={12}>
                <FormControl fullWidth>
                  <InputLabel id="user-label">Select user to assign</InputLabel>
                  <UsersDDL
                    id="user-label"
                    setUser={setNewStaff}
                    user={newStaff}
                  ></UsersDDL>
                </FormControl>
              </Grid>
            )}
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
                  autoOk
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
  );
};

export default StaffForm;
