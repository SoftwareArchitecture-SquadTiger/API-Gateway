import express from "express";

import {
  getAllProjects,
  getProjectById,
} from "../gateway-handlers/A/projectReq.js";

const router = express.Router();

//Project
router.get("/projects", getAllProjects); //GET all projects
router.get("/project/:id", getProjectById); //GET a project by id


export default router;
