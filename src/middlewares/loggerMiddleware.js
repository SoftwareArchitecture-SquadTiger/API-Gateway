import { getIndochinaTime } from "../utils/timeFormat.js";

export const loggerMiddleware = (req, res, next) => {
  const method = req.method; // HTTP Method (GET, POST, etc.)
  const url = req.originalUrl; // Requested URL
  const ip = req.ip; // IP Address of the client making the request

  const timestamp = getIndochinaTime();

  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start; // Calculate response time
    const status = res.statusCode;

    console.log(
      `[${timestamp}] IP:${ip} | Method:${method} | Route:${url} | Status:${status} | Time:${duration}ms`
    );
  });

  next(); // Proceed to the next middleware/route handler
};
