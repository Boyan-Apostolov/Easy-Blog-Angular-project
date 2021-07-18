export interface User {
  id?: string;
  firebaseId?: string;
  username: string;
  email: string;
  bio: string;
  imgUrl: string;
  isAdmin?: boolean;
}
