import redisClient from "../services/redisService.js";

export const cacheMiddleware = (key) => async (req, res, next) => {
  const cacheKey = key(req);

  try {
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log(`Cache hit for key: ${cacheKey}`);
      return res.json(JSON.parse(cachedData));
    }

    res.locals.cacheKey = cacheKey;
    next();
  } catch (error) {
    console.error(`Error checking Redis cache: ${error}`);
    next();
  }
};
