import pg from "pg";
import {
  AUTH_SCHEMA,
  COMMENT_SCHEMA,
  FORGOT_PASSWORD_CODE_SCHEMA,
  POST_SCHEMA,
  USER_SCHEMA,
  UUID_EXTENSION,
} from "./schemas";
import { ITableNames } from "../types";

export const pool = new pg.Pool();

export const insertObject = async <T>(table: ITableNames, data: Partial<T>) => {
  const keys = Object.keys(data);
  const values = Object.values(data);

  if (keys.length === 0) {
    throw new Error("Data empty");
  }

  const columns = keys.join(", ");
  const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");
  const queryResult = await pool.query<T>(
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

  return pool.query<T>(query, values).then((q) => q.rows);
};

export const updateObject = async <T>(
  table: ITableNames,
  filter: Partial<T>,
  data: Partial<T>
) => {
  const filterKeys = Object.keys(filter);
  const filterValues = Object.values(filter);

  const dataKeys = Object.keys(data);
  const dataValues = Object.values(data);

  let whereCommand = "",
    setCommand = "";
  if (filterKeys.length !== 0) {
    whereCommand = `WHERE ${filterValues
      .map((v, i) => `${v}=$${i + 1}`)
      .join(", ")}`;
  }
  if (dataKeys.length !== 0) {
    setCommand = `SET ${dataValues.map((v, i) => `${v}=$${i + 1}`).join(", ")}`;
  }
  return pool
    .query<T>(
      `UPDATE FROM ${table} ${setCommand} ${whereCommand} RETURNING *`,
      dataValues
    )
    .then((r) => r.rows[0]);
};

export const deletedObject = async <T>(
  table: ITableNames,
  filter: Partial<T>
) => {
  const key = Object.keys(filter)[0];
  const value = Object.values(filter)[0];

  return pool.query(`DELETE FROM ${table} WHERE ${key}=${value}`);
};

export const initDB = async () => {
  const schemas = [
    USER_SCHEMA,
    AUTH_SCHEMA,
    FORGOT_PASSWORD_CODE_SCHEMA,
    POST_SCHEMA,
    COMMENT_SCHEMA,
    UUID_EXTENSION,
  ];

  for await (let schema of schemas) {
    await pool.query(schema);
  }
};
