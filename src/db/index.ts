import pg from "pg";
import {
  AUTH_SCHEMA,
  COMMENT_SCHEMA,
  POST_SCHEMA,
  USER_SCHEMA,
  UUID_EXTENSION,
} from "./schemas";
import { ITableNames } from "src/types";

export const pool = new pg.Pool();

export const insertObject = async <T>(table: ITableNames, data: Partial<T>) => {
  const keys = Object.keys(data);
  const values = Object.values(data);

  if (keys.length === 0) {
    throw new Error("Data empty");
  }

  const columns = keys.join(", ");
  const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");
  const queryResult = await pool.query<T[]>(
    `INSERT INTO ${table} (${columns}) VALUES (${placeholders}) RETURNING *`,
    values
  );

  return queryResult.rows[0] as T;
};

export const getObjects = async <T>(table: ITableNames, filter: Partial<T>) => {
  const keys = Object.keys(filter);
  const values = Object.values(filter);

  let query: string;
  if (keys.length === 0) {
    query = `SELECT * FROM ${table}`;
  } else {
    const placeholders = values.map((v, i) => `${v}=$${i + 1}`).join(", ");
    query = `SELECT * FROM ${table} WHERE ${placeholders}`;
  }

  return pool.query<T[]>(query, values).then((q) => q.rows);
};

export const updateObject = async <T>(
  table: ITableNames,
  data: Partial<T>
) => {};

export const initDB = async () => {
  await Promise.all([
    pool.query(AUTH_SCHEMA),
    pool.query(COMMENT_SCHEMA),
    pool.query(POST_SCHEMA),
    pool.query(USER_SCHEMA),
    pool.query(UUID_EXTENSION),
  ]);
};
