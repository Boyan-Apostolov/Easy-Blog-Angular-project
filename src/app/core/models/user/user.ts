export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  bio: string;
  imgUrl: string;
  likes?: string[];
  comments?: string[];
  views?: string[];
  blogs?: string[];
}
