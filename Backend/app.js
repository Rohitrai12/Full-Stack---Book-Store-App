import express from "express";
import { db } from "./config/db.js";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import dotenv from "dotenv";
dotenv.config();

// initialize server
 export const app = express();

app.use(cors());
app.use(express.json());

// initialized mongodb conn.

db(); 

// defining routes

app.use("/book", bookRoute);
app.use("/user", userRoute);


