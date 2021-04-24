import { MenuItem, Select } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import { useUserListQuery } from '../generated/graphql';
import { IUser } from '../interfaces/IUser';

interface IProps {
  id: string;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  user: IUser | null;
}

const UsersPicker: React.FC<IProps> = ({ id, setUser, user }) => {
  const { data, loading } = useUserListQuery({
    variables: { notInRoles: ['Staff'] },
  });

  return (
    <>
      {loading && <CircularProgress />}
      {data && (
        <Select
          style={{ width: '100%' }}
          id={id}
          onChange={(e) => setUser(JSON.parse(e.target.value as string))}
          value={user ? JSON.stringify(user) : ''}
        >
          {data.users.map((user) => (
            <MenuItem key={user.id} value={JSON.stringify(user)}>
              {user.first_name} {user.last_name} ({user.email})
            </MenuItem>
          ))}
        </Select>
      )}
    </>
  );
};

export default UsersPicker;
