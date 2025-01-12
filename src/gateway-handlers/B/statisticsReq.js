import { sendKafkaMessageWithResponse } from "../../services/kafkaServices.js"; // Ensure this utility exists
import { handleAxiosErrorResponse } from "../../utils/errorHandler.js";

// Get total donations by day
export const getTotalDonationsByDay = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const response = await sendKafkaMessageWithResponse("statistics-request", {
      action: "GET_TOTAL_DONATIONS_BY_DAY",
      data: { startDate, endDate },
    });

    res.json(response);
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};

// Get total donations by donor
export const getTotalDonationsByDonor = async (req, res) => {
  try {
    const { donorId } = req.params;

    const response = await sendKafkaMessageWithResponse("statistics-request", {
      action: "GET_TOTAL_DONATIONS_BY_DONOR",
      data: { donorId },
    });

    res.json(response);
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};

// Get donor leaderboard
export const getDonorLeaderboard = async (req, res) => {
  try {
    const response = await sendKafkaMessageWithResponse("statistics-request", {
      action: "GET_DONOR_LEADERBOARD",
    });

    res.json(response);
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};

// Get total donation for a project
export const getTotalDonationForProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const response = await sendKafkaMessageWithResponse("statistics-request", {
      action: "GET_TOTAL_DONATION_FOR_PROJECT",
      data: { projectId },
    });

    res.json(response);
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};

// Get projects by country
export const getProjectsByCountry = async (req, res) => {
  try {
    const response = await sendKafkaMessageWithResponse("statistics-request", {
      action: "GET_PROJECTS_BY_COUNTRY",
    });

    res.json(response);
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};

// Get projects by category
export const getProjectsByCategory = async (req, res) => {
  try {
    const response = await sendKafkaMessageWithResponse("statistics-request", {
      action: "GET_PROJECTS_BY_CATEGORY",
    });

    res.json(response);
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};

// Get projects by month
export const getProjectsByMonth = async (req, res) => {
  try {
    const { startMonth, endMonth } = req.query;

    const response = await sendKafkaMessageWithResponse("statistics-request", {
      action: "GET_PROJECTS_BY_MONTH",
      data: { startMonth, endMonth },
    });

    res.json(response);
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};
