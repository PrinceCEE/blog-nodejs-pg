import { AUTH_TABLE_NAME, USER_TABLE_NAME } from "src/constants";

export const AUTH_SCHEMA = `
  CREATE TABLE ${AUTH_TABLE_NAME} IF NOT EXIST (
    authID            UUID PRIMARY KEY,
    userID            UUID NOT NULL REFERENCES ${USER_TABLE_NAME} (userID)
    password          TEXT NOT NULL,
    passwordsHistory  TEXT[] DEFAULT []
  )
`;
