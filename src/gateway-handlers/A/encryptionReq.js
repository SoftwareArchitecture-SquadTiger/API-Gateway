import axios from "axios";
import "dotenv/config";
import { handleAxiosErrorResponse } from "../../utils/errorHandler.js";

const HOST = process.env.HOST;
const PORT_A = process.env.TEAM_A_PORT;
const TEAM_A_BASE_URL = `http://${HOST}:${PORT_A}`;
/** 
Encrypt a JWS token using JWE and return the encrypted token.
* @param {Object} req - The request object.
* @param {Object} res - The response object.
*/
export const encryptUsingJWE = async (req, res) => {
  try {
    const { jws, entityId } = req.body;
    if (!jws || !entityId) {
      return res.status(400).json({ error: "JWS and entityId are required" });
    }
    // Forward the request to Team A's encryption API
    const response = await axios.post(`${TEAM_A_BASE_URL}/api/jws/encrypt`, {
      jws,
      entityId,
    });
    // Return the response from Team A's service
    res
      .status(response.status)
      .json({ encryptedToken: response.data.encryptedToken });
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};
/**
 * Encrypt data for a specific entity.
 */
export const encryptData = async (req, res) => {
  try {
    const { model, entityId } = req.params;
    const { data } = req.body;
    const response = await axios.post(
      `${TEAM_A_BASE_URL}/api/keys/encrypt/model/${model}/entity/${entityId}`,
      { data }
    );
    res
      .status(response.status)
      .json({ encryptedData: response.data.encryptedData });
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};
