import { User } from '../user/user';

export interface ChatMessage {
  id?: string;
  content: string;
  user: User;
  createdOn: string;
}
