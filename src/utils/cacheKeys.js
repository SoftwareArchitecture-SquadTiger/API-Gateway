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
