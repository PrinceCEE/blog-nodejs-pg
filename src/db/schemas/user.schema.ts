import { ITableNames } from "src/types";

const userTableName: ITableNames = "users";

export const USER_SCHEMA = `
  CREATE TABLE ${userTableName} IF NOT EXIST (
    userID      UUID PRIMARY KEY,
    firstName   VARCHAR(150) NOT NULL ,
    lastName    VARCHAR(150) NOT NULL,
    email       VARCHAR(200) NOT NULL UNIQUE
  );
`;
