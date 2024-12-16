import axios from "axios";
import "dotenv/config";
import { handleAxiosErrorResponse } from "../../utils/errorHandler.js";
import { sendKafkaMessageWithResponse } from "../../services/kafkaServices.js";

const HOST = process.env.HOST;
const PORT_B = process.env.TEAM_B_PORT;
const TEAM_B_BASE_URL = `http://${HOST}:${PORT_B}`;

//Get all donors
export const getAllDonors = async (req, res) => {
  try {
    const response = await sendKafkaMessageWithResponse('donor-request', {
      action: 'GET_ALL',
      data:{},
    });
    res.status(200).json(response);
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};

//Get a donor via id
export const getDonorById = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await sendKafkaMessageWithResponse('donor-request', {
      action: 'GET_BY_ID',
      data: {id: id}
    });

    res.status(200).json(response);
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};

//Create a donor
export const createNewDonor = async (req, res, next) => {
  try {
    const response = await sendKafkaMessageWithResponse('donor-request', {
      action: 'ADD',
      data: req.body,
    });

    res.status(200).json(response);
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
