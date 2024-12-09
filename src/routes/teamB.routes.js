import express from 'express';
import { getAllDonors } from '../controllers/donorReq.controller.js';

const router = express.Router();

router.get('/donors', getAllDonors);

export default router;