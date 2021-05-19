import { Grid, Button, CircularProgress } from '@material-ui/core';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext, parseUserFromToken } from '../context/UserContext';
import {
  useAddUserMutation,
  useMyProfileLazyQuery,
  useUpdateMyProfileMutation,
} from '../generated/graphql';
import ErrorDisplay from './ErrorDisplay';
import InputFormControl from './InputFormControl';

interface IFormInput {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const UserForm: React.FC = () => {
  const { user, setUser } = React.useContext(UserContext);

  const [isNew] = useState(!user);

  const [
    loadMyProfile,
    { data: myProfileData, loading: myProfileLoading, error: myProfileError },
  ] = useMyProfileLazyQuery();

  const [addUser, { loading: addUserLoading, error: addUserError }] =
    useAddUserMutation();

  const [
    updateMyProfile,
    {
      data: updateResult,
      loading: updateMyProfileLoading,
      error: updateMyProfileError,
    },
  ] = useUpdateMyProfileMutation();

  const { handleSubmit, getValues, reset, control } = useForm<IFormInput>();

  const onSubmit = async (input: IFormInput) => {
    if (isNew) {
      const result = await addUser({
        variables: {
          newUser: {
            first_name: input.firstname,
            last_name: input.lastname,
            email: input.email,
            password: input.password,
          },
        },
      });
      if (result.data?.addUser) {
        setUser(parseUserFromToken(result.data?.addUser));
        router.push('/');
      }
    } else {
      updateMyProfile({
        variables: {
          user: {
            id: user!.id.toString(),
            first_name: input.firstname,
            last_name: input.lastname,
            email: input.email,
            password: input.password,
          },
        },
      });
    }
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.id) {
      loadMyProfile();
    }
  }, []);

  useEffect(() => {
    if (myProfileData) {
      reset({
        firstname: myProfileData.myProfile.first_name,
        lastname: myProfileData.myProfile.last_name,
        email: myProfileData.myProfile.email,
      });
    }
  }, [myProfileData]);

  useEffect(() => {
    setLoading(addUserLoading || updateMyProfileLoading);
  }, [addUserLoading, updateMyProfileLoading]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid spacing={1} container direction="row">
        {myProfileLoading && <CircularProgress />}
        {!myProfileLoading && (
          <>
            <Grid item xs={12}>
              <InputFormControl
                name="firstname"
                label="First Name"
                control={control}
                rules={{ required: 'First name is required' }}
                inputProps={{ maxLength: 50 }}
                inputLabelProps={null}
              />
            </Grid>
            <Grid item xs={12}>
              <InputFormControl
                name="lastname"
                label="Last Name"
                control={control}
                rules={{ required: 'Last name is required' }}
                inputProps={{ maxLength: 50 }}
                inputLabelProps={null}
              />
            </Grid>
            <Grid item xs={12}>
              <InputFormControl
                name="email"
                label="Email"
                type="email"
                control={control}
                rules={{ required: 'Email is required' }}
                inputProps={{ maxLength: 75 }}
                inputLabelProps={null}
              />
            </Grid>
            <Grid item xs={12}>
              <InputFormControl
                name="password"
                label="Password"
                type="password"
                control={control}
                rules={{
                  required: isNew ? 'Password is required' : false,
                  minLength: {
                    value: 10,
                    message:
                      'Password must be at least 10 chars long because security',
                  },
                }}
                inputProps={{ maxLength: 75 }}
                inputLabelProps={null}
              />
            </Grid>
            <Grid item xs={12}>
              <InputFormControl
                name="confirmPassword"
                label="Password Confirm"
                type="password"
                control={control}
                rules={{
                  required: isNew ? 'Confirm password is required' : false,
                  validate: (value: any) =>
                    value === getValues('password') || 'Passwords do not match',
                }}
                inputProps={{ maxLength: 75 }}
                inputLabelProps={null}
              />
            </Grid>
            <Grid item md={4}>
              <Button
                type="submit"
                style={{ alignSelf: 'flex-end' }}
                disabled={loading}
                variant="contained"
                color="primary"
              >
                {isNew ? 'Sign Up' : 'Update'}
                {loading && <CircularProgress color="secondary" size={20} />}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <ErrorDisplay
                error={myProfileError || addUserError || updateMyProfileError}
              />
            </Grid>
          </>
        )}
      </Grid>
    </form>
  );
};

export default UserForm;
