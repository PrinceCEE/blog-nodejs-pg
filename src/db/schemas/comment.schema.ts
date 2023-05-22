import {
  COMMENT_TABLE_NAME,
  POST_TABLE_NAME,
  USER_TABLE_NAME,
} from "src/constants";

export const COMMENT_SCHEMA = `
  CREATE TABLE ${COMMENT_TABLE_NAME} IF NOT EXIST (
    commentID     UUID PRIMARY KEY,
    content       TEXT NOT NULL,
    postID        UUID REFERENCES ${POST_TABLE_NAME} (postID),
    userID        UUID REFERENCES ${USER_TABLE_NAME} (userID)
  )
`;
