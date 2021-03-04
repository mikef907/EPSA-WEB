import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useEventByIdLazyQuery } from '../generated/graphql';
import Layout from './Layout';
import Protect from './Protect';
import * as dayjs from 'dayjs';
import { CheckBox } from '@material-ui/icons';

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
  const [eventQuery, { data }] = useEventByIdLazyQuery();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    errors,
  } = useForm<IFormInput>();

  const onSubmit = () => {};

  useEffect(() => {
    if (id) {
      eventQuery({ variables: { id } });
    }
  }, []);

  useEffect(() => {
    reset({
      name: data?.event.name,
      description: data?.event.description,
      start: dayjs(data?.event.start).format('YYYY-MM-DDTHH:mm:ss'),
      end: dayjs(data?.event.end).format('YYYY-MM-DDTHH:mm:ss'),
      allDay: data?.event.allDay,
    });
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
                      inputRef={register({ required: 'Event name required' })}
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
                        control={<CheckBox name="allDay"></CheckBox>}
                      ></FormControlLabel>
                    </FormGroup>
                  </FormControl>
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
