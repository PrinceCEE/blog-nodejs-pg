import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { authRouter, userRouter, commentRouter, postRouter } from "./routers";
import { Req, Res, Next, IResponse } from "./types";

const app = express();

// set up the routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.get("/health", (req, res) => res.send("Server is healthy"));
app.use("/auth", authRouter());
app.use("/user", userRouter());
app.use("/comment", commentRouter());
app.use("/post", postRouter());

// handling errors
app.use((err: any, req: Req, res: Res, next: Next) => {
  const code = err.status ? err.status : 500;

  const data: IResponse = {
    status: false,
    message: err.message,
    data: err,
  };
  res.status(code).json(data);
});

app.use((req: Req, res: Res, next: Next) => {
  const data: IResponse = {
    status: false,
    message: "Not found",
  };
  res.status(400).json(data);
});

export default app;
