import express from "express";
import { cacheMiddleware } from "../middlewares/cacheMiddleware.js";
import { CACHE_KEYS } from "../utils/cacheKeys.js";
import { encryptUsingJWE, encryptData  } from "../gateway-handlers/A/encryptionReq.js";
import { decryptUsingJWE, decryptData } from "../gateway-handlers/A/decryptionReq.js";
import { generateKeyPair, fetchPublicKey, fetchPrivateKey, updateKeyPair, deleteKeyPair } from "../gateway-handlers/A/keyReq.js";
import { apiKeyMiddleware } from "../middlewares/apiKeyMiddleware.js";
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

import {
  createNewDonor,
  deleteDonorById,
  getAllDonors,
  getDonorById,
  getDonorsBySubscribedCategories,
  getDonorsBySubscribedRegions,
  updateDonorById,
} from "../gateway-handlers/B/donorReq.js";

import {
  createNewCharity,
  deleteCharityById,
  getAllCharities,
  getCharityById,
  updateCharityById,
} from "../gateway-handlers/B/charityReq.js";

import {
  getSubscriptionsByEmail,
  getEmailsByCategories,
  createSubscription,
  clearSubscription,
  updateSubscription,
} from "../gateway-handlers/B/subscriptionReq.js";

import{
  loginUser,
  registerUser,
} from "../gateway-handlers/B/authReq.js";

const router = express.Router();
router.use(apiKeyMiddleware);

//Donor
router.get(
  "/donors",
  cacheMiddleware(() => CACHE_KEYS.DONORS_ALL),
  getAllDonors
); //GET all donors
router.get("/donor/id/:id", getDonorById); //GET donor by id
router.get("/donors/subscribe/categories", getDonorsBySubscribedCategories); //GET donors by categories
router.get("/donors/subscribe/regions", getDonorsBySubscribedRegions); //GET donors by regions
router.post("/donor/create", createNewDonor); //POST a new donor
router.put("/donor/update/:id", updateDonorById); //PUT a donor by id
router.delete("/donor/delete/:id", deleteDonorById); //DELETE a donor by id

//Subscription
router.get("/subscriptions/email/:email", getSubscriptionsByEmail); //GET regions & categories by email
router.get("/subscriptions/emails/categories", getEmailsByCategories); //GET donors emails by categories
router.post("/subscriptions/create", createSubscription); //POST a subscription
router.put("/subscriptions/update/:email", updateSubscription); //PUT subscriptions by email
router.delete("/subscriptions/delete/:email", clearSubscription); //DELETE a subscriptions

//Charity
router.get(
  "/charities",
  cacheMiddleware(() => CACHE_KEYS.CHARITIES_ALL),
  getAllCharities
); //GET all charities
router.get("/charity/id/:id", getCharityById); //GET charity by id
router.post("/charity/create", createNewCharity); //POST new charity
router.put("/charity/update/:id", updateCharityById); //PUT a charity by id
router.delete("/charity/delete/:id", deleteCharityById); //DELETE a charity by id

//Auth
router.post("/auth/login", loginUser); //POST a login request
router.post("/auth/register", registerUser); //POST a register request  




//total 21 now just 15
//Project 
//Get
router.get("/projects", getAllProjects); //GET all projects(work)
router.get("/project/:id", getProjectById); //GET a project by id(work)
router.get("/project/status/:status", getProjectByStatus); //GET a project by status(work)
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
export default router;
