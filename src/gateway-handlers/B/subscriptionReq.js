import { handleAxiosErrorResponse } from "../../utils/errorHandler.js";
import { sendKafkaMessageWithResponse } from "../../services/kafkaServices.js";
import redisClient from "../../services/redisService.js";
import { invalidateCacheKeys } from "../../utils/cacheKeys.js";

//Get subscriptions by email
export const getSubscriptionsByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const response = await sendKafkaMessageWithResponse("donor-request", {
      action: "GET_SUBSCRIPTIONS_BY_EMAIL",
      data: { email: email },
    });

    res.json(response);
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};

//Get emails by categories
export const getEmailsByCategories = async (req, res) => {
  try {
    const cacheKey = res.locals.cacheKey;
    const { categories } = req.body;
    const response = await sendKafkaMessageWithResponse("donor-request", {
      action: "GET_EMAILS_BY_CATEGORIES",
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

//Create new donor subscriptions
export const createSubscription = async (req, res) => {
  try {
    const data = req.body;

    const response = await sendKafkaMessageWithResponse("donor-request", {
      action: "CREATE_SUBSCRIPTION",
      data: data,
    });

    if (redisClient) {
      await invalidateCacheKeys("donors-email:filtered:*");
    }

    res.json(response);
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};

//Update donor subscription
export const updateSubscription = async (req, res) => {
  try {
    const { email } = req.params;

    const response = await sendKafkaMessageWithResponse("donor-request", {
      action: "UPDATE_SUBSCRIPTION",
      data: { email: email, update: req.body },
    });

    if (redisClient) {
      await invalidateCacheKeys("donors-email:filtered:*");
    }

    res.json(response);
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};

//Clear donor subscriptions
export const clearSubscription = async (req, res) => {
  try {
    const { email } = req.params;

    const response = await sendKafkaMessageWithResponse("donor-request", {
      action: "CLEAR_SUBSCRIPTION",
      data: { email: email },
    });

    if (redisClient) {
      await invalidateCacheKeys("donors-email:filtered:*");
    }

    res.json(response);
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};
