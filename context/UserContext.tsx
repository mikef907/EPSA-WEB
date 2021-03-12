import { createContext } from 'react';
import jwt_decode from 'jwt-decode';

export interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  roles: IRole[];
}

export interface IRole {
  name: string;
}

export type User = {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  checkRoles: (user: IUser | null, ...roles: string[]) => boolean;
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

export const checkRoles = (user: IUser | null, ...roles: string[]) => {
  if (user) return user.roles.some((role) => roles.includes(role.name));
  else return false;
};

export const UserContext = createContext<User>({
  user: null,
  setUser: () => null,
  checkRoles: () => false,
});
