/**
 * API Key Middleware for Internal Backend-to-Backend Communication
 *
 * Validates the `internal-api` key provided in the request headers or query parameters.
 * Ensures secure interaction between backend services by checking against a valid API key.
 */

export const apiKeyMiddleware = (req, res, next) => {
  const providedApiKey = req.headers['internal-api'] || req.query['internal-api'];

  // Retrieve the valid API key from environment variables
  const validApiKey = process.env.INTERNAL_API_KEY;

  if (!providedApiKey || providedApiKey !== validApiKey) {
    console.log(`Invalid API key provided: ${providedApiKey}`);
    console.log(`Valid API key: ${validApiKey}`);
    return res.status(401).json({ error: 'Unauthorized: Invalid API key.',providedApiKey });
  }

  // If valid, proceed to the next middleware or route handler
  next();
};