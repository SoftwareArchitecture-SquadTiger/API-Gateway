import axios from "axios";
import "dotenv/config";
import { handleAxiosErrorResponse } from "../../utils/errorHandler.js";

const HOST = process.env.HOST;
const PORT_A = process.env.TEAM_A_PORT;
const TEAM_A_BASE_URL = `http://${HOST}:${PORT_A}`;

/**
 * Generate a new key pair for a specific entity.
 */
export const generateKeyPair = async (req, res) => {
  try {
    const { model, entityId } = req.params;
    const response = await axios.post(
      `${TEAM_A_BASE_URL}/api/keys/model/${model}/entity/${entityId}`
    );
    res.status(response.status).json({ message: response.data.message });
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};
/**
 * Fetch the public key for a specific entity.
 */
export const fetchPublicKey = async (req, res) => {
  try {
    const { model, entityId } = req.params;
    const response = await axios.get(
      `${TEAM_A_BASE_URL}/api/keys/model/${model}/entity/${entityId}`
    );
    res.status(response.status).json({ publicKey: response.data.publicKey });
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};
/**
 * Fetch the private key for a specific entity.
 */
export const fetchPrivateKey = async (req, res) => {
  try {
    const { model, entityId } = req.params;

    const response = await axios.get(
      `${TEAM_A_BASE_URL}/api/keys/model/${model}/entity/${entityId}/private`
    );
    res.status(response.status).json({ privateKey: response.data.privateKey });
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};
/**
 * Update the key pair for a specific entity.
 */
export const updateKeyPair = async (req, res) => {
  try {
    const { model, entityId } = req.params;
    const response = await axios.put(
      `${TEAM_A_BASE_URL}/api/keys/model/${model}/entity/${entityId}`
    );
    res.status(response.status).json({ message: response.data.message });
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};
/**
 * Delete the key pair for a specific entity.
 */
export const deleteKeyPair = async (req, res) => {
  try {
    const { model, entityId } = req.params;
    const response = await axios.delete(
      `${TEAM_A_BASE_URL}/api/keys/model/${model}/entity/${entityId}`
    );
    res.status(response.status).json({ message: response.data.message });
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};
