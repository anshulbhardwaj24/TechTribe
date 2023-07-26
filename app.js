import cookieParser from "cookie-parser";
import express from "express";
import { config } from "dotenv";
import userRouter from "./routes/user.js"
import { errorMiddleware } from "./middleware/error.js";
import cors from 'cors';

export const app = express();


// MIDDLEWARES
app.use(
  cors({
    origin: ["http://localhost:3000"], // Add your frontend URL to the origins array
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


app.use(express.json());
app.use(cookieParser());


config({
    path:"./data/config.env"
})



//USING ROUTES
app.use("/api/v3/user",userRouter);
app.use(errorMiddleware);