import { USER_TABLE_NAME } from "src/constants";

export const USER_SCHEMA = `
  CREATE TABLE ${USER_TABLE_NAME} IF NOT EXIST (
    userID      UUID PRIMARY KEY,
    firstName   VARCHAR(150) NOT NULL ,
    lastName    VARCHAR(150) NOT NULL,
    email       VARCHAR(200) NOT NULL UNIQUE
  );
`;
