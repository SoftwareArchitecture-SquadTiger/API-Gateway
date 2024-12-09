import express from 'express';
import { getAllDonors } from '../gateway-handlers/B/donorReq.js';
import { getAllCharities } from '../gateway-handlers/B/charityReq.js';

const router = express.Router();

//Donor
router.get('/donors', getAllDonors);//GET all donors

//Charity
router.get('/charities', getAllCharities);//GET all charities

export default router;