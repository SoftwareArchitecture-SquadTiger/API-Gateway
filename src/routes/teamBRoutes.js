import express from "express";
import axios from "axios";
import "dotenv/config";

const router = express.Router();

const HOST = process.env.HOST;
const PORT_B = process.env.TEAM_B_PORT;
const TEAM_B_BASE_URL = `http://${HOST}:${PORT_B}`;

router.get('/donors', async (req, res) => {
    try {
        const response = await axios.get(`${TEAM_B_BASE_URL}/donor/all`);
        res.json(response.data); // Return the fetched data
    } catch (error) {
        console.error('Error fetching donors:', error.message);

        const status = error.response?.status || 500;
        const message = error.response?.data?.message || error.message || 'Internal Server Error';

        res.status(status).json({ error: message });
    }
});

export default router;
