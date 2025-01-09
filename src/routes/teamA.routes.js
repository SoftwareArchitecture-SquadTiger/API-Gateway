import express from "express";
import { authMiddleware } from '../middlewares/authMiddleware.js';

import {
  createNewProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
  getProjectByStatus,
  getProjectByRegion,
  getProjectByCurrentAmountLte,
  getProjectByCurrentAmountGte,
  getProjectByCountry,
  filterProjectByDate,
  sortProjectByCurrentAmountDesc,
  sortProjectByCurrentAmountAsc,
  sortProjectByTargetAmountAsc,
  sortProjectByTargetAmountDesc,
  getProjectByCategory,
  getCharityByID,
  getProjectByTargetAmountGte,
  getProjectByTargetAmountLte,
  getProjectByCharityName,
  getProjectByTitle,
  getProjectByCharityId,
  
} from "../gateway-handlers/A/projectReq.js";
import { encryptUsingJWE, encryptData  } from "../gateway-handlers/A/encryptionReq.js";
import { decryptUsingJWE, decryptData } from "../gateway-handlers/A/decryptionReq.js";
import { generateKeyPair, fetchPublicKey, fetchPrivateKey, updateKeyPair, deleteKeyPair } from "../gateway-handlers/A/keyReq.js";
import { createDonation, getDonationById, getDonationHistoryByDonor, getTotalDonationAmountByDonor, getTotalProjectsParticipatedByDonor, getLeaderboard, handleSubscriptionSuccess, captureDonation, handlePaypalWebhook } from "../gateway-handlers/A/donationReq.js";
import { capturePayment, initiatePayment } from "../gateway-handlers/A/paymentReq.js";

const router = express.Router();
//total 21 now just 15
//Project 
//Get
router.get("/projects", getAllProjects); //GET all projects(work)
router.get("/project/:id", getProjectById); //GET a project by id(work)
router.get("/project/status/:status",authMiddleware, getProjectByStatus); //GET a project by status(work)
router.get("/project/amount/lte/:currentAmount", getProjectByCurrentAmountLte); //GET a project by current amount less than or equal to(work)
router.get("/project/region/:region", getProjectByRegion); //GET a project by region(work)
router.get("/project/country/:country", getProjectByCountry); //GET all projects sorted by target amount ascending(work)
router.get("/project/date/:startDate/:endDate", filterProjectByDate); //GET a project by date(not working)
router.get("/project/amount/lte/:currentAmount", getProjectByCurrentAmountLte); //GET a project by current amount less than or equal to(work)
router.get("/project/amount/gte/:currentAmount", getProjectByCurrentAmountGte); //GET a project by current amount greater than or equal to(work)
router.get("/project/category/:category", getProjectByCategory); //GET a project by category
router.get("/project/charity/:id", getCharityByID); //GET a project by charity ID
router.get("/project/target-amount/gte/:targetAmount", getProjectByTargetAmountGte); //GET a project by target amount greater than or equal to
router.get("/project/target-amount/lte/:targetAmount", getProjectByTargetAmountLte); //GET a project by target amount less than or equal to
router.get("/project/charity-name/:charityName", getProjectByCharityName); //GET a project by charity name
router.get("/project/title/:title", getProjectByTitle); //GET a project by title
router.get("/project/charity-id/:charityId", getProjectByCharityId); //GET a project by charity ID

//Ascending and Descending order  of current amount and target amount
router.get("/project/current-amount/asc", sortProjectByCurrentAmountAsc); //GET all projects sorted by current amount ascending(work)
router.get("/project/current-amount/desc", sortProjectByCurrentAmountDesc); //GET all projects sorted by current amount descending(work)
router.get("/project/target-amount/asc", sortProjectByTargetAmountAsc); //GET all projects sorted by target amount ascending(work)
router.get("/project/target-amount/desc", sortProjectByTargetAmountDesc); //GET all projects sorted by target amount descending(work)
//Post
router.post("/project/create", createNewProject); //POST a project(work)
//Put
router.put("/project/update/:id", updateProjectById); //PUT a project by id (work)
//Delete
router.delete("/project/delete/:id", deleteProjectById); //DELETE a project by id
//Encryption API

router.post("/encrypt", encryptUsingJWE); 
//Decryption API
router.get("/decrypt", decryptUsingJWE); 
// Key management routes
router.post("/keys/model/:model/entity/:entityId", generateKeyPair);
router.get("/keys/model/:model/entity/:entityId", fetchPublicKey);
router.get("/keys/model/:model/entity/:entityId/private", fetchPrivateKey);
router.put("/keys/model/:model/entity/:entityId", updateKeyPair);
router.delete("/keys/model/:model/entity/:entityId", deleteKeyPair);
router.post("/keys/encrypt/model/:model/entity/:entityId", encryptData);
router.post("/keys/decrypt/model/:model/entity/:entityId", decryptData);

//Donation
router.post("/donation/create", createDonation); //POST a donation
router.post("/donation/webhook/paypal", handlePaypalWebhook); //POST a donation

router.get("/donation/subscription/success", handleSubscriptionSuccess); //GET a donation
router.get("/donation/:id", getDonationById); //GET a donation by id
router.get("/donation/history/:donorId", getDonationHistoryByDonor); //GET donation history for a specific donor
router.get("/donation/total-amount/:donorId", getTotalDonationAmountByDonor); //GET the total donation amount for a specific donor
router.get("/donation/total-projects/:donorId", getTotalProjectsParticipatedByDonor); //GET the total number of projects a donor has participated in
router.get("/donation/leaderboard", getLeaderboard); //GET the leaderboard
router.get("/donation/capture", captureDonation); //GET the leaderboard


// Payment
router.post("/payment", initiatePayment);
router.get("/payment/capture", capturePayment);
router.post("/payment/webhook/paypal", handlePaypalWebhook);


export default router;
