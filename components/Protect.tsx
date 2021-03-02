import { Typography } from '@material-ui/core';
import { useContext } from 'react';
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
          <Typography variant="subtitle2" color="error">
            Unauthorized
          </Typography>
        }
        redirect={false}
      ></Login>
    );
};

export default Protect;
