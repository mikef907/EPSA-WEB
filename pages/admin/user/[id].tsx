import {
  Box,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  List,
  ListItem,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { NextPage, NextPageContext } from 'next';
import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import {
  RoleQuery,
  useAssignRoleMutation,
  useRemoveRoleMutation,
  useRolesQuery,
  useUserByIdLazyQuery,
} from '../../../generated/graphql';

interface Context extends NextPageContext {
  query: {
    id: string[] | undefined;
  };
}

interface IProps {
  id: number | undefined;
}

const UserDetails: NextPage<IProps> = ({ id }) => {
  const [userQuery, { data, loading, error }] = useUserByIdLazyQuery();

  const { data: rolesData } = useRolesQuery();

  const [avialableRoles, setAvialableRoles] = useState<RoleQuery[]>([]);

  const [
    remove,
    { data: removeResult, loading: removeLoading, error: removeError },
  ] = useRemoveRoleMutation({ refetchQueries: ['UserById'] });

  const [add, { data: addResult, loading: addLoading, error: addError }] =
    useAssignRoleMutation({ refetchQueries: ['UserById'] });

  useEffect(() => {
    if (id) userQuery({ variables: { id } });
  }, []);

  useEffect(() => {
    if (rolesData && data)
      setAvialableRoles(
        rolesData.roles.filter(
          (role) =>
            role.name !== 'Staff' &&
            !data.user.roles.find((_) => _.id === role.id)
        )
      );
  }, [data?.user.roles, rolesData]);

  return (
    <Layout>
      <Typography component="h1" variant="h4" style={{ textAlign: 'center' }}>
        User Details
      </Typography>
      {loading && (
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
          }}
        >
          <CircularProgress></CircularProgress>
        </Box>
      )}
      {!loading && (
        <Grid container justify="center">
          <Grid item md={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={data?.user.first_name}
                  InputProps={{
                    readOnly: true,
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={data?.user.last_name}
                  InputProps={{
                    readOnly: true,
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Email"
                  value={data?.user.email}
                  InputProps={{
                    readOnly: true,
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={6}>
                <Box style={{ display: 'flex' }}>
                  <Typography
                    component="span"
                    style={{ flex: 'auto', padding: 12, fontWeight: 'bold' }}
                  >
                    Roles{' '}
                  </Typography>
                  <IconButton title="Click to add a role to the user">
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>
                <List>
                  <ListItem>
                    <FormControl fullWidth>
                      <Select
                        value=""
                        onChange={(e) => {
                          add({
                            variables: {
                              roleId: parseInt(e.target.value as any),
                              userId: parseInt(data!.user.id),
                            },
                          });
                        }}
                        style={{ width: '100%' }}
                      >
                        {rolesData &&
                          data &&
                          avialableRoles.map((role) => (
                            <MenuItem key={role.id} value={role.id}>
                              {role.name}
                            </MenuItem>
                          ))}
                      </Select>
                      <FormHelperText>
                        Select a role to add to the user
                      </FormHelperText>
                    </FormControl>
                  </ListItem>
                  {data?.user.roles.map((role) => (
                    <ListItem key={role.id}>
                      <Typography style={{ flex: 'auto' }}>
                        {role.name}
                      </Typography>
                      <IconButton
                        disabled={role.name === 'User'}
                        color="secondary"
                        size="small"
                        aria-label="Leave group"
                        onClick={() => {
                          if (confirm('Remove role from user?')) {
                            remove({
                              variables: {
                                userId: parseInt(data?.user.id),
                                roleId: parseInt(role.id),
                              },
                            });
                          }
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
};

UserDetails.getInitialProps = (ctx: Context) => {
  if (ctx.query?.id) {
    return { id: parseInt(ctx.query.id[0]) };
  }
  return { id: undefined };
};

export default UserDetails;
