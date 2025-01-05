import axios from "axios";
import "dotenv/config";
import { handleAxiosErrorResponse } from "../../utils/errorHandler.js";

const HOST = process.env.HOST;
const PORT_A = process.env.TEAM_A_PORT;
const TEAM_A_BASE_URL = `http://${HOST}:${PORT_A}`;

/**
 * Decrypt a JWE token and return the original JWS.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const decryptUsingJWE = async (req, res) => {
    try {
        const { encryptedToken, entityId } = req.body;
        if (!encryptedToken || !entityId) {
            return res.status(400).json({ error: "Encrypted token and entityId are required" });
        }
        // Forward the request to Team A's decryption API
        const response = await axios.post(`${TEAM_A_BASE_URL}/api/jws/decrypt`, { encryptedToken, entityId });
        // Return the response from Team A's service
        res.status(response.status).json({ jws: response.data.jws });
    } catch (error) {
        handleAxiosErrorResponse(error, res);
    }
};

/**
 * Decrypt data using a specific model and entity ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const decryptData = async (req, res) => {
    try {
        const { model, entityId } = req.params;
        const { encryptedData } = req.body;
        if (!model || !entityId || !encryptedData) {
            return res.status(400).json({ error: "Model, entityId, and encryptedData are required" });
        }
        const response = await axios.post(`${TEAM_A_BASE_URL}/api/keys/decrypt/model/${model}/entity/${entityId}`, { encryptedData });
        res.status(response.status).json({ decryptedData: response.data.decryptedData });
    } catch (error) {
        handleAxiosErrorResponse(error, res);
    }
};
