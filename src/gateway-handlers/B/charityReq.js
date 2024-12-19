import "dotenv/config";
import { handleAxiosErrorResponse } from "../../utils/errorHandler.js";
import { sendKafkaMessageWithResponse } from "../../services/kafkaServices.js";

// Get all charities
export const getAllCharities = async (req, res) => {
  try {
    const response = await sendKafkaMessageWithResponse("charity-request", {
      action: "GET_ALL",
      data: {},
    });
    res.json(response);
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};

// Get a charity via id
export const getCharityById = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await sendKafkaMessageWithResponse("charity-request", {
      action: "GET_BY_ID",
      data: { id: id },
    });

    res.json(response);
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};

// Create a charity
export const createNewCharity = async (req, res) => {
  try {
    const data = req.body;

    const response = await sendKafkaMessageWithResponse("charity-request", {
      action: "ADD",
      data: data,
    });

    res.json(response);
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};

// Update a charity
export const updateCharityById = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await sendKafkaMessageWithResponse("charity-request", {
      action: "UPDATE",
      data: { id: id, update: req.body },
    });

    res.json(response);
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};

// Delete a charity
export const deleteCharityById = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await sendKafkaMessageWithResponse("charity-request", {
      action: "DELETE",
      data: { id: id },
    });

    res.json(response);
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};