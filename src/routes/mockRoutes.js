import express from 'express';
import axios from 'axios';
import 'dotenv/config';

const router = express.Router();

const HOST = process.env.HOST
const PORT_A = process.env.PORT_A
const TEAM_A_BASE_URL = `http://${HOST}:${PORT_A}`;

router.get('/charities', async (req, res) => {
    try {
        const response = await axios.get(`${TEAM_A_BASE_URL}/charities`);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json(error.message);
    }
});

router.post('/charities', async (req, res) => {
    try {
        const response = await axios.post(`${TEAM_A_BASE_URL}/charities`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json(error.message);
    }
});

export default router;
