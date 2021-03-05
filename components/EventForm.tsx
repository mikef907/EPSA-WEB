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
} from '../generated/graphql';
import Layout from './Layout';
import Protect from './Protect';
import dayjs from 'dayjs';
import CheckBox from '@material-ui/core/Checkbox';

interface IProps {
  id?: number;
}

interface IFormInput {
  name: string;
  description?: string;
  start: Date;
  end: Date;
  allDay: boolean | null;
}

const EventForm: React.FC<IProps> = ({ id }) => {
  const [allDay, setAllDay] = useState<boolean>();

  const [eventQuery, { data }] = useEventByIdLazyQuery();

  const [eventUpdate, { loading }] = useUpdateEventMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    errors,
  } = useForm<IFormInput>();

  const onSubmit = async (input: IFormInput) => {
    await eventUpdate({
      variables: {
        event: {
          id: id as number,
          name: input.name,
          description: input.description || '',
          start: input.start,
          end: input.end,
          allDay: input.allDay,
        },
      },
    });
  };

  useEffect(() => {
    if (id) {
      eventQuery({ variables: { id } });
    }
  }, []);

  useEffect(() => {
    reset({
      name: data?.event.name,
      description: data?.event.description,
      start: dayjs(data?.event.start).format('YYYY-MM-DDTHH:mm'),
      end: dayjs(data?.event.end).format('YYYY-MM-DDTHH:mm'),
    });
    setAllDay(data?.event.allDay || false);
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
          Edit Event
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
                      inputRef={register()}
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
                            checked={allDay}
                            onChange={(event) => {
                              setAllDay(event.target.checked);
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
