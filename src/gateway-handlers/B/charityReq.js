import axios from "axios";
import "dotenv/config";
import { handleAxiosErrorResponse } from "../../utils/errorHandler.js";

const HOST = process.env.HOST;
const PORT_B = process.env.TEAM_B_PORT;
const TEAM_B_BASE_URL = `http://${HOST}:${PORT_B}`;

//Get all charities
export const getAllCharities = async (req, res, next) => {
  try {
    const response = await axios.get(`${TEAM_B_BASE_URL}/charity/all`);
    res.status(response.status).json({ charityResponse: response.data });
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};

//Get charity via id
export const getCharityById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const url = `${TEAM_B_BASE_URL}/charity/${id}`;

    const response = await axios.get(url);

    res.status(response.status).json({ charityResponse: response.data });
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};

//Create a charity
export const createNewCharity = async (req, res, next) => {
  try {
    const url = `${TEAM_B_BASE_URL}/charity/create`;

    const response = await axios.post(url, req.body);

    res.status(response.status).json({ charityResponse: response.data });
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};

//Update a charity
export const updateCharityById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const url = `${TEAM_B_BASE_URL}/charity/update/${id}`;

    const response = await axios.put(url, req.body);

    res.status(response.status).json({ charityResponse: response.data });
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};

//Delete a charity
export const deleteCharityById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const url = `${TEAM_B_BASE_URL}/charity/delete/${id}`;

    const response = await axios.delete(url);

    res.status(response.status).json({ charityResponse: response.data });
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};
