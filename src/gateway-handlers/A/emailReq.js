import axios from "axios";
import "dotenv/config";
import { handleAxiosErrorResponse } from "../../utils/errorHandler.js";

const HOST = process.env.HOST;
const PORT_A = process.env.TEAM_A_PORT;
const TEAM_A_BASE_URL = `http://${HOST}:${PORT_A}`;

export const sendDonationConfirmation = async (req, res, next) => {
    try {
        const response = await axios.post(`${TEAM_A_BASE_URL}/api/emails/send-donation-confirmation`, req.body);
        res.status(response.status).json({ donationResponse: response.data });
    } catch (error) {
        handleAxiosErrorResponse(error, res);
    }
}
export const sendProjectCreationConfirmation = async (req, res, next) => {
    try {
        const response = await axios.post(`${TEAM_A_BASE_URL}/api/emails/send-project-creation-confirmation`, req.body);
        res.status(response.status).json({ donationResponse: response.data });
    } catch (error) {
        handleAxiosErrorResponse(error, res);
    }
}
export const sendWelcomeEmailDonor = async (req, res, next) => {
    try {
        const response = await axios.post(`${TEAM_A_BASE_URL}/api/emails/send-welcome-email-donor`, req.body);
        res.status(response.status).json({ donationResponse: response.data });
    } catch (error) {
        handleAxiosErrorResponse(error, res);
    }
}
export const sendWelcomeEmailCharity = async (req, res, next) => {
    try {
        const response = await axios.post(`${TEAM_A_BASE_URL}/api/emails/send-welcome-email-charity`, req.body);
        res.status(response.status).json({ donationResponse: response.data });
    } catch (error) {
        handleAxiosErrorResponse(error, res);
    }
}