import express from "express";
import cors from "cors";
import "dotenv/config";

import teamBRoutes from './routes/teamB.routes.js';
import teamARoutes from './routes/teamA.routes.js';
import internalRoutes from './routes/internal.routes.js';
import { loggerMiddleware } from "./middlewares/loggerMiddleware.js";
import cookieParser from "cookie-parser";
const app = express();

const allowedOrigins = [
  `http://${process.env.TEAM_A_FRONTEND_HOST}:${process.env.TEAM_A_FRONTEND_PORT}`,
  `http://${process.env.TEAM_B_FRONTEND_HOST}:${process.env.TEAM_B_FRONTEND_PORT}`,
];
//Middleware
// app.use(cors());
app.use(cors({
    origin: 'http://localhost:5173', // Allow this specific origin
    credentials: true // If you want to allow cookies or authentication hearsde
  }));
  
app.use(express.json());
app.use(loggerMiddleware);
app.use(cookieParser());
//Routes
app.use('/admin-server', teamBRoutes);
app.use('/client-server', teamARoutes);
app.use('/internal', internalRoutes);
export default app;
