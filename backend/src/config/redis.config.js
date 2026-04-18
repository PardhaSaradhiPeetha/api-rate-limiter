import { createClient } from "redis";

const redis = createClient(
    { url: `redis://${process.NODE_ENV.REDIS_HOST}:${process.NODE_ENV.REDIS_PORT}` }
);

redis.on("connect", () => { console.log("Redis Connected") });
redis.on("error", (err) => { console.log("Redis Error: " + err) });

await redis.connect();

export default redis;