import { createClient } from 'redis';
import "dotenv/config";

const REDIS_PORT = process.env.REDIS_PORT;
const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

const redisClient = createClient ({
    url: `redis://default:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`
})

redisClient.on('error', (err) => {
    console.error(err)
});

await redisClient.connect();

export default redisClient;