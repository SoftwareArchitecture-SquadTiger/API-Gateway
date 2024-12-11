import axios from "axios";
import "dotenv/config";

const HOST = process.env.HOST;
const PORT_B = process.env.TEAM_B_PORT;
const TEAM_B_BASE_URL = `http://${HOST}:${PORT_B}`;

export const getAllDonors = async (req, res, next) => {
    try {
        const response = await axios.get(`${TEAM_B_BASE_URL}/donor/all`);
        res.status(200).json({ donorResponse: response.data });
    } catch (error) {
        console.error('Error fetching donors:', error.message);

        const status = error.response?.status || 500;
        const message = error.response?.data?.message || error.message || 'Internal Server Error';

        res.status(status).json({ error: message });
    }
};

export const getDonorById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const url = `${TEAM_B_BASE_URL}/donor/${id}`;
        
        const response = await axios.get(url);

        res.status(response.status).json({ donorResponse: response.data });
    } catch (error) {
        console.error('Error fetching donor:', error.message);

        const status = error.response?.status || 500;
        const message = error.response?.data?.message || error.message || 'Internal Server Error';

        res.status(status).json({ error: message });
    }
};

export const createNewDonor = async (req, res, next) => {
    try {
        const url = `${TEAM_B_BASE_URL}/donor/create`;

        const response = await axios.post(url, req.body);

        res.status(response.status).json({ donorResponse: response.data });
    } catch (error) {
        console.error('Error creating donor:', error.message);

        const status = error.response?.status || 500;
        const message = error.response?.data?.message || error.message || 'Internal Server Error';

        res.status(status).json({ error: message });
    }
};

export const updateDonorById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const url = `${TEAM_B_BASE_URL}/donor/update/${id}`;

        const response = await axios.put(url, req.body);

        res.status(response.status).json({ donorResponse: response.data });
    } catch (error) {
        console.error(`Error updating donor: ${error.message}`);

        const status = error.response?.status || 500;
        const message = error.response?.data?.message || error.message || 'Internal Server Error';

        res.status(status).json({ error: message });
    }
};