import { POST_TABLE_NAME, USER_TABLE_NAME } from "../../constants";

export const POST_SCHEMA = `
  CREATE TABLE ${POST_TABLE_NAME} IF NOT EXISTS (
    postID          UUID PRIMARY KEY,
    content         TEXT NOT NULL,
    userID          UUID REFERENCES ${USER_TABLE_NAME} (userID),
    createdAt       TIMESTAMPTZ DEFAULT NOW(),
    updatedAt       TIMESTAMPTZ DEFAULT NOW()
  )
`;
