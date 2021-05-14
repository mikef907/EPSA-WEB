import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import dayjs from 'dayjs';
import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import InputFormControl from '../../../components/InputFormControl';
import LanguagePicker from '../../../components/LanguagePicker';
import Layout from '../../../components/Layout';
import Protect from '../../../components/Protect';
import {
  GroupInput,
  useAllStaffQuery,
  useCreateGroupMutation,
  useGroupByIdLazyQuery,
  useUpdateGroupMutation,
} from '../../../generated/graphql';

interface Context extends NextPageContext {
  query: {
    id: string[] | undefined;
  };
}

interface IProps {
  id: number | undefined;
}

interface IFormInput {
  facilitatorId: number;
  city: string;
  zipCode: number;
  language: string;
  title: string;
  description?: string | null;
  start: Date;
  end: Date;
  limit: number;
}

const Group: NextPage<IProps> = ({ id }) => {
  const router = useRouter();
  const {
    handleSubmit,
    reset,
    getValues,
    control,
    formState: { errors },
  } = useForm<IFormInput>();
  const [groupQuery, { loading: queryLoading, data }] = useGroupByIdLazyQuery();
  const [updateGroup, { loading: updateLoading }] = useUpdateGroupMutation();
  const [createGroup, { loading: addLoading }] = useCreateGroupMutation();
  const { loading: staffLoading, data: staffData } = useAllStaffQuery();

  const isLoading = () => queryLoading || updateLoading || addLoading;

  useEffect(() => {
    if (id) groupQuery({ variables: { id } });
  }, [id]);

  useEffect(() => {
    if (data?.group) {
      reset({
        facilitatorId: data.group.facilitatorId,
        city: data.group.city,
        zipCode: data.group.zipCode,
        language: data.group.language,
        title: data.group.title,
        description: data.group.description,
        start: data.group.start,
        end: data.group.end,
        limit: data.group.limit,
      });
    }
  }, [data]);

  const onSubmit = async (input: IFormInput) => {
    if (id) {
      await updateGroup({
        variables: {
          group: input as GroupInput,
          id,
        },
      });
    } else {
      const result = await createGroup({
        variables: { group: input as GroupInput },
      });
      router.push(`${result.data?.createGroup}`);
    }
  };

  return (
    <Layout>
      <Typography component="h1" variant="h4" style={{ textAlign: 'center' }}>
        Group
      </Typography>
      <Protect roles={['Staff']}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container justify="center">
            <Grid item md={6}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Controller
                      name="facilitatorId"
                      control={control}
                      defaultValue=""
                      rules={{ required: 'Facilitator required' }}
                      render={({ field }) => (
                        <>
                          <InputLabel htmlFor="language-label" shrink={true}>
                            Facilitator
                          </InputLabel>
                          <Select {...field}>
                            {staffData?.allStaff.map((_) => (
                              <MenuItem
                                key={_.user.id}
                                value={_.user.id}
                              >{`${_.user.first_name} ${_.user.last_name}`}</MenuItem>
                            ))}
                          </Select>
                        </>
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <InputFormControl
                    name="city"
                    label="City"
                    control={control}
                    rules={{ required: 'City is required' }}
                    inputProps={{ maxLength: 255 }}
                  ></InputFormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <InputFormControl
                    name="zipCode"
                    label="Zip Code"
                    type="number"
                    control={control}
                    rules={{ required: 'Zip code is required' }}
                    inputProps={{ max: 99999 }}
                  ></InputFormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth>
                    <Controller
                      name="language"
                      control={control}
                      defaultValue="en"
                      render={({ field }) => (
                        <LanguagePicker field={field}></LanguagePicker>
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <InputFormControl
                    name="title"
                    label="Title"
                    control={control}
                    rules={{ required: 'Title is required' }}
                    inputProps={{ maxLength: 255 }}
                  ></InputFormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <InputFormControl
                    name="description"
                    label="Description"
                    control={control}
                    inputProps={{ maxLength: 255 }}
                  ></InputFormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <InputFormControl
                    name="limit"
                    label="Group Limit"
                    control={control}
                    rules={{ required: 'Group limit is required' }}
                    inputProps={{ max: 99 }}
                    type="number"
                  ></InputFormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth>
                    <Controller
                      name="start"
                      control={control}
                      defaultValue={dayjs(new Date())}
                      rules={{ required: 'Start required' }}
                      render={({ field, fieldState: { error } }) => (
                        <KeyboardDatePicker
                          inputRef={field.ref}
                          disableToolbar
                          disablePast
                          autoOk
                          variant="inline"
                          format="MM/DD/YYYY"
                          label="Start Date"
                          value={field.value}
                          onChange={field.onChange}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                          error={!!error}
                          helperText={error?.message}
                        ></KeyboardDatePicker>
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth>
                    <Controller
                      name="end"
                      control={control}
                      defaultValue={dayjs(new Date()).add(10, 'weeks').toDate()}
                      rules={{
                        required: 'End required',
                        validate: (value: Date) =>
                          dayjs(value).isAfter(getValues('start')) ||
                          'End cannot be before start',
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <KeyboardDatePicker
                          inputRef={field.ref}
                          disableToolbar
                          disablePast
                          autoOk
                          variant="inline"
                          format="MM/DD/YYYY"
                          label="End Date"
                          value={field.value}
                          onChange={field.onChange}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                          error={!!error}
                          helperText={error?.message}
                        ></KeyboardDatePicker>
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item>
                  <Button
                    type="submit"
                    style={{ alignSelf: 'flex-end' }}
                    disabled={isLoading()}
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
      </Protect>
    </Layout>
  );
};

Group.getInitialProps = (ctx: Context) => {
  if (ctx.query?.id) {
    return { id: parseInt(ctx.query.id[0]) };
  }
  return { id: undefined };
};

export default Group;
