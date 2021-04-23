import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
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

  const { register, handleSubmit, reset, errors } = useForm<IFormInput>();

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
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      name="name"
                      label="Name"
                      inputProps={{ maxLength: 50 }}
                      inputRef={register({
                        required: 'Event name required',
                      })}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    ></TextField>
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl fullWidth>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      name="zipCode"
                      label="Zip Code"
                      inputRef={register({
                        required: 'Zip code is required',
                      })}
                      error={!!errors.zipCode}
                      helperText={errors.zipCode?.message}
                    ></TextField>
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl fullWidth>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      name="language"
                      label="Language"
                      inputRef={register({
                        required: 'Language is required',
                      })}
                      error={!!errors.language}
                      helperText={errors.language?.message}
                    ></TextField>
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl fullWidth>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      name="description"
                      label="Description"
                      inputProps={{ maxLength: 50 }}
                      inputRef={register()}
                      error={!!errors.description}
                      helperText={errors.description?.message}
                    ></TextField>
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl fullWidth>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      type="datetime-local"
                      name="start"
                      label="Start"
                      inputRef={register({
                        required: 'Start datetime is required',
                      })}
                      error={!!errors.start}
                      helperText={errors.start?.message}
                    ></TextField>
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl fullWidth>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      type="datetime-local"
                      name="end"
                      label="End"
                      inputProps={{ maxLength: 50 }}
                      inputRef={register()}
                      error={!!errors.end}
                      helperText={errors.end?.message}
                    ></TextField>
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl fullWidth>
                    <FormGroup>
                      <FormControlLabel
                        label="All Day"
                        control={
                          <CheckBox
                            name="allDay"
                            checked={event?.allDay || false}
                            onChange={(input) => {
                              setEvent({
                                ...event,
                                allDay: input.target.checked,
                              });
                            }}
                            inputRef={register()}
                          ></CheckBox>
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
