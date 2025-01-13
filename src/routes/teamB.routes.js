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
  logoutUser,
  validateToken
} from "../gateway-handlers/B/authReq.js";

import {
  getTotalDonationsByDay,
  getTotalDonationsByMonth,
  getTotalDonationsByDonor,
  getDonorLeaderboard,
  getTotalDonationForProject,
  getProjectsByCountry,
  getProjectsByCategory,
  getProjectsByMonth,
} from "../gateway-handlers/B/statisticsReq.js";
import { validate } from "uuid";

const router = express.Router();

//Donor
router.get(
  "/donors",
  authMiddleware(["Donor","Charity"]),
  cacheMiddleware(() => CACHE_KEYS.DONORS_ALL),
  getAllDonors
); //GET all donors
router.get("/donor/token",  authMiddleware(['Donor']), getDonorByToken); //GET donor by id
router.get(
  "/donors/filter",
  authMiddleware(['Charity','Donor']),
  cacheMiddleware((req) => generateCacheKey(req, "donors")),
  getFilteredDonors
); //GET donors by filtering
router.get(
  "/donors/subscribe/categories",
  authMiddleware(['Charity','Donor']),
  cacheMiddleware((req) => generateCacheKey(req, "donors")),
  getDonorsBySubscribedCategories
); //GET donors by categories
router.get(
  "/donors/subscribe/regions",
  authMiddleware(['Charity','Donor']),
  cacheMiddleware((req) => generateCacheKey(req, "donors")),
  getDonorsBySubscribedRegions
); //GET donors by regions
router.get("/donor/id/:id",authMiddleware(['Charity','Donor']), getDonorById); //GET donor by id
router.post("/donor/create",authMiddleware(['Charity','Donor']), createNewDonor); //POST a new donor
router.put("/donor/update/:id",authMiddleware(['Charity','Donor']), updateDonorById); //PUT a donor by id
router.delete("/donor/delete/:id",authMiddleware(['Charity','Donor']), deleteDonorById); //DELETE a donor by id

//Subscription
router.get("/subscriptions/email/:email",authMiddleware(['Charity','Donor']), getSubscriptionsByEmail); //GET regions & categories by email
router.get(
  "/subscriptions/emails/categories",authMiddleware(['Charity','Donor']),
  cacheMiddleware((req) => generateCacheKey(req, "donors-email")),
  getEmailsByCategories
); //GET donors emails by categories
router.post("/subscriptions/create",authMiddleware(['Charity','Donor']), createSubscription); //POST a subscription
router.put("/subscriptions/update/:email",authMiddleware(['Charity','Donor']), updateSubscription); //PUT subscriptions by email
router.delete("/subscriptions/delete/:email",authMiddleware(['Charity','Donor']), clearSubscription); //DELETE a subscriptions

//Charity
router.get(
  "/charities",
  authMiddleware(["Donor","Charity"]),
  cacheMiddleware(() => CACHE_KEYS.CHARITIES_ALL),
  getAllCharities
); //GET all charities
router.get(
  "/charities/filter",
  authMiddleware(['Charity','Donor']),
  cacheMiddleware((req) => generateCacheKey(req, "charities")),
  getFilteredCharities
); //GET charities with filtering
router.get("/charity/token",authMiddleware(['Charity']), getCharityByToken); //GET charity by id
router.get("/charity/id/:id",authMiddleware(['Charity']), getCharityById); //GET charity by id
router.post("/charity/create",authMiddleware(['Charity']), createNewCharity); //POST new charity
router.put("/charity/update/:id",authMiddleware(['Charity']), updateCharityById); //PUT a charity by id
router.delete("/charity/delete/:id",authMiddleware(['Charity']), deleteCharityById); //DELETE a charity by id

//Auth
router.post("/auth/login", loginUser); //POST a login request
router.post("/auth/register", registerUser); //POST a register request  
router.post("/auth/logout", logoutUser);
router.get("auth/validate-token",validateToken); 
router.get(
  "/statistics/donations/by-day",
  authMiddleware(["Donor","Charity"]),
  getTotalDonationsByDay
);
router.get(
  "/statistics/donations/by-month",
  authMiddleware(["Donor","Charity"]),
  getTotalDonationsByMonth
)
router.get(
  "/statistics/donations/by-donor/:donorId",
  authMiddleware(["Donor","Charity"]),
  getTotalDonationsByDonor
);
router.get(
  "/statistics/donors/leaderboard",
  authMiddleware(["Donor","Charity"]),
  getDonorLeaderboard
);
router.get(
  "/statistics/donations/for-project/:projectId",
  authMiddleware(["Admin", "Charity"]),
  getTotalDonationForProject
);

router.get(
  "/statistics/projects/by-country",
  authMiddleware(["Donor","Charity"]),
  getProjectsByCountry
);
router.get(
  "/statistics/projects/by-category",
  authMiddleware(["Donor","Charity"]),
  getProjectsByCategory
);
router.get(
  "/statistics/projects/by-month",
  authMiddleware(["Donor","Charity"]),
  getProjectsByMonth
);

export default router;
