import {Picture} from './Picture';
export interface User {
  email: string;
  first_name?: string;
  id?: string;
  last_name?: string;
  name: string;
  picture?: Picture;
  token: string;
}
