import express from "express";

import {
  createNewDonor,
  deleteDonorById,
  getAllDonors,
  getDonorById,
  updateDonorById,
} from "../gateway-handlers/B/donorReq.js";

import {
  createNewCharity,
  deleteCharityById,
  getAllCharities,
  getCharityById,
  updateCharityById,
} from "../gateway-handlers/B/charityReq.js";

const router = express.Router();

//Donor
router.get("/donors", getAllDonors); //GET all donors
router.get("/donor/:id", getDonorById); //GET donor by id
router.post("/donor/create", createNewDonor); //POST a new donor
router.put("/donor/update/:id", updateDonorById); //PUT a donor by id
router.delete("/donor/delete/:id", deleteDonorById); //DELETE a donor by id

//Charity
router.get("/charities", getAllCharities); //GET all charities
router.get("/charity/:id", getCharityById); //GET charity by id
router.post("/charity/create", createNewCharity); //POST new charity
router.put("/charity/update/:id", updateCharityById); //PUT a charity by id
router.delete("/charity/delete/:id", deleteCharityById); //DELETE a charity by id

export default router;
