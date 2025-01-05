import redisClient from "../services/redisService.js";
import { logRedisMessage } from "../utils/redisLogHandler.js";

export const cacheMiddleware = (key) => async (req, res, next) => {
  const cacheKey = key(req);

  try {
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      logRedisMessage("fetch", cacheKey);
      return res.json(JSON.parse(cachedData));
    }

    res.locals.cacheKey = cacheKey;
    logRedisMessage("write", cacheKey);
    next();
  } catch (error) {
    console.error(`Error checking Redis cache: ${error}`);
    next();
  }
};
