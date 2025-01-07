import redisClient from "../services/redisService.js";
import { logKeyInvalidation } from "./redisLogHandler.js";

export const CACHE_KEYS = {
  DONORS_ALL: "donors:all",
  CHARITIES_ALL: "charities:all",
};

export const generateCacheKey = (req) => {
  const queryString = Object.entries(req.query)
    .map(([key, value]) => `${key}:${value}`)
    .join("|");

  return `donors:filtered:${queryString}`;
};

export const invalidateCacheKeys = async (pattern) => {
  try {
    const keysToDelete = [];

    for await (const key of redisClient.scanIterator({
      MATCH: pattern, // Match keys with the given pattern
      COUNT: 100, // Scan 100 keys per iteration
    })) {
      keysToDelete.push(key);
    }

    if (keysToDelete.length > 0) {
      await redisClient.del(keysToDelete);
      logKeyInvalidation(keysToDelete.length, pattern);
    }
  } catch (error) {
    console.error(`Error invalidating cache keys: ${error}`);
  }
};
