export type ITableNames = "auths" | "comments" | "users" | "posts";

export interface Auth {
  authID: string;
  userID: string;
  password: string;
  passwordsHistory: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  userID: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Post {
  postID: string;
  content: string;
  userID: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  commentID: string;
  content: string;
  postID: string;
  userID: string;
  createdAt: Date;
  updatedAt: Date;
}
