import "dotenv/config";
import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL ||
    `redis://${process.env.REDIS_HOST || "localhost"}:${process.env.REDIS_PORT || 6379}`;

const redis = createClient({
    url: redisUrl,
    socket: {
        reconnectStrategy: false
    }
});

redis.on("connect", () => { console.log("Redis Connected") });
redis.on("error", (err) => { console.log("Redis Error: " + err) });

try {
    await redis.connect();
} catch (err) {
    console.error(`Unable to connect to Redis at ${redisUrl}. Start Redis or update REDIS_URL/REDIS_HOST/REDIS_PORT.`);
    throw err;
}

export default redis;
