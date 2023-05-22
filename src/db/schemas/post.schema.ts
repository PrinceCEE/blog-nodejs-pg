import { ITableNames } from "src/types";

const postTableName: ITableNames = "posts";
const userTableName: ITableNames = "users";

export const POST_SCHEMA = `
  CREATE TABLE ${postTableName} IF NOT EXIST (
    postID  UUID PRIMARY KEY,
    content TEXT NOT NULL
    userID UUID REFERENCES ${userTableName} (userID)
  )
`;
