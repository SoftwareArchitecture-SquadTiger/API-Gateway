import axios from "axios";
import "dotenv/config";
import { handleAxiosErrorResponse } from "../../utils/errorHandler.js";

const HOST = process.env.HOST;
const PORT_B = process.env.TEAM_B_PORT;
const TEAM_B_BASE_URL = `http://${HOST}:${PORT_B}`;

//Get all donors
export const getAllDonors = async (req, res, next) => {
  try {
    const response = await axios.get(`${TEAM_B_BASE_URL}/donor/all`);
    res.status(200).json({ donorResponse: response.data });
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};

//Get a donor via id
export const getDonorById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const url = `${TEAM_B_BASE_URL}/donor/${id}`;

    const response = await axios.get(url);

    res.status(response.status).json({ donorResponse: response.data });
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};

//Create a donor
export const createNewDonor = async (req, res, next) => {
  try {
    const url = `${TEAM_B_BASE_URL}/donor/create`;

    const response = await axios.post(url, req.body);

    res.status(response.status).json({ donorResponse: response.data });
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};

//Update a donor
export const updateDonorById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const url = `${TEAM_B_BASE_URL}/donor/update/${id}`;

    const response = await axios.put(url, req.body);

    res.status(response.status).json({ donorResponse: response.data });
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};

//Delete a donor
export const deleteDonorById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const url = `${TEAM_B_BASE_URL}/donor/delete/${id}`;

    const response = await axios.delete(url);

    res.status(response.status).json({ donorResponse: response.data });
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};
