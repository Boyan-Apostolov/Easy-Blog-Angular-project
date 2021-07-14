import { User } from '../user/user';

export interface BlogComment {
  id?: string;
  postId: string;
  user: User;
  createdOn: string;
  content: string;
}
