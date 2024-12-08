import express from "express";
import cors from "cors";

import teamBRoutes from './routes/teamBRoutes.js';
import loggerMiddleware from "./middlewares/loggerMiddleware.js";

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

//Routes
app.use('/admin-server', teamBRoutes);

export default app;