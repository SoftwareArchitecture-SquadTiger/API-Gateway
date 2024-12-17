import express from "express";

import {
  createNewProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
  getProjectByStatus,
  getProjectsByRegion,
  getProjectsByCurrentAmountLte,
  getProjectsByCurrentAmountGte,
  getProjectsByCountry,
  filterProjectsByDate,
  sortProjectsByCurrentAmountDesc,
  sortProjectsByCurrentAmountAsc,sortProjectsByTargetAmountAsc,sortProjectsByTargetAmountDesc
  





} from "../gateway-handlers/A/projectReq.js";

const router = express.Router();

//Project
//Get
router.get("/projects", getAllProjects); //GET all projects(work)
router.get("/project/:id", getProjectById); //GET a project by id(work)
router.get("/project/status/:status", getProjectByStatus); //GET a project by status(work)
router.get("/project/amount/lte/:currentAmount", getProjectsByCurrentAmountLte); //GET a project by current amount less than or equal to(work)
router.get("/project/region/:region", getProjectsByRegion); //GET a project by region(work)
router.get("/project/country/:country", getProjectsByCountry); //GET all projects sorted by target amount ascending(work)
router.get("/project/date/:startDate/:endDate", filterProjectsByDate); //GET a project by date(not working)
router.get("/project/amount/gte/:currentAmount", getProjectsByCurrentAmountGte); //GET a project by current amount greater than or equal to(work)
router.get("/project/current-amount/asc", sortProjectsByCurrentAmountAsc); //GET all projects sorted by current amount ascending(work)
router.get("/project/current-amount/desc", sortProjectsByCurrentAmountDesc); //GET all projects sorted by current amount descending(work)
router.get("/project/target-amount/asc", sortProjectsByTargetAmountAsc); //GET all projects sorted by target amount ascending(work)
router.get("/project/target-amount/desc", sortProjectsByTargetAmountDesc); //GET all projects sorted by target amount descending(work)
//Post
router.post("/project/create", createNewProject); //POST a project(work)
//Put
router.put("/project/update/:id", updateProjectById); //PUT a project by id (work)
//Delete
router.delete("/project/delete/:id", deleteProjectById); //DELETE a project by id


export default router;
