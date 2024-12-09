import express from 'express';
import { getAllDonors } from '../gateway-handlers/B/donorReq.js';
import { createNewCharity, getAllCharities, getCharityById } from '../gateway-handlers/B/charityReq.js';

const router = express.Router();

//Donor
router.get('/donors', getAllDonors);//GET all donors

//Charity
router.get('/charities', getAllCharities);//GET all charities
router.get('/charity/:id',getCharityById);//GET charity by id
router.post('/charity/create', createNewCharity);//POST new charity

export default router;