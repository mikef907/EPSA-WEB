import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Input,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  useEventByIdLazyQuery,
  useUpdateEventMutation,
  useAddEventMutation,
} from '../generated/graphql';
import Layout from './Layout';
import Protect from './Protect';
import dayjs from 'dayjs';
import CheckBox from '@material-ui/core/Checkbox';
import { useRouter } from 'next/router';
import LanguagePicker from './LanguagePicker';
import {
  KeyboardDatePicker,
  KeyboardDateTimePicker,
} from '@material-ui/pickers';

interface IProps {
  id?: number;
}

interface IFormInput {
  name: string;
  description?: string;
  start: Date;
  end: Date;
  allDay: boolean | null;
  zipCode: number;
  language: string;
}

interface IEvent extends IFormInput {
  id: string;
}

const EventForm: React.FC<IProps> = ({ id }) => {
  const router = useRouter();

  const [event, setEvent] = useState<Partial<IEvent>>({});

  const [eventQuery, { data }] = useEventByIdLazyQuery();

  const [eventUpdate, { loading }] = useUpdateEventMutation();

  const [eventAdd] = useAddEventMutation();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit = async (input: IFormInput) => {
    if (event.id)
      await eventUpdate({
        variables: {
          event: {
            id: parseInt(event.id),
            name: input.name,
            description: input.description || '',
            start: input.start,
            end: input.end,
            allDay: input.allDay,
            zipCode: input.zipCode,
            language: input.language,
          },
        },
      });
    else {
      const result = await eventAdd({
        variables: {
          event: {
            name: input.name,
            description: input.description || '',
            start: input.start,
            end: input.end,
            allDay: input.allDay,
            zipCode: input.zipCode,
            language: input.language,
          },
        },
      });
      router.push(`${result.data?.addEvent.id}`, undefined, { shallow: true });
      setEvent({ ...event, id: result.data?.addEvent.id });
    }
  };

  useEffect(() => {
    if (id) {
      eventQuery({ variables: { id } });
    }
  }, []);

  useEffect(() => {
    if (data?.event) {
      setEvent({
        ...data.event,
      });

      reset({
        name: data.event.name,
        description: data.event.description,
        start: dayjs(data.event.start).format('YYYY-MM-DDTHH:mm'),
        end: dayjs(data.event.end).format('YYYY-MM-DDTHH:mm'),
        zipCode: data.event.zipCode,
        language: data.event.language,
      });
    }
  }, [data]);

  return (
    <Layout>
      <Protect roles={['Admin', 'Staff']}>
        <Typography
          variant="h4"
          component="h1"
          style={{ textAlign: 'center' }}
          gutterBottom
        >
          {event.id ? 'Edit Event' : 'Add Event'}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container justify="center">
            <Grid item>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <FormControl fullWidth>
                    <Controller
                      name="name"
                      control={control}
                      rules={{ required: 'Event name is required' }}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          InputLabelProps={{ shrink: true }}
                          label="Name"
                          error={!!errors.name}
                          helperText={errors.name?.message}
                        ></TextField>
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl fullWidth>
                    <Controller
                      name="zipCode"
                      control={control}
                      rules={{ required: 'Zip code is required' }}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          InputLabelProps={{ shrink: true }}
                          label="Zip Code"
                          error={!!errors.zipCode}
                          helperText={errors.zipCode?.message}
                        ></TextField>
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl fullWidth>
                    <Controller
                      name="language"
                      control={control}
                      defaultValue={'en'}
                      rules={{ required: true }}
                      render={({ field }) => <LanguagePicker field={field} />}
                    />
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl fullWidth>
                    <Controller
                      name="description"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          InputLabelProps={{ shrink: true }}
                          label="Description"
                          inputProps={{ maxLength: 50 }}
                          error={!!errors.description}
                          helperText={errors.description?.message}
                        ></TextField>
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl fullWidth>
                    <Controller
                      name="start"
                      control={control}
                      defaultValue=""
                      rules={{ required: 'Start date is required' }}
                      render={({ field }) => (
                        <KeyboardDateTimePicker
                          inputRef={field.ref}
                          minutesStep={15}
                          ampm
                          variant="inline"
                          format="MM/DD/YYYY h:mm a"
                          label="Start"
                          disablePast
                          value={field.value || null}
                          onChange={field.onChange}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                          error={!!errors.start}
                          helperText={errors.start?.message}
                        ></KeyboardDateTimePicker>
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl fullWidth>
                    <Controller
                      name="end"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <KeyboardDateTimePicker
                          inputRef={field.ref}
                          minutesStep={15}
                          ampm
                          variant="inline"
                          format="MM/DD/YYYY h:mm a"
                          label="End"
                          disablePast
                          value={field.value || null}
                          onChange={field.onChange}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                          error={!!errors.end}
                          helperText={errors.end?.message}
                        ></KeyboardDateTimePicker>
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl fullWidth>
                    <FormGroup>
                      <FormControlLabel
                        label="All Day"
                        control={
                          <Controller
                            name="language"
                            control={control}
                            defaultValue={false}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <CheckBox
                                {...field}
                                onChange={(input) => {
                                  setEvent({
                                    ...event,
                                    allDay: input.target.checked,
                                  });
                                }}
                              />
                            )}
                          />
                        }
                      ></FormControlLabel>
                    </FormGroup>
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
      </Protect>
    </Layout>
  );
};

export default EventForm;
