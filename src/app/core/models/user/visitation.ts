import { User } from './user';

export interface Visitation {
  id?: string;
  visitedOn?: string;
  visitedBy: User;
}
