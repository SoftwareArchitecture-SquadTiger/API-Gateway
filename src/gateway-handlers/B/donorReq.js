import { handleAxiosErrorResponse } from "../../utils/errorHandler.js";
import { sendKafkaMessageWithResponse } from "../../services/kafkaServices.js";
import redisClient from "../../services/redisService.js";
import { CACHE_KEYS, invalidateCacheKeys } from "../../utils/cacheKeys.js";
import { logKeyInvalidation } from "../../utils/redisLogHandler.js";

//Get all donors
export const getAllDonors = async (req, res) => {
  try {
    const cacheKey = res.locals.cacheKey;

    const response = await sendKafkaMessageWithResponse("donor-request", {
      action: "GET_ALL",
      data: {},
    });

    if (redisClient) {
      await redisClient.set(cacheKey, JSON.stringify(response), { EX: 3600 });
    }

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
    const cacheKey = res.locals.cacheKey;
    const { categories } = req.body;
    const response = await sendKafkaMessageWithResponse("donor-request", {
      action: "GET_BY_CATEGORIES",
      data: { categories: categories },
    });
    
    if (redisClient) {
      await redisClient.set(cacheKey, JSON.stringify(response), { EX: 3600 });
    }

    res.json(response);
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};

//Get donors by regions
export const getDonorsBySubscribedRegions = async (req, res) => {
  try {
    const cacheKey = res.locals.cacheKey;
    const { regions } = req.body;
    const response = await sendKafkaMessageWithResponse("donor-request", {
      action: "GET_BY_REGIONS",
      data: { regions: regions },
    });

    if (redisClient) {
      await redisClient.set(cacheKey, JSON.stringify(response), { EX: 3600 });
    }

    res.json(response);
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};

//Get filtered donors
export const getFilteredDonors = async (req, res) => {
  try {
    const cacheKey = res.locals.cacheKey;
    const response = await sendKafkaMessageWithResponse("donor-request", {
      action: "GET_BY_FILTERS",
      data: req.query,
    });

    if (redisClient) {
      await redisClient.set(cacheKey, JSON.stringify(response), { EX: 3600 });
    }

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

    if (redisClient) {
      await redisClient.del(CACHE_KEYS.DONORS_ALL);
      logKeyInvalidation(1, CACHE_KEYS.DONORS_ALL);
      await invalidateCacheKeys("donors:filtered:*");
    }

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

    if (redisClient) {
      await redisClient.del(CACHE_KEYS.DONORS_ALL);
      logKeyInvalidation(1, CACHE_KEYS.DONORS_ALL);
      await invalidateCacheKeys("donors:filtered:*");
    }

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

    if (redisClient) {
      await redisClient.del(CACHE_KEYS.DONORS_ALL);
      logKeyInvalidation(1, CACHE_KEYS.DONORS_ALL);
      await invalidateCacheKeys("donors:filtered:*");
    }

    res.json(response);
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};
