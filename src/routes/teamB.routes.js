import express from "express";
import { cacheMiddleware } from "../middlewares/cacheMiddleware.js";
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { CACHE_KEYS, generateCacheKey } from "../utils/cacheKeys.js";

import {
  createNewDonor,
  deleteDonorById,
  getAllDonors,
  getDonorById,
  getDonorByToken,
  getDonorsBySubscribedCategories,
  getDonorsBySubscribedRegions,
  getFilteredDonors,
  updateDonorById,
} from "../gateway-handlers/B/donorReq.js";

import {
  createNewCharity,
  deleteCharityById,
  getAllCharities,
  getCharityById,
  getCharityByToken,
  getFilteredCharities,
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

//Donor
router.get(
  "/donors",
  cacheMiddleware(() => CACHE_KEYS.DONORS_ALL),
  authMiddleware(['donor','charity']),
  getAllDonors
); //GET all donors
router.get("/donor/id", getDonorByToken); //GET donor by id
router.get(
  "/donors/filter",
  cacheMiddleware((req) => generateCacheKey(req, "donors")),
  getFilteredDonors
); //GET donors by filtering
router.get(
  "/donors/subscribe/categories",
  cacheMiddleware((req) => generateCacheKey(req, "donors")),
  getDonorsBySubscribedCategories
); //GET donors by categories
router.get(
  "/donors/subscribe/regions",
  cacheMiddleware((req) => generateCacheKey(req, "donors")),
  getDonorsBySubscribedRegions
); //GET donors by regions
router.get("/donor/id/:id", getDonorById); //GET donor by id
router.post("/donor/create", createNewDonor); //POST a new donor
router.put("/donor/update/:id", updateDonorById); //PUT a donor by id
router.delete("/donor/delete/:id", deleteDonorById); //DELETE a donor by id

//Subscription
router.get("/subscriptions/email/:email", getSubscriptionsByEmail); //GET regions & categories by email
router.get(
  "/subscriptions/emails/categories",
  cacheMiddleware((req) => generateCacheKey(req, "donors-email")),
  getEmailsByCategories
); //GET donors emails by categories
router.post("/subscriptions/create", createSubscription); //POST a subscription
router.put("/subscriptions/update/:email", updateSubscription); //PUT subscriptions by email
router.delete("/subscriptions/delete/:email", clearSubscription); //DELETE a subscriptions

//Charity
router.get(
  "/charities",
  authMiddleware(['charity']),
  cacheMiddleware(() => CACHE_KEYS.CHARITIES_ALL),
  getAllCharities
); //GET all charities
router.get(
  "/charities/filter",
  cacheMiddleware((req) => generateCacheKey(req, "charities")),
  getFilteredCharities
); //GET charities with filtering
router.get("/charity/id", getCharityByToken); //GET charity by id
router.get("/charity/id/:id", getCharityById); //GET charity by id
router.post("/charity/create", createNewCharity); //POST new charity
router.put("/charity/update/:id", updateCharityById); //PUT a charity by id
router.delete("/charity/delete/:id", deleteCharityById); //DELETE a charity by id

//Auth
router.post("/auth/login", loginUser); //POST a login request
router.post("/auth/register", registerUser); //POST a register request  
export default router;
