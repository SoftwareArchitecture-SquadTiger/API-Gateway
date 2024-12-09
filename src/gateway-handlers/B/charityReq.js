import axios from "axios";
import "dotenv/config";

const HOST = process.env.HOST;
const PORT_B = process.env.TEAM_B_PORT;
const TEAM_B_BASE_URL = `http://${HOST}:${PORT_B}`;

//Get all charities
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

//Get charity by id
export const getCharityById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const url = `${TEAM_B_BASE_URL}/charity/${id}`;

        const response = await axios.get(url)

        res.status(200).json(response.data);
    } catch (error) {
        console.error(`Error fetching Charity by id: ${error}`);

        const status = error.response?.status || 500;
        const message = error.response?.data?.message || error.message || 'Internal Server Error';

        res.status(status).json({ error: message });
    }
};

//Create a charity
export const createNewCharity = async (req, res, next) => {
    try {
        const url = `${TEAM_B_BASE_URL}/charity/create`;

        const response = await axios.post(url, req.body, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        res.status(response.status).json(response.data);
    } catch (error) {
        console.error(`Error creating charities: ${error.message}`);

        const status = error.response?.status || 500;
        const message = error.response?.data?.message || error.message || 'Internal Server Error';

        res.status(status).json({ error: message });
    }
};