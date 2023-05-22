import pg from "pg";
import {
  AUTH_SCHEMA,
  COMMENT_SCHEMA,
  POST_SCHEMA,
  USER_SCHEMA,
} from "./schemas";
import { ITableNames } from "src/types";

export const pool = new pg.Pool();

export const insertObject = <T>(table: ITableNames, data: any) => {
  const keys = Object.keys(data);
  const values = Object.values(data);

  if (keys.length === 0) {
    throw new Error("Data empty");
  }

  const columns = keys.join(", ");
  const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");
  return pool.query<T[]>(
    `INSERT INTO ${table} (${columns}) VALUES (${placeholders}) RETURNING *`,
    values
  );
};

export const updateObject = (table: ITableNames, data: any) => {};

export const initDB = async () => {
  await Promise.all([
    pool.query(AUTH_SCHEMA),
    pool.query(COMMENT_SCHEMA),
    pool.query(POST_SCHEMA),
    pool.query(USER_SCHEMA),
  ]);
};
