import redis from "../config/redis.config.js";

export const tokenBucket = async (key, capacity, refillRate, cost = 1) => {
    const now = Date.now();

    const ttl = Math.ceil(capacity / refillRate);

    let bucket = await redis.get(key);

    if (bucket) {
        bucket = JSON.parse(bucket);
    } else {
        bucket = {
            tokens: capacity,
            lastRefill: now
        };
    }

    const elapsed = (now - bucket.lastRefill) / 1000;

    bucket.tokens = Math.min(
        capacity,
        bucket.tokens + elapsed * refillRate
    );

    bucket.lastRefill = now;

    if (bucket.tokens < cost) {

        await redis.multi()
            .set(key, JSON.stringify(bucket))
            .expire(key, ttl)   
            .exec();

        return {
            allowed: false,
            remaining: Math.floor(bucket.tokens)
        };
    }

    bucket.tokens -= cost;

    await redis.multi()
        .set(key, JSON.stringify(bucket))
        .expire(key, ttl)
        .exec();

    return {
        allowed: true,
        remaining: Math.floor(bucket.tokens)
    };
};
