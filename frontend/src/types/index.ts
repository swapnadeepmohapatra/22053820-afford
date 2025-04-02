export interface User {
  id: string;
  name: string;
  postCount: number;
  rank: number;
}

export interface Comment {
  id: number;
  postid: number;
  content: string;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  commentCount?: number;
  comments: Comment[];
  rank?: number;
}
