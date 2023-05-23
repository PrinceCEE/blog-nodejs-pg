import { Request, Response, NextFunction } from "express";
import { User } from "./table.types";

export type Req = Request & { user?: User };
export type Res = Response;
export type Next = NextFunction;
