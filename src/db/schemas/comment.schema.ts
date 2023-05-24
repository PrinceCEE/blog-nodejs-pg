import {
  COMMENT_TABLE_NAME,
  POST_TABLE_NAME,
  USER_TABLE_NAME,
} from "../../constants";

export const COMMENT_SCHEMA = `
  CREATE TABLE IF NOT EXISTS ${COMMENT_TABLE_NAME} (
    commentID     UUID PRIMARY KEY,
    content       TEXT NOT NULL,
    postID        UUID REFERENCES ${POST_TABLE_NAME} (postID),
    userID        UUID REFERENCES ${USER_TABLE_NAME} (userID),
    createdAt     TIMESTAMPTZ DEFAULT NOW(),
    updatedAt     TIMESTAMPTZ DEFAULT NOW()
  )
`;
