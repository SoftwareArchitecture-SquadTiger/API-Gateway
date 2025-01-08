import { createClient } from "redis";
import "dotenv/config";

const REDIS_PORT = process.env.REDIS_PORT;
const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

let redisClient;

try {
  redisClient = createClient({
    url: `redis://default:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`,
    socket: {
      reconnectStrategy: (retries) => {
        if (retries > 0) {
          console.error("Redis reconnection attempts exceeded.");
          return false; // Stop trying to reconnect after 1 attempts
        }
      },
    },
  });

  redisClient.on("error", (err) => {
    console.error("Can't connect to redis");
  });

  await redisClient.connect();
} catch (error) {
  redisClient = null; // Set Redis client to null if connection fails
}

export default redisClient;
