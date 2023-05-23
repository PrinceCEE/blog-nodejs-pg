import { USER_TABLE_NAME } from "src/constants";

export const USER_SCHEMA = `
  CREATE TABLE ${USER_TABLE_NAME} IF NOT EXISTS (
    userID          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    firstName       VARCHAR(150) NOT NULL ,
    lastName        VARCHAR(150) NOT NULL,
    email           VARCHAR(200) NOT NULL UNIQUE,
    createdAt       TIMESTAMPZ DEFAULT NOW(),
    updatedAt       TIMESTAMPZ DEFAULT NOW()
  );
`;
