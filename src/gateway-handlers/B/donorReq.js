import { handleAxiosErrorResponse } from "../../utils/errorHandler.js";
import { sendKafkaMessageWithResponse } from "../../services/kafkaServices.js";

//Get all donors
export const getAllDonors = async (req, res) => {
  try {
    const response = await sendKafkaMessageWithResponse("donor-request", {
      action: "GET_ALL",
      data: {},
    });
    res.json(response);
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};

//Get a donor via id
export const getDonorById = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await sendKafkaMessageWithResponse("donor-request", {
      action: "GET_BY_ID",
      data: { id: id },
    });

    res.json(response);
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};

//Get donors by categories
export const getDonorsBySubscribedCategories = async (req, res) => {
  try {
    const { categories } = req.body;
    const response = await sendKafkaMessageWithResponse("donor-request", {
      action: "GET_BY_CATEGORIES",
      data: { categories: categories },
    });

    res.json(response);
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};

//Get donors by regions
export const getDonorsBySubscribedRegions = async (req, res) => {
  try {
    const { regions } = req.body;
    const response = await sendKafkaMessageWithResponse("donor-request", {
      action: "GET_BY_REGIONS",
      data: { regions: regions },
    });

    res.json(response);
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};
//Create a donor
export const createNewDonor = async (req, res) => {
  try {
    const data = req.body;

    const response = await sendKafkaMessageWithResponse("donor-request", {
      action: "ADD",
      data: data,
    });

    res.json(response);
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};

//Update a donor via id
export const updateDonorById = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await sendKafkaMessageWithResponse("donor-request", {
      action: "UPDATE",
      data: { id: id, update: req.body },
    });

    res.json(response);
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};

//Delete a donor via id
export const deleteDonorById = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await sendKafkaMessageWithResponse("donor-request", {
      action: "DELETE",
      data: { id: id },
    });

    res.json(response);
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};

