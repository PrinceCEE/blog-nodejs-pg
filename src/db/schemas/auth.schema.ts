import { AUTH_TABLE_NAME, USER_TABLE_NAME } from "../../constants";

export const AUTH_SCHEMA = `
  CREATE TABLE IF NOT EXISTS ${AUTH_TABLE_NAME} (
    authID            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    userID            UUID NOT NULL REFERENCES ${USER_TABLE_NAME} (userID),
    password          TEXT NOT NULL,
    passwordsHistory  TEXT[] DEFAULT '{}',
    createdAt         TIMESTAMPTZ DEFAULT NOW(),
    updatedAt         TIMESTAMPTZ DEFAULT NOW()
  )
`;
