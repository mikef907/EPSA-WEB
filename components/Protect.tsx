import { Alert } from '@material-ui/lab';
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Login from './Login';

interface IProp {
  roles: string[];
}

const Protect: React.FC<IProp> = ({ children, roles }) => {
  const { user, checkRoles } = useContext(UserContext);

  if (checkRoles(user, ...roles)) return <>{children}</>;
  else
    return (
      <Login
        message={
          <Alert variant="outlined" severity="warning">
            Please log in to continue
          </Alert>
        }
        redirect={false}
      ></Login>
    );
};

export default Protect;
