import { IRole } from './IRole';

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  confirmed: boolean;
  img?: string;
  roles?: IRole[];
}
