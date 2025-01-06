export const apiKeyMiddleware = (req, res, next) => {
    const providedApiKey = req.headers['internal-api'] || req.query['internal-api'];
  
    // Retrieve the valid API key from environment variables
    const validApiKey = process.env.INTERNAL_API_KEY;
  
    if (!providedApiKey || providedApiKey !== validApiKey) {
      return res.status(401).json({ error: 'Unauthorized: Invalid API key.',providedApiKey });
    }
  
    // If valid, proceed to the next middleware or route handler
    next();
  };