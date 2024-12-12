import express from "express";

import { getAllProjects } from "../gateway-handlers/A/projectReq.js";

const router = express.Router();

//Project
router.get("/projects", getAllProjects); //GET all projects

export default router;