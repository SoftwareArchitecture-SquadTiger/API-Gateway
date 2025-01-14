import express from "express";
import cors from "cors";
import "dotenv/config";

import teamBRoutes from './routes/teamB.routes.js';
import teamARoutes from './routes/teamA.routes.js';
import internalRoutes from './routes/internal.routes.js';
import { loggerMiddleware } from "./middlewares/loggerMiddleware.js";
import cookieParser from "cookie-parser";
const app = express();
const HOST = process.env.HOST;
const TEAMAPORT = process.env.TEAM_A_FRONTEND_PORT;
const TEAMBPORT = process.env.TEAM_B_FRONTEND_PORT;
// Middleware
const allowedOrigins = [
  `http://${HOST}:${TEAMAPORT}`,
  `http://${HOST}:${TEAMBPORT}`, // Add more allowed origins here
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow request
      } else {
        callback(new Error('Not allowed by CORS')); // Block request
      }
    },
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
