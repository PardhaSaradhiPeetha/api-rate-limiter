const PLAN_LIMITS = {
    free: {
        maxApiKeys: 5,
        capacity: 50,
        timeWindow: 60,
        maxCost: 5
    }
};

export const getLimits = () => {
    const config = PLAN_LIMITS["free"];

    return {
        maxApiKeys: config.maxApiKeys,
        capacity: config.capacity,
        refillRate: config.capacity / config.timeWindow,
        maxCost: config.maxCost
    }
};
