import axios from "axios";
import "dotenv/config";
import { handleAxiosErrorResponse } from "../../utils/errorHandler.js";

const HOST = process.env.HOST;
const PORT_A = process.env.TEAM_A_PORT;
const TEAM_A_BASE_URL = `http://${HOST}:${PORT_A}`;

// Create a new Donation Request
export const createDonation = async (req, res, next) => {
    try {
        const { projectId, donorId, amount, payment_method, is_recurring } = req.body;
        const response = await axios.post(`${TEAM_A_BASE_URL}/api/donations/`, {
            projectId,
            donorId,
            amount,
            payment_method,
            is_recurring,
        });
        res.status(response.status).json({ donationResponse: response.data });
    } catch (error) {
        handleAxiosErrorResponse(error, res);
    }
};

// Capture a PayPal order (for one-time donations)
export const captureDonation = async (req, res, next) => {
    try {
        const { orderId, donorId } = req.query;
        const donation = await axios.get(`${TEAM_A_BASE_URL}/api/donations/capture`);
        res.status(donation.status).json({ donationResponse: donation.data });
    } catch (error) {
        handleAxiosErrorResponse(error, res);
    }
};

// Handle successful subscription (redirect from PayPal)
export const handleSubscriptionSuccess = async (req, res, next) => {
    try {
        const success = await axios.get(`${TEAM_A_BASE_URL}/api/donations/subscription/success`);
        res.status(success.status).json({ donationResponse: success.data });
    } catch (error) {
        handleAxiosErrorResponse(error, res);
    }
};

// Handle PayPal Webhook
export const handlePaypalWebhook = async (req, res, next) => {
    try {
        const webhook = await axios.post(`${TEAM_A_BASE_URL}/api/donations/webhook/paypal`, req.body);
        res.status(webhook.status).json({ donationResponse: webhook.data });
    } catch (error) {
        handleAxiosErrorResponse(error, res);
    }
};

// Get a specific donation by ID
export const getDonationById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const donation = await axios.get(`${TEAM_A_BASE_URL}/api/donations/${id}`);
        res.status(donation.status).json({ donationResponse: donation.data });
    } catch (error) {
        handleAxiosErrorResponse(error, res);
    }
};
// Get donation history for a specific donor
export const getDonationHistoryByDonor = async (req, res, next) => {
    try {
        const { donorId } = req.params;
        const donation = await axios.get(`${TEAM_A_BASE_URL}/api/donations/history/${donorId}`);
        res.status(donation.status).json({ donationResponse: donation.data });
    } catch (error) {
        handleAxiosErrorResponse(error, res);
    }
}

// Get the total donation amount for a specific donor
export const getTotalDonationAmountByDonor = async (req, res) => {
    try {
        const { donorId } = req.params;
        const donation = await axios.get(`${TEAM_A_BASE_URL}/api/donations/total-amount/${donorId}`);
        res.status(donation.status).json({ donationResponse: donation.data });
    }catch(error){
        handleAxiosErrorResponse(error, res);
    }
}
// Get the total number of projects a donor has participated in
export const getTotalProjectsParticipatedByDonor = async (req, res) => {
    try {
        const { donorId } = req.params;
        const donation = await axios.get(`${TEAM_A_BASE_URL}/api/donations/total-projects/${donorId}`);
        res.status(donation.status).json({ donationResponse: donation.data });
    }catch(error){
        handleAxiosErrorResponse(error, res);
    }
}

// Get a list of donors with their total donation amounts (for leaderboard)
export const getLeaderboard = async (req, res) => {
    try {
        const donation = await axios.get(`${TEAM_A_BASE_URL}/api/donations/getleaderboard`);
        res.status(donation.status).json({ donationResponse: donation.data });
    }catch(error){
        handleAxiosErrorResponse(error, res);
    }
}
