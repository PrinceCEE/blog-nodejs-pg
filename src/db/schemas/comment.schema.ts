import { ITableNames } from "src/types";

const commentTableName: ITableNames = "comments";
const postTableName: ITableNames = "posts";
const userTableName: ITableNames = "users";

export const COMMENT_SCHEMA = `
  CREATE TABLE ${commentTableName} IF NOT EXIST (
    commentID UUID PRIMARY KEY,
    content TEXT NOT NULL,
    postID UUID REFERENCES ${postTableName} (postID),
    userID UUID REFERENCES ${userTableName} (userID)
  )
`;
