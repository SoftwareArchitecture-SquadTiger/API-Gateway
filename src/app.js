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
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);
app.use(cookieParser());
//Routes
app.use('/admin-server', teamBRoutes);
app.use('/client-server', teamARoutes);
app.use('/internal', internalRoutes);
export default app;
