export interface Blog {
  id: string;
  creatorId: string;
  createdOn: string;
  title: string;
  imgUrl: string;
  content: string;
  likes: string[];
  comments: string[];
  views: string[];
  tags: string[];
}
