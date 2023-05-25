import { Pool } from "pg";
import {
  COMMENT_TABLE_NAME,
  POST_TABLE_NAME,
  FORGOT_PASSWORD_CODE_TABLE_NAME,
  AUTH_TABLE_NAME,
  USER_TABLE_NAME,
} from "../constants";

export const dropDBs = async (pool: Pool) => {
  const tables = [
    COMMENT_TABLE_NAME,
    POST_TABLE_NAME,
    FORGOT_PASSWORD_CODE_TABLE_NAME,
    AUTH_TABLE_NAME,
    USER_TABLE_NAME,
  ];

  for await (let table of tables) {
    await pool.query(`DROP TABLE IF EXISTS ${table}`);
  }
};
