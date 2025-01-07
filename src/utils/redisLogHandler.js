import { getIndochinaTime } from "./timeFormat.js";

const logHead = `[${getIndochinaTime()}] Redis:`;

export const logCacheOperation = (fetchCache, cacheKey) => {
  console.log(
    `${logHead} ${
      fetchCache === "fetch" ? "Cache Read" : "Cache Write"
    } | Key: ${cacheKey} | Status: success`
  );
};

export const logKeyInvalidation = (amount, pattern) => {
  console.log(
    `${logHead} Key Invalidation | Amount: ${amount} | Pattern: ${pattern}`
  );
};
