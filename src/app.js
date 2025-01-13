import express from "express";
import cors from "cors";
import "dotenv/config";

import teamBRoutes from './routes/teamB.routes.js';
import teamARoutes from './routes/teamA.routes.js';
import internalRoutes from './routes/internal.routes.js';
import { loggerMiddleware } from "./middlewares/loggerMiddleware.js";
import cookieParser from "cookie-parser";
const app = express();

// Middleware
app.use(
  cors({
    origin: `http://192.168.1.9:5173`, 
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(loggerMiddleware);
//Routes
app.use('/admin-server', teamBRoutes);
app.use('/client-server', teamARoutes);
app.use('/internal', internalRoutes);
export default app;
