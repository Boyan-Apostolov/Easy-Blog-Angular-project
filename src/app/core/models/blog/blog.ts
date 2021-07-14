import { User } from '../user/user';
import { BlogComment } from './comment';

export interface Blog {
  id?: string;
  user: User;
  createdOn: string;
  title: string;
  imgUrl: string;
  content: string;
  likes?: string[];
  comments?: BlogComment[];
  views?: string[];
  tags?: string[];
}
