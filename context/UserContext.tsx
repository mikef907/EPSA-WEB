import { createContext } from 'react';
import jwt_decode from 'jwt-decode';

export interface IUser {
  first_name: string;
  last_name: string;
  email: string;
}

// export type User = {
//   user: IUser;
//   setUser: (user: User) => void;
// };

const token = () => localStorage.getItem('token');

export const parseUserFromToken = () => {
  const val = token();

  if (val) {
    console.log('user', (jwt_decode(token() as string) as any).user);
    return (jwt_decode(token() as string) as any).user as IUser;
  }
};

export const UserContext = createContext<any>(null);
