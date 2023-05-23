import { POST_TABLE_NAME, USER_TABLE_NAME } from "src/constants";

export const POST_SCHEMA = `
  CREATE TABLE ${POST_TABLE_NAME} IF NOT EXISTS (
    postID          UUID PRIMARY KEY,
    content         TEXT NOT NULL
    userID          UUID REFERENCES ${USER_TABLE_NAME} (userID),
    createdAt       TIMESTAMPZ DEFAULT NOW(),
    updatedAt       TIMESTAMPZ DEFAULT NOW()
  )
`;
