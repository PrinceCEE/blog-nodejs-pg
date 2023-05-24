import { USER_TABLE_NAME } from "../../constants";

export const USER_SCHEMA = `
  CREATE TABLE IF NOT EXISTS ${USER_TABLE_NAME} (
    userID          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    firstName       VARCHAR(150) NOT NULL ,
    lastName        VARCHAR(150) NOT NULL,
    email           VARCHAR(200) NOT NULL UNIQUE,
    createdAt       TIMESTAMPTZ DEFAULT NOW(),
    updatedAt       TIMESTAMPTZ DEFAULT NOW()
  );
`;
