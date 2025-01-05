import express from "express";
import { cacheMiddleware } from "../middlewares/cacheMiddleware.js";
import { CACHE_KEYS } from "../utils/cacheKeys.js";

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

const router = express.Router();

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
router.get("/charities", getAllCharities); //GET all charities
router.get("/charity/id/:id", getCharityById); //GET charity by id
router.post("/charity/create", createNewCharity); //POST new charity
router.put("/charity/update/:id", updateCharityById); //PUT a charity by id
router.delete("/charity/delete/:id", deleteCharityById); //DELETE a charity by id

export default router;
