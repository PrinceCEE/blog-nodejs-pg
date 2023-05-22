import { ITableNames } from "src/types";

const authTableName: ITableNames = "auths";
const userTableName: ITableNames = "users";

export const AUTH_SCHEMA = `
  CREATE TABLE ${authTableName} IF NOT EXIST (
    authID            UUID PRIMARY KEY,
    userID            UUID NOT NULL REFERENCES ${userTableName} (userID)
    password          TEXT NOT NULL,
    passwordsHistory  TEXT[] DEFAULT []
  )
`;
