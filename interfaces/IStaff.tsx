import { IUser } from './IUser';

export interface IStaff {
  id: number;
  userId: number;
  start: Date;
  description?: string;
  img?: string;
  user: IUser;
}
