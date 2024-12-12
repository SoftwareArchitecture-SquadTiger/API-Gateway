import axios from "axios";
import "dotenv/config";
import { handleAxiosErrorResponse } from "../../utils/errorHandler.js";

const HOST = process.env.HOST;
const PORT_A = process.env.TEAM_A_PORT;
const TEAM_A_BASE_URL = `http://${HOST}:${PORT_A}`;

export const getAllProjects = async (req, res, next) => {
    try {
        const response = await axios.get(`${TEAM_A_BASE_URL}/api/projects`);
        res.status(response.status).json({ projectResponse: response.data });
    } catch (error) {
        handleAxiosErrorResponse(error, res);
    }
};

export const getProjectById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`${TEAM_A_BASE_URL}/api/projects/${id}`);

        res.status(response.status).json({})
    } catch (error) {
        handleAxiosErrorResponse(error, res);        
    }
};




 
