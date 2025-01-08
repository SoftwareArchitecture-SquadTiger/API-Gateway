import { getIndochinaTime } from "./timeFormat.js";

export const logRedisMessage = (fetchCache, cacheKey) => {
  const timestamp = getIndochinaTime();

  console.log(
    `[${timestamp}] Redis: ${
      fetchCache === "fetch" ? "Cache Read" : "Cache Write"
    } | Key: ${cacheKey} | Status: success` 
  );
};
