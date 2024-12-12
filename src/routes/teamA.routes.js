import express from "express";

import {
  createNewProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
} from "../gateway-handlers/A/projectReq.js";

const router = express.Router();

//Project
router.get("/projects", getAllProjects); //GET all projects
router.get("/project/:id", getProjectById); //GET a project by id
router.post("/project/create", createNewProject); //POST a project
router.put("/project/update/:id", updateProjectById); //PUT a project by id


export default router;
