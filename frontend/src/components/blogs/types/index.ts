import { Author, Review, Comment as comment } from "./type";

export interface Blog {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  likes: number;
  dislikes: number;
  rating: number;
  tags: string[];
  comments: Comment[];
  imageUrl: string;
}

export interface Blogpost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  date: string;
  category: string;
  readTime: number;
  author: Author;
  likes: number;
  comments: number;
  commentsList: comment[];
  reviews: Review[];
  shares: number;
  userHasLiked?: boolean;
  views?: number;
}


export interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  blogs: string[]; // Array of blog IDs
}
