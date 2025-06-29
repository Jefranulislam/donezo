import { configDotenv } from "dotenv";
import dbConnection from "./utils/db.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import express from "express";
import cors from "cors"
import { errorHandler, routeNotFound } from "./middlewares/errorMiddleware.js";
import router from "./routes/index.js";



configDotenv()

const PORT = process.env.PORT;

dbConnection();
const app = express();



const allowedOrigins = [
  'https://donezo-mu.vercel.app',
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.options('*', cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(morgan("dev"));
app.use("/api", router);

app.use(routeNotFound);
app.use(errorHandler);

app.listen(PORT, ()=> console.log(`server on ${PORT}`)    );


import jwt from "jsonwebtoken";

export const createJWT = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });
    res.cookie("token", token, {
        httpOnly: true,
        secure: true, // Always true for production (cross-site)
        sameSite: "none", // Required for cross-site cookies
        maxAge: 1 * 24 * 60 * 60 * 1000 // 1 day
    });
};
