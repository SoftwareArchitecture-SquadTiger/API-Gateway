import redisClient from "../services/redisService.js";
import { logKeyInvalidation } from "./redisLogHandler.js";

export const CACHE_KEYS = {
  DONORS_ALL: "donors:all",
  CHARITIES_ALL: "charities:all",
};

export const generateCacheKey = (req, prefix = 'default') => {
  // Determine source of data (query or body)
  const source = Object.keys(req.query).length > 0 ? req.query : req.body;

  // Convert source to a query string
  const queryString = Object.entries(source)
    .map(([key, value]) =>
      Array.isArray(value)
        ? `${key}:${value.join(",")}` // Handle elements of req.body array
        : `${key}:${value}` // Handle filter values of req.query
    )
    .join("|");

  return `${prefix}:filtered:${queryString}`;
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
