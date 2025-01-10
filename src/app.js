import express from "express";
import cors from "cors";
import "dotenv/config";

import teamBRoutes from "./routes/teamB.routes.js";
import teamARoutes from "./routes/teamA.routes.js";
import { loggerMiddleware } from "./middlewares/loggerMiddleware.js";

const app = express();

const allowedOrigins = [
  `http://${process.env.TEAM_A_FRONTEND_HOST}:${process.env.TEAM_A_FRONTEND_PORT}`,
  `http://${process.env.TEAM_B_FRONTEND_HOST}:${process.env.TEAM_B_FRONTEND_PORT}`,
];
//Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies and authorization headers
  })
);
app.use(express.json());
app.use(loggerMiddleware);

//Routes
app.use("/admin-server", teamBRoutes);
app.use("/client-server", teamARoutes);

export default app;
