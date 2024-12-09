import axios from "axios";
import "dotenv/config";

const HOST = process.env.HOST;
const PORT_B = process.env.TEAM_B_PORT;
const TEAM_B_BASE_URL = `http://${HOST}:${PORT_B}`;

export const getAllCharities = async (req, res, next) => {
    try {
        const response = await axios.get(`${TEAM_B_BASE_URL}/charity/all`);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching charities:', error.message);

        const status = error.response?.status || 500;
        const message = error.response?.data?.message || error.message || 'Internal Server Error';

        res.status(status).json({ error: message });
    }
};