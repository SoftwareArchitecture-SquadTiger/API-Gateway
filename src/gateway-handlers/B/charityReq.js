import { handleAxiosErrorResponse } from "../../utils/errorHandler.js";
import { sendKafkaMessageWithResponse } from "../../services/kafkaServices.js";
import redisClient from "../../services/redisService.js";
import { CACHE_KEYS, invalidateCacheKeys } from "../../utils/cacheKeys.js";
import { logKeyInvalidation } from "../../utils/redisLogHandler.js";

// Get all charities
export const getAllCharities = async (req, res) => {
  try {
    const cacheKey = res.locals.cacheKey;

    const response = await sendKafkaMessageWithResponse("charity-request", {
      action: "GET_ALL",
      data: {},
    });

    if (redisClient) {
      await redisClient.set(cacheKey, JSON.stringify(response), {
        EX: 3600,
      });
    }

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

// Get filtered charities
export const getFilteredCharities = async (req, res) => {
  try {
    const cacheKey = res.locals.cacheKey;
    const response = await sendKafkaMessageWithResponse("charity-request", {
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

// Create a charity
export const createNewCharity = async (req, res) => {
  try {
    const data = req.body;

    const response = await sendKafkaMessageWithResponse("charity-request", {
      action: "ADD",
      data: data,
    });

    if (redisClient) {
      await redisClient.del(CACHE_KEYS.CHARITIES_ALL);
      logKeyInvalidation(1, CACHE_KEYS.CHARITIES_ALL);
      await invalidateCacheKeys("charities:filtered:*");
    }

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

    if (redisClient) {
      await redisClient.del(CACHE_KEYS.CHARITIES_ALL);
      logKeyInvalidation(1, CACHE_KEYS.CHARITIES_ALL);
      await invalidateCacheKeys("charities:filtered:*");
    }

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

    if (redisClient) {
      await redisClient.del(CACHE_KEYS.CHARITIES_ALL);
      logKeyInvalidation(1, CACHE_KEYS.CHARITIES_ALL);
      await invalidateCacheKeys("charities:filtered:*");
    }

    res.json(response);
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};
