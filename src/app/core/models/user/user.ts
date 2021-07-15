import { Blog } from '../blog/blog';
import { Achievment } from './achievment';

export interface User {
  id?: string;
  firebaseId?: string;
  username: string;
  // password: string;
  email: string;
  bio: string;
  imgUrl: string;
  likes?: string[];
  comments?: string[];
  views?: string[];
  blogs?: Blog[];
  achievements?: Achievment[];
}
