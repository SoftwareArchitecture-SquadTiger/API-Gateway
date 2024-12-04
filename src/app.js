import express from "express";
import cors from "cors";

import mockRoutes from './routes/mockRoutes.js';
import loggerMiddleware from "./middlewares/loggerMiddleware.js";

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

//Routes
app.use('/', mockRoutes);

export default app;