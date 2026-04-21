import redis from "../config/redis.config.js";

export const tokenBucket = async (key, capacity, refillRate, cost) => {
    let currTime = Date.now();

    const data = await redis.get(key);
    let tokens = capacity;
    let lastRefill = currTime;

    if (data) {
        const parsed = JSON.parse(data);
        tokens = parsed.tokens;
        lastRefill = parsed.lastRefill;

        const timePassed = (currTime - lastRefill) / 1000;
        const refill = timePassed * refillRate;

        tokens = Math.min(capacity, tokens + refill);
    }

    if (tokens < cost) {
        return {
            allowed: false,
            remaining: Math.floor(tokens)
        };
    }

    tokens = tokens - cost;

    await redis.set(
        key,
        JSON.stringify({
            tokens,
            lastRefill: currTime
        }),
        {
            EX: Math.ceil(capacity / refillRate)
        }
    )


    return {
        allowed: true,
        remaining: Math.floor(tokens)
    }
};

