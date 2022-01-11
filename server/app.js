import express from "express";
import "express-async-errors"; // promise , async에서 발생하는 오류를 잡을 수 있도록
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import notesRouter from "./router/notes.js";

const app = express(); // 어플리케이션을 만듦

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({path:'variables.env'});

console.log(process.env.MONGODB_URL);

mongoose.connect(process.env.MONGODB_URL).then(() => console.log('MongoDB Connected...')).catch(err => console.log(err))

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("tiny"));

app.use("/notes", notesRouter);
// 다른 url이 요청이 왔을 때 우리가 처리해줄 수 없는거라면 not found로 처리해줘야 함
app.use((req, res, next) => {
  res.sendStatus(404); // 지원하지 않는 api이다. 라는 의미
});

app.use((error, req, res, next) => {
  // 뭔가 최후의 방어선 같은 에러의 느낌?
  console.error(error); // 에러를 출력
  res.sendStatus(500);
});
app.listen(8080);
