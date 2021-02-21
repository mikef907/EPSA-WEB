import { createContext } from 'react';
import jwt_decode from 'jwt-decode';

export interface IUser {
  first_name: string;
  last_name: string;
  email: string;
}

export type User = {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
};

const token = () => localStorage.getItem('token');

export const setUserFromLocalStorage = () => {
  const val = token();

  if (val) {
    return (jwt_decode(token() as string) as any).user as IUser;
  }

  return null;
};

export const parseUserFromToken = (token: string) => {
  localStorage.setItem('token', token);
  return (jwt_decode(token) as any).user as IUser;
};

export const UserContext = createContext<User>({
  user: null,
  setUser: () => null,
});
