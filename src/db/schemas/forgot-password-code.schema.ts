import {
  FORGOT_PASSWORD_CODE_TABLE_NAME,
  USER_TABLE_NAME,
} from "src/constants";

export const FORGOT_PASSWORD_CODE_SCHEMA = `
  CREATE TABLE IF NOT EXISTS ${FORGOT_PASSWORD_CODE_TABLE_NAME} (
    tokenID     UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    userID      UUID REFERENCES ${USER_TABLE_NAME} (userID)
    code        VARCHAR(6) NOT NULL,
    isVerified  BOOLEAN NOT NULL DEFAULT false
  )
`;
